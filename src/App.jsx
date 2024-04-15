import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getJwt, getUser } from "./components/Services/userServices";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI, decreaseCartAPI, getCartAPI, increaseCartAPI, removeCartAPI } from "./components/Services/cartServices";
import  {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import userContext from "./components/Context/userContext";
import cartContext from './components/Context/cartContext';
import orderContext from "./components/Context/orderContext";
import { getOrderAPI } from "./components/Services/orderServices";


setAuthToken(getJwt())

const App = () => {
  const [user , setUser] = useState(null);
  const [cart , setCart] = useState([]);
  const [order , setOrder] = useState([]);

useEffect(()=> {
  try {
    const jwtUser = getUser();
    if(Date.now() >= jwtUser.exp * 1000){
      localStorage.removeItem("token")
      location.reload()
    } else {
      setUser(jwtUser);
    } 
  } catch (error) {
  }
} ,[]);

const addToCart = (product , quantity) => {
 const updatedCart = [...cart]
 const productIndex = updatedCart.findIndex(item => item.product._id === product._id)
 if(productIndex === -1 ){
  updatedCart.push({product , quantity})
 } else {
  updatedCart[productIndex].quantity += quantity
 }

 setCart(updatedCart);

 addToCartAPI(product._id , quantity).then(res => {
  toast.success("Product added successfully")
}).catch(err => {
  toast.error("Failed to add product")
  setCart(cart)
})
};

const getCart = () => {
  getCartAPI().then(res =>{
    setCart(res.data)
  }).catch(err => {
    toast.error("Something went wrong")
  })
}

useEffect(() => {
  if(user) {
    getCart()
  }
},[user])

const removeFromCart = (id) =>{
  const oldCart = [...cart]
  const newCart = oldCart.filter(item => item.product._id !== id)
  setCart(newCart)

  removeCartAPI(id).catch(err => {
    toast.error("Something went wrong")
    setCart(oldCart)
  })
}

const updateCart = (type , id )=> {
  const oldCart = [...cart]
  const updatedCart = [...cart]
  const productIndex = updatedCart.findIndex(item => item.product._id === id);

  if(type === "increase"){
    updatedCart[productIndex].quantity += 1;
    setCart(updatedCart);

    increaseCartAPI(id).catch(err => {
      toast.error("Something went wrong")
      setCart(oldCart)
    })
  }

  if(type === "decrease") {
    updatedCart[productIndex].quantity -=1;
    setCart(updatedCart);

    decreaseCartAPI(id).catch(err => {
      toast.error("Something went wrong")
      setCart(oldCart)
    })
  }
}

 const getOrder = () => {
  getOrderAPI().then(res=> {
    setOrder(res.data)
  }).catch(() => {
    toast.error("Something went wrong")
  })
 }

  return (
    <userContext.Provider value={user}>
      <cartContext.Provider value={{cart , addToCart , removeFromCart , updateCart , setCart}}>
      <orderContext.Provider value={{order}}>
      <div className="app">
        <Navbar></Navbar>
        <main>
          <ToastContainer position="bottom-right"></ToastContainer>
          <Routing></Routing>
        </main>
      </div>
      </orderContext.Provider>
      </cartContext.Provider>
    </userContext.Provider>
  );
}

export default App;
