import { useEffect } from 'react'
import Layout from '../layout'
import CustomersTable from './table';
import { useStore } from '../store/store';

const Customers = () => {

  const {customers, setCustomers} = useStore();

  useEffect(() => {
    (async function () {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/customers`, {
          method: "GET",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setCustomers(data);
    })();
  }, [])

  return (
    <Layout>
        <div>
        <div className="flex items-center justify-between my-[1rem]">
          <h1 className="lg:text-[2rem] text-[1.8rem] font-semibold">Customers</h1>
        </div>

        
        <CustomersTable customers={customers}/>
      </div>
    </Layout>
  )
}

export default Customers;