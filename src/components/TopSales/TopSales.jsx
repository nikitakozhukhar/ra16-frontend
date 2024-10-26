import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTopSales, fetchAsyncTopSales } from "../../features/slices/productsSlice";
import Loader from "../Loader/Loader";
import ItemCard from "../ItemCard/ItemCard";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import './TopSales.css'

const TopSales = () => {
  const topSales = useSelector(getTopSales);
  const dispatch = useDispatch();
  const {items, loading, error} = topSales;

  const refetchAsyncData = () => {
    dispatch(fetchAsyncTopSales())
  }

  if (loading) {
    return (
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <Loader />
      </section>
    );
  }

  if (error) {
    return (
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <ErrorHandler error={error} refetchAsyncData={refetchAsyncData} />
      </section>
    );
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="top-sales__row">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default TopSales;