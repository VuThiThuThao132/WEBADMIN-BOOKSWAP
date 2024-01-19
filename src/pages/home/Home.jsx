import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";

import { LineChart } from "../../components/chart/Chart";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
const Home = () => {
  const [statisPost, setStatisPost] = useState();
  const [statisUSER, setStatisUSER] = useState();
  const [statisORDERS, setStatisORDERS] = useState();
  const [statisBOOK, setStatisBOOK] = useState();
  const [DaysPost, setDaysPost] = useState(14);
  const [DaysUser, setDaysUser] = useState(14);
  const [DaysOrders, setDaysOrders] = useState(14);
  const [DaysBook, setDaysBook] = useState(14);

  useEffect(() => {
    getStatis(DaysPost, 'POST', setStatisPost)
    getStatis(DaysUser, 'USER', setStatisUSER)
    getStatis(DaysOrders, 'ORDERS', setStatisORDERS)
    getStatis(DaysBook, 'BOOK', setStatisBOOK)
  }, [DaysPost, DaysUser, DaysOrders, DaysBook])

  const getStatis = async (days, object, setState) => {
    const url = `https://bookswapplatform.site/bookswap/api/v1/admin/post/statistical`
    return await axiosInstance.get(url, {
      params: {
        days: days,
        object: object
      }
    })
      .then(response => setState(response.data.data))
      .catch(err => {
        console.error('Fail to fetch Static', err)
        throw err
      })
  }
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="Người dùng" />
          <Widget type="Sách" />
          <Widget type="Bài đăng" />
          <Widget type="Đơn hàng" />
          <Widget type="Thu nhập" />
        </div>

        <div className="lineChart">
          <LineChart title={`Thống kê ${DaysPost} ngày (POST)`} data={statisPost} aspect={2 / 1} onChangeDay={setDaysPost} />
          <LineChart title={`Thống kê ${DaysUser} ngày (USER)`} data={statisUSER} aspect={2 / 1} onChangeDay={setDaysUser} />
        </div>
        <div className="lineChart">
          <LineChart title={`Thống kê ${DaysOrders} ngày (ORDERS)`} data={statisORDERS} aspect={2 / 1} onChangeDay={setDaysOrders} />
          <LineChart title={`Thống kê ${DaysBook} ngày (BOOK)`} data={statisBOOK} aspect={2 / 1} onChangeDay={setDaysBook} />
        </div>

      </div>
    </div>
  );
};

export default Home;