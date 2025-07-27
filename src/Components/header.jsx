import React from "react";
import { Link } from "react-router-dom";
import { BsCart} from "react-icons/bs";

export default function Header() {
    return (
        <header className="bg-primary w-full h-[80px] relative flex justify-center items-center">
            <img src='/images.png' className="cursor-pointer h-full rounded full absolute left-[10px]"></img>

            <div className="flex items-center w-[800px] justify-evenly font-semibold">
            <Link to="/" className="text-accent font-bold text-2xl  hover:border-b border-b-accent">Home</Link>
            <Link to="/Home/products" className="text-accent font-bold text-2xl hover:border-b border-b-accent ">Products</Link>
            <Link to="/Home/aboutUs" className="text-accent font-bold text-2xl hover:border-b border-b-accent ">About Us</Link>
            <Link to="/Home/contactUs" className="text-accent font-bold text-2xl hover:border-b border-b-accent ">Contact Us</Link>
           
            </div>

            <div className="flex relative justify-evenly w-[400px] left-[200px] font-semibold">
            <Link to="/Home/cart" className="text-black font-bold text-2xl hover:p-1 "><BsCart/></Link>
            <Link to="/login" className="loginPage text-black font-bold text-xl hover:p-1  ">Login</Link>
            </div>
        </header>
    );
}