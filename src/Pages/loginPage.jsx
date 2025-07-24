import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data == null) {
          toast.error(res.data.message);
          return;
        }

        console.log(res.data);
        localStorage.setItem("token", res.data.token);

        if (res.data.user.type === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid email or password");
      });
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#FAF7F3]">
      <div className="bg-[#F0E4D3] p-10 rounded-2xl shadow-lg w-[400px] flex flex-col gap-4 items-center">
        
         <img
          src="/images.png"
          alt="Logo"
          className="w-20 h-20 mb-2"
        />

        <h2 className="text-3xl font-semibold text-[#c8611d] mb-4">Login</h2>

        <div className="w-full">
          <label className="text-[#c8611d] font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8611d]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-[#c8611d] font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8611d]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-[#c8611d] hover:bg-[#a95116] text-white py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
