import React from "react";
import './ItemCard.css'

const ItemCard = (props) => {
  const { category, id, price, title, images } = props.item;
  const image1 = images[0];
  const image2 = images[1];

  return (
    <div className="card catalog-item-card">
      <img src={image1} className="card-img-top img-fluid" alt={title} />
      <div className="card-body">
        <p className="card-text">{title}</p>
        <p className="card-text">{price} руб.</p>
        <a href="/products/1.html" className="btn btn-outline-primary">
          Заказать
        </a>
      </div>
    </div>
  );
};

export default ItemCard;
