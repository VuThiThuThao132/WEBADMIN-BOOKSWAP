import "./view.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axiosInstance from "../../utils/axiosInstance";

// import Chart from "../../components/chart/Chart";
// import List from "../../components/table/Table";
// import { collection, getDocs } from "firebase/firestore";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase";
// import EditUser from "../edit/EditUser";

const ViewUser = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const requestBody = {
          page: 0,
          size: 6,
          sortBy: 'firstName',
          sortOrder: 'desc',
        };

        const response = await axiosInstance.post(
          'https://bookswapplatform.site/bookswap/api/v1/admin/user/filter',
          requestBody,

        );

        if (response.status === 200) {
          const userData = response.data.data;
          setUserData(userData);
        } else {
          throw new Error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, [userId]);


  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  // const handleCloseModal = () => {
  //   setIsEditing(false);
  // };

  // const handleSave = async (editedUserData) => {
  //   try {
  //     const userDocRef = doc(db, 'users', userId);
  //     await updateDoc(userDocRef, editedUserData);
  //     setUserData(editedUserData);
  //   } catch (error) {
  //     console.error('Error saving edited user data:', error);
  //   } finally {
  //     setIsEditing(false);
  //   }
  // };

  return (
    <div className="view">
      <Sidebar />
      <div className="viewContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to="/users">
              <ArrowBackIcon />
            </Link>

            <h1 >Thông tin chi tiết người dùng</h1>

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
                {userData && (
                  <div className="postItem">
                    {userData.map(user => {
                      if (user.id === userId) {
                        return (
                          <div className="postItem" key={user.id}>
                            <div className="userSection">
                              <h5>Thông tin người dùng</h5>
                              {/* <div className="detailItem">
                                <span className="itemKey">ID: </span>
                                <span className="itemValue">{user.id}</span>
                              </div> */}
                              {user.image && (
                                <div className="detailItem">
                                  <span className="itemKey">Ảnh:</span>
                                  <img src={user.image} alt="User" className="bookImage" />
                                </div>
                              )}
                              <div className="detailItem">
                                <span className="itemKey">Họ:</span>
                                <span className="itemValue">{user.lastName ?? 'NULL'}</span>
                              </div>
                              <div className="detailItem">
                                <span className="itemKey">Tên:</span>
                                <span className="itemValue">{user.firstName ?? 'NULL'}</span>
                              </div>
                              <div className="detailItem">
                                <span className="itemKey">Số ĐT:</span>
                                <span className="itemValue">{user.phoneNum ?? 'NULL'}</span>
                              </div>
                              <div className="detailItem">
                                <span className="itemKey">ID thẻ:</span>
                                <span className="itemValue">{user.idCard ?? 'NULL'}</span>
                              </div>
                              <div className="detailItem">
                                <span className="itemKey">Email:</span>
                                <span className="itemValue">{user.email ?? 'NULL'}</span>
                              </div>
                              <div className="detailItem">
                                <span className="itemKey">ID fireBase:</span>
                                <span className="itemValue">{user.fireBaseId ?? 'NULL'}</span>
                              </div>
                              <div className="detailItem">
                                <span className="itemKey">Ngày sinh:</span>
                                <span className="itemValue">{user.dateOfBirth ?? 'NULL'}</span>
                              </div>
                              <div className="detailItem">
                                <span className="itemKey">Giới tính:</span>
                                <span className="itemValue">{user.gender ?? 'NULL'}</span>
                              </div>
                              <div className="detailItem">
                                <span className="itemKey">Tổng đánh giá:</span>
                                <span className="itemValue">{user.totalRate ?? 'NULL'}</span>
                              </div>
                              <div className="detailItem">
                                <span className="itemKey">Số đánh giá:</span>
                                <span className="itemValue">{user.numOfRate ?? 'NULL'}</span>
                              </div>
                              <div className="detailItem">
                                <span className="itemKey">Vai trò:</span>
                                <span className="itemValue">{user.role ?? 'NULL'}</span>
                              </div>
                              <div className="detailItem">
                                <span className="itemKey">Thông tin ví người dùng:</span>
                              </div>
                              {/* <div className="detailItem">
                                <span className="itemKey">+ ID ví: </span>
                                <span className="itemValue">{user.userWalletDTO.id ?? 'NULL'}</span>

                              </div> */}
                              <div className="detailItem">
                                <span className="itemKey"> Số dư ví:</span>
                                <span className="itemValue">{user.userWalletDTO.balance ?? 'NULL'}</span>
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

export default ViewUser;