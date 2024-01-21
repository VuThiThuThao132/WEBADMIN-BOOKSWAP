import "./editPost.scss";
import React, { useState, useEffect } from "react";
import { storage } from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const EditBook = ({ bookId, bookData, onSave, onClose }) => {
    const [editedData, setEditedData] = useState({
        title: "",
        description: "",
        publisher: "",
        year: "",
        isbn: "",
        language: "",
        pageCount: "",
        authors: [""],
        image: [""],
        coverImage: "",
        category: "",  // Update field name to 'category'
        subCategory: "",  // Update field name to 'subCategory'
        subSubCategory: "",  // Update field name to 'subSubCategory'
        newPercent: "",
    });

    useEffect(() => {
        if (bookData) {
            const {
                title,
                description,
                publisher,
                year,
                isbn,
                language,
                pageCount,
                authors,
                image,
                coverImage,
                mainCategory,  // Update field name to 'mainCategory'
                subCategory,
                subSubCategory,
                newPercent,
            } = bookData;

            setEditedData(prevData => ({
                ...prevData,
                title: title || '',
                description: description || '',
                publisher: publisher || '',
                year: year || '',
                isbn: isbn || '',
                language: language || '',
                pageCount: pageCount || '',
                authors: authors || '',
                image: image || '',
                coverImage: coverImage || '',
                category: mainCategory || '',  // Update field name to 'mainCategory'
                subCategory: subCategory || '',
                subSubCategory: subSubCategory || '',
                newPercent: newPercent || '',

            }));
        }
    }, [bookData]);
    console.log("editedData in EditBook:", editedData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: name === 'authors' ? value.split('\n') : value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedData);
    };
    // const handleFileChange = async (e, fieldName) => {
    //     const file = e.target.files[0];

    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             // setEditedData({ ...editedData, [fieldName]: e.target.result });
    //             const uniqueID = Date.now().toString(36) + Math.random().toString(36).substring(2);
    //             const filename = `image_${uniqueID}.jpg`;
    //             const reference = storage().ref(filename);
    //             console.log("onLoad", e.currentTarget.result)
    //             reference.putFile(e.target.result)
    //             const downloadURL = reference.getDownloadURL();
    //             console.log("downloadURL", downloadURL)
    //         };
    //         reader.readAsDataURL(file);
    //         console.log("readAsDataURL", e)

    //     }
    // };
    const handleFileChange = async (e, fieldName) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const uniqueID = Date.now().toString(36) + Math.random().toString(36).substring(2);
                const filename = `image_${uniqueID}.jpg`;
                const storageRef = ref(storage, filename);

                // Convert data URL to a Blob
                const blob = await fetch(e.target.result).then((res) => res.blob());

                // Upload the file
                await uploadBytes(storageRef, blob);

                // Get the download URL
                const downloadURL = await getDownloadURL(storageRef);
                console.log('downloadURL', downloadURL)
                setEditedData({ ...editedData, [fieldName]: downloadURL });

                // Now, you can use the downloadURL as needed (e.g., save it in your state)
            };

            reader.readAsDataURL(file);
        }
    };
    const handleSave = () => {
        const dataToSave = {
            title: editedData.title,
            description: editedData.description,
            publisher: editedData.publisher,
            year: editedData.year,
            isbn: editedData.isbn,
            language: editedData.language,
            pageCount: editedData.pageCount,
            authors: editedData.authors,
            image: editedData.image,
            coverImage: editedData.coverImage,
            category: editedData.category,
            subCategory: editedData.subCategory,
            newPercent: editedData.newPercent,
            subSubCategory: editedData.subSubCategory !== "" ? editedData.subSubCategory : null
        };

        console.log("Data to save:", dataToSave);

        onSave(dataToSave)
            .then(response => {
                console.log('Book updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating book:', error);
            });
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
                        <label htmlFor="imageUrls">Ảnh:</label>
                        <input
                            type="file"
                            id="imageUrls"
                            name="imageUrls"
                            onChange={(e) => handleFileChange(e, "imageUrls")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="coverImage">Ảnh bìa:</label>
                        <input
                            type="file"
                            id="coverImage"
                            name="coverImage"
                            onChange={(e) => handleFileChange(e, "coverImage")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Tên sách:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={editedData.title}
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
                        <label htmlFor="publisher">Nhà xuất bản:</label>
                        <input
                            type="text"
                            id="publisher"
                            name="publisher"
                            value={editedData.publisher}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Năm xuất bản:</label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            value={editedData.year}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isbn">ISBN:</label>
                        <input
                            type="text"
                            id="isbn"
                            name="isbn"
                            value={editedData.isbn}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="language">Ngôn ngữ:</label>
                        <input
                            type="text"
                            id="language"
                            name="language"
                            value={editedData.language}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pageCount">Số trang:</label>
                        <input
                            type="text"
                            id="pageCount"
                            name="pageCount"
                            value={editedData.pageCount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="authors">Tác giả:</label>
                        <input
                            type="text"
                            id="authors"
                            name="authors"
                            value={editedData.authors.join('\n')}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Thể loại chính:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={editedData.category}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subCategory">Thể loại phụ:</label>
                        <input
                            type="text"
                            id="subCategory"
                            name="subCategory"
                            value={editedData.subCategory}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subSubCategory">Thể loại chi tiết:</label>
                        <input
                            type="text"
                            id="subSubCategory"
                            name="subSubCategory"
                            value={editedData.subSubCategory}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPercent">Độ mới:</label>
                        <input
                            type="text"
                            id="newPercent"
                            name="newPercent"
                            value={editedData.newPercent}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={handleSave}>Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBook;
