import React, { useEffect } from "react";
import Catalog from "../components/Catalog/Catalog";
import { useDispatch } from 'react-redux';
import { 
  fetchAsyncCategories,
  fetchAsyncProducts
} from '../features/slices/productsSlice';

const CatalogPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncCategories())
    dispatch(fetchAsyncProducts())
  }, [dispatch])

  return (
    <section className="catalog">
      
      <div className="row">
        <Catalog showSearcField={true}/>
      </div>

    </section>
  );
};

export default CatalogPage;
