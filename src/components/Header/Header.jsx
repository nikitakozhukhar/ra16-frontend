import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../features/slices/searchSlice";
import { fetchAsyncProducts } from "../../features/slices/productsSlice";
import { getProductCount, getCartState } from '../../features/slices/cartSlice'
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productCount = useSelector(getProductCount);
  const cart = useSelector(getCartState)

  let quantity;

  console.log(cart)

  if (cart.products.length > 0) {
    console.log(cart.products[0].quantity)
    console.log(cart.products.length)
    quantity = cart.products
  }
  // Нужно сделать проверку на наличие товаров в корзине, иначе выпадает ошибка
  // const { quantity } = cart.products;
  // if (cart.length > 0) {
   
  // }

  const fieldStyle = "header-controls-search-form form-inline";

  const handleOpenSerchFild = () => {
    setIsOpen(true);
  };

  const handleSubmite = (e) => {
    e.preventDefault();
    if (term === "") return;
    navigate("/catalog");

    dispatch(setSearchTerm(term));
    dispatch(fetchAsyncProducts(term));
    setTerm("");

    setIsOpen(false);
  };

  return (
    <header className="container">
      <div className="row header-row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to="/" className="navbar-brand"></Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Главная
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/catalog" className="nav-link">
                    Каталог
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    О магазине
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contacts" className="nav-link">
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="header-controls-comtainer">
          <div className="header-controls-pics">
            <div
              data-id="search-expander"
              className="header-controls-pic header-controls-search"
              onClick={() => handleOpenSerchFild()}
            />
            <Link to="/cart">
              <div className="header-controls-pic header-controls-cart">
                {quantity > 0 && (
                  <div className="header-controls-cart-full">
                    {quantity}
                  </div>
                 )} 
                <div className="header-controls-cart-menu" />
              </div>
            </Link>
          </div>
          {isOpen ? (
            <SearchForm
              renderFieldStyle={fieldStyle}
              term={term}
              setTerm={setTerm}
              onSubmit={handleSubmite}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
