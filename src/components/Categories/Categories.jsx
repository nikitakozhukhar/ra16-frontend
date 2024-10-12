import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getfetchedCategories } from "../../features/slices/productsSlice";
import Loader from "../Loader/Loader";
import './Categories.css'

const Categories = () => {
  const fetchCategories = useSelector(getfetchedCategories);

  let renderCategories;

  const [selected, setSelected] = useState("Все"); // убарть стейт, добавить категорию 'Все' в слайсах?
 

  return (
    <ul className="catalog-categories nav justify-content-center">
        {!fetchCategories.length ? (
          <Loader></Loader>
        ) : (
          (renderCategories = fetchCategories.map((category) => (
            <li key={category.id} className="nav-item">
              <a
                className={
                  selected === category.title ? "nav-link active" : "nav-link"
                }
                href="#"
              >
                {category.title}
              </a>
            </li>
          )))
        )}
      </ul>
  );
};

export default Categories;