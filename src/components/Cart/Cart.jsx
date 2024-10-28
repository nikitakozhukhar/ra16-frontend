import "./Cart.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems } from "../../features/slices/cartSlice";

export default function Cart() {
  const cart = useSelector(getCartItems);

  const { products } = cart;

  // console.log(products)

  const totalPrice = products.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product.id}>
                <td scope="row">{index + 1}</td>
                <td>
                  <Link to={`/catalog/${product.id}`}>{product.title}</Link>
                </td>
                <td>18</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.price * product.quantity}</td>
                <td>
                  <button className="btn btn-outline-danger btn-sm">
                    Удалить
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={5} className="text-right">
              Общая стоимость
            </td>
            <td>{totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
