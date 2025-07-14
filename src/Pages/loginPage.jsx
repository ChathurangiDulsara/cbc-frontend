
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";


export default function LoginPage() {
  const [email,setEmail]= useState("Your Email");
  const [password,setPassword]= useState("");


  function login(){
    // console.log("Login function called");
    axios.post("http://localhost:5000/api/users/login",
      {
        email: email,   
        password: password

  }).then((res) => {
    if(res.data==null){
      toast.error(res.data.message)
      // alert("Invalid email or Password"+res.data.message);
      return;

    }
    toast.success("Login Successful")
    console.log(res.data)
    localStorage.setItem("token", res.data.token);

    if(res.data.user.type=="admin"){
      window.location.href = "/admin";
  }else{
    window.location.href = "/";
  }
}
  )
}

    
  return (
    <div className=' w-full h-screen bg-red-900 flex flex-col items-center justify-center'>
      <div className='bg-white p-8 rounded shadow-md w-[450px] h-[450px] flex flex-col items-center justify-center'>

        <span>Email</span>

        <input type="text" placeholder="Email" className='w-full p-2 mb-4 border border-gray-300 rounded'
          defaultValue={email} onChange={
            (e) => {
              setEmail(e.target.value)
            }
            }/>

        <span className="flex justify-start">Password</span>

        <input type="password" placeholder="Password" className='w-full p-2 mb-4 border border-gray-300 rounded '
          defaultValue={password} onChange={
            (e) => {
              setPassword(e.target.value)
            }
            }/>

          <button onClick={login} className='w-full bg-blue-500 text-white p-2 rounded'>Login</button>

    
     </div>
      
    </div>
  );
}