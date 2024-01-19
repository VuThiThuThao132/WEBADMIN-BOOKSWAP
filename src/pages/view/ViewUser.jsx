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
  const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjZjdmODcyNzA5MWU0Yzc3YWE5OTVkYjYwNzQzYjdkZDJiYjcwYjUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVnUgVGhpIFRodSBUaGFvIChLMTUgSENNKSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMYlJ0cUFnMlB4N2ZrX3RLNmVURlpVLVlSVm9UOWZPOG15Mi1YcnVXZUphQT1zOTYtYyIsInJvbGUiOiJST0xFX1VTRVIiLCJhdXRob3JpdHkiOlsiQk9PSzpSRUFEIiwiQk9PSzpDUkVBVEUiLCJCT09LOk1PRElGWSIsIlBST0ZJTEU6TU9ESUZZIiwiQk9PSzpERUxFVEUiLCJQUk9GSUxFOlJFQUQiXSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Jvb2tzd2FwcGxhdGZvcm0iLCJhdWQiOiJib29rc3dhcHBsYXRmb3JtIiwiYXV0aF90aW1lIjoxNzA1NDE1MjE5LCJ1c2VyX2lkIjoiNE1lV2Fac0dPQU9jS2l5NjJkWDZiaUZhQjFJMiIsInN1YiI6IjRNZVdhWnNHT0FPY0tpeTYyZFg2YmlGYUIxSTIiLCJpYXQiOjE3MDU0MTUyMTksImV4cCI6MTcwNTQxODgxOSwiZW1haWwiOiJ0aGFvdnR0c2UxNTAzMTlAZnB0LmVkdS52biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwNzEzOTczNzI5NzQ0MTk5MDEwIl0sImVtYWlsIjpbInRoYW92dHRzZTE1MDMxOUBmcHQuZWR1LnZuIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.I5fnMJqrCsiis69rCVGA0GN6VorsbOM718N21JKrey-k7tkhHLbm_HLiUMw9zuyq9E3EzgwJbbzvmDX_dqO2zXwW6vNXslT6A0trtQDxmCKUHIPM5esEHACagnWhlbzAExrSgOkD2P3IhmC2mJpv6t1tCRe1Kz57Ks1PI9WrtynhnX4x1fCRxMryPnax8lgT7TEtmUw3WIZYZUqa6sBI9uQY3-dMsztmp1QWrQZ_Z5Pjtuxn3GUArbU2-Ximhic2fjwDnTKsXyUCaQWiWi0ji2VrXtHKZ15ftDtPy3eGMluHjO8hnBmbjr2zjpPkKuMIC2bgOu3ufuRH0tpEHRV55Q";

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
            <Link to="/orders">
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
                              <div className="detailItem">
                                <span className="itemKey">ID: </span>
                                <span className="itemValue">{user.id}</span>
                              </div>
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
                              <div className="detailItem">
                                <span className="itemKey">+ ID ví: </span>
                                <span className="itemValue">{user.userWalletDTO.id ?? 'NULL'}</span>

                              </div>
                              <div className="detailItem">
                                <span className="itemKey">+ Số dư ví:</span>
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