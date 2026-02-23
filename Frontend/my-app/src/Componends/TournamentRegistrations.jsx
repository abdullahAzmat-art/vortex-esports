import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TournamentRegistrations = () => {
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProof, setSelectedProof] = useState(null); // For modal
    const [sendingEmail, setSendingEmail] = useState(null); // Track which email is being sent

    // Fetch all tournaments
    const fetchTournaments = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/getTournament`);
            const data = await response.json();
            console.log(data)
            const tournamentArray = Array.isArray(data) ? data : [];
            setTournaments(tournamentArray);
        } catch (error) {
            console.error("Error fetching tournaments:", error);
            toast.error("Failed to load tournaments");
        }
    };

    // Fetch registrations for a specific tournament
    const fetchRegistrations = async (tournamentId, tournamentTitle) => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/getteam?tournamentId=${tournamentId}`
            );
            const data = await response.json();

            if (data.success) {
                setRegistrations(data.data || []);
                setSelectedTournament({ id: tournamentId, title: tournamentTitle });
            } else {
                toast.error("Failed to load registrations");
            }
        } catch (error) {
            console.error("Error fetching registrations:", error);
            toast.error("Error loading registrations");
        } finally {
            setLoading(false);
        }
    };

    // Send verification email
    const sendVerificationEmail = async (registrationId) => {
        try {
            setSendingEmail(registrationId);
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/sendemail/${registrationId}`
            );
            const data = await response.json();
            console.log(data)
            if (data.success) {
                toast.success("Verification email sent successfully!");
            } else {
                toast.error("Failed to send verification email");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            toast.error("Error sending verification email");
        } finally {
            setSendingEmail(null);
        }
    };

    // Delete registration
    const handleDeleteRegistration = async (registrationId) => {
        if (!window.confirm("Are you sure you want to delete this registration?")) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/registration/${registrationId}`, {
                method: "DELETE",
            });
            const data = await response.json();

            if (data.success) {
                toast.success("Registration deleted successfully");
                // Update local state to remove the deleted registration
                setRegistrations(registrations.filter(reg => reg._id !== registrationId));
            } else {
                toast.error(data.message || "Failed to delete registration");
            }
        } catch (error) {
            console.error("Error deleting registration:", error);
            toast.error("Error deleting registration");
        }
    };

    useEffect(() => {
        fetchTournaments();
    }, []);

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 mt-20 min-h-screen">
            <div className="bg-black/40 backdrop-blur-2xl shadow-xl rounded-2xl p-6 sm:p-10 w-full text-white">
                <h1 className="text-center text-white text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase">
                    Tournament Registrations
                </h1>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto my-4 rounded-full" />

                {/* Tournament Cards */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-10">
                    {tournaments.map((tournament) => (
                        <div
                            key={tournament._id}
                            className="relative rounded-xl shadow-xl overflow-hidden bg-black/40 backdrop-blur-2xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                        >
                            <img
                                src={tournament.picture}
                                alt={tournament.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{tournament.title}</h3>
                                <p className="text-sm text-gray-300 mb-2">
                                    {tournament.description?.slice(0, 80)}...
                                </p>
                                <div className="text-sm text-gray-400 space-y-1">
                                    <p>Game: {tournament.game}</p>
                                    <p>Entry Fee: {tournament.entryFee}</p>
                                    <p>Prize Pool: {tournament.prizePool}</p>
                                </div>

                                <button
                                    onClick={() => fetchRegistrations(tournament._id, tournament.title)}
                                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                                >
                                    View Registrations
                                </button>
                                <button
                                    onClick={() => window.open(`/admin/brackets/${tournament._id}`, "_blank")}
                                    className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                                >
                                    Manage Brackets ↗
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {tournaments.length === 0 && (
                    <p className="text-center text-gray-300 mt-10 text-lg">
                        No tournaments available.
                    </p>
                )}

                {/* Registrations Table */}
                {selectedTournament && (
                    <div className="mt-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                                Registrations for: {selectedTournament.title}
                            </h2>
                            <button
                                onClick={() => {
                                    setSelectedTournament(null);
                                    setRegistrations([]);
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                Close
                            </button>
                        </div>

                        {loading ? (
                            <p className="text-center text-gray-300">Loading...</p>
                        ) : registrations.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse bg-black/30 rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-indigo-600">
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">Full Name</th>
                                            <th className="px-4 py-3 text-left">Gaming Name</th>
                                            <th className="px-4 py-3 text-left">Email</th>
                                            <th className="px-4 py-3 text-left">City</th>
                                            <th className="px-4 py-3 text-left">Payment Status</th>
                                            <th className="px-4 py-3 text-left">Payment Proof</th>
                                            <th className="px-4 py-3 text-left">Actions</th>
                                            <th className="px-4 py-3 text-left">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registrations.map((reg, index) => (
                                            <tr
                                                key={reg._id}
                                                className="border-b border-white/10 hover:bg-white/5 transition"
                                            >
                                                <td className="px-4 py-3">{index + 1}</td>
                                                <td className="px-4 py-3">{reg.fullName}</td>
                                                <td className="px-4 py-3">{reg.gamingName}</td>
                                                <td className="px-4 py-3">{reg.email}</td>
                                                <td className="px-4 py-3">{reg.city}</td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-semibold ${reg.paymentStatus === "verified"
                                                            ? "bg-green-600"
                                                            : reg.paymentStatus === "pending"
                                                                ? "bg-yellow-600"
                                                                : "bg-red-600"
                                                            }`}
                                                    >
                                                        {reg.paymentStatus}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {reg.paymentProof && (
                                                        <button
                                                            onClick={() => setSelectedProof(reg.paymentProof)}
                                                            className="text-indigo-400 hover:underline cursor-pointer"
                                                        >
                                                            View Proof
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        onClick={() => sendVerificationEmail(reg._id)}
                                                        disabled={sendingEmail === reg._id}
                                                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-sm font-semibold transition"
                                                    >
                                                        {sendingEmail === reg._id ? "Sending..." : "Send Email"}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        onClick={() => handleDeleteRegistration(reg._id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                                                        title="Delete Registration"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center text-gray-300">No registrations yet.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {selectedProof && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedProof(null)}
                >
                    <div
                        className="relative max-w-4xl max-h-[90vh] bg-black/60 rounded-lg p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedProof(null)}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold z-10"
                        >
                            ✕
                        </button>
                        <img
                            src={selectedProof}
                            alt="Payment Proof"
                            className="max-w-full max-h-[85vh] object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TournamentRegistrations;
