import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem } from "../utils/cartFunction";
import Loading from "./loading";

export default function CartCard(props) {
  const productID = props.productID;
  const quantity = props.quantity;

  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

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

  return (
    <>
      {!loaded ? (
        error ? (
          <tr><td colSpan="6"><div className="text-center text-red-500">Failed to load product.</div></td></tr>
        ) : (
          <tr><td colSpan="6"><Loading /></td></tr>
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
          <td className="text-center">{quantity}</td>
          <td className="text-center">LKR.{product?.LastPrice?.toFixed(2)}</td>
          <td className="text-center">
            {(product?.LastPrice * quantity).toFixed(2)}
          </td>
        </tr>
      )}
    </>
  );
}
