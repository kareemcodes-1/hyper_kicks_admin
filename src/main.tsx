import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import {BrowserRouter, Routes, Route} from "react-router";
import Products from './products/Products.tsx';
import Orders from './orders/page.tsx';
import Collections from './collections/Collections.tsx';
import Login from './auth/login/page.tsx';
import Register from './auth/register/page.tsx';
import ProtectRoutes from './provider/ProtectRoutes.tsx';
import Profile from './settings/profile/page.tsx';
import Customers from './customers/page.tsx';
import ToasterProvider from './provider/ToasterProvider.tsx';
import { ThemeProvider } from './provider/ThemeProvider.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <ToasterProvider />
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
              <Routes>
                   <Route path='/login' element={<Login />}></Route>
                   <Route path='/register' element={<Register />}></Route>

                   <Route element={<ProtectRoutes />}>
                   <Route path="/" element={<App />} />
                   <Route path="/settings/profile" element={<Profile />} />
                   <Route path="/products" element={<Products />} />
                   <Route path="/collections" element={<Collections />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/customers" element={<Customers />} />
                  </Route>
              </Routes>
          </BrowserRouter>
          </ThemeProvider>
  </StrictMode>,
)
