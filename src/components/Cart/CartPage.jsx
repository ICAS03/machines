import React, { useContext, useEffect ,useState } from "react";
import "./CartPage.css";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import remove from "../../assets/remove.png";
import userContext from "../Context/userContext";
import cartContext from "../Context/cartContext";
import { addToOrderAPI } from "../Services/orderServices";
import {toast} from "react-toastify";

const CartPage = () => {
  const [subTotal , setSubTotal] = useState(0);
  const user= useContext(userContext);
  const {cart , removeFromCart , updateCart , setCart} = useContext(cartContext);

  useEffect(() => {
    let total = 0;
    cart.forEach(item => {
      total += item.product.price * item.quantity
    })
    setSubTotal(total)
  },[cart])

  const checkout = () => {
    const oldCart = [...cart]
    setCart([])
    addToOrderAPI().then(() => {
      toast.success("Order placed successfully")
    }).catch(() => {
      toast.error("Order failed")
      setCart(oldCart)
    })
    
  }

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img src={`http://localhost:5001/profile/${user?.profilePic}`} alt="user_profile"></img>
        <div>
          <p className="user_name">Name : {user?.name}</p>
          <p className="user_email">Email : {user?.email}</p>
        </div>
      </div>
      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart?.map(({product , quantity}) =>  <tr key={product._id}>
            <td>{product.title}</td>
            <td>${product.price}</td>
            <td className="align_center table_quantity_input">
              <QuantityInput quantity ={quantity} stock={product.stock} setQuantity={updateCart} cartPage={true} productId={product._id}></QuantityInput>
            </td>
            <td>${quantity*product.price}</td>
            <td>
              <img
                src={remove}
                alt="remove_icon"
                className="table_remove"
                onClick={() => removeFromCart(product._id)}
              ></img>
            </td>
          </tr>)}
         
        </tbody>
      </Table>
      <table className="cart_bill_table">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$9</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subTotal + 9}</td>
          </tr>
        </tbody>
      </table>
      <button className="search_button checkout_btn" onClick={checkout}>Checkout</button>
    </section>
  );
};

export default CartPage;
