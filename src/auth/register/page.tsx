import {useEffect} from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../../store/store';
import toast from 'react-hot-toast';

const Register = () => {
    const {adminInfo, setCredientials} = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(adminInfo){
            navigate('/');
        }
    }, [navigate, adminInfo])


    const formAction = async (formData: any) => {
        const userData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}//api/users/auth/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if(res.ok){
                
                setCredientials(data);
                toast.success('Registered successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       <div className='flex items-center justify-center'>

       </div>

       <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
         Regsiter to be an admin
       </h2>
     </div>

     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       <form action={formAction} className="space-y-6">

       <div>
           <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
             Username
           </label>
           <div className="mt-2">
             <input
               id="name"
               name="name"
               type="text"
               required
               autoComplete="name"
               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
             />
           </div>
         </div>

         <div>
           <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
             Email address
           </label>
           <div className="mt-2">
             <input
               id="email"
               name="email"
               type="email"
               required
               autoComplete="email"
               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
             />
           </div>
         </div>

         <div>
           <div className="flex items-center justify-between">
             <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
               Password
             </label>

           </div>
           <div className="mt-2">
             <input
               id="password"
               name="password"
               type="password"
               required
               autoComplete="current-password"
               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
             />
           </div>
         </div>

         <div>
           <button
             type="submit"
             className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
           >
           Register
           </button>
         </div>
       </form>
     </div>
   </div>
  )
}

export default Register