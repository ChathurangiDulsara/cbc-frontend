
import { Link } from 'react-router-dom';
import React from 'react';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Our Website</h1>
      <p>
        This is a simple home page. Explore our features and enjoy your stay!
      </p>
      <button className='bg-yellow-500'>Get Started</button>
      <Link to="/login" className="loginPage">Login</Link>
    </div>
  );
}
