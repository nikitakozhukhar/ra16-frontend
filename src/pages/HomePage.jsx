import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
        fetchAsyncTopSales, 
        fetchAsyncCategories,
        fetchAsyncProducts
      } from '../features/slices/productsSlice';
import TopSales from '../components/TopSales/TopSales';
import Catalog from '../components/Catalog/Catalog';

const HomePage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncTopSales())
    dispatch(fetchAsyncCategories())
    dispatch(fetchAsyncProducts())
  }, [dispatch])

  return (
    <div>
      <TopSales />
      <Catalog showSearcField={false}/> 
    </div>
  );
};

export default HomePage;