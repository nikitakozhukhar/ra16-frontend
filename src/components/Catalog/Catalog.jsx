import React from "react";
import { useSelector } from "react-redux";
import { getfetchedProducts } from "../../features/slices/productsSlice";
import ItemCard from "../ItemCard/ItemCard";
import Categories from "../Categories/Categories";
import Loader from "../Loader/Loader";
import './Catalog.css'

const Catalog = () => {
  const fetchProducts = useSelector(getfetchedProducts);
  let renderProducts;

  if (fetchProducts.length > 0) {
    const { category, id, price, title, images } = fetchProducts;
    console.log(fetchProducts)
  }
  

  

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      <Categories />

      <div className="row">
        {
          !fetchProducts.length ? (
            <Loader></Loader>
          ) : (
            renderProducts = fetchProducts.map(item => (
              <div className="col-4">
                <ItemCard key={item.id} item={item}/>
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
