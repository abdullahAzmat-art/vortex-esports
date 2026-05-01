import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
    const { id } = useParams(); // Get tournamentId from URL
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        city: "",
        gamingName: "",
        phoneNumber: "",
        email: "",
        paymentProof: "", // This will handle the file input
    });

    const [preview, setPreview] = useState(null);
    const [registrationOpen, setRegistrationOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTournamentStatus = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/getTournament/${id}`);
                const data = await response.json();
                const tournament = data.tournament || data;
                if (tournament && tournament.registrationOpen === false) {
                    setRegistrationOpen(false);
                }
            } catch (error) {
                console.error("Error fetching tournament status:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTournamentStatus();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, paymentProof: file });

        // Create preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData to send file
        const formData = new FormData();
        formData.append("fullName", form.fullName);
        formData.append("city", form.city);
        formData.append("gamingName", form.gamingName);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("email", form.email);
        formData.append("tournamentId", id);
        formData.append("paymentProof", form.paymentProof);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/addteam`, {
                method: "POST",
                body: formData, // Send formData instead of JSON
            });

            const result = await response.json();

            if (result.success || response.ok) { // Check for success flag or OK status
                toast.success("Registration Successful! 🎉", {
                    position: "top-right",
                    theme: "dark",
                });
                // Optional: Redirect after success
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                toast.error(result.message || "Registration Failed ❌", {
                    position: "top-right",
                    theme: "dark",
                });
            }

        } catch (error) {
            console.error(error);
            toast.error("Server Error ❗", {
                position: "top-right",
                theme: "dark",
            });
        }
    };

    return (
        <div className="w-full flex items-center justify-center px-4 py-20 min-h-screen">
            <ToastContainer />

            <div className="bg-black/40 backdrop-blur-2xl border border-white/20 shadow-xl rounded-2xl p-10 w-full max-w-lg text-white">
                <h1 className="text-3xl font-bold text-center mb-8 uppercase tracking-wide bg-clip-text text-transparent bg-white">
                    Tournament Registration
                </h1>

                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                        <p className="mt-4 text-gray-400">Checking tournament status...</p>
                    </div>
                ) : !registrationOpen ? (
                    <div className="text-center py-10 space-y-6">
                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-red-500 mb-2">Registration Closed</h2>
                            <p className="text-gray-300">We are no longer accepting registrations for this tournament.</p>
                        </div>
                        <button
                            onClick={() => navigate("/")}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition"
                        >
                            Back to Home
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div className="relative">
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer placeholder-transparent"
                            placeholder="Full Name"
                            required
                        />
                        <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base">
                            Full Name
                        </label>
                    </div>

                    {/* City */}
                    <div className="relative">
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer placeholder-transparent"
                            placeholder="City"
                            required
                        />
                        <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base">
                            City
                        </label>
                    </div>

                    {/* Gaming Name */}
                    <div className="relative">
                        <input
                            type="text"
                            name="gamingName"
                            value={form.gamingName}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer placeholder-transparent"
                            placeholder="Gaming Name/ID"
                            required
                        />
                        <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base">
                            Gaming Name / IGN
                        </label>
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                        <input
                            type="text"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer placeholder-transparent"
                            placeholder="Phone Number"
                            required
                        />
                        <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base">
                            Phone Number
                        </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-400 outline-none py-3 text-white peer placeholder-transparent"
                            placeholder="Email"
                            required
                        />
                        <label className="absolute left-0 top-3 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base">
                            Email Address
                        </label>
                    </div>

                    {/* Payment Instructions */}
                    <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-4 mt-6">
                        <h3 className="text-lg font-semibold text-indigo-300 mb-3">💳 Payment Instructions</h3>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p className="font-medium text-white">Send payment to:</p>
                            <div className="bg-black/30 rounded p-3 border border-gray-700">
                                <p className="text-gray-400">Account Title:</p>
                                <p className="font-mono text-white">Muhammad durab</p>
                            </div>
                            <div className="bg-black/30 rounded p-3 border border-gray-700">
                                <p className="text-gray-400">Account Number:</p>
                                <p className="font-mono text-white text-lg">0328 4500944</p>
                            </div>
                            <div className="bg-black/30 rounded p-3 border border-gray-700">
                                <p className="text-gray-400">Bank Name:</p>
                                <p className="font-mono text-white">Easy Paisa </p>
                            </div>
                            <p className="text-yellow-400 text-xs mt-3">⚠️ Upload payment proof screenshot below after transfer</p>
                        </div>
                    </div>

                    {/* Payment Proof Upload */}
                    <div className="relative">
                        <label className="block text-gray-400 text-sm mb-2">Payment Proof (Screenshot)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                            required
                        />
                        {preview && (
                            <div className="mt-4">
                                <img src={preview} alt="Preview" className="h-32 rounded-lg object-cover border border-gray-600" />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-indigo-600 hover:opacity-90 transition font-semibold text-white uppercase tracking-wide mt-8"
                    >
                        Register Now
                    </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RegistrationForm;
