import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import axios from 'axios';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password) {
      setMessage("All fields are required!");
      return;
    }
  
    setMessage("logged in successfully");
  };

  const handleRegister =async (e)=>{
    e.preventDefault();
    try {
      const {data}= await axios.post("http://localhost:4002/user/login",{
        email,
        password
      },{
        withCredentials:true,
        headers:{
          "Content-Type": "application/json"
        }
      })
      console.log(data)
      localStorage.setItem("jwt",data.token);
      setEmail("")
      setPassword("")
      navigate("/")
    } catch (error) {
      console.log(error)
      alert(error.response.data.error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleRegister}>
        {message && <p className="text-center text-blue-600">{message}</p>} 


        <div className="mb-4"> Email
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4"> Password
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
          onClick={handleSignup}
        >
          Login
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          New account{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
 