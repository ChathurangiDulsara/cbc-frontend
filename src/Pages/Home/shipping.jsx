import { useLocation, useNavigate } from "react-router-dom";
import CartCard from "../../Components/cartCard";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShippingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.orderedItems;
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      toast.error("No items received");
      navigate("/Home/cart");
      return;
    }

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: cart,
      })
      .then((res) => {
        if (res.data.total != null) {
          setTotal(res.data.total);
          setLabeledTotal(res.data.labeledTotal);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch order quote. Please try again.");
        console.error(err);
      });
  }, [cart, navigate]);

  function validateInputs() {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!address.trim()) {
      toast.error("Please enter your address.");
      return false;
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  }

  function createOrder() {
    if (!validateInputs()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to place an order.");
      navigate("/login");
      return;
    }
    setIsLoading(true);

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders",
        {
          orderedItems: cart,
          name,
          address,
          phone,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        toast.success("Order placed successfully");
        
      
        localStorage.removeItem("orderedItems");
        
       
        setTimeout(() => {
          navigate("/Home/orders", {
            state: {

              orderId: res.data.orderId
            }
          });
        }, 1000);
      })
      .catch((err) => {
        console.error("Order creation error:", err);
        toast.error("Failed to place order. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="w-full min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-accent mb-4">No Items Found</h2>
          <p className="text-accent/70 mb-6">Please add items to your cart first.</p>
          <button 
            onClick={() => navigate("/Home/products")}
            className="bg-accent text-primary px-6 py-3 rounded-xl font-bold hover:bg-accent/90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-primary p-4">
      <div className="w-full max-w-4xl mx-auto bg-secondary/40 rounded-2xl shadow-xl p-8 border border-accent/20">
        <h1 className="text-3xl font-bold text-accent mb-6 text-center">Shipping Details</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block font-semibold text-accent mb-2">Full Name *</label>
            <input
              type="text"
              className="w-full p-3 border border-accent/30 rounded-lg bg-primary text-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block font-semibold text-accent mb-2">Phone Number *</label>
            <input
              type="text"
              className="w-full p-3 border border-accent/30 rounded-lg bg-primary text-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0773434343"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block font-semibold text-accent mb-2">Delivery Address *</label>
          <textarea
            rows="3"
            className="w-full p-3 border border-accent/30 rounded-lg bg-primary text-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your complete delivery address"
          />
        </div>

       
        <h2 className="text-2xl font-bold text-accent mt-8 mb-6">Order Summary</h2>
        <div className="bg-primary/80 rounded-lg p-4 mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-accent/20">
                <th className="text-left py-3 text-accent font-semibold">Image</th>
                <th className="text-left py-3 text-accent font-semibold">Product</th>
                <th className="text-center py-3 text-accent font-semibold">Qty</th>
                <th className="text-right py-3 text-accent font-semibold">Price</th>
                <th className="text-right py-3 text-accent font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((orderedItems) => (
                <CartCard
                  key={orderedItems.productID}
                  productID={orderedItems.productID}
                  quantity={orderedItems.quantity}
                 
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-primary/60 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-3 text-accent">
            <span className="text-lg">Subtotal:</span>
            <span className="text-lg font-semibold">LKR {labeledTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-3 text-green-600">
            <span className="text-lg">Discount:</span>
            <span className="text-lg font-semibold">-LKR {(labeledTotal - total).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-3 text-accent">
            <span className="text-lg">Shipping:</span>
            <span className="text-lg font-semibold">Free</span>
          </div>
          <div className="border-t border-accent/20 pt-3">
            <div className="flex justify-between items-center text-accent">
              <span className="text-xl font-bold">Grand Total:</span>
              <span className="text-xl font-bold">LKR {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

       
        <button
          onClick={createOrder}
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
            isLoading 
              ? 'bg-accent/70 text-primary/70 cursor-not-allowed' 
              : 'bg-accent hover:bg-accent/90 text-primary hover:scale-105 shadow-lg hover:shadow-xl'
          }`}
        >
          {isLoading ? 'Processing Order...' : 'Place Order'}
        </button>

       
        <div className="flex items-center justify-center mt-4 text-accent/70">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-sm">Secure & Encrypted Checkout</span>
        </div>
      </div>
    </div>
  );
}
