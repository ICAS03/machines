import React, { useContext ,useState , useEffect} from "react";
import "./Navbar.css";
import Link from "./Link";
import { NavLink, useNavigate } from "react-router-dom";
import userContext from "../Context/userContext";
import cartContext from "../Context/cartContext";
import { getSuggestionsAPI } from "../Services/searchServices";


const Navbar = () => {
  const user = useContext(userContext);
  const {cart} = useContext(cartContext);
  const [suggestions , setSuggestions] = useState([]);
  const [search , setSearch] = useState("")
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()
    if(search.trim() !== ""){
      navigate(`/products?search=${search.trim()}`)
    }
  }

  useEffect(() => {
    if(search.trim() !== ""){
      getSuggestionsAPI(search).then(res => setSuggestions(res.data)).catch(err => 
        console.log(err)) 
    } else {
      setSuggestions([])
    }
  } , [search])

  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">Machines</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for products"
            className="navbar_search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          ></input>
          <button type="submit" className="search_button">
            Search
          </button>
          <ul className="search_result">
            <li className="search_suggestion_link">
              <Link to="/products">Iphone 14</Link>
            </li>
          </ul>
        </form>
        </div>
        <div className="align_center navbar_links">
          <Link title="Home" link="/"></Link>
          <Link title="Products" link="/products"></Link>
          {!user && <><Link title="LogIn" link="/login"></Link>
          <Link title="SignUp" link="/signup"></Link></>}
          {user && <><Link title="My Orders" link="/myorders"></Link>
          <Link title="LogOut" link="/logout"></Link>
          <NavLink to="/cart" className="align_center">
            Cart<p className="align_center cart_counter">{cart.length}</p>
          </NavLink></>}
        </div>
     
    </nav>
  );
};

export default Navbar;
