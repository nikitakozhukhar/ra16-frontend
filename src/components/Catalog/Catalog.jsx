import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getfetchedCategories } from "../../features/slices/productsSlice";
import Loader from "../Loader/Loader";

const Catalog = () => {
  const fetchCategories = useSelector(getfetchedCategories);

  // const initialState = fetchCategories

  // console.log(fetchCategories)

  let renderCategories;

  const [selected, setSelected] = useState("Все");

  console.log(fetchCategories);

  // const selectCategory = (category) => {
  //   if (category === 'Все') {

  //   }
  // }

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
        <div className="col-4">
          <div className="card catalog-item-card">
            <img
              src="./img/products/sandals_keira.jpg"
              className="card-img-top img-fluid"
              alt="Босоножки 'Keira'"
            />
            <div className="card-body">
              <p className="card-text">Босоножки 'Keira'</p>
              <p className="card-text">7 600 руб.</p>
              <a href="/products/1.html" className="btn btn-outline-primary">
                Заказать
              </a>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card catalog-item-card">
            <img
              src="./img/products/superhero_sneakers.jpg"
              className="card-img-top img-fluid"
              alt="Супергеройские кеды"
            />
            <div className="card-body">
              <p className="card-text">Супергеройские кеды</p>
              <p className="card-text">1 400 руб.</p>
              <a href="/products/1.html" className="btn btn-outline-primary">
                Заказать
              </a>
            </div>
          </div>
        </div>
        <div className="col-4">
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
        <div className="col-4">
          <div className="card catalog-item-card">
            <img
              src="./img/products/sandals_keira.jpg"
              className="card-img-top img-fluid"
              alt="Босоножки 'Keira'"
            />
            <div className="card-body">
              <p className="card-text">Босоножки 'Keira'</p>
              <p className="card-text">7 600 руб.</p>
              <a href="/products/1.html" className="btn btn-outline-primary">
                Заказать
              </a>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card catalog-item-card">
            <img
              src="./img/products/superhero_sneakers.jpg"
              className="card-img-top img-fluid"
              alt="Супергеройские кеды"
            />
            <div className="card-body">
              <p className="card-text">Супергеройские кеды</p>
              <p className="card-text">1 400 руб.</p>
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
