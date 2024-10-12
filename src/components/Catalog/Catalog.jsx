import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  getfetchedProducts, 
  fetchAsyncProducts 
} from "../../features/slices/productsSlice";

import ItemCard from "../ItemCard/ItemCard";
import Categories from "../Categories/Categories";
import Loader from "../Loader/Loader";
import './Catalog.css'

const Catalog = ({showSearcField}) => {
  const [term, setTerm] = useState('')
  const dispatch = useDispatch();

 

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === '') return
    dispatch(fetchAsyncProducts(term))
  }

  const fetchProducts = useSelector(getfetchedProducts);
  let renderProducts;
  
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {
        (showSearcField) && 
        <form 
            className="catalog-search-form form-inline"
            onSubmit={submitHandler}>
          <input
                type="text" 
                value={term} 
                className="form-control" 
                placeholder="Поиск" 
                onChange={(e) => setTerm(e.target.value)} 
                />
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
