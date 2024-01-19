import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { bookColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axiosInstance from "../../utils/axiosInstance";

const BookDatatable = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const requestBody = {
                    page: 0,
                    size: 6,
                    sortBy: 'title',
                    sortOrder: 'desc',
                };

                const response = await axiosInstance.post(
                    'https://bookswapplatform.site/bookswap/api/v1/book/filter',
                    requestBody,
                );

                if (response.status === 200) {
                    const result = response.data;
                    const adjustedData = result.data.map((item) => {
                        return {
                            id: item.id,
                            title: item.title || 'NULL',
                            description: item.description || 'NULL',
                            publisher: item.publisher || 'NULL',
                            year: item.year || 'NULL',
                            isbn: item.isbn || 'NULL',
                            language: item.language || 'NULL',
                            pageCount: item.pageCount || '0',
                            authors: item.authors || [],
                            mainCategory: item.mainCategory || 'NULL',
                            subCategory: item.subCategory || 'NULL',
                            subSubCategory: item.subSubCategory || 'NULL',
                            price: item.price || '0',
                            newPercent: item.newPercent || '0',
                            image: item.image && item.image.length > 0 ? item.image[0] : null,
                        };
                    });

                    setData(adjustedData);
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchBookData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "books", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        const filtered = data.filter((item) => {
            const yearString = String(item.year);
            const newPercentString = String(item.newPercent);

            return (
                item.title.toLowerCase().includes(value.toLowerCase()) ||
                item.description.toLowerCase().includes(value.toLowerCase()) ||
                item.publisher.toLowerCase().includes(value.toLowerCase()) ||
                yearString.toLowerCase().includes(value.toLowerCase()) ||
                item.isbn.toLowerCase().includes(value.toLowerCase()) ||
                item.language.toLowerCase().includes(value.toLowerCase()) ||
                item.authors.join(", ").toLowerCase().includes(value.toLowerCase()) ||
                item.mainCategory.toLowerCase().includes(value.toLowerCase()) ||
                item.subCategory.toLowerCase().includes(value.toLowerCase()) ||
                item.subSubCategory.toLowerCase().includes(value.toLowerCase()) ||
                item.price.toString().toLowerCase().includes(value.toLowerCase()) ||
                newPercentString.toLowerCase().includes(value.toLowerCase())
            );
        });
        setFilteredData(filtered);
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/books/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">Xem</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Xóa
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="datatable">
            <div className="datatableTitle">
                SÁCH
                <div className="search">
                    <div className="searchIcon">
                        <SearchOutlinedIcon />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Tìm kiếm sách..."
                    />
                </div>
            </div>
            <DataGrid
                className="datagrid"
                rows={filteredData.length > 0 ? filteredData : data}
                columns={bookColumns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    );
};

export default BookDatatable;