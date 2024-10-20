import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getfetchedCategories } from "../../features/slices/productsSlice";
import Loader from "../Loader/Loader";
import './Categories.css'

const Categories = () => {
  const fetchCategories = useSelector(getfetchedCategories);

  console.log(fetchCategories)

  let renderCategories;
  const [selected, setSelected] = useState("Все");  
  const {items, loading, error} = fetchCategories;

  if (loading) return <Loader />
  if (error) return <>{error.message}</>


  return (
    <ul className="catalog-categories nav justify-content-center">
        {
          items.map((item) => (
            <li key={item.id} className="nav-item">
              <a
                className={
                  selected === item.title ? "nav-link active" : "nav-link"
                }
                href="#"
              >
                {item.title}
              </a>
            </li>
          ))
        }
      </ul>
  );
};

export default Categories;