import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const Widget = ({ type }) => {
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);
    let data;

    switch (type) {
        case "Người dùng":
            data = {
                title: "Người dùng",
                isMoney: false,
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "Đơn hàng":
            data = {
                title: "Đơn hàng",
                isMoney: false,
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "Bài đăng":
            data = {
                title: "Bài đăng",
                isMoney: false,
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        // case "Thu nhập":
        //     data = {
        //         title: "Thu nhập",
        //         isMoney: true,
        //         icon: (
        //             <MonetizationOnOutlinedIcon
        //                 className="icon"
        //                 style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
        //             />
        //         ),
        //     };
        //     break;
        case "Sách":
            data = {
                title: "Sách",
                icon: (
                    <AccountBalanceWalletOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    const getCount = async (object) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(
                `https://bookswapplatform.site/bookswap/api/v1/admin/object/count?object=${object}`
            );
            const responseData = response.data;

            console.log(`${type} count:`, responseData.data);
            setCount(responseData.data);
            setLoading(false);
        } catch (error) {
            console.error(`Error fetching ${type} count:`, error);
            setLoading(false);
            throw error;
        }
    };



    useEffect(() => {
        switch (type) {
            case "Người dùng":
                getCount("USER");
                break;
            case "Đơn hàng":
                getCount("ORDERS");
                break;
            case "Bài đăng":
                getCount("POST");
                break;
            // case "Thu nhập":
            //     getCount("ORDERS");
            //     break;
            case "Sách":
                getCount("BOOK");
                break;
            default:
                break;
        }
    }, [type]);

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {loading ? "Loading..." : data.isMoney ? `$ ${count}` : count}
                </span>
            </div>
            <div className="right">
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
