
import { Link } from "react-router-dom";
import { use, useState } from "react";
import axios from "axios";


export default function LoginPage() {


  function login(){
    axios.post("http://localhost:5000/api/login",
      {
        email: email,   
        password: password
  }).then((res) => {
    console.log(res.data)
    localStorage.setItem("token", res.data.token);
  }) 
    
  }

  const {email,setEmail}= useState("Your Email");
  const {password,setPassword}= useState("Your Password");


  return (
    <div className=' w-full h-screen bg-red-900 flex flex-col items-center justify-center'>
      <div className='bg-white p-8 rounded shadow-md w-[450px] h-[450px]'>

        <input type="text" placeholder="Email" className='w-full p-2 mb-4 border border-gray-300 rounded'
          value={email} onChange={(e) => setEmail(e.target.value)} /> 
        <input type="password" placeholder="Password" className='w-full p-2 mb-4 border border-gray-300 rounded'
          value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login} className='w-full bg-blue-500 text-white p-2 rounded'>Login</button>

      
      <Link to="/" className="homePage">Go to Home</Link>
     </div>
      
    </div>
  );
}