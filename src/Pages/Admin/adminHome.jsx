import { Routes, Route, BrowserRouter } from 'react-router-dom';

export default function AdminHomepage(){
    return(
        <div className='bg-red-500 min-h-screen flex flex-col items-center justify-center'>
        <h1>Hello Admin</h1>
        <BrowserRouter>
        <Routes>
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/products/*" element={<AdminProducts />} />
        <Route path="/customers" element={<AdminCustomers />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/*" element={<AdminHomepageHomePage/>} />
      </Routes>
      </BrowserRouter>
        </div>
       
    )
}


