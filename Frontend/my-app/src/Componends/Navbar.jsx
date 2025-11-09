import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  // Simulating role - in your app this comes from localStorage
  const role = localStorage.getItem("role"); // Change to null to test non-admin view

  const logouts = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
    console.log("Logout clicked");
  };

  return (
    <header
      data-aos="fade-up"
      className="flex items-center text-white justify-between px-6 py-3 md:py-4 shadow max-w-5xl mt-4 rounded-full mx-auto w-full backdrop-blur-xl bg-black/40 relative z-50"
    >
      <Link to="/">
        <h1 className="text-4xl p-1 font-extrabold addthefont">Vortx</h1>
      </Link>

      {/* Hamburger for Mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white text-3xl z-50"
      >
        {open ? "✕" : "☰"}
      </button>

      <nav
        className={`flex md:flex-row flex-col 
        md:static absolute md:gap-10 gap-6 text-white addthefont 
        md:w-auto w-full left-0 px-6 md:px-0 py-5 md:py-0 
        transition-all duration-300 ease-in-out md:items-center
        ${open ? "top-full mt-2 bg-black/90 backdrop-blur-xl rounded-3xl" : "top-[-500px] md:top-0"}
        `}
      >
          <Link to="/" onClick={() => setOpen(false)} className="hover:text-indigo-400 transition">
          Home
        </Link>
        <a href="#about" onClick={() => setOpen(false)} className="hover:text-indigo-400 transition">
          About us
        </a>
        <a href="#announcement" onClick={() => setOpen(false)} className="hover:text-indigo-400 transition">
          Announcements
        </a>
        <a href="#tournament" onClick={() => setOpen(false)} className="hover:text-indigo-400 transition">
          Tournaments
        </a>
      

        {/* ADMIN DROPDOWN */}
        {role == "admin" && (
          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="px-3 rounded hover:text-indigo-400 transition"
            >
              Admin ▼
            </button>

            {dropdown && (
              <ul className="absolute md:left-auto left-0 md:right-0 mt-2 w-52 bg-black/90 backdrop-blur-xl rounded-lg shadow-lg border border-gray-800 overflow-hidden">
                <Link to="/users">
                  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer transition">
                    View Users
                  </li>
                </Link>
                <Link to="/tournamentadd">
                  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer transition">
                    Add Tournament
                  </li>
                </Link>
                <Link to="/viewtournament">
                  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer transition">
                    View Tournament
                  </li>
                </Link>
                <Link to="/announcementadd">
                  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer transition">
                    Add Announcement
                  </li>
                </Link>
                <Link to="/viewannouncement">
                  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer transition">
                    View Announcement
                  </li>
                </Link>
                <Link>
                  <li
                    className="px-4 py-2 hover:bg-red-500/20 text-red-400 cursor-pointer transition"
                    onClick={logouts}
                  >
                    Logout
                  </li>
                </Link>
              </ul>
            )}
          </div>
        )}

        {/* Sign In Mobile */}
        <Link
          to="/login"
          className="md:hidden bg-indigo-600 py-2 px-5 rounded-full text-sm font-medium hover:bg-indigo-700 transition addthefont text-center"
        >
          Sign In
        </Link>
      </nav>

      {/* Sign In Desktop Only */}
      <div className="md:flex hidden">
        <Link
          to="/login"
          className="bg-indigo-600 py-2 px-5 rounded-full text-sm font-medium hover:bg-indigo-700 transition addthefont"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Navbar;