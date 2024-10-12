import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getfetchedCategories } from "../../features/slices/productsSlice";
import Loader from "../Loader/Loader";
import ItemCard from "../ItemCard/ItemCard";

const Catalog = () => {
  const fetchCategories = useSelector(getfetchedCategories);

  let renderCategories;

  const [selected, setSelected] = useState("Все"); // убарть стейт, добавить категорию 'Все' в слайсах?
 

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      <ul className="catalog-categories nav justify-content-center">
        {!fetchCategories.length ? (
          <Loader></Loader>
        ) : (
          (renderCategories = fetchCategories.map((category) => (
            <li key={category.id} className="nav-item">
              <a
                className={
                  selected === category.title ? "nav-link active" : "nav-link"
                }
                href="#"
              >
                {category.title}
              </a>
            </li>
          )))
        )}
      </ul>
      <div className="row">
        <div className="col-4">
          {/* <ItemCard /> */}
          <div className="card catalog-item-card">
            <img
              src="./img/products/sandals_myer.jpg"
              className="card-img-top img-fluid"
              alt="Босоножки 'MYER'"
            />
            <div className="card-body">
              <p className="card-text">Босоножки 'MYER'</p>
              <p className="card-text">34 000 руб.</p>
              <a href="/products/1.html" className="btn btn-outline-primary">
                Заказать
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-outline-primary">Загрузить ещё</button>
      </div>
    </section>
  );
};

export default Catalog;
