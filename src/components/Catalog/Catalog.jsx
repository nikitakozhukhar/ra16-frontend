import React from "react";
import { useSelector } from "react-redux";
import { getfetchedProducts } from "../../features/slices/productsSlice";
import ItemCard from "../ItemCard/ItemCard";
import Categories from "../Categories/Categories";
import Loader from "../Loader/Loader";
import './Catalog.css'

const Catalog = ({showSearcField}) => {
  const fetchProducts = useSelector(getfetchedProducts);
  let renderProducts;

  console.log(showSearcField)

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {
        (showSearcField) && 
        <form className="catalog-search-form form-inline">
          <input className="form-control" placeholder="Поиск" />
        </form>
      }

      <Categories />

      <div className="row">
        {
          !fetchProducts.length ? (
            <Loader></Loader>
          ) : (
            renderProducts = fetchProducts.map(item => (
              <div key={item.id} className="col-4">
                <ItemCard item={item}/>
              </div>
            ))
          )
        }
      </div>
      <div className="text-center">
        <button className="btn btn-outline-primary">Загрузить ещё</button>
      </div>
    </section>
  );
};

export default Catalog;
