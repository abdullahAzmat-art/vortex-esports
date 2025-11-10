import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black/60 backdrop-blur-xl border-t border-purple-600/30 text-white mt-32">
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col items-center">

        {/* Brand Logo */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            alt="VORTX"
            className="h-14 drop-shadow-[0_0_20px_rgb(168,85,247,0.7)] rounded-2xl"
            src="/Gemini_Generated_Image_ywhnikywhnikywhn.png" // ✅ Replace with your logo path
          />
        </div>

        {/* Tagline */}
        <p className="text-center max-w-2xl text-sm md:text-base text-gray-300 leading-relaxed">
          VORTX Arena — The Battlefield for Gamers.  
          Compete. Dominate. Rise to the Top. 🎮🔥
        </p>

        {/* Socials */}
        <div className="flex gap-6 mt-6 text-xl">
          <a href="#" className="hover:text-purple-400 transition">🎮</a>
          <a href="#" className="hover:text-purple-400 transition">📷</a>
          <a href="#" className="hover:text-purple-400 transition">▶️</a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-purple-600/20">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-gray-400">
          © 2025 VORTX Arena. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
