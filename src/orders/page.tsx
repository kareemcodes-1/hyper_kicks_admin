import { useEffect } from 'react'
import Layout from '../layout'
import { useStore } from '../store/store';
import OrdersTable from './table';

const Orders = () => {
  const {orders, setOrders} = useStore();
  useEffect(() => {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/orders`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json()).then((data) => setOrders(data));
  }, []);

  return (
    <Layout>
        <div className="flex items-center justify-between my-[1rem]">
          <h1 className="lg:text-[2rem] text-[1.5rem] font-semibold">Orders</h1>
        </div>

          <OrdersTable orders={orders}/>
    </Layout>
  )
}

export default Orders