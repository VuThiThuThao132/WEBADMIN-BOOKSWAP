import React, { useState } from "react";
import axios from "axios";
import "./AddCategory.scss";
import axiosInstance from "../../../../utils/axiosInstance";


const AddCategory = ({ onClose, onAddCategory }) => {
    const [category, setCategory] = useState("");
    const [subCategories, setSubCategories] = useState([""]);


    const handleAddSubCategory = () => {
        setSubCategories((prevSubCategories) => [...prevSubCategories, ""]);
    };

    const handleSubCategoryChange = (index, value) => {
        setSubCategories((prevSubCategories) => {
            const newSubCategories = [...prevSubCategories];
            newSubCategories[index] = value;
            return newSubCategories;
        });
    };
    const handleRemoveSubCategory = (index) => {
        if (subCategories.length > 1) {
            setSubCategories((prevSubCategories) => {
                const newSubCategories = [...prevSubCategories];
                newSubCategories.splice(index, 1);
                return newSubCategories;
            });
        }
    };
    const handleSubmit = async () => {
        try {
            // Check if the category is empty
            if (!category.trim()) {
                alert("Please enter a category name.");
                return;
            }

            const response = await axiosInstance.post(
                "https://bookswapplatform.site/bookswap/api/v1/admin/category/add",
                {
                    category: category,
                    subCategory: subCategories.filter((sub) => sub.trim() !== ""),
                },

            );

            console.log("Response data:", response.data);
            console.log("Category:", category);
            console.log("subCategory", subCategories)

            const newCategory = response.data.data;
            onAddCategory(newCategory);

            onClose();
        } catch (error) {
            console.error("Error adding category:", error);

            if (error.response && error.response.data && error.response.data.message) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("Error adding category. Please try again.");
            }
        }
    };


    return (
        <div className="add-category">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>
                    &times;
                </span>
                <label style={{ marginTop: "15px", fontSize: "20px", fontWeight: "600" }}>Thể loại chính:</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <label style={{ marginTop: "10px", fontSize: "20px", fontWeight: "600" }} >Thể loại phụ:</label>
                <button onClick={handleAddSubCategory} className="AddsubCategory">
                    +
                </button>

                {subCategories.map((sub, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={sub}
                            onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                        />
                        <button style={{ backgroundColor: "#757575" }} onClick={() => handleRemoveSubCategory(index)} className="RemoveSubCategory">
                            -
                        </button>
                    </div>
                ))}

                <button style={{ marginTop: "10px" }} onClick={handleSubmit}>Thêm</button>
            </div>
        </div>
    );
};

export default AddCategory;