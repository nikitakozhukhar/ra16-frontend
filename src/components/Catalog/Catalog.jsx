import React, { useEffect, useState } from "react";
import { useSelector,  useDispatch  } from "react-redux";
import { 
  getfetchedProducts, 
  fetchAsyncProducts,
  getfetchedProductsByCategory,
  fetchAsyncProductsByCategory
  } from "../../features/slices/productsSlice";
import { getSearchTerm } from "../../features/slices/searchSlice";

import ItemCard from "../ItemCard/ItemCard";
import Categories from "../Categories/Categories";
import Loader from "../Loader/Loader";
import SearchForm from "../SearchForm/SearchForm"; 
import './Catalog.css'


const Catalog = ({showSearcField}) => {

  const dispatch = useDispatch();
  const searchTerm = useSelector(getSearchTerm)
  const fetchProducts = useSelector(getfetchedProducts);
  const selectedProductsCategory = useSelector(getfetchedProductsByCategory)
  const [term, setTerm] = useState(searchTerm)

  const fieldStyle  = "catalog-search-form form-inline";

  console.log(selectedProductsCategory)

  useEffect(() => {
    if (searchTerm) {
      setTerm(searchTerm)
      dispatch(fetchAsyncProducts(searchTerm))
    }
    if (selectedProductsCategory.category.id) {
      dispatch(fetchAsyncProductsByCategory(selectedProductsCategory.category.id))
    }
    dispatch(fetchAsyncProducts())
  }, [searchTerm, selectedProductsCategory.category.id,  dispatch])

  const handleSearchSubmite = (e) => {
    e.preventDefault();
    if (term === '') return
    dispatch(fetchAsyncProducts(term))
  }

  const { items, loading, error } = fetchProducts;

  const productsToDisplay = selectedProductsCategory.items.length ? selectedProductsCategory.items : items;

  

  if (loading) return <Loader />
  if (error) return <>{error.message}</>

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {
        (showSearcField) && 
        <SearchForm 
          renderFieldStyle={fieldStyle}
          term={term}
          setTerm={setTerm}
          onSubmit={handleSearchSubmite}
          />
      }

      <Categories />

      <div className="row">
        {
          productsToDisplay.map(item => (
            <div key={item.id} className="col-4">
              <ItemCard item={item}/>
            </div>
          ))
        }
      </div>
      <div className="text-center">
        <button className="btn btn-outline-primary">Загрузить ещё</button>
      </div>
    </section>
  );
};

export default Catalog;
