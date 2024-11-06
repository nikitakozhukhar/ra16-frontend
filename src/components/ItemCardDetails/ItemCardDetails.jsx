import "./ItemCardDetails.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProductDetails,
  getfetchedProductDetails,
  removeSelectedProduct,
} from "../../features/slices/productsSlice";
import {
  addProductInCart,
} from "../../features/slices/cartSlice";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

export default function ItemCardDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(getfetchedProductDetails);
  const [selectedSize, setSelectedSize] = useState(false);
  const [productCount, setProductCount] = useState(1);
  const { item, loading, error } = details;

  let sizes = null;

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleIncreaseProductCount = () => {
    setProductCount((prev) => {
      if (productCount !== 10) {
        return prev + 1;
      }
      if (productCount === 10) {
        setProductCount(10);
      }
    });
  };

  const handleDecreaseProductCount = () => {
    setProductCount((prev) => {
      if (productCount !== 1) {
        return prev - 1;
      }
      if (productCount === 1) {
        setProductCount(1);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAsyncProductDetails(id));

    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <>{error}</>;

  if (item.sizes) {
    sizes = item.sizes;
  }

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
                  Размеры в наличии:
                  {item.sizes &&
                    sizes.map((size, index) =>
                      size.available ? (
                        <span
                          key={index}
                          onClick={() => handleSizeSelect(size.size)}
                          className={
                            selectedSize === size.size
                              ? "catalog-item-size selected"
                              : "catalog-item-size"
                          }
                        >
                          {size.size}
                        </span>
                      ) : null
                    )}
                </p>
                <p>
                  Количество:
                  <span className="btn-group btn-group-sm pl-2">
                    <button
                      onClick={handleDecreaseProductCount}
                      className="btn-detail btn-secondary"
                    >
                      -
                    </button>
                    <span className="btn-detail">
                      {productCount}
                    </span>
                    <button
                      onClick={handleIncreaseProductCount}
                      className="btn-detail btn-secondary"
                    >
                      +
                    </button>
                  </span>
                </p>
              </div>
              {sizes && (
                <Link to="/cart">
                  <button
                    onClick={() => {
                      dispatch(
                        addProductInCart(
                          { ...item, 
                            quantity: productCount,
                            selectedSize: selectedSize, 
                          })
                      );
                    }}
                    className={
                      selectedSize
                        ? "btn btn-danger btn-lg"
                        : "btn btn-block btn-lg"
                    }
                    disabled={!selectedSize} 
                  >
                    В корзину
                  </button>
                </Link>
              )}
            </div>
          </div>
        </>
      }
    </section>
  );
}
