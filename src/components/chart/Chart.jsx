
import "./chart.scss"
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend, Label } from 'recharts';
import { AreaChart, Area, XAxis, CartesianGrid } from 'recharts';
// const orderData = [
//   { name: "Processing", value: 400, color: "#FF8042" },
//   { name: "Shipped", value: 300, color: "#00C49F" },
//   { name: "Delivered", value: 300, color: "#0088FE" },
//   { name: "Cancelled", value: 100, color: "#FF0000" }
// ];

// const revenueData = [
//   { name: "Exchange", value: 2100, color: "#FF8042" },
//   { name: "Shipp", value: 820, color: "#0088FE" },
// ];

// export const Chart = ({ aspect, title }) => {
//   return (
//     <div className='chart'>
//       <div className="title">{title}</div>
//       <ResponsiveContainer width="100%" aspect={aspect}>
//         <div className="chart-container">
//           <div className="chart-wrapper">
//             <h2>Order Status</h2>
//             <PieChart width={400} height={250}>
//               <Pie
//                 dataKey="value"
//                 data={orderData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={120}
//                 labelLine={false}
//               >
//                 {orderData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//                 <Label
//                   content={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                   position="inside"
//                   fill="#fff"
//                 />
//               </Pie>
//               <Tooltip />
//               <Legend align="left" verticalAlign="middle" layout="vertical" />
//             </PieChart>
//           </div>
//           <div className="chart-wrapper">
//             <h2>Revenue</h2>
//             <PieChart width={400} height={250}>
//               <Pie
//                 dataKey="value"
//                 data={revenueData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={120}
//                 labelLine={false}
//               >
//                 {revenueData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//                 <Label
//                   content={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                   position="inside"
//                   fill="#fff"
//                 />
//               </Pie>
//               <Tooltip />
//               <Legend align="left" verticalAlign="middle" layout="vertical" />
//             </PieChart>
//           </div>
//         </div>
//       </ResponsiveContainer>
//     </div>
//   )

// }
export const LineChart = ({ aspect, title, data, onChangeDay }) => {
  return (
    <div className='chart'>
      <div className="title">
        {title}
        <select onChange={(e) => onChangeDay(e.target.value)}>
          <option value="14">14 ngày</option>
          <option value="30">30 ngày</option>
          <option value="60">60 ngày</option>
          <option value="90">90 ngày</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart width={730} height={250} data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* <XAxis dataKey="name" stroke="gray" /> */}
          <XAxis dataKey="date" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          {/* <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" /> */}
          <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
