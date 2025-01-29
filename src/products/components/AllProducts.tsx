import{ useEffect } from 'react'
import ProductsTable from './table';
import { useStore } from '../../store/store';

const AllProducts = () => {

    const {products, setProducts} = useStore();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`).then((res) => res.json())
        .then((data) => setProducts(data));
    }, [])

  return (
    <div className='mt-[2rem]'>
        <ProductsTable products={products}/>
    </div>
  )
}

export default AllProducts