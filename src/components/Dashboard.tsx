import { useEffect, useState, } from "react";
import RevenueChart from "./RevenueChart";
import { CurrencyDollarIcon, PresentationChartLineIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useStore } from "../store/store";
import { formatCurrency } from "../lib/formatCurrency";

type OrderByMonth = {
  month: string;
  totalOrders: number;
}

const Dashboard = () => {

  const {products, setProducts, customers, setCustomers, orders, setOrders} = useStore();

  const {adminInfo} = useStore();
  const [ordersMonthData, setOrdersMonthData] = useState<OrderByMonth[]>([]);

  useEffect(() => {
      const productsPromise = fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const customersPromise = fetch(`${import.meta.env.VITE_SERVER_URL}/api/customers`, {
        method: "GET",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const ordersPromise = fetch(`${import.meta.env.VITE_SERVER_URL}/api/orders`, {
        method: "GET",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const ordersMonthPromise =  fetch(`${import.meta.env.VITE_SERVER_URL}/api/orders/month`, {
        method: "GET",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
      });

      Promise.all([productsPromise, customersPromise, ordersPromise, ordersMonthPromise]).then((responses) => {
         return Promise.all(responses.map((res) => res.json()))
         .then(([productsData, customersData, ordersData, ordersMonthData]) => {
          setOrdersMonthData(ordersMonthData);
          setProducts(productsData);
          setCustomers(customersData);
          setOrders(ordersData);
        }).catch((err) => console.log(err));
      })
  }, []);



  const totalOrdersAmount = orders.reduce((prevValue, item) => prevValue + item.totalAmount, 0);
  const currentMonthTotalOrders = ordersMonthData.find((order) => order.month === new Date().toLocaleString('en-US', {month: 'long'}))


  return (
      <div>
      <h1 className="lg:text-[2rem] text-[1.5rem] font-semibold">Welcome back, {adminInfo?.name}</h1>
      <p className="lg:mt-4 mt-2 text-muted-foreground">
        Welcome to your dashboard! Here is what is happening with your store today.
      </p>

        <div className="lg:grid flex flex-col grid-cols-4 gap-[1rem] mt-[2rem]">
            <div className=" shadow-md p-[1rem] rounded-[1rem] border">
                <div className="flex items-center justify-between"><span className="text-[1rem] text-muted-foreground">Total Revenue</span> <CurrencyDollarIcon className="text-muted-foreground w-[1.2rem] h-[1.2rem]"/></div>
                <h1 className="text-[2.3rem] font-semibold">{formatCurrency(totalOrdersAmount)}</h1>
            </div>
            <div className="shadow-md p-[1rem] rounded-[1rem] border">
            <div className="flex items-center justify-between"><span className="text-[1rem] text-muted-foreground">Total Products</span> <PresentationChartLineIcon className="text-muted-foreground w-[1.2rem] h-[1.2rem]"/></div>
                <h1 className="text-[2.3rem] font-semibold">{products.length}</h1>
            </div>

            <div className=" shadow-md p-[1rem] rounded-[1rem] border">
            <div className="flex items-center justify-between"><span className="text-[1rem] text-muted-foreground">Total Customers</span> <UserGroupIcon className="text-muted-foreground w-[1.2rem] h-[1.2rem]"/></div>
                <h1 className="text-[2.3rem] font-semibold">{customers.length}</h1>
            </div>

            <div className="shadow-md p-[1rem] rounded-[1rem] border">
            <div className="flex items-center justify-between"><span className="text-[1rem] text-muted-foreground">Total Orders</span> <UserGroupIcon className="text-muted-foreground w-[1.2rem] h-[1.2rem]"/></div>
                <h1 className="text-[2.3rem] font-semibold">{orders.length}</h1>
            </div>
        </div>

        <div className="mt-[1rem]">
        <h1 className='text-[1.2rem]'>Earnings</h1>
        <div className="lg:grid flex flex-col grid-cols-2 gap-[1rem]">
        <RevenueChart />

        <div className=" rounded-[1rem] shadow-md border p-[1rem]">
            <h1 className="text-[1.2rem] font-semibold">Recent sales</h1>
            {currentMonthTotalOrders !== undefined ? (<p className="text-muted-foreground pt-[.2rem]">You made {currentMonthTotalOrders.totalOrders} sales this month</p>) : (<p className="text-gray-500 pt-[.2rem]">You made 0 sales this month</p>)}
            <div className="flex flex-col gap-[1rem]">
                 {orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order._id} className="flex items-center justify-between w-full mt-[1rem]">
                    <div className="flex items-center gap-[1rem]">
                      <img src={order.userId.avatar} alt={order.userId.name} className="w-[2rem] h-[2rem] rounded-full"/>
  
                       <div>
                           <h1 className="font-semibold">{order.userId.name}</h1>
                           <span>{order.userId.email}</span>
                       </div>
                    </div>
  
                    <div>
                         <span className="text-green-500">+{formatCurrency(order.totalAmount)}</span>
                    </div>
                   </div>
                  ))
                 ) : (
                    <div>No orders</div>
                 )}
            </div>
        </div>
        </div>
        </div>
      </div>
  );
};

export default Dashboard;
