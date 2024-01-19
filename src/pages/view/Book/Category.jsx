import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import AddCategory from "./Add/AddCategory";
import AddSubSubCategory from "./Add/AddSubSubCategory";
import axiosInstance from "../../../utils/axiosInstance";

const Category = () => {
  const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSubSubCategoryPopup, setShowSubSubCategoryPopup] = useState(false);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(
          "https://bookswapplatform.site/bookswap/api/v1/category/all",

        );
        console.log("API Response:", response.data); // Log the entire response

        setCategories(response.data.data);
        // setLoading(false);
      } catch (error) {
        // setError("Error fetching categories. Please try again.");
        // setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // const subSubCategoriesList = (category) => {
  //   const subCategoriesDTOS = category.subCategoriesDTOS || [];

  //   const subSubCategories = subCategoriesDTOS.reduce(
  //     (acc, subCategory) => acc.concat(subCategory.subSubCategoriesDTOS || []),
  //     []
  //   );

  //   console.log('subSubCategories:', subSubCategories.length > 0 ? subSubCategories[0]?.name : 'No subSubCategories');

  //   return subSubCategories.length > 0 ? (
  //     <>
  //       {subSubCategories.map((subSubCategory) => (
  //         <p key={subSubCategory.id}>{subSubCategory?.name}</p>
  //       ))}
  //     </>
  //   ) : (
  //     <p>Không có thể loại chi tiết</p>
  //   );
  // };
  const subSubCategoriesList = (category) => {
    const subCategoriesDTOS = category.subCategoriesDTOS || [];
    const subSubCategories = subCategoriesDTOS.reduce(
      (acc, subCategory) => acc.concat(subCategory.subSubCategoriesDTOS || []),
      []
    );

    return subSubCategories.length > 0
      ? subSubCategories.map((subSubCategory) => subSubCategory?.name).join(', ')
      : 'Không có thể loại chi tiết';
  };


  const categoryColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'category', headerName: 'Thể loại chính', width: 200 },
    { field: 'subCategory', headerName: 'Thể loại phụ', width: 500 },
    // {
    //   field: 'subSubCategory',
    //   headerName: 'Thể loại chi tiết',
    //   width: 200,
    //   renderCell: (params) => <div>{subSubCategoriesList(params.row)}</div>,
    // },
    {
      field: 'subSubCategory',
      headerName: 'Thể loại chi tiết',
      width: 200,
    },
  ];

  const rows = categories.map((category) => ({
    id: category.id,
    category: category.name,
    subCategory:
      category.subCategoriesDTOS && category.subCategoriesDTOS.length > 0
        ? category.subCategoriesDTOS.map((subCategory) => subCategory.name).join(', ')
        : 'Không có thể loại phụ',
    subSubCategory: subSubCategoriesList(category),
  }));

  return (
    <div className="view">
      <Sidebar />
      <div className="viewContainer">
        <Navbar />
        <div className="left">
          <div className="category-page">
            <Link to="/category" style={{ textDecoration: "none" }}></Link>

            <div className="datatable">
              <div className="datatableTitle">
                THỂ LOẠI
              </div>
              <button onClick={() => setShowPopup(true)} className="AddCategory" style={{ backgroundColor: "red" }}>
                Thêm thể loại
              </button>
              <button onClick={() => setShowSubSubCategoryPopup(true)} className="AddSubSubCategory" style={{ backgroundColor: "#424242", marginLeft: "10px" }}>
                Thêm thể loại chi tiết
              </button>
              <DataGrid
                className="datagrid"
                columns={categoryColumns}
                rows={rows}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
              />
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <AddCategory
          onClose={() => setShowPopup(false)}
          onAddCategory={(newCategory) => {
            console.log("New category added:", newCategory);
          }}
        />
      )}
      {showSubSubCategoryPopup && (
        <AddSubSubCategory
          onClose={() => setShowSubSubCategoryPopup(false)}
          onAddSubSubCategory={(newSubSubCategory) => {
            console.log("New sub-sub-category added:", newSubSubCategory);
          }}
        />
      )}
    </div>
  );
};

export default Category;
