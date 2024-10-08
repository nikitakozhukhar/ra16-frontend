import React from 'react';
import { useSelector } from 'react-redux';
import { getTopSales } from '../../features/cart/cartSlice';

const TopSales = () => {

  const topSales = useSelector(getTopSales);
  let renderTopSales;

  console.log(topSales)

  return (
    <div>
      
    </div>
  );
};

export default TopSales;