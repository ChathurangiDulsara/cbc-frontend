import { Link, Route, Routes } from "react-router-dom";
import { BsGraphUp, BsBoxSeam, BsCart4, BsPeopleFill } from "react-icons/bs";
import Products from "./products";
import Dashboard from "./dashboard";
import Orders from "./orders";
import Customers from "./customers";
import AddProducts from "./addProducts.jsx";
import { useState } from "react";

export default function AdminHomePage() {
  return (
    <div className="bg-blue-200 w-full h-screen flex">
      {/* Sidebar */}
      <div className="w-[20%] h-screen bg-blue-500 flex flex-col items-center py-4">
        <Link 
          className="flex flex-row items-center mb-4 text-white hover:text-blue-200" 
          to="dashboard"
        >
          <BsGraphUp className="mr-2" /> Dashboard
        </Link>
        <Link 
          className="flex flex-row items-center mb-4 text-white hover:text-blue-200" 
          to="products"
        >
          <BsBoxSeam className="mr-2" /> Products
        </Link>
        <Link 
          className="flex flex-row items-center mb-4 text-white hover:text-blue-200" 
          to="orders"
        >
          <BsCart4 className="mr-2" /> Orders
        </Link>
        <Link 
          className="flex flex-row items-center text-white hover:text-blue-200" 
          to="customers"
        >
          <BsPeopleFill className="mr-2" /> Customers
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-[80%] h-screen bg-blue-400">
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/products/addProducts" element={<AddProducts />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />
          {/* Optionally, add a default route */}
        </Routes>
      </div>
    </div>
  );
}
