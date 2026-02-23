import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaGamepad, FaTrophy, FaCalendarAlt, FaUsers, FaMoneyBillWave } from "react-icons/fa";

const TournamentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                console.log("Fetching tournament with ID:", id);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/getTournament/${id}`);
                const data = await response.json();
                console.log("Tournament data received:", data);

                // Check if the data is nested or direct
                if (data && data.tournament) {
                    setTournament(data.tournament);
                } else if (data && data._id) {
                    setTournament(data);
                } else {
                    console.error("Unexpected data format:", data);
                    setError("Tournament details not found.");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tournament:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        if (id) {
            fetchTournament();
        }
    }, [id]);

    const getImageUrl = (path) => {
        if (!path || typeof path !== 'string') return "https://via.placeholder.com/800x400?text=No+Image";
        if (path.startsWith("http") || path.startsWith("https")) {
            return path;
        }
        return `${import.meta.env.VITE_API_URL}/${path.replace(/\\/g, "/")}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error || !tournament) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
                <h1 className="text-3xl font-bold">{error || "Tournament Not Found"}</h1>
                <button onClick={() => navigate('/')} className="px-6 py-2 bg-indigo-600 rounded-full font-bold">Go Back</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 sm:pt-24 pb-12 px-2 sm:px-6 md:px-12 lg:px-20 text-white relative">
            <div className="max-w-6xl mx-auto bg-black/60 backdrop-blur-3xl rounded-3xl overflow-hidden shadow-2xl border border-white/10" >


                {/* Header Info Section (Below Image) */}
                <div className="p-6 sm:p-10 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-3">
                                {tournament.game && (
                                    <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        <FaGamepad /> {tournament.game}
                                    </span>
                                )}
                                {tournament.prizePool && (
                                    <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        <FaTrophy /> {tournament.prizePool}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none text-white break-words">
                                {tournament.title}
                            </h1>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <button
                                onClick={() => navigate(`/register-tournament/${tournament._id}`)}
                                className="w-full sm:px-8 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition duration-300 uppercase tracking-widest shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="p-6 sm:p-10 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-xl font-bold uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-3">
                                <span className="w-8 h-px bg-indigo-500/30"></span>
                                About Tournament
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {tournament.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center gap-4 group hover:bg-white/10 transition duration-300">
                                <div className="p-4 bg-indigo-500/20 rounded-xl text-indigo-400 group-hover:scale-110 transition duration-300">
                                    <FaCalendarAlt size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[10px] sm:text-xs uppercase font-bold tracking-widest">Date & Time</p>
                                    <p className="text-base sm:text-lg font-bold">{tournament.tournamentdate}</p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center gap-4 group hover:bg-white/10 transition duration-300">
                                <div className="p-4 bg-purple-500/20 rounded-xl text-purple-400 group-hover:scale-110 transition duration-300">
                                    <FaUsers size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[10px] sm:text-xs uppercase font-bold tracking-widest">Max Teams</p>
                                    <p className="text-base sm:text-lg font-bold">{tournament.maxTeams} Teams</p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center gap-4 group hover:bg-white/10 transition duration-300">
                                <div className="p-4 bg-green-500/20 rounded-xl text-green-400 group-hover:scale-110 transition duration-300">
                                    <FaUsers size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[10px] sm:text-xs uppercase font-bold tracking-widest">Team Size</p>
                                    <p className="text-base sm:text-lg font-bold">{tournament.maxMember} Players</p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center gap-4 group hover:bg-white/10 transition duration-300">
                                <div className="p-4 bg-red-500/20 rounded-xl text-red-400 group-hover:scale-110 transition duration-300">
                                    <FaMoneyBillWave size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[10px] sm:text-xs uppercase font-bold tracking-widest">Entry Fee</p>
                                    <p className="text-base sm:text-lg font-bold">{tournament.entryFee}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-8 rounded-3xl border border-white/10 shadow-xl">
                            <h3 className="text-lg font-bold mb-6 text-center uppercase tracking-widest text-indigo-300">Quick Actions</h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => navigate(`/tournament-brackets/${tournament._id}`)}
                                    className="w-full py-3 sm:py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition duration-300 uppercase tracking-widest flex items-center justify-center gap-2 text-sm sm:text-base"
                                >
                                    View Brackets
                                </button>

                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Registration Policy</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Players must ensure all registration details are correct. Check-in is required 30 minutes before the start time. Results must be submitted immediately after matches.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentDetails;
