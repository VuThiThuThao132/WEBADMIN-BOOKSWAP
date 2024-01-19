import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddCategory.scss";
import axiosInstance from "../../../../utils/axiosInstance";

const AddSubSubCategory = ({ onClose, onAddSubSubCategory }) => {
    const [subCategoryName, setSubCategoryName] = useState("");
    const [subSubCategoryNames, setSubSubCategoryNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const handleAddSubSubCategory = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();
            params.append("subCategoryName", subCategoryName);
            subSubCategoryNames.forEach((subSubCategory) => {
                params.append("subSubCategoryNames", subSubCategory.trim());
            });
            console.log("SubCategoryName:", subCategoryName);

            console.log("setSubCategoryName", setSubCategoryName);
            const response = await axiosInstance.post(
                "https://bookswapplatform.site/bookswap/api/v1/admin/sub-sub-category/add",
                params.toString(),

            );

            onAddSubSubCategory(response.data);
            onClose();
        } catch (error) {
            console.error("Error adding sub-sub-category:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleSubSubCategoryChange = (index, value) => {
        const newSubSubCategoryNames = [...subSubCategoryNames];
        newSubSubCategoryNames[index] = value;
        setSubSubCategoryNames(newSubSubCategoryNames);
    };

    const addSubSubCategory = () => {
        setSubSubCategoryNames([...subSubCategoryNames, ""]);
    };

    const removeSubSubCategory = (index) => {
        const newSubSubCategoryNames = subSubCategoryNames.filter((_, i) => i !== index);
        setSubSubCategoryNames(newSubSubCategoryNames);
    };

    useEffect(() => {
        fetchSubCategories();
    }, []);

    const fetchSubCategories = async () => {
        try {
            const response = await axiosInstance.get(
                "https://bookswapplatform.site/bookswap/api/v1/category/all/sub-category",

            );
            if (Array.isArray(response.data.data)) {
                setSubCategories(response.data.data);
            } else {
                console.error("Invalid response format for sub-categories:", response.data);
            }
        } catch (error) {
            console.error("Error fetching sub-categories:", error);
        }
    };



    return (
        <div className="add-category">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>
                    &times;
                </span>
                <div>
                    <label style={{ marginTop: "10px,", fontSize: "20px", fontWeight: "600" }}>Thể loại phụ:</label>
                    <select style={{ width: "360px", height: "40px" }}
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                    >
                        <option value="" disabled>Chọn thể loại phụ</option>
                        {subCategories.map((subCategory) => (
                            <option key={subCategory.id} value={subCategory.id}>
                                {subCategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label style={{ marginTop: "15px", fontSize: "20px", fontWeight: "600" }}>Thể loại chi tiết:</label>
                    <button onClick={addSubSubCategory} className="AddsubCategory">
                        +
                    </button>
                    {subSubCategoryNames.map((subSubCategory, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={subSubCategory}
                                onChange={(e) => handleSubSubCategoryChange(index, e.target.value)}
                            />
                            <button onClick={() => removeSubSubCategory(index)} className="RemovesubCategory">
                                -
                            </button>
                        </div>
                    ))}

                </div>
                <button style={{ marginTop: "10px" }} onClick={handleAddSubSubCategory} disabled={loading}>
                    {loading ? "Adding..." : "Thêm"}
                </button>
            </div>
        </div>
    );
};

export default AddSubSubCategory;
