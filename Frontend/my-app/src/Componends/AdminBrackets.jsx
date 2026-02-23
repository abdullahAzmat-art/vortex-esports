import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// ─── Constants ────────────────────────────────────────────────────────────────
const POOL_SIZE = 16;
const POOL_ROUNDS = Math.log2(POOL_SIZE); // = 4

const POOL_COLORS = [
    { header: "bg-indigo-600" },
    { header: "bg-purple-600" },
    { header: "bg-cyan-600" },
    { header: "bg-rose-600" },
    { header: "bg-amber-600" },
];

// ─── Split bracket data into pools ───────────────────────────────────────────
function buildPoolLayout(allBrackets, availableRounds) {
    const sorted = {};
    availableRounds.forEach(r => {
        sorted[r] = [...(allBrackets[r] || [])].sort((a, b) => a.matchIndex - b.matchIndex);
    });

    const r1Total = (sorted[1] || []).length;
    const matchesPerPoolR1 = POOL_SIZE / 2; // 8
    const poolCount = r1Total >= matchesPerPoolR1 ? Math.ceil(r1Total / matchesPerPoolR1) : 1;

    const poolRoundNums = availableRounds.filter(r => sorted[r]?.[0]?.bracketType !== "grand_final" && r <= POOL_ROUNDS);
    const playoffRoundNums = availableRounds.filter(r => sorted[r]?.[0]?.bracketType === "grand_final" || r > POOL_ROUNDS);

    const pools = Array.from({ length: poolCount }, (_, p) => {
        const rounds = {};
        poolRoundNums.forEach(r => {
            const total = (sorted[r] || []).length;
            const perPool = Math.ceil(total / poolCount);
            const start = p * perPool;
            const matches = sorted[r].filter(m => m.matchIndex >= start && m.matchIndex < start + perPool);
            if (matches.length) rounds[r] = matches;
        });
        return { name: `Pool ${String.fromCharCode(65 + p)}`, rounds, roundNums: poolRoundNums.filter(r => rounds[r]) };
    });

    return { pools, playoffRoundNums, sortedBrackets: sorted };
}

// ─── Admin Match Card (with Set Winner buttons) ────────────────────────────
const AdminMatchCard = ({ match, onSetWinner }) => {
    const winId = match.winner?._id?.toString() || match.winner?.toString();
    const aId = match.teamA?._id?.toString();
    const bId = match.teamB?._id?.toString();
    const aWon = winId && winId === aId;
    const bWon = winId && winId === bId;

    return (
        <div className="bg-black/50 backdrop-blur-xl p-4 rounded-xl border border-white/10 flex flex-col gap-3 hover:border-indigo-500/30 transition duration-300 shadow-xl w-72">
            {/* Team A */}
            <div className={`flex items-center justify-between px-2 py-1.5 rounded-lg ${aWon ? "bg-indigo-500/20 ring-1 ring-indigo-500/40" : "bg-white/5"}`}>
                <span className="text-xs font-bold uppercase truncate max-w-[100px] text-gray-200">
                    {match.teamA?.gamingName || "TBD"}
                </span>
                <div className="flex items-center gap-2">
                    {match.teamAScore && match.teamAScore !== "0" && (
                        <span className="text-xs font-black text-yellow-400">{match.teamAScore}</span>
                    )}
                    <button
                        onClick={() => onSetWinner(match, match.teamA?._id)}
                        disabled={!match.teamA || aWon}
                        className={`text-[10px] px-2 py-0.5 rounded transition ${aWon ? "bg-indigo-500 text-white" : "bg-green-600/20 text-green-400 hover:bg-green-600/40 disabled:opacity-30 disabled:cursor-not-allowed"}`}
                    >
                        {aWon ? "Winner" : "Set Win"}
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[10px] font-black text-gray-600">VS</span>
                <div className="h-px flex-1 bg-white/5" />
            </div>

            {/* Team B */}
            <div className={`flex items-center justify-between px-2 py-1.5 rounded-lg ${bWon ? "bg-indigo-500/20 ring-1 ring-indigo-500/40" : "bg-white/5"}`}>
                <span className={`text-xs font-bold uppercase truncate max-w-[100px] ${!match.teamB ? "text-gray-500 italic" : "text-gray-200"}`}>
                    {match.teamB?.gamingName || (match.teamB === null && match.status === "completed" ? "BYE" : "TBD")}
                </span>
                <div className="flex items-center gap-2">
                    {match.teamBScore && match.teamBScore !== "0" && (
                        <span className="text-xs font-black text-yellow-400">{match.teamBScore}</span>
                    )}
                    {match.teamB && (
                        <button
                            onClick={() => onSetWinner(match, match.teamB?._id)}
                            disabled={bWon}
                            className={`text-[10px] px-2 py-0.5 rounded transition ${bWon ? "bg-indigo-500 text-white" : "bg-green-600/20 text-green-400 hover:bg-green-600/40 disabled:opacity-30 disabled:cursor-not-allowed"}`}
                        >
                            {bWon ? "Winner" : "Set Win"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Admin Bracket Section ─────────────────────────────────────────────────
const AdminBracketSection = ({ label, headerClass, roundNums, bracketData, onSetWinner }) => (
    <div className="mb-8">
        <div className={`${headerClass} px-6 py-4 rounded-t-2xl flex items-center justify-between`}>
            <h3 className="text-lg font-black uppercase tracking-[0.2em] text-white">{label}</h3>
            <span className="text-white/50 text-xs uppercase tracking-widest font-semibold">
                {roundNums.length} Round{roundNums.length !== 1 ? "s" : ""}
            </span>
        </div>

        <div className="overflow-x-auto no-scrollbar bg-black/60 backdrop-blur-xl border border-white/10 border-t-0 rounded-b-2xl p-6">
            <div className="flex gap-10 min-w-max">
                {roundNums.map(round => (
                    <div key={round} className="flex flex-col gap-5 w-72">
                        <div className="text-center">
                            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${bracketData[round]?.[0]?.bracketType === "grand_final" ? "text-yellow-500" : "text-gray-500"}`}>
                                {bracketData[round]?.[0]?.bracketType === "grand_final" ? "Grand Final" : `Round ${round}`}
                            </span>
                            <div className={`h-0.5 w-8 mx-auto mt-1 rounded-full ${bracketData[round]?.[0]?.bracketType === "grand_final" ? "bg-yellow-500" : "bg-white/10"}`} />
                        </div>

                        <div className="flex flex-col gap-4">
                            {(bracketData[round] || []).map(match => (
                                <AdminMatchCard key={match._id} match={match} onSetWinner={onSetWinner} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ─── Main AdminBrackets Component ────────────────────────────────────────────
const AdminBrackets = () => {
    const { id } = useParams();
    const [allBrackets, setAllBrackets] = useState({});
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [winner, setWinner] = useState(null);
    const [availableRounds, setAvailableRounds] = useState([]);
    const [bracketType, setBracketType] = useState("winners");
    const [scoreModal, setScoreModal] = useState({ show: false, matchId: null, winnerId: null, teamAName: "", teamBName: "" });
    const [scoreInputs, setScoreInputs] = useState({ teamAScore: "", teamBScore: "" });

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/getallbrackets/${id}`);
            const result = await response.json();

            if (result.success) {
                const byRound = {};
                const roundSet = new Set();
                result.data.forEach(match => {
                    if (match.bracketType === bracketType || match.bracketType === "grand_final") {
                        if (!byRound[match.roundNumber]) byRound[match.roundNumber] = [];
                        byRound[match.roundNumber].push(match);
                        roundSet.add(match.roundNumber);
                    }
                });
                setAvailableRounds(Array.from(roundSet).sort((a, b) => a - b));
                setAllBrackets(byRound);
            }
        } catch (error) {
            toast.error("Failed to load brackets tree");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBrackets = async () => {
        try {
            setCreating(true);
            const nextRound = availableRounds.length > 0 ? Math.max(...availableRounds) + 1 : 1;
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/createbrackets/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roundNumber: nextRound, bracketType }),
            });
            const result = await response.json();
            if (result.success) {
                if (result.message === "Winner is declared") {
                    toast.success(`Winner: ${result.data?.gamingName || "Unknown"}!`);
                    setWinner(result.data);
                } else {
                    toast.success(result.message);
                    setWinner(null);
                }
                fetchAllData();
            } else {
                toast.error(result.message || "Failed to create brackets");
            }
        } catch {
            toast.error("Error creating brackets");
        } finally {
            setCreating(false);
        }
    };

    const handleSetWinnerClick = (match, winnerId) => {
        setScoreInputs({ teamAScore: "", teamBScore: "" });
        setScoreModal({
            show: true,
            matchId: match._id,
            winnerId,
            teamAName: match.teamA?.gamingName || "Team A",
            teamBName: match.teamB?.gamingName || "Team B",
        });
    };

    const confirmWinner = async () => {
        if (!scoreModal.matchId || !scoreModal.winnerId) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/brackets/${scoreModal.matchId}/winner`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ winnerId: scoreModal.winnerId, ...scoreInputs }),
            });
            const result = await response.json();
            if (result.success) {
                toast.success("Winner & Scores updated!");
                setScoreModal({ show: false, matchId: null, winnerId: null, teamAName: "", teamBName: "" });
                fetchAllData();
            } else {
                toast.error(result.message || "Failed to update winner");
            }
        } catch {
            toast.error("Error updating winner");
        }
    };

    useEffect(() => { if (id) fetchAllData(); }, [id, bracketType]);

    const { pools, playoffRoundNums, sortedBrackets } =
        availableRounds.length > 0
            ? buildPoolLayout(allBrackets, availableRounds)
            : { pools: [], playoffRoundNums: [], sortedBrackets: {} };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-8 md:px-12 lg:px-20 text-white relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            {/* ── Score Modal ── */}
            {scoreModal.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                        <h3 className="text-xl font-bold text-center mb-6 uppercase tracking-wider">Set Match Score</h3>

                        <div className="flex items-center justify-between gap-4 mb-8">
                            <div className="flex flex-col items-center gap-2 flex-1">
                                <span className="text-xs font-bold uppercase truncate max-w-[80px] text-gray-400">{scoreModal.teamAName}</span>
                                <input type="text" value={scoreInputs.teamAScore}
                                    onChange={e => setScoreInputs({ ...scoreInputs, teamAScore: e.target.value })}
                                    className="w-12 h-12 text-center bg-white/5 border border-white/10 rounded-lg text-xl font-bold focus:border-indigo-500 outline-none transition"
                                />
                            </div>
                            <span className="text-gray-600 font-black text-lg">VS</span>
                            <div className="flex flex-col items-center gap-2 flex-1">
                                <span className="text-xs font-bold uppercase truncate max-w-[80px] text-gray-400">{scoreModal.teamBName}</span>
                                <input type="text" value={scoreInputs.teamBScore}
                                    onChange={e => setScoreInputs({ ...scoreInputs, teamBScore: e.target.value })}
                                    className="w-12 h-12 text-center bg-white/5 border border-white/10 rounded-lg text-xl font-bold focus:border-purple-500 outline-none transition"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setScoreModal({ show: false, matchId: null, winnerId: null, teamAName: "", teamBName: "" })}
                                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-sm font-bold uppercase transition">
                                Cancel
                            </button>
                            <button onClick={confirmWinner}
                                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold uppercase shadow-lg shadow-indigo-500/20 transition">
                                Confirm Winner
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="relative z-10">
                <h1 className="text-4xl sm:text-5xl font-black text-center uppercase mb-8 tracking-tighter">
                    Manage <span className="text-indigo-500">Tournament Tree</span>
                </h1>

                {/* Winners / Losers toggle */}
                <div className="flex justify-center gap-4 mb-8">
                    {["winners", "losers"].map(type => (
                        <button key={type} onClick={() => setBracketType(type)}
                            className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest transition duration-300 text-sm
                                ${bracketType === type
                                    ? (type === "winners" ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/40" : "bg-purple-600 text-white shadow-xl shadow-purple-500/40")
                                    : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
                        >
                            {type === "winners" ? "Winners Bracket" : "Losers Bracket"}
                        </button>
                    ))}
                </div>

                {/* Bracket Management */}
                <div className="max-w-md mx-auto mb-12 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center">
                    <h2 className="text-xl font-black uppercase tracking-widest mb-4">Bracket Management</h2>
                    {availableRounds.length === 0 ? (
                        <button onClick={handleCreateBrackets} disabled={creating}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 px-6 py-4 rounded-xl font-black uppercase tracking-widest transition shadow-xl shadow-indigo-500/20">
                            {creating ? "Initializing Tree..." : "Initialize Brackets"}
                        </button>
                    ) : (
                        <div className="bg-indigo-500/10 border border-indigo-500/30 px-6 py-3 rounded-xl">
                            <span className="text-indigo-400 font-black uppercase tracking-widest text-sm">Full Tree Managed</span>
                        </div>
                    )}
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em] mt-3">
                        {bracketType === "winners" ? "Winners Bracket — Multi-Round Flow" : "Losers Bracket — Path to Final"}
                    </p>
                </div>

                {/* ── Bracket Display ── */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
                    </div>
                ) : availableRounds.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 max-w-lg mx-auto">
                        <p className="text-gray-400 text-xl font-medium">No brackets yet. Click Initialize above.</p>
                    </div>
                ) : pools.length > 1 ? (
                    /* ── Multi-pool ── */
                    <>
                        {pools.map((pool, idx) => (
                            <AdminBracketSection
                                key={pool.name}
                                label={pool.name}
                                headerClass={POOL_COLORS[idx % POOL_COLORS.length].header}
                                roundNums={pool.roundNums}
                                bracketData={pool.rounds}
                                onSetWinner={handleSetWinnerClick}
                            />
                        ))}

                        {playoffRoundNums.length > 0 && (
                            <AdminBracketSection
                                label="Playoffs"
                                headerClass="bg-gradient-to-r from-yellow-600 to-orange-600"
                                roundNums={playoffRoundNums}
                                bracketData={sortedBrackets}
                                onSetWinner={handleSetWinnerClick}
                            />
                        )}
                    </>
                ) : (
                    /* ── Single bracket ── */
                    <AdminBracketSection
                        label="Bracket"
                        headerClass="bg-indigo-600"
                        roundNums={availableRounds}
                        bracketData={sortedBrackets}
                        onSetWinner={handleSetWinnerClick}
                    />
                )}

                {winner && (
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 px-8 py-4 rounded-2xl">
                            <span className="text-3xl">🏆</span>
                            <div className="text-left">
                                <p className="text-yellow-500 text-xs font-black uppercase tracking-widest">Tournament Champion</p>
                                <p className="text-white text-xl font-black uppercase">{winner.gamingName}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default AdminBrackets;
