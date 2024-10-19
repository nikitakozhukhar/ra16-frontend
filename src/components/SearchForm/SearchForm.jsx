import React from "react";

import "./SearchForm.css"

const SearchForm = ({ renderFieldStyle, term, setTerm, onSubmit}) => {

  return (
    <form 
            className={renderFieldStyle}
            onSubmit={onSubmit}>
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