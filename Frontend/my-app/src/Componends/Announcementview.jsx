import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Announcementview = () => {
  const [users, setUsers] = useState([]);

  const getthedata = async () => {
    try {
      const data = await fetch("http://localhost:7700/api/v1/getacc");
      const parseddata = await data.json();
      setUsers(parseddata);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    getthedata();
  }, []);


  const deleteit = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:7700/api/v1/deleteacc/${id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        toast.success("User Deleted 🗑️", { position: "top-right", theme: "dark" });
        getthedata();
      }
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <div className="px-20 mt-20">
      <div className="bg-black/40 backdrop-blur-2xl shadow-xl rounded-2xl p-10 w-full text-white">
        <h1
          className="text-center text-white text-1xl sm:text-2xl md:text-6xl font-extrabold uppercase"
          data-aos="fade-up"
        >
          Handle VORTX Announcement
        </h1>

        <div
          data-aos="fade-up"
          className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto my-4 rounded-full"
        />

        <div className="overflow-x-auto bg-black/10 backdrop-blur-3xl" data-aos="fade-up">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-white text-left border border-white/40 font-extrabold capitalize ">
                <th className="px-4 py-2">Title</th>
        
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((ele) => (
                <tr
                  key={ele._id}
                  className="border text-white border-white/40 font-bold rounded-2xl capitalize"
                >
             
                  <td className="px-4 py-2">{ele.title}</td>

                

                  <td
                    className="px-6 py-2 text-red-500 text-4xl text-center cursor-pointer"
                    onClick={() => deleteit(ele._id)}
                  >
                    <MdOutlineDeleteOutline />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Announcementview;
