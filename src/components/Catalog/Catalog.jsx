import React from "react";

import ItemCard from "../ItemCard/ItemCard";
import Categories from "../Categories/Categories";

const Catalog = () => {
 
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      <Categories />

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
