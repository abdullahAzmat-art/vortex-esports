import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()

  const handlebutton = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      console.log(result);

      if (result.success == true) {
        toast.success("SignIn Successful 🎉", {
          position: "top-right",
          theme: "dark",
        });
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("role", result.user.role);
        window.location.href = "/";
      } else {
        toast.error(result.message || "SignIn Failed ❌", {
          position: "top-right",
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Server Error ❗", {
        position: "top-right",
        theme: "dark",
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4 py-20 min-h-screen">
      <ToastContainer />

      <div className="bg-black/40 backdrop-blur-2xl border border-white/20 shadow-xl rounded-2xl p-10 w-full max-w-md text-white">

        <h1 className="text-3xl font-bold text-center mb-8 uppercase tracking-wide bg-clip-text text-transparent bg-white">
          Welcome Back
        </h1>



        {/* Email */}
        <div className="relative mb-6">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer"
            required
          />
          <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
            Email Address
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-8">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer"
            required
          />
          <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
            Password
          </label>
        </div>

        {/* Button */}
        <button
          className="w-full py-3 rounded-lg bg-indigo-600 hover:opacity-90 transition font-semibold text-white uppercase tracking-wide"
          onClick={handlebutton}
        >
          Sign In
        </button>

        {/* Login Redirect */}
        <p className="text-center mt-4 text-gray-300 text-sm">
          Create the Account {" "}
          <Link to={"/signup"} className="text-indigo-300 hover:underline cursor-pointer">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
