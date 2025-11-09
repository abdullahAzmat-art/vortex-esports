import React, { useEffect, useState } from "react";
import AOS from "aos";

const Announcement = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    gettheaccouncement();
  }, []);

  const gettheaccouncement = async () => {
    try {
      const data = await fetch("http://localhost:7700/api/v1/getacc");
      const parseddata = await data.json();
      console.log(parseddata , "jfj");

      if (parseddata && parseddata.length > 0) {
        setItems(parseddata);
      } else {
        // ✅ Set default announcements if no data
        setItems([
          "Tournament starts soon",
          "Stay Tuned for updates",
          "Join & Compete!"
        ]);
      }
    } catch (err) {
      // ✅ Also fallback if API fails
      setItems([
        "Tournament starts soon",
        "Stay Tuned for updates",
        "Join & Compete!"
      ]);
    }
  };


  const renderedItems = items.map((t, i) => (
    <div className="conn" key={i}>
      <h1>{t.title}</h1>
      <div className="gola" />
    </div>
  ));

  return (
    <section id="announcement" className="announcement-section md:px-20 py-12 px-14 text-white">
      <div className="backdrop-blur-2xl bg-black/40 rounded-2xl p-6 py-16 shadow-xl">
        <h1
          className="text-center lg:text-7xl text-2xl sm:text-2xl md:text-6xl font-extrabold uppercase mt-6"
          data-aos="fade-up"
        >
          Announcement
        </h1>

        <div
          data-aos="fade-up"
          className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto my-4 rounded-full"
        />

        {/* Marquee Section */}
        <div
          data-aos="fade-up"
          className="main-heading rounded-2xl p-3"
          aria-hidden="true"
        >
          <div className="track">
            {renderedItems}
            {renderedItems}
          </div>
        </div>

        {/* Screen Reader Accessible Version */}
        <div className="sr-only" aria-live="polite">
          {items.join(" • ")}
        </div>
      </div>
    </section>
  );
};

export default Announcement;
