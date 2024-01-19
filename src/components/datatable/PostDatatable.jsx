import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { postColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import axiosInstance from "../../utils/axiosInstance";

const PostDatatable = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const requestBody = {
                    page: 0,
                    size: 6,
                    sortBy: 'views',
                    sortOrder: 'desc',
                };

                const response = await axiosInstance.post(
                    'https://bookswapplatform.site/bookswap/api/v1/admin/post/filter',
                    requestBody,

                );

                if (response.status === 200) {
                    const result = response.data;
                    const adjustedData = result.data.map((item) => {
                        // const bookData = item.bookDTOS[0] || {};
                        return {
                            id: item.id,
                            caption: item.caption || 'NULL',
                            description: item.description || 'NULL',
                            exchangeMethod: item.exchangeMethod || 'NULL',
                            createDate: item.createDate || 'NULL',
                            city: item.city || 'NULL',
                            district: item.district || 'NULL',
                            postStatus: item.postStatus || 'NULL',
                            createBy: item.createBy || 'NULL',
                        };
                    });

                    setData(adjustedData);
                    setFilteredData(adjustedData); // Set filteredData when data is fetched
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };


        fetchPostData();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        const filtered = data.filter((item) => {
            return (
                item.caption.toLowerCase().includes(value.toLowerCase()) ||
                item.description.toLowerCase().includes(value.toLowerCase())
                || item.postStatus.toLowerCase().includes(value.toLowerCase())
            );
        });

        setFilteredData(filtered);
    };

    const [selectedPostStatus, setSelectedPostStatus] = useState('');
    const handlePostStatusChange = (event) => {
        const value = event.target.value;
        setSelectedPostStatus(value);

        if (value === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) => {
                return item.postStatus.toLowerCase().includes(value.toLowerCase());
            });
            setFilteredData(filtered);
        }
    };


    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "posts", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/posts/${params.row.id}`} style={{ textDecoration: "none" }}>
                            Xem
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
                BÀI ĐĂNG
                <div className="search">
                    <div className="searchIcon">
                        <SearchOutlinedIcon />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Tìm kiếm bài đăng..."
                    />
                </div>
                <div className="filter">
                    <FilterAltOutlinedIcon className="filterIcon" />
                    <select value={selectedPostStatus} onChange={handlePostStatusChange}>
                        <option value="">Tất cả trạng thái</option>
                        <option value="ACTIVE">Hoạt động</option>
                        <option value="DEACTIVE">Không hoạt động</option>
                        <option value="LOCKED">Đã khóa</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <DataGrid
                    className="datagrid"
                    rows={filteredData}
                    columns={postColumns.concat(actionColumn)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
            )}
        </div>
    );
};
export default PostDatatable;