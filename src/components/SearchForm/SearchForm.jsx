import React from "react";

import "./SearchForm.css"

const SearchForm = ({ renderFieldStyle, term, setTerm, onSubmite}) => {

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