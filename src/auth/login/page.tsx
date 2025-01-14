import {useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../../store/store';
import toast from 'react-hot-toast';
import { useFormStatus } from 'react-dom';
import Loading from '../../components/loading';
import { Input } from '../../components/ui/input';

const SubmitBtn = () => {

  const {pending} = useFormStatus();

  return (
    <button
    type="submit"
    disabled={pending}
    className="flex w-full justify-center rounded-md yena-btn dark:yena-btn-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
  >
    {pending ? <Loading /> : 'Login'}
  </button>
  )
}

const Login = () => {
    const {adminInfo, setCredientials} = useStore();
    const navigate = useNavigate();

    useEffect(() => {
      if (adminInfo) {
        if (adminInfo.role === 'admin') {
          navigate('/');
        }
      }
    }, [adminInfo, navigate]);
    


    const formAction = async (formData: FormData) => {
        const userData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            console.log(data);
            if(res.ok && data.role === 'admin'){
                setCredientials(data);
                toast.success('Login successful');
                navigate('/');
            }else{
               toast.error("Access Denied, You're not admin")
            }
        } catch (error) {
            toast.error(error);
        }
    }

  return (
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       <div className='flex items-center justify-center'>

       </div>

       <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight dark:text-white text-black">
         Login admin
       </h2>
     </div>

     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       <form action={formAction} className="space-y-6">

         <div>
           <label htmlFor="email" className="block text-sm/6 font-medium dark:text-gray-200 text-gray-900">
             Email address
           </label>
           {/* <div className="mt-2">
             <input
               id="email"
               name="email"
               type="email"
               required
               autoComplete="email"
               className="
               block w-full rounded-md 
               bg-white dark:bg-transparent 
               text-gray-900 dark:text-gray-200 
               placeholder:text-gray-400 dark:placeholder:text-white 
               px-3 py-1.5 
               text-base sm:text-sm/6 
               outline outline-1 outline-gray-300 
               border
               focus:outline-2 focus:outline-offset-2 
             "             
             />
           </div> */}
           <div className="mt-2">
           <Input type='email' placeholder='Email' name='email'/>
           </div>
         </div>

         <div>
           <div className="flex items-center justify-between">
             <label htmlFor="password" className="block text-sm/6 font-medium dark:text-gray-200 text-gray-900">
               Password
             </label>

           </div>
           <div className="mt-2">
             <Input type='password' placeholder='Password' name='password'/>
           </div>
         </div>

         <SubmitBtn />

       </form>
     </div>
   </div>
  )
}

export default Login