import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../Components/cartCard.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [orderedItems, setOrderedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setOrderedItems(loadCart());
    console.log(loadCart());

    axios.post(import.meta.env.VITE_BACKEND_URL +"/api/orders/quote", {
        orderedItems: loadCart(),
      })
      .then((res) => {
        console.log(loadCart());
        console.log(res.data.product);
        if (res.data.total != null) {
          console.log(res.data)
          setTotal(res.data.total);
          setOrderedItems(res.data.orderedItems);
          setLabeledTotal(res.data.labeledPrice);
        }
      });
  }, []);

  function onOrderCheckOutClick() {
    navigate("/Home/shipping", {
      state: {
        orderedItems: loadCart()
      }
    });
  }

  return (
    <div className="w-full h-full flex  flex-col items-end overflow-y-scroll bg-primary
    ">
      <table className="w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        {orderedItems.map((orderedItems) => {
          return (
            <CartCard
              key={orderedItems.productID}
              productID={orderedItems.productID}
              quantity={orderedItems.quantity}
            />
          );
        })}
      </table>
      <h1 className="text-3xl font-bold text-accent">
        Total: LKR. {labeledTotal.toFixed(2)}
      </h1>
      <h1 className="text-3xl font-bold text-accent">
        Discount: LKR. {(labeledTotal - total).toFixed(2)}
      </h1>
      <h1 className="text-3xl font-bold text-accent">
        Grand Total: LKR.{total}
      </h1>

      <button onClick={onOrderCheckOutClick} className="bg-accent hover:bg-accent-light text-white p-2 rounded-lg w-[300px]">
        Checkout

      </button>
      <div className="flex items-center justify-center text-center mt-4 text-sm text-accent/70">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        Secure Checkout
      </div>
    </div>
  );
}
