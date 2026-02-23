import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const TournamentAdd = () => {
  const [form, setForm] = useState({
    title: "",
    game: "",
    maxMember: "",
    maxTeams: "",
    description: "",
    entryFee: "",
    prizePool: "",
    tournamentdate: "",
    tournamentType: "single",
  });

  const [picture, setPicture] = useState(null);

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlebutton = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (picture) {
      formData.append("picture", picture);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/createTournament`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Tournament Created 🎉", {
          position: "top-right",
          theme: "dark",
        });

        // Reset form after success ✅
        setForm({
          title: "",
          game: "",
          maxMember: "",
          maxTeams: "",
          description: "",
          entryFee: "",
          prizePool: "",
          tournamentdate: "",
          LinkstoLive: "",
          tournamentType: "single",
        });
        setPicture(null);
      } else {
        toast.error(result.message || "Error ❌", {
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
          Host a New Tournament
        </h1>

        {/* Title */}
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
            Title
          </label>
        </div>

        {/* Game */}
        <div className="relative mb-6">
          <input
            type="text"
            name="game"
            value={form.game}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer"
            required
          />
          <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
            Game Name
          </label>
        </div>

        {/* Max Teams & Members */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative mb-6">
            <input
              type="number"
              name="maxTeams"
              value={form.maxTeams}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer"
              required
            />
            <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
              Max Teams
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type="number"
              name="maxMember"
              value={form.maxMember}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer"
              required
            />
            <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
              Max Members
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="relative mb-6">
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer"
            required
          />
          <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
            Description
          </label>
        </div>

        {/* Entry Fee & Prize */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative mb-6">
            <input
              type="number"
              name="entryFee"
              value={form.entryFee}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer"
              required
            />
            <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
              Entry Fee
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              name="prizePool"
              value={form.prizePool}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer"
              required
            />
            <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
              Prize Pool
            </label>
          </div>
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            name="LinkstoLive"
            value={form.LinkstoLive}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer"
            required
          />
          <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
            Link
          </label>
        </div>

        {/* Tournament Type */}
        <div className="relative mb-6">
          <select
            name="tournamentType"
            value={form.tournamentType}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white appearance-none"
            required
          >
            <option value="single" className="bg-black text-white">Single Elimination</option>
            <option value="double" className="bg-black text-white">Double Elimination</option>
          </select>
          <label className="absolute left-0 -top-3 text-sm text-gray-400">
            Tournament Type
          </label>
        </div>

        {/* Date */}
        <div className="relative mb-6">
          <input
            type="text"
            name="tournamentdate"
            value={form.tournamentdate}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer"
            required
          />
          <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
            Tournament Date
          </label>
        </div>
        {/* Poster Upload */}
        <div className="relative mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full bg-transparent outline-none py-2 text-gray-300"
          />
        </div>



        <button
          className="w-full py-3 rounded-lg bg-indigo-600 hover:opacity-90 transition font-semibold text-white uppercase tracking-wide"
          onClick={handlebutton}
        >
          Create it!
        </button>

      </div>
    </div>
  );
};

export default TournamentAdd;
