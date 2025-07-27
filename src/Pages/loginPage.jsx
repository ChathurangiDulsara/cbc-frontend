import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const googleLogin = useGoogleLogin({
      onSuccess: (res)=>{
        console.log(res)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/google",{
          token : res.access_token
        }).then(
          (res)=>{
            if(res.data.message == "User created"){
              toast.success("Your account is created now you can login via google.")
            }else{
              localStorage.setItem("token",res.data.token)
              if(res.data.user.type == "admin"){
                window.location.href = "/admin"
              }else{
                window.location.href = "/"
              }
            }
          }
        )
      }
    })

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

  function loginWithGoogle() {
   
    toast.success("Google login functionality to be implemented");
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full p-2 pr-10 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8611d]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-[#c8611d] focus:outline-none"
            >
              {showPassword ? (
                
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

         
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#c8611d] border-gray-300 rounded focus:ring-[#c8611d]"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-[#c8611d]">
                Remember me
              </label>
            </div>
            <a href="/forgot-password" className="text-sm text-[#c8611d] hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            onClick={login}
            className="w-full bg-[#c8611d] hover:bg-[#a95116] text-white py-2 rounded-md transition duration-200 mb-4"
          >
            Login
          </button>

          <button
            onClick={()=>{googleLogin()}}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-md transition duration-200 mb-4 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Login with Google
          </button>

          
          <p className="text-center text-sm text-[#c8611d]">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
