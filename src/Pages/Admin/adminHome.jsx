import axios from "axios";
import { useState } from "react";

export default function AdminHomepage(){
    return(
        <>

        <Routes path ="/*">
        <Route path="/" element={<AdminHomepage />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/products/*" element={<AdminProducts />} />
        <Route path="/customers" element={<AdminCustomers />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/**" element={<AdminHomepageHomePage/>} />
      </Routes>
        </>
    )
}


