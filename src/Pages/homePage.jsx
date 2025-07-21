import { Routes, Route } from 'react-router-dom';
import Header from '../Components/header.jsx';
import ProductOverview from './Home/productInfo.jsx';
import LoginPage from './loginPage.jsx';

export default function HomePage() {
  return (
    <div className='w-full h-screen bg-secondary display relative'>
      <Header/>
      <div className="w-full h-[calc(100vh-100px)]">
        <Routes>
          <Route path="/" element={<h1>Welcome to Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/productInfo/:id" element={<ProductOverview/>} />
        </Routes>
      </div>
    </div>
  );
}
