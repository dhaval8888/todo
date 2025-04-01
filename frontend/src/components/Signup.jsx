import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import axios from 'axios';


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !email || !password) {
      setMessage("All fields are required!");
      return;
    }
  
    setMessage("Signup successful! You can now log in.");
  };

  const handleRegister =async (e)=>{
    e.preventDefault();
    try {
      const {data}= await axios.post("http://localhost:4002/user/signup",{
        username,
        email,
        password
      },{
        withCredentials:true,
        headers:{
          "Content-Type": "application/json"
        }
      })
      console.log(data)
      alert(data.message)
      localStorage.setItem("jwt",data.token);
      setUsername("")
      setEmail("")
      setPassword("")
      navigate("/login")
    } catch (error) {
      console.log(error)
      alert(error.response.data.error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleRegister}>
        {message && <p className="text-center text-blue-600">{message}</p>} 

        <div className="mb-4"> Username
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
 