import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncTopSales } from '../features/cart/cartSlice';
import TopSales from '../components/TopSales/TopSales';

const HomePage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncTopSales())
  }, [dispatch])

  return (
    <div>
      <TopSales />
    </div>
  );
};

export default HomePage;