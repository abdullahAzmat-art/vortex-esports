import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Userbro = () => {
  const [users, setUsers] = useState([]);

  const getthedata = async () => {
    try {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/getuser`);
      const parseddata = await data.json();
      setUsers(parseddata);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    getthedata();
  }, []);

  const uptadetherole = async (id, currentRole) => {
    try {
      const newRole = currentRole === "user" ? "admin" : "user";

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/updateuser/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (response.ok) {
        toast.success("Role Updated ✅", { position: "top-right", theme: "dark" });
        getthedata(); // refresh UI
      }
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  const deleteit = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/deleteTournament/${id}`,
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
          className="text-center text-white text-4xl md:text-6xl font-extrabold uppercase"
          data-aos="fade-up"
        >
          Handle VORTX Users
        </h1>

        <div
          data-aos="fade-up"
          className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto my-4 rounded-full"
        />

        <div className="overflow-x-auto bg-black/10 backdrop-blur-3xl" data-aos="fade-up">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-white text-left border border-white/40 font-extrabold capitalize ">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Change Role</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((ele) => (
                <tr
                  key={ele._id}
                  className="border text-white border-white/40 font-bold rounded-2xl capitalize"
                >
                  <td className="px-4 py-2">{ele.name}</td>
                  <td className="px-4 py-2">{ele.email}</td>
                  <td className="px-4 py-2">{ele.role}</td>

                  <td
                    className="px-4 py-2 cursor-pointer hover:text-yellow-300"
                    onClick={() => uptadetherole(ele._id, ele.role)}
                  >
                    {ele.role === "user" ? "Make Admin" : "Remove Admin"}
                  </td>

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

export default Userbro;
