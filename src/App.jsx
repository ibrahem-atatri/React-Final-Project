import { useState } from 'react'
import Root from './router/Root'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Register from './pages/Register/Register'
import Cart from './pages/Cart/Cart'
import NotFound from './compnents/NotFound/NotFound'
import './App.css'
import { 
  createBrowserRouter,
  RouterProvider, } from 'react-router-dom'
import UserContextProvider from '../context/User'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Product from './pages/Product/Product'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import AboutUs from './pages/AboutUs.jsx/AboutUs'

function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
    {
    path:'/',
    element:<Home/>
    },
    {
      path:'/products',
      element:<Products/>
    
    },
    {
      path:'/register',
      element: <Register/>,
    },
    {
      path:'/cart',
      element:<Cart/>
    },
    {
      path:'/product/:id',
      element:<Product/>
    },
    {
      path:'/aboutus',
      element:<AboutUs/>
    },
    {
      path:'/forgetpassword',
      element: <ForgetPassword/>
    },
    {
      path:'*',
      element:<NotFound/>
    }
    ]
  },
])

  return (
    <>
    <UserContextProvider>
    <RouterProvider router={router} />
    </UserContextProvider>
      <ToastContainer />
    </>
  )
}

export default App
