import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addanouncement = () => {
  const [form, setForm] = useState({title: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()

  const handlebutton = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/createacc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      console.log(result);

      if (response.ok) {
        toast.success("Announcement add Successful 🎉", {
          position: "top-right",
          theme: "dark",
        });

      } else {
        toast.error(result.message || "Announcement Failed ❌", {
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
Add Announcement in Vortx
        </h1>

      

        {/* Email */}
        <div className="relative mb-6">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer"
            required
          />
          <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
            Announcement Title
          </label>
        </div>

    

        {/* Button */}
        <button
          className="w-full py-3 rounded-lg bg-indigo-600 hover:opacity-90 transition font-semibold text-white uppercase tracking-wide"
          onClick={handlebutton}
        >
        Add It
        </button>

      </div>
    </div>
  );
};

export default Addanouncement;
