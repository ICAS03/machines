import React from "react";
import "./ProductsSidebar.css";
import Link from "../Navbar/Link";
import apiClient from "../../utils/api-client";
import useData from "../../hooks/useData";

const ProductsSidebar = () => {
  const {data: categories , errors} = useData("/category")

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {errors && <em className="form_error">{errors}</em>}
        {categories && categories.map((category)=> ( 
        <Link
          key={category._id}
          id ={category._id}
          title={category.name}
          link={`/products?category=${category.name}`}
          sidebar={true}
        ></Link>))}   
      </div>
    </aside>
  );
};

export default ProductsSidebar;
