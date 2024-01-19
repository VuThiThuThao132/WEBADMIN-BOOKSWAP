import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./view.scss";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axiosInstance from "../../utils/axiosInstance";

const ViewOrder = () => {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState(null);


    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const requestBody = {
                    page: 0,
                    size: 6,
                    sortBy: 'views',
                    sortOrder: 'desc',
                };

                const response = await axiosInstance.post(
                    'https://bookswapplatform.site/bookswap/api/v1/admin/order/filter',
                    requestBody,

                );

                if (response.status === 200) {
                    const orderData = response.data.data;
                    setOrderData(orderData);
                } else {
                    throw new Error("Failed to fetch order details");
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        fetchOrderData();
    }, [orderId]);

    console.log("orderId:", orderId);
    console.log("orderId from API:", orderId);

    // useEffect(() => {
    //     if (orderData) {
    //         const order = orderData.find(order => order.id === orderId);
    //         setOrderit(order);
    //     }
    // }, [orderId, orderData]);

    return (
        <div className="view">
            <Sidebar />
            <div className="viewContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <Link to="/orders">
                            <ArrowBackIcon />
                        </Link>

                        <h1 >Thông tin chi tiết đơn hàng</h1>

                        {/* {isEditing && orderToEdit && (
                            <EditPost
                                orderId={orderId}
                                orderData={orderToEdit}
                                onClose={handleCloseModal}
                                onSave={handleSave}
                            />
                        )} */}
                        <div className="item">
                            <div className="details">
                                {orderData && (
                                    <div className="postItem">
                                        {orderData.map(order => {
                                            if (order.id === orderId) {
                                                return (
                                                    <div className="postItem" key={order.id}>
                                                        <div className="orderSection">
                                                            <h5>Thông tin đơn hàng</h5>
                                                            <div className="detailItem">
                                                                <span className="itemKey">ID đơn hàng: </span>
                                                                <span className="itemValue">{order.id}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Giá gửi:</span>
                                                                <span className="itemValue">{order.senderPrice ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Giá nhận:</span>
                                                                <span className="itemValue">{order.receiverPrice ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Giá sách:</span>
                                                                <span className="itemValue">{order.bookPrice ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Tiền vận chuyển của gười gửi:</span>
                                                                <span className="itemValue">{order.senderShipPrice ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Tiền vận chuyển của người nhận:</span>
                                                                <span className="itemValue">{order.receiverShipPrice ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Phí:</span>
                                                                <span className="itemValue">{order.fee ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Ghi chú:</span>
                                                                <span className="itemValue">{order.note ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Thành phố:</span>
                                                                <span className="itemValue">{order.city ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Quận/Huyện:</span>
                                                                <span className="itemValue">{order.district ?? 'NULL'}</span>
                                                            </div>
                                                        </div>
                                                        <div className="orderSection">
                                                            <h5>Người dùng của đơn hàng</h5>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Tên:</span>
                                                                <span className="itemValue">{order.userOrderDTO.name}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Điện thoại:</span>
                                                                <span className="itemValue">{order.userOrderDTO.phone}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Email:</span>
                                                                <span className="itemValue">{order.userOrderDTO.email}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Thành phố:</span>
                                                                <span className="itemValue">{order.userOrderDTO.city}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Quận/Huyện:</span>
                                                                <span className="itemValue">{order.userOrderDTO.district}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">FireBase ID:</span>
                                                                <span className="itemValue">{order.userOrderDTO.fireBaseId}</span>
                                                            </div>
                                                        </div>
                                                        <div className="postSection">
                                                            <h5>Bài đăng của đơn hàng</h5>
                                                            <div className="detailItem">
                                                                <span className="itemKey">ID bài đăng:</span>
                                                                <span className="itemValue">{order.postDTO.id}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Đầu đề:</span>
                                                                <span className="itemValue">{order.postDTO.caption}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Mô tả:</span>
                                                                <span className="itemValue">{order.postDTO.description}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Thành phố:</span>
                                                                <span className="itemValue">{order.postDTO.city}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Phương thức trao đổi:</span>
                                                                <span className="itemValue">{order.postDTO.exchangeMethod}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Ngày tạo:</span>
                                                                <span className="itemValue">{order.postDTO.createDate}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Ngày cập nhập:</span>
                                                                <span className="itemValue">{order.postDTO.updateDate}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Thành phố:</span>
                                                                <span className="itemValue">{order.postDTO.city}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Quận/Huy:</span>
                                                                <span className="itemValue">{order.postDTO.district}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Vị trí chi tiết:</span>
                                                                <span className="itemValue">{order.postDTO.locationDetail}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Trạng thái bài đăng:</span>
                                                                <span className="itemValue">{order.postDTO.postStatus}</span>
                                                            </div>
                                                        </div>

                                                        <div className="orderSection">
                                                            <h5>Sách của đơn hàng</h5>
                                                            {order.postDTO.bookDTOS.map((book, index) => (
                                                                <div key={book.id} className="bookDetails">
                                                                    <h6>Sách {index + 1}</h6>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">ID sách:</span>
                                                                        <span className="itemValue">{book.id ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Tên sách:</span>
                                                                        <span className="itemValue">{book.title ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Mô tả:</span>
                                                                        <span className="itemValue">{book.description ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Nhà xuấ bản:</span>
                                                                        <span className="itemValue">{book.publisher ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Ngày xuất bản:</span>
                                                                        <span className="itemValue">{book.publishedDate ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">ISBN:</span>
                                                                        <span className="itemValue">{book.isbn ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Ngôn ngữ:</span>
                                                                        <span className="itemValue">{book.language ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Số trang:</span>
                                                                        <span className="itemValue">{book.pageCount ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Tác giả:</span>
                                                                        <span className="itemValue">{book.authors ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Thể loại chính:</span>
                                                                        <span className="itemValue">{book.mainCategory ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">THể loại phụ:</span>
                                                                        <span className="itemValue">{book.subCategory ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Thể loại chi tiết:</span>
                                                                        <span className="itemValue">{book.subSubCategory ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Giá:</span>
                                                                        <span className="itemValue">{book.price ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Độ mới:</span>
                                                                        <span className="itemValue">{book.newPercent ?? 'NULL'}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="orderSection">
                                                            <h5>Sách trao đổi của đơn hàng</h5>
                                                            {order.bookTradeDTOS.map((trade, index) => (
                                                                <div key={trade.id} className="bookDetails">
                                                                    <h6>Sách trao đổi {index + 1}</h6>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">ID sách trao đổi:</span>
                                                                        <span className="itemValue">{trade.id}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Tên sách:</span>
                                                                        <span className="itemValue">{trade.title}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Tạo bởi:</span>
                                                                        <span className="itemValue">{trade.createBy}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Giá:</span>
                                                                        <span className="itemValue">{trade.price}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Thể loại:</span>
                                                                        <span className="itemValue">{trade.category}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="orderSection">
                                                            <h5>Thanh toán của đơn hàng</h5>
                                                            {order.paymentDTOS.map((payment, index) => (
                                                                <div key={payment.id} className="bookDetails">
                                                                    <h6>Thanh toán {index + 1}</h6>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">ID thanh toán:</span>
                                                                        <span className="itemValue">{payment.id}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Số lượng:</span>
                                                                        <span className="itemValue">{payment.amount}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Phí:</span>
                                                                        <span className="itemValue">{payment.fee}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Ngày tạo:</span>
                                                                        <span className="itemValue">{payment.createDate}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Tạo bởi:</span>
                                                                        <span className="itemValue">{payment.createBy}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Trạng thái:</span>
                                                                        <span className="itemValue">{payment.status}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;