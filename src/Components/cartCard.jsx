import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem, addToCart } from "../utils/cartFunction";
import Loading from "./loading";

export default function CartCard(props) {
  const productID = props.productID;
  const quantity = props.quantity;
  const onQuantityChange = props.onQuantityChange;
  const isShippingPage = props.isShippingPage || false;

  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  useEffect(() => {
  
    setLoaded(false);
    setError(false);
    setProduct(null);

    if (productID) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productID}`)
        .then((response) => {
          if (response.data && response.data.product) {
            setProduct(response.data.product);
            setLoaded(true);
            setError(false);
          } else {
           
            if (!isShippingPage) {
              deleteItem(productID);
              if (onQuantityChange) onQuantityChange();
            }
            setError(true);
            setLoaded(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          if (!isShippingPage) {
            deleteItem(productID);
            if (onQuantityChange) onQuantityChange();
          }
          setError(true);
          setLoaded(true);
        });
    }
  }, [productID, isShippingPage, onQuantityChange]);

  const handleQuantityIncrease = () => {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    addToCart(productID, 1);
    if (onQuantityChange) onQuantityChange();
  };

  const handleQuantityDecrease = () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      addToCart(productID, -1);
      if (onQuantityChange) onQuantityChange();
    }
  };

  const handleRemoveItem = () => {
    deleteItem(productID);
    if (onQuantityChange) onQuantityChange();
  };

  if (error && !product) {
    return null;
  }

  if (isShippingPage) {
    if (!loaded) {
      return (
        <tr>
          <td colSpan="5">
            <div className="text-center py-4 text-accent">Loading...</div>
          </td>
        </tr>
      );
    }

    if (!product) {
      return null;
    }

    return (
      <tr className="border-b border-accent/10">
        <td className="py-3">
          <img
            src={product?.image?.[0] || "/placeholder-image.jpg"}
            className="w-16 h-16 object-cover rounded-lg"
            alt={product?.ProductName || "Product"}
          />
        </td>
        <td className="py-3 text-accent">
          <div className="font-medium">{product?.ProductName}</div>
          <div className="text-sm text-accent/70">ID: {productID}</div>
        </td>
        <td className="py-3 text-center text-accent font-medium">{currentQuantity}</td>
        <td className="py-3 text-right text-accent">
          LKR {product?.price?.toFixed(2)}
        </td>
        <td className="py-3 text-right text-accent font-semibold">
          LKR {((product?.LastPrice || 0) * currentQuantity).toFixed(2)}
        </td>
      </tr>
    );
  }

  return (
    <>
      {!loaded ? (
        <tr>
          <td colSpan="8">
            <Loading />
          </td>
        </tr>
      ) : product ? (
        <tr className="hover:bg-secondary hover:text-accent cursor-pointer text-accent">
          <td>
            <img
              src={product?.image?.[0]}
              className="w-[90px] h-[90px] object-cover mx-auto"
              alt={product?.ProductName}
            />
          </td>
          <td className="text-center">{product?.ProductName}</td>
          <td className="text-center">{productID}</td>
          <td className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={handleQuantityDecrease}
                disabled={currentQuantity <= 1}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-gray-600 font-semibold"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{currentQuantity}</span>
              <button
                onClick={handleQuantityIncrease}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-semibold"
              >
                +
              </button>
            </div>
          </td>
          <td className="text-center">{product?.price?.toFixed(2)}</td>
          <td className="text-center">LKR.{product?.LastPrice?.toFixed(2)}</td>
          <td className="text-center">
            {(product?.LastPrice * currentQuantity).toFixed(2)}
          </td>
          <td className="text-center">
            <button
              onClick={handleRemoveItem}
              className="text-red-500 hover:text-primary-700 font-medium text-sm px-2 py-1 rounded"
            >
              Remove
            </button>
          </td>
        </tr>
      ) : null}
    </>
  );
}
