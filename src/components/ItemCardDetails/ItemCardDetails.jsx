import "./ItemCardDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProductDetails,
  getfetchedProductDetails,
  removeSelectedProduct,
} from "../../features/slices/productsSlice";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

export default function ItemCardDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(getfetchedProductDetails);
  const { item, loading, error } = details;

  useEffect(() => {
    dispatch(fetchAsyncProductDetails(id));

    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <>{error}</>;
  
  return (
    <section className="catalog-item">
      {
        <>
          <h2 className="text-center">{item.title}</h2>
          <div className="row row-details">
            <div className="col-5">
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  className="img-fluid"
                  alt={item.title}
                />
              ) : (
                <p>Изображение недоступно</p>
              )}
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td> Артикул</td>
                    <td>{item.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{item.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{item.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{item.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{item.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{item.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:{" "}
                  <span className="catalog-item-size selected">18 US</span>{" "}
                  <span className="catalog-item-size">20 US</span>
                </p>
                <p>
                  Количество:{" "}
                  <span className="btn-group btn-group-sm pl-2">
                    <button className="btn btn-secondary">-</button>
                    <span className="btn btn-outline-primary">1</span>
                    <button className="btn btn-secondary">+</button>
                  </span>
                </p>
              </div>
              <button className="btn btn-danger btn-block btn-lg">
                В корзину
              </button>
            </div>
          </div>
        </>
      }
    </section>
  );
}
