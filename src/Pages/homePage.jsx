import './HomePage.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Our Website</h1>
      <p>
        This is a simple home page. Explore our features and enjoy your stay!
      </p>
      <button className='bg-yellow-500 p-8'>Get Started</button>
      <Link to="/login" className="loginPage">Login</Link>
    </div>
  );
}
