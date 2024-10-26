import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getfetchedCategories,
        fetchAsyncProductsByCategory,
        setSelectByCategory,
        getfetchedProductsByCategory,
        fetchAsyncCategories
        } from "../../features/slices/productsSlice";
import Loader from "../Loader/Loader";
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import './Categories.css'

const Categories = () => {
  const fetchCategories = useSelector(getfetchedCategories);
  const selectedProductsCategory = useSelector(getfetchedProductsByCategory)
  const dispatch = useDispatch();
  const {items, loading, error} = fetchCategories;
  const [selected, setSelected] = useState(selectedProductsCategory.category.title || "Все"); 

  const handleSelectCategory = (item) => {
    setSelected(item.title);
    dispatch(setSelectByCategory(item));
    dispatch(fetchAsyncProductsByCategory(item.id))
  }

  const refetchAsyncData = () => {
    dispatch(fetchAsyncCategories())
  }

  if (loading) return <Loader />

  return (
    <ul className="catalog-categories nav justify-content-center">
       {
        error ? 
        (<ErrorHandler 
            error={error} 
            refetchAsyncData={refetchAsyncData}/>) : 
        ( 
          items.map((item) => (
            <li key={item.id} className="nav-item">
              <a
                onClick={(() => handleSelectCategory(item))}
                className={
                  selected === item.title ? "nav-link active" : "nav-link"
                }
                // href="#"
              >
                {item.title}
              </a>
            </li>
          ))
        )
       }
      </ul>
  );
};

export default Categories;