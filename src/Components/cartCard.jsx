import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem, addToCart } from "../utils/cartFunction";
import Loading from "./loading";

export default function CartCard(props) {
  const productID = props.productID;
  const quantity = props.quantity;
  const onQuantityChange = props.onQuantityChange;

  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/"+productID)
        .then((response) => {
          if (response.data != null) {
            setProduct(response.data.product);
            console.log(response.data.product, "product");
            setLoaded(true);
          } else {
            deleteItem(productID);
          }
        })
        .catch((error) => {
          setError(true);
          setLoaded(false);
          console.log(error);
        });
    }
  }, []);

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

  return (
    <>
      {!loaded ? (
        error ? (
          <tr><td colSpan="8"><div className="text-center text-red-500">Failed to load product.</div></td></tr>
        ) : (
          <tr><td colSpan="8"><Loading /></td></tr>
        )
      ) : (
        <tr className="hover:bg-accent hover:text-white cursor-pointer">
          <td className="">
            <img
              src={product?.image?.[0]}
              className="w-[90px] h-[90px] object-cover mx-auto"
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
              <span className="w-12 text-center font-medium">
                {currentQuantity}
              </span>
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
              className="text-red-500 hover:text-red-700 font-medium text-sm px-2 py-1 rounded"
            >
              Remove
            </button>
          </td>
        </tr>
      )}
    </>
  );
}
