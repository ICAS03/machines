import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import apiClient from "../../utils/api-client"
import useData from "../../hooks/useData";
import ProdutCardSkeleton from "./ProdutCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";


const ProductsList = () => {
  const [page , setPage] = useState(1);
  const [search , setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search")


  const {data , error , isLoading} = useData("/products", {
    params: {
      search : searchQuery,
      category,
      perPage: 10,
      page,
    },
  } , [searchQuery , category , page]);

  useEffect(() => {
    setPage(1)
  },[searchQuery , category]);


  const skeletons = [1,2,3,4,5,6,7,8];
  
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({...currentParams , page : parseInt(currentParams.page) + 1});
  }

  useEffect(() => {
    const handleScroll = () => {
      const {scrollTop , clientHeight , scrollHeight} = document.documentElement;
      if(scrollTop + clientHeight >= scrollHeight - 1 && !isLoading && data && page < data.totalPages) {;
      setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll" , handleScroll);
    return () => window.removeEventListener("scroll" , handleScroll)
  }, [data , isLoading]);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">Relevance</option>
          <option value="price desc">Price High To Low</option>
          <option value="price asc">Price Low To High</option>
          <option value="rate desc">Rate High To Low</option>
          <option value="rate asc">Rate Low To High</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProdutCardSkeleton key = {n}></ProdutCardSkeleton>)}
        {data?.products && data.products.map((product) => (<ProductCard key = {product._id} product={product}></ProductCard>))}
      </div>
     {data && (<Pagination totalPosts={data.totalProducts} postsPerPage={8} onClick={handlePageChange}></Pagination>)}
    </section>
  );
};

export default ProductsList;
