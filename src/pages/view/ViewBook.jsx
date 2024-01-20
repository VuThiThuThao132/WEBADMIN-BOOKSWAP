import "./view.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EditBook from "../edit/EditBook";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axiosInstance from "../../utils/axiosInstance";

const ViewBook = () => {
    const { bookId } = useParams();
    const [bookData, setBookData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [bookToEdit, setBookToEdit] = useState(null);

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
                    const bookData = response.data.data;
                    setBookData(bookData);
                } else {
                    throw new Error("Failed to fetch book details");
                }
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchBookData();
    }, [bookId]);

    console.log("bookId:", bookId);
    console.log("bookData from API:", bookData);

    useEffect(() => {
        if (bookData) {
            const book = bookData.find(book => book.id === bookId);
            setBookToEdit(book);
        }
    }, [bookId, bookData]);

    const handleSave = (editedData) => {
        console.log("editedData", editedData);

        axiosInstance.post(
            `https://bookswapplatform.site/bookswap/api/v1/book/modify?bookId=${bookId}`,
            editedData,


        )
            .then(response => {
                console.log('Updated book:', response.data);
            })
            .catch(error => {
                console.error('Error updating book:', error);
            });

        setBookData(previousData => {
            const updatedData = previousData.map(book => {
                if (book.id === bookId) {
                    return { ...book, ...editedData };
                }
                return book;
            });
            return updatedData;
        });

        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

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
                        <Link to="/books">
                            <ArrowBackIcon />
                        </Link>
                        {isEditing && bookToEdit && (
                            <EditBook
                                bookId={bookId}
                                bookData={bookToEdit}
                                onClose={handleCloseModal}
                                onSave={handleSave}
                            />
                        )}
                        <h1 >Thông tin chi tiết sách </h1>
                        <div className="item">
                            <div className="details">
                                {bookData && (
                                    <div className="postItem">
                                        {bookData.map(book => {
                                            if (book.id === bookId) {
                                                return (
                                                    <div className="postItem" key={book.id}>

                                                        <div className="postSection">
                                                            {/* <div className="detailItem">
                                                                <span className="itemKey">ID Sách: </span>
                                                                <span className="itemValue">{book.id}</span>
                                                            </div> */}

                                                            <div className="detailItem">
                                                                <div className="itemValue images-container">
                                                                    <span className="itemKey">ảnh sách:</span>

                                                                    {book.image && book.image.length > 0 && (
                                                                        <img className="bookImage" src={book.image[0]} alt="Book Cover" />
                                                                    )}

                                                                    <span className="itemKey">Ảnh bìa:</span>

                                                                    {book.coverImage && (
                                                                        <img className="bookImage" src={book.coverImage} alt="Cover" />
                                                                    )}
                                                                </div>
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
                                                                <span className="itemKey">Năm xuất bản:</span>
                                                                <span className="itemValue">{book.year ?? 'NULL'}</span>
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
                                                                <span className="itemKey">Thể loại phụ:</span>
                                                                <span className="itemValue">{book.subCategory ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Thể loại chi tiết:</span>
                                                                <span className="itemValue">{book.subSubCategory ?? 'NULL'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Giá:</span>
                                                                <span className="itemValue">{book.price ?? '0'}</span>
                                                            </div>
                                                            <div className="detailItem">
                                                                <span className="itemKey">Độ mới:</span>
                                                                <span className="itemValue">{book.newPercent ?? 'NULL'}</span>
                                                            </div>
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

export default ViewBook;