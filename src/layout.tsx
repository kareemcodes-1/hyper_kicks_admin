import React from 'react'
import Navbar from './components/Navbar'
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

const Layout = (props: {children: React.ReactNode}) => {
  return (
    <>
       <SidebarProvider>
       <AppSidebar />
       <main className="px-[2rem] w-full bg-white dark:bg-[#0f172a]">
       <SidebarTrigger />
       <Navbar />
         {props.children}
       </main>
       </SidebarProvider>
    </>
  )
}

export default Layout