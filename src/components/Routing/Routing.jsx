import React from 'react'
import { Routes , Route } from 'react-router-dom'
import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SingleProduct from "../SingleProduct/SingleProduct";
import CartPage from "../Cart/CartPage";
import MyOrder from "../MyOrder/MyOrder";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from '../Authentication/SignupPage';
import LogOut from '../Authentication/LogOut';
import ProtectedRoute from './ProtectedRoute';
import Chat from '../Chatbot/chat';


const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/products' element={<ProductsPage></ProductsPage>}></Route>
        <Route path='/product/:id' element={<SingleProduct></SingleProduct>}></Route>
        <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/chat' element={<Chat></Chat>}></Route>
         <Route element={<ProtectedRoute></ProtectedRoute>}>
        <Route path='/cart' element={<CartPage ></CartPage>}></Route>
        <Route path='/myorders' element={<MyOrder></MyOrder>}></Route>
        <Route path = '/logout' element={<LogOut></LogOut>}></Route>
        </Route>
    </Routes>
  )
}

export default Routing