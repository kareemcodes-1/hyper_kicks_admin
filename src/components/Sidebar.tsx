import { ArrowLeftStartOnRectangleIcon, Cog8ToothIcon, PresentationChartLineIcon, RectangleGroupIcon, RectangleStackIcon, ShoppingCartIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router";
import { useStore } from "../store/store";

const Sidebar = () => {

   const {logout} = useStore();

   async function Logout(){
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth/logout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        });
  
        if(res.ok){
            logout();
        }
    } catch (error) {
        console.log(error);
    }
    }

  return (
    <aside className="fixed top-0 left-0 h-full w-[14rem] bg-white text-black shadow-lg">
      <div className="p-3 border-b">
        <h2 className="text-[1rem] font-bold">Hyperkicks Admin</h2>
      </div>
      <nav className="p-4 space-y-4">
        <Link to="/" className=" text-gray-600 flex items-center gap-[.5rem] hover:bg-gray-100 p-[.5rem] rounded-[.5rem]">
           <RectangleGroupIcon className="w-[1.5rem] h-[1.5rem]"/>
           Dashboard
        </Link>
        <Link to="/products" className=" text-gray-600 flex items-center gap-[.5rem] hover:bg-gray-100 p-[.5rem] rounded-[.5rem]">
           <PresentationChartLineIcon className="w-[1.5rem] h-[1.5rem]"/>
           Products
        </Link>
        <Link to="/collections" className=" text-gray-600 flex items-center gap-[.5rem] hover:bg-gray-100 p-[.5rem] rounded-[.5rem]">
           <RectangleStackIcon className="w-[1.5rem] h-[1.5rem]"/>
           Collections
        </Link>
        <Link to="/orders" className=" text-gray-600 flex items-center gap-[.5rem] hover:bg-gray-100 p-[.5rem] rounded-[.5rem]">
           <ShoppingCartIcon className="w-[1.5rem] h-[1.5rem]"/>
           Orders
        </Link>
        <Link to="/customers" className=" text-gray-600 flex items-center gap-[.5rem] hover:bg-gray-100 p-[.5rem] rounded-[.5rem]">
           <UserGroupIcon className="w-[1.5rem] h-[1.5rem]"/>
           Customers
        </Link>
      </nav>


        <div className="p-4 space-y-4 border-t ">
        <Link to="/settings/profile" className=" text-gray-600 flex items-center gap-[.5rem] hover:bg-gray-100 p-[.5rem] rounded-[.5rem]">
           <Cog8ToothIcon className="w-[1.5rem] h-[1.5rem]"/>
            Settings
        </Link>

        <button onClick={Logout} className=" text-gray-600 flex items-center gap-[.5rem] hover:bg-gray-100 p-[.5rem] rounded-[.5rem]">
           <ArrowLeftStartOnRectangleIcon className="w-[1.5rem] h-[1.5rem]"/>
           Logout
        </button>
        </div>
    </aside>
  );
};

export default Sidebar;
