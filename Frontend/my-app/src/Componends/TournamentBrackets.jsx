import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ─── Constants ────────────────────────────────────────────────────────────────
const POOL_SIZE = 16; // players per pool
const POOL_ROUNDS = Math.log2(POOL_SIZE); // = 4 rounds per pool stage

const POOL_COLORS = [
    { header: "bg-indigo-600", border: "border-indigo-500/40" },
    { header: "bg-purple-600", border: "border-purple-500/40" },
    { header: "bg-cyan-600", border: "border-cyan-500/40" },
    { header: "bg-rose-600", border: "border-rose-500/40" },
    { header: "bg-amber-600", border: "border-amber-500/40" },
];

// ─── Split bracket data into pool sections ────────────────────────────────────
function buildPoolLayout(allBrackets, availableRounds) {
    // Sort matches by matchIndex inside each round first
    const sorted = {};
    availableRounds.forEach(r => {
        sorted[r] = [...(allBrackets[r] || [])].sort((a, b) => a.matchIndex - b.matchIndex);
    });

    const r1Total = (sorted[1] || []).length; // e.g. 16 for 32 players
    const matchesPerPoolR1 = POOL_SIZE / 2;   // = 8

    // If not enough matches for multiple pools, show as single section
    const poolCount = r1Total >= matchesPerPoolR1 ? Math.ceil(r1Total / matchesPerPoolR1) : 1;

    const poolRoundNums = availableRounds.filter(r => {
        const isGF = sorted[r]?.[0]?.bracketType === "grand_final";
        return !isGF && r <= POOL_ROUNDS;
    });
    const playoffRoundNums = availableRounds.filter(r => {
        const isGF = sorted[r]?.[0]?.bracketType === "grand_final";
        return isGF || r > POOL_ROUNDS;
    });

    const pools = Array.from({ length: poolCount }, (_, p) => {
        const rounds = {};
        poolRoundNums.forEach(r => {
            const total = (sorted[r] || []).length;
            const perPool = Math.ceil(total / poolCount);
            const start = p * perPool;
            const matches = sorted[r].filter(m => m.matchIndex >= start && m.matchIndex < start + perPool);
            if (matches.length) rounds[r] = matches;
        });
        return {
            name: `Pool ${String.fromCharCode(65 + p)}`,
            rounds,
            roundNums: poolRoundNums.filter(r => rounds[r]),
        };
    });

    return { pools, playoffRoundNums, sortedBrackets: sorted };
}

// ─── Read-only Match Card ─────────────────────────────────────────────────────
const MatchCard = ({ match }) => {
    const winId = match.winner?._id?.toString() || match.winner?.toString();
    const aId = match.teamA?._id?.toString();
    const bId = match.teamB?._id?.toString();
    const aWon = winId && winId === aId;
    const bWon = winId && winId === bId;

    return (
        <div className="bg-black/60 backdrop-blur-xl p-4 rounded-xl border border-white/10 flex flex-col gap-2 hover:border-white/20 transition duration-300 shadow-xl w-64">
            <div className={`flex items-center justify-between px-2 py-1.5 rounded-lg ${aWon ? "bg-indigo-500/15" : "bg-white/5"}`}>
                <span className={`text-xs font-bold uppercase truncate max-w-[130px] ${aWon ? "text-indigo-300" : "text-gray-300"}`}>
                    {match.teamA?.gamingName || "TBD"}
                </span>
                {match.teamAScore && match.teamAScore !== "0" && (
                    <span className="text-xs font-black text-yellow-400">{match.teamAScore}</span>
                )}
            </div>

            <div className="h-px bg-white/5 mx-2" />

            <div className={`flex items-center justify-between px-2 py-1.5 rounded-lg ${bWon ? "bg-indigo-500/15" : "bg-white/5"}`}>
                <span className={`text-xs font-bold uppercase truncate max-w-[130px] ${bWon ? "text-indigo-300" : match.teamB ? "text-gray-300" : "text-gray-500 italic"}`}>
                    {match.teamB?.gamingName || (match.teamB === null && match.status === "completed" ? "BYE" : "TBD")}
                </span>
                {match.teamBScore && match.teamBScore !== "0" && (
                    <span className="text-xs font-black text-yellow-400">{match.teamBScore}</span>
                )}
            </div>

            {match.winner && (
                <div className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-500/10 py-0.5 text-center rounded tracking-widest">
                    ✓ {match.winner.gamingName}
                </div>
            )}
        </div>
    );
};

// ─── Horizontal bracket section renderer ─────────────────────────────────────
const BracketSection = ({ label, headerClass, roundNums, bracketData, winner, showWinner }) => (
    <div className="mb-8">
        {/* Section Banner */}
        <div className={`${headerClass} px-6 py-4 rounded-t-2xl flex items-center justify-between`}>
            <h3 className="text-lg font-black uppercase tracking-[0.2em] text-white">{label}</h3>
            <span className="text-white/50 text-xs uppercase tracking-widest font-semibold">{roundNums.length} Round{roundNums.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Horizontal rounds */}
        <div className="overflow-x-auto no-scrollbar bg-black/40 backdrop-blur-xl border border-white/10 border-t-0 rounded-b-2xl p-6">
            <div className="flex gap-10 min-w-max">
                {roundNums.map(round => (
                    <div key={round} className="flex flex-col gap-5 w-64">
                        {/* Round label */}
                        <div className="text-center">
                            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${bracketData[round]?.[0]?.bracketType === "grand_final" ? "text-yellow-500" : "text-gray-500"}`}>
                                {bracketData[round]?.[0]?.bracketType === "grand_final" ? "Grand Final" : `Round ${round}`}
                            </span>
                            <div className={`h-0.5 w-8 mx-auto mt-1 rounded-full ${bracketData[round]?.[0]?.bracketType === "grand_final" ? "bg-yellow-500" : "bg-white/10"}`} />
                        </div>

                        {/* Matches */}
                        <div className="flex flex-col gap-4">
                            {(bracketData[round] || []).map(match => (
                                <MatchCard key={match._id} match={match} />
                            ))}
                        </div>
                    </div>
                ))}

                {/* Tournament Champion */}
                {showWinner && winner && (
                    <div className="flex flex-col justify-center pl-4">
                        <div className="relative p-8 rounded-3xl bg-black/80 border border-yellow-500/30 flex flex-col items-center text-center min-w-[160px]">
                            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur opacity-15 animate-pulse" />
                            <span className="text-4xl mb-3 relative">🏆</span>
                            <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest relative">Champion</p>
                            <p className="text-lg font-black text-white uppercase mt-1 relative">{winner.gamingName}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const TournamentBrackets = () => {
    const { id } = useParams();
    const [allBrackets, setAllBrackets] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [availableRounds, setAvailableRounds] = useState([]);
    const [bracketType, setBracketType] = useState("winners");
    const [winner, setWinner] = useState(null);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/getallbrackets/${id}`);
            const result = await res.json();

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

            const tRes = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/gettournament/${id}`);
            const tData = await tRes.json();
            if (tData.success && tData.data?.winner) setWinner(tData.data.winner);

        } catch (err) {
            setError("Failed to load brackets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (id) fetchAllData(); }, [id, bracketType]);

    const { pools, playoffRoundNums, sortedBrackets } =
        availableRounds.length > 0
            ? buildPoolLayout(allBrackets, availableRounds)
            : { pools: [], playoffRoundNums: [], sortedBrackets: {} };

    if (error) return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <p className="text-red-500 font-bold">{error}</p>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-8 md:px-12 lg:px-20 text-white relative overflow-hidden">
            {/* Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <div className="relative z-10">
                <h1 className="text-4xl sm:text-6xl font-black text-center uppercase mb-4 tracking-tighter">
                    Tournament <span className="text-indigo-500">Bracket</span>
                </h1>
                <p className="text-center text-gray-500 mb-10 text-xs uppercase tracking-widest">
                    Pool Stage · Playoffs · Grand Final
                </p>

                {/* Winners / Losers toggle */}
                <div className="flex justify-center gap-4 mb-12">
                    {["winners", "losers"].map(type => (
                        <button key={type} onClick={() => setBracketType(type)}
                            className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-all duration-300 text-sm
                                ${bracketType === type
                                    ? (type === "winners" ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/30" : "bg-purple-600 text-white shadow-xl shadow-purple-500/30")
                                    : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
                        >
                            {type === "winners" ? "Winners Bracket" : "Losers Bracket"}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500" />
                    </div>
                ) : availableRounds.length === 0 ? (
                    <div className="text-center py-20 px-12 bg-white/5 rounded-3xl border border-dashed border-white/10 max-w-lg mx-auto">
                        <p className="text-gray-400 text-xl font-medium">Tournament brackets are being prepared...</p>
                    </div>
                ) : pools.length > 1 ? (
                    /* ── Multi-pool view ── */
                    <>
                        {pools.map((pool, idx) => (
                            <BracketSection
                                key={pool.name}
                                label={pool.name}
                                headerClass={POOL_COLORS[idx % POOL_COLORS.length].header}
                                roundNums={pool.roundNums}
                                bracketData={pool.rounds}
                                winner={null}
                                showWinner={false}
                            />
                        ))}

                        {/* Playoffs section */}
                        {playoffRoundNums.length > 0 && (
                            <BracketSection
                                label="Playoffs"
                                headerClass="bg-gradient-to-r from-yellow-600 to-orange-600"
                                roundNums={playoffRoundNums}
                                bracketData={sortedBrackets}
                                winner={winner}
                                showWinner={true}
                            />
                        )}
                    </>
                ) : (
                    /* ── Single-pool fallback ── */
                    <BracketSection
                        label="Bracket"
                        headerClass="bg-indigo-600"
                        roundNums={availableRounds}
                        bracketData={sortedBrackets}
                        winner={winner}
                        showWinner={true}
                    />
                )}
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default TournamentBrackets;
