import {  getOrderFormData, 
          addFormData,
          setProduct,
          clearOrderState,
          sendOrderFormData 
        } from '../../features/slices/orderSlice';
import { getCartItems, clearCart } from "../../features/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import "./OrderForm.css";
import { useState, useEffect } from 'react';


export default function OrderForm() {

  const { owner, items, status, error } = useSelector(getOrderFormData);
  const cartItems = useSelector(getCartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const itemsForOrder = cartItems.products.map((product) => ({
      id: product.id,
      price: product.price,
      count: product.quantity,
    }));
    dispatch(setProduct(itemsForOrder)); // Устанавливаем товары из корзины
  }, [cartItems, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendOrderFormData({ owner, items })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(clearCart());
        dispatch(clearOrderState());
      }
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const {name, value, type, checked} = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    dispatch(addFormData({[name]: newValue}))
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card order-card">
        <form className="card-body card-order-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="telephone"
              placeholder="Ваш телефон"
              name="phone"
              // type='text'
              value={owner.phone || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              placeholder="Адрес доставки"
              name="address"
              value={owner.address || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              name="agreement"
              checked={owner.agreement || false}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button type="submit" className="btn btn-outline-secondary">
          {status === "loading" ? <Loader /> : "Оформить"}
          </button>
          {status === "failed" && <p className="error-text">{error}</p>}
          {status === "succeeded" && <p className="success-text">Заказ успешно отправлен!</p>}
        </form>
      </div>
    </section>
  );
}
