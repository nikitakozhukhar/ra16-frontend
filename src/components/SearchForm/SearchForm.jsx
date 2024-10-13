import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchAsyncProducts } from "../../features/slices/productsSlice";

import "./SearchForm.css"

const SearchForm = ({ renderFieldStyle, term, setTerm, onSubmite}) => {

  // const [term, setTerm] = useState('')
  // const dispatch = useDispatch();


  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (term === '') return
  //   dispatch(fetchAsyncProducts(term))
  // }

  return (
    <form 
            className={renderFieldStyle}
            onSubmit={onSubmite}>
          <input
                type="text" 
                value={term} 
                className="form-control" 
                placeholder="Поиск" 
                onChange={(e) => setTerm(e.target.value)} 
                />
        </form>
  );
};

export default SearchForm;