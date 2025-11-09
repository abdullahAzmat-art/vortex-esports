import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const ViewTournament = () => {
  const [cardsData, setCardsData] = useState([]);

  const getthedata = async () => {
    try {
      const data = await fetch("http://localhost:7700/api/v1/getTournament");
      const parseddata = await data.json();

      const tournaments = Array.isArray(parseddata)
        ? parseddata
        : Array.isArray(parseddata.tournament)
        ? parseddata.tournament
        : parseddata.tournament
        ? [parseddata.tournament]
        : [];

      setCardsData(tournaments);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    getthedata();
  }, []);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const threshold = 12;

  const handleMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -threshold, y: x * threshold });
  };

  const deleteit = async (id) => {
    try {
      const response = await fetch(`http://localhost:7700/api/v1/deleteTournament/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Tournament Deleted 🎉", {
          position: "top-right",
          theme: "dark",
        });
        getthedata();
      }
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 mt-20">
      <div className="bg-black/40 backdrop-blur-2xl shadow-xl rounded-2xl p-6 sm:p-10 w-full text-white">
        <h1 className="text-center text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase">
          Handle VORTX Tournament
        </h1>

        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto my-4 rounded-full" />

        {cardsData.length === 0 && (
          <p className="text-center text-gray-300 mt-10 text-lg">
            No tournament available right now.
          </p>
        )}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-10">
          {cardsData.map((ele, index) => (
            <div key={index}>
              <div
                className="relative rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer w-full bg-black/40 backdrop-blur-2xl"
                onMouseMove={handleMove}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <img
                  src={`http://localhost:7700/uploads/${ele.picture}`}
                  alt="Tournament"
                  className="w-full h-48 sm:h-60 md:h-64 lg:h-72 object-cover"
                />

                <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold">
                  {ele.title}
                </h3>

                <h3 className="mt-1 px-4 pt-1 mb-1 text-lg font-semibold">
                  Prize Pool: <b>{ele.prizePool}</b>
                </h3>

                <p className="text-sm px-4 pb-3 text-white">
                  {ele.description?.slice(0, 70)}
                </p>

                <p className="text-sm px-4 pb-2 text-gray-300">
                  Game: {ele.game} | Entry Fee: {ele.entryFee}
                </p>

                <p className="text-sm px-4 pb-8 text-gray-300">
                  Date: {ele.tournamentdate} | Teams: {ele.maxTeams}
                </p>

                <button
                  className="absolute top-3 right-3 text-red-600 text-3xl"
                  onClick={() => deleteit(ele._id)}
                >
                  <MdOutlineDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ViewTournament;
