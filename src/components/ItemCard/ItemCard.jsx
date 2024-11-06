import React from "react";
import { Link } from "react-router-dom";
import './ItemCard.css'

const ItemCard = (props) => {
  const { id, price, title, images } = props.item;

  return (
    <div className="card catalog-item-card card-top">

      <div className="img-wrapper">
        <img src={images[0]} className="card-img-top img-fluid" alt={title} />
      </div>
     
      <div className="card-body">
        <p className="card-text">{title}</p>
        <p className="card-text">{price} руб.</p>
        <Link to={`/catalog/${id}`} className="btn btn-outline-primary">
        Заказать
        </Link>
       
      </div>
    </div>
  );
};

export default ItemCard;
