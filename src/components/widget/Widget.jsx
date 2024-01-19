import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

const Widget = ({ type }) => {
    const [count, setCount] = useState(null);
    const [diff, setDiff] = useState(null);
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
        case "Thu nhập":
            data = {
                title: "Thu nhập",
                isMoney: true,
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="icon"
                        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                    />
                ),
            };
            break;
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

    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjZjdmODcyNzA5MWU0Yzc3YWE5OTVkYjYwNzQzYjdkZDJiYjcwYjUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVnUgVGhpIFRodSBUaGFvIChLMTUgSENNKSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMYlJ0cUFnMlB4N2ZrX3RLNmVURlpVLVlSVm9UOWZPOG15Mi1YcnVXZUphQT1zOTYtYyIsInJvbGUiOiJST0xFX1VTRVIiLCJhdXRob3JpdHkiOlsiQk9PSzpSRUFEIiwiQk9PSzpDUkVBVEUiLCJCT09LOk1PRElGWSIsIlBST0ZJTEU6TU9ESUZZIiwiQk9PSzpERUxFVEUiLCJQUk9GSUxFOlJFQUQiXSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Jvb2tzd2FwcGxhdGZvcm0iLCJhdWQiOiJib29rc3dhcHBsYXRmb3JtIiwiYXV0aF90aW1lIjoxNzA1NjU0OTkwLCJ1c2VyX2lkIjoiNE1lV2Fac0dPQU9jS2l5NjJkWDZiaUZhQjFJMiIsInN1YiI6IjRNZVdhWnNHT0FPY0tpeTYyZFg2YmlGYUIxSTIiLCJpYXQiOjE3MDU2NTQ5OTAsImV4cCI6MTcwNTY1ODU5MCwiZW1haWwiOiJ0aGFvdnR0c2UxNTAzMTlAZnB0LmVkdS52biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwNzEzOTczNzI5NzQ0MTk5MDEwIl0sImVtYWlsIjpbInRoYW92dHRzZTE1MDMxOUBmcHQuZWR1LnZuIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.F1sAloQgWoV9d7bDcAIdAe1Tdmz1f6JktKz0HQp4EpEvs2cryKmkYcSJNWkxTMJbw1atkgWgpBsBmb8XWA2TyHmw1r3robEEI1qOWQOMARBM008Z58FMyJYhsagReZ9jqO7v_n8dBVl5pHcKTH6c9pRk-czJaHRBwRNF6ptB6t98mfbKFEWqnvtncRuOqsdja0XCwoD85tEgPNPhs1VKEcWwjXmMlQZsbu99L73H7bPRhDalO2AaL6iP0X1QypV2e-KmpXACJZWhsRB_ol69irphjRJHIumEZJ7xBy5CWfuRhHoDBkyU_hVXO90EkYjC-fQv06LVYnWLsRth99iU9w";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://bookswapplatform.site/bookswap/api/v1/admin/object/count`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            type: encodeURIComponent(type),
                        },
                    }
                );

                console.log("API Response:", response.data);

                const { count: newCount, diff: newDiff } = response.data;
                setCount(newCount);
                setDiff(newDiff);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call fetchData directly within useEffect

    }, [type, token]);

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && "$"} {count}
                </span>
            </div>
            <div className="right">
                <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
                    {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
