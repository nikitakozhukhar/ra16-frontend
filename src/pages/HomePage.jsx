import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncTopSales, fetchAsyncCatalog } from '../features/slices/productsSlice';
import TopSales from '../components/TopSales/TopSales';
import Catalog from '../components/Catalog/Catalog';

const HomePage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncTopSales())
    dispatch(fetchAsyncCatalog())
  }, [dispatch])

  return (
    <div>
      <TopSales />
      <Catalog /> 
    </div>
  );
};

export default HomePage;