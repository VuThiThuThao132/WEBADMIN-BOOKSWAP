import React, { useState, useEffect } from "react";
import "./editPost.scss";

const EditPost = ({ postId, postData, onSave, onClose }) => {
    const [editedData, setEditedData] = useState({
        caption: '',
        description: '',
        exchangeMethod: '',
        city: '',
        district: '',
        bookPriceDTOS: [
            {
                price: '',
                bookPriceId: ''
            }
        ]
    });

    useEffect(() => {
        if (postData) {
            const {
                caption,
                description,
                city,
                district,
                exchangeMethod,
                bookDTOS
            } = postData;

            const editedBookPriceDTOS = bookDTOS.map(book => ({
                price: book.price || '',
                bookPriceId: book.id || ''
            }));
            setEditedData(prevData => ({
                ...prevData,
                caption: caption || '',
                description: description || '',
                exchangeMethod: exchangeMethod || '',
                city: city || '',
                district: district || '',
                bookPriceDTOS: editedBookPriceDTOS.length > 0
                    ? editedBookPriceDTOS
                    : [{ price: '', bookPriceId: '' }]
            }));
        }
    }, [postData]);
    console.log("editedData in EditPost:", editedData);
    console.log("Price:", editedData.bookPriceDTOS[0]?.price);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePriceChange = (e, index) => {
        const newPrice = e.target.value;
        setEditedData(prevState => ({
            ...prevState,
            bookPriceDTOS: prevState.bookPriceDTOS.map((bookPrice, i) => {
                if (i === index) {
                    return {
                        ...bookPrice,
                        price: newPrice
                    };
                }
                return bookPrice;
            })
        }));
    };

    const handleBookPriceIdChange = (e, index) => {
        const newBookPriceId = e.target.value;
        setEditedData(prevState => ({
            ...prevState,
            bookPriceDTOS: prevState.bookPriceDTOS.map((bookPrice, i) => {
                if (i === index) {
                    return {
                        ...bookPrice,
                        bookPriceId: newBookPriceId
                    };
                }
                return bookPrice;
            })
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedData);
    };
    const handleSave = () => {
        const dataToSave = {
            caption: editedData.caption,
            description: editedData.description,
            exchangeMethod: editedData.exchangeMethod,
            city: editedData.city,
            district: editedData.district,
            bookPriceDTOS: [
                {
                    price: editedData.bookPriceDTOS[0].price,
                    bookPriceId: editedData.bookPriceDTOS[0].bookPriceId
                }
            ]
        };

        onSave(dataToSave);
    };

    return (
        <div className="edit-post-modal">
            <div className="modal-content">
                <header className="modal-header">
                    <span className="close" onClick={onClose} >&times;</span>
                    <h2>Chỉnh sửa</h2>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="caption">Đầu đề:</label>
                        <input
                            type="text"
                            id="caption"
                            name="caption"
                            value={editedData.caption}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Mô tả:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={editedData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exchangeMethod">Phương thức trao đổi:</label>
                        <input
                            type="text"
                            id="exchangeMethod"
                            name="exchangeMethod"
                            value={editedData.exchangeMethod}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Thành phố:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={editedData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="district">Quận/Huyện:</label>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            value={editedData.district}
                            onChange={handleChange}
                        />
                    </div>

                    {editedData.bookPriceDTOS.map((bookPrice, index) => (
                        <div key={index}>
                            <div className="form-group">
                                <label htmlFor={`price${index}`}>Giá sách:</label>
                                <input
                                    type="text"
                                    id={`price${index}`}
                                    name={`price${index}`}
                                    value={editedData.bookPriceDTOS[index]?.price !== '' ? editedData.bookPriceDTOS[index]?.price : (postData && postData.bookDTOS[index]?.price) !== '' ? postData.bookDTOS[index]?.price : ''}
                                    onChange={(e) => handlePriceChange(e, index)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`bookPriceId${index}`}>ID giá sách:</label>
                                <input
                                    type="text"
                                    id={`bookPriceId${index}`}
                                    name={`bookPriceId${index}`}
                                    value={editedData.bookPriceDTOS[index]?.bookPriceId || ''}
                                    onChange={(e) => handleBookPriceIdChange(e, index)}
                                />
                            </div>
                        </div>
                    ))}

                    <div className="form-group">
                        <button type="submit" onClick={handleSave}>Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;
