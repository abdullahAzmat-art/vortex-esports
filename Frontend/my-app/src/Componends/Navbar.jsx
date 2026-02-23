import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [trainingDropdown, setTrainingDropdown] = useState(false);

  // Simulating role - in your app this comes from localStorage
  const role = sessionStorage.getItem("role"); // Change to null to test non-admin view

  const logouts = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
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
        <Link to="/about" onClick={() => setOpen(false)} className="hover:text-indigo-400 transition">
          About us
        </Link>
        <Link to="/announcements" onClick={() => setOpen(false)} className="hover:text-indigo-400 transition">
          Announcements
        </Link>
        <Link to="/tournaments" onClick={() => setOpen(false)} className="hover:text-indigo-400 transition">
          Tournaments
        </Link>

        {/* TRAINING DROPDOWN */}
        <div
          className="relative"
          onMouseEnter={() => setTrainingDropdown(true)}
          onMouseLeave={() => setTrainingDropdown(false)}
        >
          <button
            className="px-3 rounded hover:text-indigo-400 transition-all duration-300"
          >
            Training ▼
          </button>

          <ul
            className={`absolute md:left-auto left-0 md:right-0 mt-2 w-52 bg-black/90 backdrop-blur-xl rounded-lg shadow-lg border border-gray-800 overflow-hidden z-50 transition-all duration-300 ease-out origin-top ${trainingDropdown
              ? 'opacity-100 scale-100 translate-y-0 visible'
              : 'opacity-0 scale-95 -translate-y-2 invisible'
              }`}
          >
            <Link to="/training/framedata" onClick={() => { setTrainingDropdown(false); setOpen(false); }}>
              <li className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-all duration-200 hover:pl-6">
                <span className="flex items-center gap-2">
                  <span className="text-indigo-400">📊</span>
                  Frame Data
                </span>
              </li>
            </Link>
            <Link to="/training/sidestepping" onClick={() => { setTrainingDropdown(false); setOpen(false); }}>
              <li className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-all duration-200 hover:pl-6">
                <span className="flex items-center gap-2">
                  <span className="text-purple-400">↔️</span>
                  Sidestepping
                </span>
              </li>
            </Link>
            <Link to="/training/heatrage" onClick={() => { setTrainingDropdown(false); setOpen(false); }}>
              <li className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-all duration-200 hover:pl-6">
                <span className="flex items-center gap-2">
                  <span className="text-orange-400">🔥</span>
                  Heat & Rage
                </span>
              </li>
            </Link>
          </ul>
        </div>


        {/* ADMIN DROPDOWN */}
        {role == "admin" && (
          <div
            className="relative"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <button
              className="px-3 rounded hover:text-indigo-400 transition-all duration-300"
            >
              Admin ▼
            </button>

            <ul
              className={`absolute md:left-auto left-0 md:right-0 mt-2 w-72 md:w-[450px] bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 transition-all duration-300 ease-out origin-top grid grid-cols-1 md:grid-cols-2 p-2 gap-1 ${dropdown
                ? 'opacity-100 scale-100 translate-y-0 visible'
                : 'opacity-0 scale-95 -translate-y-2 invisible'
                }`}
            >
              <Link to="/users" onClick={() => { setDropdown(false); setOpen(false); }}>
                <li className="px-4 py-3 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl bg-blue-500/20 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">👥</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">View Users</span>
                      <span className="text-[10px] text-gray-400">Manage community</span>
                    </div>
                  </div>
                </li>
              </Link>
              <Link to="/tournamentadd" onClick={() => { setDropdown(false); setOpen(false); }}>
                <li className="px-4 py-3 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl bg-green-500/20 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">➕</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">Add Tournament</span>
                      <span className="text-[10px] text-gray-400">Create new event</span>
                    </div>
                  </div>
                </li>
              </Link>
              <Link to="/viewtournament" onClick={() => { setDropdown(false); setOpen(false); }}>
                <li className="px-4 py-3 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl bg-purple-500/20 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">🏆</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">View Tournament</span>
                      <span className="text-[10px] text-gray-400">Manage events</span>
                    </div>
                  </div>
                </li>
              </Link>
              <Link to="/tournament-registrations" onClick={() => { setDropdown(false); setOpen(false); }}>
                <li className="px-4 py-3 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl bg-cyan-500/20 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">📝</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">Registrations</span>
                      <span className="text-[10px] text-gray-400">Player entries</span>
                    </div>
                  </div>
                </li>
              </Link>
              <Link to="/announcementadd" onClick={() => { setDropdown(false); setOpen(false); }}>
                <li className="px-4 py-3 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl bg-yellow-500/20 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">📢</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">Add News</span>
                      <span className="text-[10px] text-gray-400">Post announcements</span>
                    </div>
                  </div>
                </li>
              </Link>
              <Link to="/viewannouncement" onClick={() => { setDropdown(false); setOpen(false); }}>
                <li className="px-4 py-3 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl bg-indigo-500/20 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">📋</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">View News</span>
                      <span className="text-[10px] text-gray-400">History & edits</span>
                    </div>
                  </div>
                </li>
              </Link>
              <div
                className="col-span-1 md:col-span-2 mt-2 pt-2 border-t border-white/5"
                onClick={logouts}
              >
                <li className="px-4 py-3 hover:bg-red-500/20 text-red-400 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 group">
                  <span className="text-xl group-hover:rotate-12 transition-transform">🚪</span>
                  <span className="font-bold">Logout Session</span>
                </li>
              </div>
            </ul>
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