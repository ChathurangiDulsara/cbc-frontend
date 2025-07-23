import { Link, Route, Routes } from "react-router-dom";
import { BsGraphUp, BsBoxSeam, BsCart4, BsPeopleFill } from "react-icons/bs";
import Products from "./products";
import Dashboard from "./dashboard";
import Orders from "./orders";
import Customers from "./customers";
import AddProducts from "./addProducts.jsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import EditProductForm from "./editProductForm.jsx";
import AdminOrdersPage from "./adminOrders.jsx";

export default function AdminHomePage() {
  return (
    <div className="flex h-screen bg-primary ">
      <div className="w-[20%] h-screen bg-accent flex flex-col items-center py-4">
        <Outlet/>
        <Link 
          className="flex flex-row items-center mb-4 text-primary hover:text-primary" 
          to="/admin/"
        >
          <BsGraphUp className="mr-2" />Dashboard
        </Link>
        <Link 
          className="flex flex-row items-center mb-4 text-primary hover:text-primary" 
          to="/admin/products"
        >
          <BsBoxSeam className="mr-2" /> Products
        </Link>
        <Link 
          className="flex flex-row items-center mb-4 text-primary hover:text-primary" 
          to="/admin/adminOrders"
        >
          <BsCart4 className="mr-2" /> Orders
        </Link>
        <Link 
          className="flex flex-row items-center text-primary hover:text-primary" 
          to="/admin/customers"
        >
          <BsPeopleFill className="mr-2" /> Customers
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-[80%] bg-accent">
        <Routes path = '/admin/'>
          <Route path="/" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/addProducts" element={<AddProducts />} />
          <Route path="adminOrders" element={<AdminOrdersPage />} />
          <Route path="customers" element={<Customers />} />
          <Route path="products/editProductForm" element={<EditProductForm/>} />
        </Routes>
      </div>
    </div>
  );
}
