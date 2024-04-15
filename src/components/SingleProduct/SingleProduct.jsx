import React, { useContext, useState } from "react";
import "./SingleProduct.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import Loader from "../Common/Loader";
import cartContext from "../Context/cartContext";
import userContext from "../Context/userContext";

const SingleProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const {id} = useParams();
  const {data : product , error , isLoading} = useData(`/products/${id}`);
  const [quantity , setQuantity] = useState(1);
  const {addToCart} = useContext(cartContext);
  const user = useContext(userContext);

  return (
    <section className="align_center single_product_page">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader></Loader>}
      {product && <><div className="align_center">
        <div className="single_product_thumbnail">
          {product.images.map((image, index) => (
            <img
              src={`http://localhost:5001/products/${image}`}
              alt={product.title}
              className={selectedImage === index ? "selected_image" : ""}
              onClick={() => setSelectedImage(index)}
            ></img>
          ))}
        </div>
        <img
          src={`http://localhost:5001/products/${product.images[selectedImage]}`}
          alt={product.title}
          className="single_product_display"
        ></img>
      </div>
      <div className="single_product_details">
        <h1 className="single_product_title">{product.title}</h1>
        <p className="single_produdct_description">{product.description}</p>
        <p className="single_produdct_price">{product.price}</p>
        
        {user && <><h2 className="quantity_title">Quantity :</h2>
        <div className="align_center quantity_input">
          <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={product.stock}></QuantityInput>
        </div>
        <button className="search_button add_to_cart" onClick={()=> addToCart(product, quantity)}>Add To Cart</button></>}
      </div></>}
    </section>
  );
};

export default SingleProduct;
