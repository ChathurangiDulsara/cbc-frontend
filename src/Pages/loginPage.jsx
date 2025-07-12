import "./loginPage.css";
import { Link, Links } from "react-router-dom";




export default function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label name="username">
          Username:
          <input type="text" name="username" placeholder="Enter your name"/>
        </label>
        <br />
        <label name="password">
          Password:
          <input type="password" name="password" placeholder="Enter your Password" />
        </label>
        <br />
        <button type="submit" name="submit ">Login</button>
      </form>
      <Link to="/" className="homePage">Go to Home</Link>

      
    </div>
  );
}