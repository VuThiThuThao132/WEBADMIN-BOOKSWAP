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
  const [statisRevenue, setStatisRevenue] = useState();
  const [DaysRevenue, setDaysRevenue] = useState(14);

  useEffect(() => {
    getStatis(DaysPost, 'POST', setStatisPost);
    getStatis(DaysUser, 'USER', setStatisUSER);
    getStatis(DaysOrders, 'ORDERS', setStatisORDERS);
    getStatis(DaysBook, 'BOOK', setStatisBOOK);
    getStatis(DaysRevenue, 'REVENUE', setStatisRevenue);
  }, [DaysPost, DaysUser, DaysOrders, DaysBook, DaysRevenue]);

  const getStatis = async (days, object, setState) => {
    const url = `https://bookswapplatform.site/bookswap/api/v1/admin/post/statistical`;
    const revenueUrl = `https://bookswapplatform.site/bookswap/api/v1/admin/statistic/revenue`;

    try {
      const [data, revenueData] = await Promise.all([
        axiosInstance.get(url, { params: { days, object } }),
        axiosInstance.get(revenueUrl, { params: { days } })
      ]);

      // Map revenueData to match the expected structure
      const mappedRevenueData = revenueData.data.data.map(item => ({
        date: item.date,
        count: item.money, // Assuming "money" is the value you want for the chart
      }));

      setState(data.data.data);
      setStatisRevenue(mappedRevenueData);
    } catch (err) {
      console.error('Fail to fetch Static', err);
      throw err;
    }
  };
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
          {/* <Widget type="Thu nhập" /> */}
        </div>

        <div className="lineChart">
          <LineChart title={`Thống kê ${DaysPost} ngày (Bài đăng)`} data={statisPost} aspect={2 / 1} onChangeDay={setDaysPost} />
          <LineChart title={`Thống kê ${DaysUser} ngày (Người dùng)`} data={statisUSER} aspect={2 / 1} onChangeDay={setDaysUser} />
        </div>
        <div className="lineChart">
          <LineChart title={`Thống kê ${DaysOrders} ngày (Đơn hàng)`} data={statisORDERS} aspect={2 / 1} onChangeDay={setDaysOrders} />
          <LineChart title={`Thống kê ${DaysBook} ngày (Sách)`} data={statisBOOK} aspect={2 / 1} onChangeDay={setDaysBook} />

        </div>
        <div className="lineChart">

          <LineChart title={`Thống kê ${DaysRevenue} ngày (Doanh thu)`} data={statisRevenue} aspect={2 / 1} onChangeDay={setDaysRevenue} />

        </div>
      </div>
    </div>
  );
};

export default Home;