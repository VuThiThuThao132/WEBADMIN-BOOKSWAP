import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import axiosInstance from "../../utils/axiosInstance";

const OrderDatatable = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const requestBody = {
                    page: 0,
                    size: 6,
                    sortBy: 'senderPrice',
                    sortOrder: 'desc',
                };

                const response = await axiosInstance.post(
                    'https://bookswapplatform.site/bookswap/api/v1/admin/order/filter',
                    requestBody,

                );

                if (response.status === 200) {
                    const result = response.data;
                    const adjustedData = result.data.map((item) => {
                        return {
                            id: item.id,
                            senderPrice: item.senderPrice || '0',
                            receiverPrice: item.receiverPrice || '0',
                            bookPrice: item.bookPrice || '0',
                            senderShipPrice: item.senderShipPrice || '0',
                            receiverShipPrice: item.receiverShipPrice || '0',
                            fee: item.fee || '0',
                            note: item.note || 'NULL',
                            city: item.city || 'NULL',
                            district: item.district || 'NULL',
                            startShipDate: item.startShipDate || 'NULL',
                            finishShipDate: item.finishShipDate || 'NULL',
                            createDate: item.createDate || 'NULL',
                            orderStatus: item.orderStatus || 'NULL',
                        };
                    });

                    setData(adjustedData);
                    setFilteredData(adjustedData);
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, []);


    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "orders", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        const filtered = data.filter((item) => {
            return (
                item.senderPrice.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.receiverPrice.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.bookPrice.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.senderShipPrice.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.receiverShipPrice.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.fee.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.note.toLowerCase().includes(value.toLowerCase()) ||
                item.city.toLowerCase().includes(value.toLowerCase()) ||
                item.district.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.startShipDate.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.finishShipDate.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.createDate.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.orderStatus.toString().toLowerCase().includes(value.toLowerCase())

            );
        });

        setFilteredData(filtered);
    };
    const [selectedOrderStatus, setSelectedOrderStatus] = useState('');
    const handleOrderStatusChange = (event) => {
        const value = event.target.value;
        setSelectedOrderStatus(value);

        if (value === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) => {
                return item.orderStatus.toLowerCase().includes(value.toLowerCase());
            });
            setFilteredData(filtered);
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
                        <Link to={`/orders/${params.row.id}`} style={{ textDecoration: "none" }}>
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
                ĐƠN HÀNG
                <div className="search">
                    <div className="searchIcon">
                        <SearchOutlinedIcon />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Tìm kiếm đơn hàng..."
                    />
                </div>
                <div className="filter">
                    <FilterAltOutlinedIcon className="filterIcon" />
                    <select value={selectedOrderStatus} onChange={handleOrderStatusChange}>
                        <option value="">Tất cả trạng thái</option>
                        <option value="NOT_PAY">Chưa thanh toán</option>
                        <option value="WAITING_CONFIRM">Chờ xác nhận</option>
                        <option value="WAITING_SHIPPER">Chờ shipper</option>
                        <option value="PREPARING">Đang chuẩn bị</option>
                        <option value="ON_GOING">Đang giao hàng</option>
                        <option value="FINISH">Hoàn thành</option>
                        <option value="CANCEL">Hủy</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <DataGrid
                    className="datagrid"
                    rows={filteredData}
                    columns={orderColumns.concat(actionColumn)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
            )}
        </div>
    );
};
export default OrderDatatable;