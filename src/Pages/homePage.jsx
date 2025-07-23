import { Routes, Route } from 'react-router-dom';
import Header from '../Components/header.jsx';
import ProductOverview from './Home/productInfo.jsx';
import LoginPage from './loginPage.jsx';
import Cart from './Home/cart.jsx';
import Product from './Home/products.jsx';

export default function HomePage() {
  return (
    <div className='w-full h-full bg-secondary display relative'>
      <Header/>
      <div className="w-full h-[calc(100vh-100px)]">
        <Routes>
          <Route path="/" element={<h1>Welcome to Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/productInfo/:id" element={<ProductOverview/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/products" element={<Product/>} />
        </Routes>
      </div>
    </div>
  );
}
