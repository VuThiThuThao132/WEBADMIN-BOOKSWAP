import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import EditPost from "../edit/EditPost";
import "./view.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axiosInstance from "../../utils/axiosInstance";

const ViewPost = () => {
    const { postId } = useParams(); // Lấy postId từ URL
    const [postData, setPostData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [postToEdit, setPostToEdit] = useState(null);


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
                    'https://bookswapplatform.site/bookswap/api/v1/post/filter',
                    requestBody,

                );

                if (response.status === 200) {
                    const postData = response.data.data; // Lấy dữ liệu của bài đăng cụ thể
                    setPostData(postData);
                } else {
                    throw new Error("Failed to fetch post details");
                }
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        fetchPostData();
    }, [postId]);

    console.log("postId:", postId);
    console.log("postData from API:", postData);

    useEffect(() => {
        if (postData) {
            const post = postData.find(post => post.id === postId);
            setPostToEdit(post);
        }
    }, [postId, postData]);

    const handleSave = (editedData) => {
        axiosInstance.put(
            `https://bookswapplatform.site/bookswap/api/v1/post/modify?postId=${postId}`,
            editedData,

        )
            .then(response => {
                console.log('Updated post:', response.data);
            })
            .catch(error => {
                console.error('Error updating post:', error);
            });

        setPostData(previousData => {
            const updatedData = previousData.map(post => {
                if (post.id === postId) {
                    return { ...post, ...editedData };
                }
                return post;
            });
            return updatedData;
        });

        setIsEditing(false); // Đóng modal khi đã lưu xong
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };
    // Function to handle modal close
    const handleCloseModal = () => {
        setIsEditing(false);
    };
    return (
        <div className="view">
            <Sidebar />
            <div className="viewContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editButton" onClick={handleEditClick}>Chỉnh sửa</div>
                        <Link to="/posts">
                            <ArrowBackIcon />
                        </Link>
                        {isEditing && postToEdit && (
                            <EditPost
                                postId={postId}
                                postData={postToEdit}
                                onClose={handleCloseModal}
                                onSave={handleSave}
                            />
                        )}
                        <h1 >Chi tiết bài đăng</h1>
                        <div className="item">
                            <div className="details">
                                {postData && (
                                    <div className="postItem">
                                        {postData.map(post => {
                                            if (post.id === postId) {
                                                return (
                                                    <div className="postItem" key={post.id}>
                                                        <div className="postSection">
                                                            <h5>Thông tin chi tiết bài đăng</h5>
                                                            {/* <div className="detailItem">
                                                                <span className="itemKey">ID bài đăng: </span>
                                                                <span className="itemValue">{post.id}</span>
                                                            </div> */}
                                                            <div className="detailItem">
                                                                <span className="itemKey">Đầu đề:</span>
                                                                <span className="itemValue">{post.caption ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Mô tả:</span>
                                                                <span className="itemValue">{post.description ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Phương thức trao đổi:</span>
                                                                <span className="itemValue">{post.exchangeMethod ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Ngày tạo:</span>
                                                                <span className="itemValue">{post.createDate ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Thành phố:</span>
                                                                <span className="itemValue">{post.city ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Quận/Huyện:</span>
                                                                <span className="itemValue">{post.district ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Trạng thái bài đăng:</span>
                                                                <span className="itemValue">{post.postStatus ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Tạo bởi:</span>
                                                                <span className="itemValue">{post.createBy ?? 'NULL'}</span>
                                                            </div>

                                                        </div>
                                                        <div className="userSection">
                                                            <h5>Người dùng của bài đăng</h5>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Tên:</span>
                                                                <span className="itemValue">{post.userGeneralDTO.name}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Điện thoại:</span>
                                                                <span className="itemValue">{post.userGeneralDTO.phone}</span>
                                                            </div>
                                                        </div>
                                                        <div className="bookSection">
                                                            <h5>Sách của bài đăng</h5>
                                                            {post.bookDTOS.map((book, index) => (
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
                                                                        <span className="itemKey">Nhà xuất bản:</span>
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
                                                                        <span className="itemKey">Tâc giả:</span>
                                                                        <span className="itemValue">{book.authors ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Thể loại chính:</span>
                                                                        <span className="itemValue">{book.mainCategory ?? 'NULL'}</span>
                                                                    </div>
                                                                    <div className="detailItem">
                                                                        <span className="itemKey">Thể loại phụ:</span>
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

export default ViewPost;