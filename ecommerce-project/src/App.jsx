import { Routes, Route } from 'react-router'
import './App.css'
import { HomePage } from './pages/Home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
function App() {
const[cart,setCart]=useState();

useEffect(()=>{
  axios.get('/api/cart-items?expand=product')
         .then((response)=>{
          setCart(response.data);
         })



},[]);
 
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="/orders" element={<OrdersPage
          cart={cart} />} />
      </Routes>


    </>
  )
}

export default App
