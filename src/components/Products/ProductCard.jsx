import React, { useContext } from "react";
import "./ProductCard.css";
import star from "../../assets/star.png";
import basket from "../../assets/shopping_cart.png";
import iphone from "../../assets/iphone.png";
import { NavLink } from "react-router-dom";
import cartContext from "../Context/cartContext";
import userContext from "../Context/userContext";

const ProductCard = ({product}) => {
  const {addToCart} = useContext(cartContext);
  const user = useContext(userContext);
  return (
    <article className="product_card">
      <div className="product_card_image">
        <NavLink to={`/product/${product?._id}`}>
          <img src={`http://localhost:5001/products/${product?.images[0]}`} alt="product_card_image"></img>
        </NavLink>
      </div>
      <div className="product_card_details">
        <h2 className="product_price">{product?.price}</h2>
        <p className="product_title">{product?.title}</p>

        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star"></img>{product?.reviews.rate}
            </p>
            <p className="product_review_count">{product?.reviews.counts}</p>
          </div>

          {product?.stock > 0 && user && (<button className="add_to_cart" onClick={() => {addToCart(product , 1)}}>
            <img src={basket} alt="basket_button"></img>
          </button>)}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
