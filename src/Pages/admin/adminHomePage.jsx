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
    <div className="flex h-screen bg-primary">
     
      <div className="w-[20%] h-screen bg-accent flex flex-col py-8 shadow-lg">
        <Outlet/>
        
       
        <div className="px-6 mb-8">
          <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
        </div>
        
      
        <nav className="flex flex-col space-y-2 px-4">
          <Link 
            className="flex items-center px-4 py-3 text-primary hover:bg-primary hover:text-accent rounded-lg transition-all duration-200 font-medium group" 
            to="/admin/"
          >
            <BsGraphUp className="mr-3 text-lg group-hover:scale-110 transition-transform" />
            Dashboard
          </Link>
          
          <Link 
            className="flex items-center px-4 py-3 text-primary hover:bg-primary hover:text-accent rounded-lg transition-all duration-200 font-medium group" 
            to="/admin/products"
          >
            <BsBoxSeam className="mr-3 text-lg group-hover:scale-110 transition-transform" />
            Products
          </Link>
          
          <Link 
            className="flex items-center px-4 py-3 text-primary hover:bg-primary hover:text-accent rounded-lg transition-all duration-200 font-medium group" 
            to="/admin/adminOrders"
          >
            <BsCart4 className="mr-3 text-lg group-hover:scale-110 transition-transform" />
            Orders
          </Link>
          
          <Link 
            className="flex items-center px-4 py-3 text-primary hover:bg-primary hover:text-accent rounded-lg transition-all duration-200 font-medium group" 
            to="/admin/customers"
          >
            <BsPeopleFill className="mr-3 text-lg group-hover:scale-110 transition-transform" />
            Customers
          </Link>
        </nav>
        
        {/* Footer */}
        <div className="mt-auto px-6 py-4">
          <div className="border-t border-primary/20 pt-4">
            <p className="text-primary/70 text-sm text-center">Admin Dashboard</p>
          </div>
        </div>
      </div>

      
      <div className="w-[80%] bg-accent overflow-hidden">
        <div className="h-full overflow-y-auto">
          <Routes path='/admin/'>
            <Route path="/" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/addProducts" element={<AddProducts />} />
            <Route path="adminOrders" element={<AdminOrdersPage/>} />
            <Route path="customers" element={<Customers />} />
            <Route path="products/editProductForm" element={<EditProductForm/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
