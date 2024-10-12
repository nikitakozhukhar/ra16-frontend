import React from "react";
import { useSelector } from "react-redux";
import { getTopSales } from "../../features/cart/cartSlice";
import Loader from "../Loader/Loader";
import ItemCard from "../ItemCard/ItemCard";
import './TopSales.css'

const TopSales = () => {
  const topSales = useSelector(getTopSales);
  let renderTopSales;

  // renderTopSales = topSales.map(() => {
  //   return <ItemCard />
  // })

 

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="top-sales__row">
        {!topSales.length ? (
          <Loader></Loader>
        ) : (
          (renderTopSales = topSales.map((item) => {
            return <ItemCard key={item.id} item={item} />;
          }))
        )}
      </div>
    </section>
  );
};

export default TopSales;
