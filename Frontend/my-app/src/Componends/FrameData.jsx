import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FrameData = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const videos = [
    {
      id: 1,
      title: "Understanding Frame Data Basics",
      url: "https://www.youtube.com/embed/acHcgcf1KEs?si=aq0NTGHXpFeYiD05",
      description:
        "Learn the fundamentals of frame data in fighting games. Understand startup frames, active frames, and recovery frames to gain a competitive edge.",
    },
    {
      id: 2,
      title: "Frame Advantage & Disadvantage",
      url: "https://www.youtube.com/embed/A0ZTpQZpclw?si=0jA3LVk000hgjCJV",
      description:
        "Master the concept of frame advantage and disadvantage. Learn how to capitalize on plus frames and defend against minus frames effectively.",
    },
    {
      id: 3,
      title: "Punishing with Frame Data",
      url: "https://www.youtube.com/embed/r5_mx938gX0?si=X1DUf0wOZvCBoJST",
      description:
        "Discover how to use frame data to punish your opponent's mistakes. Learn optimal punish combos for different frame disadvantages.",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 addthefont">
            Frame Data
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master the science behind every move. Frame data is the key to understanding
            timing, punishment, and creating unbreakable pressure.
          </p>
        </div>

        {/* Introduction Card */}
        <div
          className="backdrop-blur-xl bg-black/40 border border-indigo-400/30 rounded-3xl p-8 md:p-12 mb-12  shadow-2xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-3xl font-bold text-white mb-4 addthefont">
            What is Frame Data?
          </h2>
          <p className="text-gray-200 text-lg leading-relaxed mb-4">
            Frame data refers to the numerical properties of moves in fighting games,
            measured in frames (1/60th of a second). Every action in the game has three
            main components:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6 rounded-2xl border border-indigo-400/30">
              <h3 className="text-xl font-bold text-indigo-300 mb-2">Startup Frames</h3>
              <p className="text-gray-300">
                The number of frames before a move becomes active and can hit the opponent.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-400/30">
              <h3 className="text-xl font-bold text-purple-300 mb-2">Active Frames</h3>
              <p className="text-gray-300">
                The number of frames during which the move can connect with the opponent.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 p-6 rounded-2xl border border-pink-400/30">
              <h3 className="text-xl font-bold text-pink-300 mb-2">Recovery Frames</h3>
              <p className="text-gray-300">
                The number of frames after the move where you cannot perform another action.
              </p>
            </div>
          </div>
        </div>

        {/* Video Sections */}
        <div className="space-y-12">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 items-center`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Video Player */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl bg-black/40">
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="w-full md:w-1/2">
                <div className="backdrop-blur-xl bg-black/40 border border-indigo-400/30 rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-bold text-indigo-400 addthefont">
                      {String(video.id).padStart(2, "0")}
                    </span>
                    <div className="h-1 flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 addthefont">
                    {video.title}
                  </h3>
                  <p className="text-gray-200 text-lg leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div
          className="mt-16 backdrop-blur-xl bg-black/40 rounded-3xl p-8 md:p-12 border border-indigo-400/30 shadow-2xl"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-white mb-6 addthefont">
            Pro Tips for Using Frame Data
          </h2>
          <ul className="space-y-4 text-gray-200 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 text-2xl">✓</span>
              <span>
                Always check your character's fastest move to know your best punishment option
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 text-2xl">✓</span>
              <span>
                Memorize frame data for commonly used moves to make split-second decisions
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 text-2xl">✓</span>
              <span>
                Use plus frames to maintain pressure and force your opponent into defensive situations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 text-2xl">✓</span>
              <span>
                Practice in training mode to internalize frame data through muscle memory
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FrameData;
