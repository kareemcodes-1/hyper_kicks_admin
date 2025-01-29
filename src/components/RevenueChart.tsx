

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RevenueChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/orders/sales/month`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setChartData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="rounded-[1rem] shadow-md border p-[.5rem]">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        className="w-full h-full"
        data={chartData} // Pass the updated chart data
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        {/* XAxis uses "name" for month */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* Line uses "sales" for the sales value */}
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
  );
};

export default RevenueChart;
