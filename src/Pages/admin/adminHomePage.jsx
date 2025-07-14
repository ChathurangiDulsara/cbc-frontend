import { Link, Route, Routes } from "react-router-dom";
import { BsGraphUp, BsBoxSeam, BsCart4, BsPeopleFill } from "react-icons/bs";
import Products from "./admin/products";

export default function AdminHomePage() {
  return (
    <div className="bg-blue-200 w-full h-screen flex">
      <div className="w-[20%] h-screen bg-blue-500 flex flex-col items-center py-4">
        <Link 
          className="flex flex-row items-center mb-4 text-white hover:text-blue-200" 
          to="/admin/dashboard"
        >
          <BsGraphUp className="mr-2" /> Dashboard
        </Link>

        <Link 
          className="flex flex-row items-center mb-4 text-white hover:text-blue-200" 
          to="/admin/products"
        >
          <BsBoxSeam className="mr-2" /> Products
        </Link>

        <Link 
          className="flex flex-row items-center mb-4 text-white hover:text-blue-200" 
          to="/admin/orders"
        >
          <BsCart4 className="mr-2" /> Orders
        </Link>

        <Link 
          className="flex flex-row items-center text-white hover:text-blue-200" 
          to="/admin/customers"
        >
          <BsPeopleFill className="mr-2" /> Customers
        </Link>
      </div>

      <div className="w-[80%] h-screen bg-red-600">
        <Routes path="/*">
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/customers" element={<Customers/>} />
          <Route path="/*" element={<AdminHomePage/>}/>
        </Routes>
      </div>
    </div>
  );
}