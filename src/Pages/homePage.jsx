
import { Link } from 'react-router-dom';
import React from 'react';

export default function HomePage() {
  return (
    <div className='top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-100'>
      <h1>Welcome to Our Website</h1>
    
      <button className='bg-yellow-500 p-8'>Get Started</button>
      {/* <Link to="/login" className="loginPage">Login</Link> */}
    </div>
  );
}
