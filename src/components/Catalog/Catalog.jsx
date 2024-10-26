import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getfetchedProducts,
  fetchAsyncProducts,
  getfetchedProductsByCategory,
  fetchAsyncProductsByCategory,
  fetchAsyncMoreProducts,
} from "../../features/slices/productsSlice";
import { getSearchTerm } from "../../features/slices/searchSlice";

import ItemCard from "../ItemCard/ItemCard";
import Categories from "../Categories/Categories";
import Loader from "../Loader/Loader";
import SearchForm from "../SearchForm/SearchForm";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import "./Catalog.css";

const Catalog = ({ showSearcField }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(getSearchTerm);
  const fetchProducts = useSelector(getfetchedProducts);
  const selectedProductsCategory = useSelector(getfetchedProductsByCategory);
  const [term, setTerm] = useState(searchTerm);
  const [offset, setOffset] = useState(6);

  const fieldStyle = "catalog-search-form form-inline";

  useEffect(() => {
    if (searchTerm) {
      setTerm(searchTerm);
      dispatch(fetchAsyncProducts(searchTerm));
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    if (selectedProductsCategory.category.id) {
      dispatch(
        fetchAsyncProductsByCategory(selectedProductsCategory.category.id)
      );
      dispatch(fetchAsyncMoreProducts(selectedProductsCategory.category.id));
    }
  }, [selectedProductsCategory.category.id, dispatch]);

  useEffect(() => {
    if (!searchTerm && !selectedProductsCategory.category.id) {
      dispatch(fetchAsyncProducts());
    }
  }, [dispatch]);

  const handleSearchSubmite = (e) => {
    e.preventDefault();
    if (term === "") return;
    dispatch(fetchAsyncProducts(term));
  };

  const handleMoreProducts = () => {
    const categoryId = selectedProductsCategory.category.id || 11;
    dispatch(fetchAsyncMoreProducts({ id: categoryId, offset }));
    setOffset((prevOffset) => prevOffset + 6);
  };

  const { items, loading, error, button } = fetchProducts;

  const productsToDisplay = selectedProductsCategory.items.length
    ? selectedProductsCategory.items
    : items;


  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {showSearcField && (
        <SearchForm
          renderFieldStyle={fieldStyle}
          term={term}
          setTerm={setTerm}
          onSubmit={handleSearchSubmite}
        />
      )}

      <Categories />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row catalog-row">
            {productsToDisplay.map((item) => (
              <div key={item.id} className="col-4">
                <ItemCard item={item} />
              </div>
            ))}
          </div>
          <div className="text-center">
            {button && (
              <button
                onClick={handleMoreProducts}
                className="btn btn-outline-primary"
              >
                Загрузить ещё
              </button>
            )}
          </div>{" "}
        </>
      )}
    </section>
  );
};

export default Catalog;
