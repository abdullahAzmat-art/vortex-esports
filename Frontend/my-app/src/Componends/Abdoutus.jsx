import React from 'react';
import { FaTrophy, FaUsers, FaGamepad } from "react-icons/fa";

const Aboutus = () => {
  return (
    <section id='about' className='aboutus px-4 sm:px-8 md:px-12 lg:px-20'>
      <div className="w-full min-h-screen rounded-2xl text-white py-16 sm:py-20 px-4 sm:px-8 md:px-12 bg-black/40 border-purple-600/30 flex items-center justify-center backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <h1 data-aos="fade-up" className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide text-white drop-shadow-lg">
            About VORTX
          </h1>

          <p data-aos="fade-up" className="mt-5 sm:mt-6 text-gray-200 text-center text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            VORTX isn’t just a gaming platform — it’s a proving ground.
            Every battle matters. Every kill counts. Every victory builds your legacy.
            Challenge the best, earn real rewards, and showcase your skill.
          </p>

          {/* Divider */}
          <div data-aos="fade-up" className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto my-8 sm:my-10 rounded-full"></div>

          {/* Features Grid */}
          <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">

            {/* Card 1 */}
            <div className="p-6 sm:p-8 rounded-xl border border-purple-600/40 bg-black/40 backdrop-blur-lg hover:scale-105 transition-transform shadow-lg text-center">
              <FaTrophy className="text-4xl sm:text-5xl mx-auto text-purple-400 drop-shadow-md" />
              <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-purple-300">Tournaments</h3>
              <p className="mt-2 text-gray-400 text-sm sm:text-base">
                Compete in weekly & monthly esports tournaments with real rewards.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 sm:p-8 rounded-xl border border-blue-600/40 bg-black/40 backdrop-blur-lg hover:scale-105 transition-transform shadow-lg text-center">
              <FaGamepad className="text-4xl sm:text-5xl mx-auto text-blue-400 drop-shadow-md" />
              <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-blue-300">Game Modes</h3>
              <p className="mt-2 text-gray-400 text-sm sm:text-base">
                Play Solo, Duo, or Squad — rank up and prove your skill.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 sm:p-8 rounded-xl border border-pink-600/40 bg-black/40 backdrop-blur-lg hover:scale-105 transition-transform shadow-lg text-center">
              <FaUsers className="text-4xl sm:text-5xl mx-auto text-pink-400 drop-shadow-md" />
              <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-pink-300">Community</h3>
              <p className="mt-2 text-gray-400 text-sm sm:text-base">
                Join a growing network of gamers, teams, and streamers worldwide.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Aboutus;
