import { useEffect } from 'react'
import CollectionsTable from './table';
import { useStore } from '../../store/store';

const AllCollections = () => {

    const {collections, setCollections} = useStore();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/collections`).then((res) => res.json())
        .then((data) => setCollections(data));
    }, []);


  return (
    <div className='mt-[2rem]'>
        <CollectionsTable collections={collections}/>
    </div>
  )
}

export default AllCollections