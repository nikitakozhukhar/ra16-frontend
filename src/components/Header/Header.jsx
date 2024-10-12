import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSerchFild = () => {
    setIsOpen(!isOpen)
    console.log('isOpen', isOpen)
  }
 
  return (
    <header className="container">
      <div className="row">
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
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu" />
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className={!isOpen ? 
                    "header-controls-search-form form-inline invisible" :
                    "header-controls-search-form form-inline"
                  }
                >
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
      </div>
    </header>
  );
};

export default Header;
