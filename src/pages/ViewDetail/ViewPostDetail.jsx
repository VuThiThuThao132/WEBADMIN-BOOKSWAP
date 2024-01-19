import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./viewPost.scss";

const ViewPostDetail = () => {
    const { postId } = useParams(); // Lấy postId từ URL
    const [postData, setPostData] = useState(null);

    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVnUgVGhpIFRodSBUaGFvIChLMTUgSENNKSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMYlJ0cUFnMlB4N2ZrX3RLNmVURlpVLVlSVm9UOWZPOG15Mi1YcnVXZUphQT1zOTYtYyIsInJvbGUiOiJST0xFX1VTRVIiLCJhdXRob3JpdHkiOlsiQk9PSzpSRUFEIiwiQk9PSzpDUkVBVEUiLCJCT09LOk1PRElGWSIsIlBST0ZJTEU6TU9ESUZZIiwiQk9PSzpERUxFVEUiLCJQUk9GSUxFOlJFQUQiXSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Jvb2tzd2FwcGxhdGZvcm0iLCJhdWQiOiJib29rc3dhcHBsYXRmb3JtIiwiYXV0aF90aW1lIjoxNzAzNjYzMzYxLCJ1c2VyX2lkIjoiNE1lV2Fac0dPQU9jS2l5NjJkWDZiaUZhQjFJMiIsInN1YiI6IjRNZVdhWnNHT0FPY0tpeTYyZFg2YmlGYUIxSTIiLCJpYXQiOjE3MDM2NjMzNjEsImV4cCI6MTcwMzY2Njk2MSwiZW1haWwiOiJ0aGFvdnR0c2UxNTAzMTlAZnB0LmVkdS52biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwNzEzOTczNzI5NzQ0MTk5MDEwIl0sImVtYWlsIjpbInRoYW92dHRzZTE1MDMxOUBmcHQuZWR1LnZuIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.acoA255b1GRbpIwy7FWQypQWFxIEeuoGCF20HbkCJJ8AgxxUhb7at8NA5M07YSPNuBWWixxu1hdArEv7Ujj-dcGovJm4FleZzwhGr28TaFNg3UMLJXtxb69Hl92FWRSt3Oqg4RkL_d3kbFNILQq67obIiHvxP3IbPvFJkicySvIkjouIdtFQuFMsaekplLw4xkQ0aGV5TzYGEm4bydIWz_P24vunfY1sqgjZdLvzODUcvPHr8OWqScl9aj1gprUElLb6CJH_Nmr0GYMnEA7RD_3RlT_5eHPumKAvp5JAfgQ023u-BcdH7ieBsOxuQeivK1195wvtTUakkHjm_jNfXQ";

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const requestBody = {
                    page: 0,
                    size: 6,
                    sortBy: 'views',
                    sortOrder: 'desc',
                };

                const response = await axios.post(
                    'https://bookswapplatform.site/bookswap/api/v1/post/filter',
                    requestBody,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
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
    }, [postId, token]);

    console.log("postId:", postId);
    console.log("postData from API:", postData);

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top-view">
                    <div className="left-view ">
                        <h1 className="title">View post detail</h1>
                        <div className="item">
                            <div className="details">
                                {postData && (
                                    <div className="postItem">
                                        {postData.map(post => {
                                            if (post.id === postId) {
                                                return (
                                                    <div className="postItem" key={post.id}>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Caption:</span>
                                                            <span className="itemValue">{post.caption ?? 'NULL'}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Description:</span>
                                                            <span className="itemValue">{post.description ?? 'NULL'}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">City:</span>
                                                            <span className="itemValue">{post.city ?? 'NULL'}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">District:</span>
                                                            <span className="itemValue">{post.district ?? 'NULL'}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Category:</span>
                                                            <span className="itemValue">{post.bookDTOS[0].mainCategory !== null ? post.bookDTOS[0].mainCategory : 'NULL'}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">SubCategory:</span>
                                                            <span className="itemValue">{post.bookDTOS[0].subCategory !== null ? post.bookDTOS[0].subCategory : 'NULL'}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">SubSubCategory:</span>
                                                            <span className="itemValue">{post.bookDTOS[0].subSubCategory !== null ? post.bookDTOS[0].subSubCategory : 'NULL'}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Publisher:</span>
                                                            <span className="itemValue">{post.bookDTOS[0].publisher !== null ? post.bookDTOS[0].publisher : 'NULL'}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Published Date:</span>
                                                            <span className="itemValue">{post.bookDTOS[0].publishedDate !== null ? post.bookDTOS[0].publishedDate : 'NULL'}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Authors:</span>
                                                            <span className="itemValue">
                                                                {post.bookDTOS[0].authors !== null && post.bookDTOS[0].authors !== undefined
                                                                    ? post.bookDTOS[0].authors.join(', ')
                                                                    : 'NULL'
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Language:</span>
                                                            <span className="itemValue">{post.bookDTOS[0].language !== null ? post.bookDTOS[0].language : 'NULL'}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Exchange Method:</span>
                                                            <span className="itemValue">{post.exchangeMethod ?? 'NULL'}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Book Prices:</span>
                                                            <div className="itemValue">
                                                                {post.bookDTOS.map(book => (
                                                                    <div key={book.id} className="bookDetails">
                                                                        <div className="priceInfo">
                                                                            <span className="itemKey">+ Price: </span>
                                                                            <span className="itemValue">{book.price}  </span>
                                                                            <span className="itemKey">/ ID: </span>
                                                                            <span className="itemValue">{book.id}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
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

export default ViewPostDetail;