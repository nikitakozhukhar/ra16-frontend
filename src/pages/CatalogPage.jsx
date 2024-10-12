import React from "react";
import Catalog from "../components/Catalog/Catalog";
import Categories from "../components/Categories/Categories";

const CatalogPage = () => {
  return (
    <section className="catalog">
      
      <div className="row">
        <Catalog showSearcField={true}/>
      </div>

    </section>
  );
};

export default CatalogPage;
