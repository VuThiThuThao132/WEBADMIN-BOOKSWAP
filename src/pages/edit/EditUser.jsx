import React, { useState } from "react";
import "./editPost.scss";

const EditUser = ({ userData, onClose, onSave }) => {
    const [editedUserData, setEditedUserData] = useState(userData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({ ...editedUserData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedUserData);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setEditedUserData({ ...editedUserData, img: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="edit-user-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Edit user</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={editedUserData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="img">Image:</label>
                        <label htmlFor="file-upload" className="custom-file-upload"></label>
                        <input
                            id="file-upload"
                            type="file"
                            name="img"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {editedUserData.img && (
                            <img
                                src={editedUserData.img}
                                alt="Preview"
                                className="preview-image"
                            />
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={editedUserData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <input
                            type="text"
                            id="gender"
                            name="gender"
                            value={editedUserData.gender}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input
                            type="text"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={editedUserData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="IdCard">ID Card:</label>
                        <input
                            type="text"
                            id="IdCard"
                            name="IdCard"
                            value={editedUserData.IdCard}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
