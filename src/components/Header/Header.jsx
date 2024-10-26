import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../features/slices/searchSlice";
import { fetchAsyncProducts } from "../../features/slices/productsSlice";

import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const fieldStyle  = "header-controls-search-form form-inline"

  const handleOpenSerchFild = () => {
    setIsOpen(true)
  }

  const handleSubmite = (e) => {
    e.preventDefault();
    if (term === '') return;
    navigate('/catalog');

    dispatch(setSearchTerm(term));
    dispatch(fetchAsyncProducts(term))
    setTerm('');
    
    setIsOpen(false);
  }
 
  return (
    <header className="container">
      <div className="row header-row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to='/' className="navbar-brand" >
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to='/' className="nav-link">
                    Главная
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to='/catalog' className="nav-link">
                    Каталог
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to ='/about' className="nav-link">
                    О магазине
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/contacts' className="nav-link">
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
                  <div className="header-controls-pic header-controls-cart">
                    {/* <div className="header-controls-cart-full">1</div> */}
                    <div className="header-controls-cart-menu" />
                  </div>
                  
                </div>
                {isOpen ? <SearchForm 
                            renderFieldStyle={fieldStyle}
                            term={term}
                            setTerm={setTerm}
                            onSubmit={handleSubmite}
                            /> : null}
              </div>
      </div>
    </header>
  );
};

export default Header;
