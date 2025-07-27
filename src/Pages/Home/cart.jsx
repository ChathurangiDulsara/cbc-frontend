import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../Components/cartCard.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [orderedItems, setOrderedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();

  const fetchQuotation = () => {
    const cartItems = loadCart();
    setOrderedItems(cartItems);

    if (cartItems.length > 0) {
      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
          orderedItems: cartItems,
        })
        .then((res) => {
          console.log(cartItems);
          console.log(res.data.product);
          if (res.data.total != null) {
            console.log(res.data);
            setTotal(res.data.total);
            setOrderedItems(res.data.orderedItems);
            setLabeledTotal(res.data.labeledPrice);

            const calculatedDiscount = res.data.labeledPrice - res.data.total;
            const calculatedGrandTotal = res.data.total;
              
            setDiscount(calculatedDiscount);
            setGrandTotal(calculatedGrandTotal);
          }
        })
        .catch((error) => {
          console.error("Error fetching quotation:", error);
        });
    } else {
      setTotal(0);
      setLabeledTotal(0);
      setDiscount(0);
      setGrandTotal(0);
      setOrderedItems([]);
    }
  };

  useEffect(() => {
    fetchQuotation();
  }, []);

  function onOrderCheckOutClick() {
    navigate("/Home/shipping", {
      state: {
        orderedItems: loadCart()
      }
    });
  }

  return (
    <div className="w-full h-full flex flex-col bg-primary relative p-4 space-y-6 text-center">

      <div className="flex-1 overflow-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-center text-sm font-semibold text-accent">Image</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-accent">Product Name</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-accent">Product ID</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-accent">Qty</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-accent">Price</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-accent">Discounted Price</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-accent">Total</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-accent">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orderedItems.map((orderedItem) => {
                return (
                  <CartCard
                    key={orderedItem.productID}
                    productID={orderedItem.productID}
                    quantity={orderedItem.quantity}
                    onQuantityChange={fetchQuotation}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

     
      <div className="w-full max-w-md ml-auto bottom-5">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-600">Subtotal</span>
              <span className="text-base font-semibold text-gray-800">
                LKR {labeledTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-600">Discount</span>
              <span className="text-base font-semibold text-green-600">
                -LKR {discount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-lg font-bold text-gray-700">Grand Total</span>
              <span className="text-lg font-bold text-accent">
                LKR {grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

      
          <button
            onClick={onOrderCheckOutClick}
            className="mt-6 w-full bg-accent hover:bg-accent-light text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            Proceed to Checkout
          </button>

          <div className="flex items-center justify-center text-sm text-accent">
            <svg
              className="w-4 h-4 mr-2 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            
              />
            </svg>
            Secure Checkout
          </div>
        </div>
      </div>
    </div>
  );
}
