
import { Area, AreaChart, CartesianGrid,  XAxis, } from "recharts"
 
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"
import { useEffect, useState } from "react"
const chartConfig = {
  desktop: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const RevenueChart = () => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/orders/month`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      })
      .then((res) => res.json())
      .then((data) => setChartData(data))
      .catch((err) => console.log(err));
  }, [])

  return (
    <div className=" rounded-[1rem] shadow-md border p-[.5rem]">
       <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)} 
          />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="totalOrders"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>

        {/* <ResponsiveContainer width="100%" height={300}>
      <LineChart className='w-full h-full' data={chartData} margin={{ top: 5, right:20, bottom: 5, left:0 }}>
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer> */}
    </div>
  )
}

export default RevenueChart
