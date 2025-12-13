import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HeatRage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const videos = [
        {
            id: 1,
            title: "Heat System Explained",
            url: "https://www.youtube.com/embed/eSRVZUN-Fp4?si=fEVb6X02Avp-p_lG",
            description:
                "Understand the new Heat system in Tekken 8. Learn how to activate Heat, the benefits it provides, and optimal times to use it during matches.",
        },
        {
            id: 2,
            title: "Rage Art & Rage Drive",
            url: "https://www.youtube.com/embed/XAD8mTCp1B4?si=XEAcXV2Va_RIp9io",
            description:
                "Master Rage Arts and Rage Drives. Learn when to use these powerful comeback mechanics and how to defend against your opponent's Rage options.",
        },
        {
            id: 3,
            title: "Heat Combos & Strategies",
            url: "https://www.youtube.com/embed/tCIE4drz2AY?si=hwE7fyLkpacIygrM",
            description:
                "Discover optimal combos during Heat state. Learn character-specific Heat extensions and how to maximize damage during this powerful state.",
        },
    ];

    const mechanics = [
        {
            title: "Heat Activation",
            description: "Activate Heat to gain enhanced moves and chip damage",
            icon: "🔥",
            gradient: "from-orange-500 to-red-500",
        },
        {
            title: "Heat Dash",
            description: "Close distance quickly with Heat Dash for aggressive pressure",
            icon: "⚡",
            gradient: "from-yellow-500 to-orange-500",
        },
        {
            title: "Rage Art",
            description: "Powerful cinematic attack available when health is low",
            icon: "💥",
            gradient: "from-red-500 to-pink-500",
        },
        {
            title: "Rage Drive",
            description: "Enhanced special move that consumes Rage for big damage",
            icon: "⭐",
            gradient: "from-purple-500 to-pink-500",
        },
    ];

    return (
        <div className="min-h-screen py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 addthefont">
                        Heat & Rage
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Unleash devastating power with Heat and Rage mechanics. Learn to dominate
                        with enhanced moves, chip damage, and game-changing comeback potential.
                    </p>
                </div>

                {/* Mechanics Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {mechanics.map((mechanic, index) => (
                        <div
                            key={index}
                            className="backdrop-blur-xl bg-black/40 rounded-2xl p-8 border border-white/20 shadow-xl hover:scale-105 transition-all duration-300 group"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className={`text-5xl bg-gradient-to-br ${mechanic.gradient} p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}
                                >
                                    {mechanic.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white addthefont">
                                    {mechanic.title}
                                </h3>
                            </div>
                            <p className="text-gray-200 text-lg leading-relaxed">
                                {mechanic.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Heat System Deep Dive */}
                <div
                    className="backdrop-blur-xl bg-black/40 rounded-3xl p-8 md:p-12 mb-12 border border-orange-400/30 shadow-2xl"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 addthefont flex items-center gap-3">
                        <span className="text-4xl">🔥</span>
                        The Heat System
                    </h2>
                    <p className="text-gray-200 text-lg leading-relaxed mb-6">
                        Heat is Tekken 8's new aggressive mechanic that rewards offensive play. When
                        activated, you gain access to enhanced moves, chip damage on block, and
                        special Heat Dash properties. Each character has unique Heat moves that can
                        extend combos or create new pressure situations.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-black/40 rounded-xl p-4 border border-orange-400/30">
                            <h4 className="text-xl font-bold text-orange-300 mb-2">Chip Damage</h4>
                            <p className="text-gray-300">
                                Deal damage even when opponent blocks your attacks
                            </p>
                        </div>
                        <div className="bg-black/40 rounded-xl p-4 border border-red-400/30">
                            <h4 className="text-xl font-bold text-red-300 mb-2">Enhanced Moves</h4>
                            <p className="text-gray-300">
                                Access special properties on certain moves during Heat
                            </p>
                        </div>
                        <div className="bg-black/40 rounded-xl p-4 border border-yellow-400/30">
                            <h4 className="text-xl font-bold text-yellow-300 mb-2">Heat Dash</h4>
                            <p className="text-gray-300">
                                Close distance instantly for relentless pressure
                            </p>
                        </div>
                    </div>
                </div>

                {/* Video Sections */}
                <div className="space-y-12">
                    {videos.map((video, index) => (
                        <div
                            key={video.id}
                            className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                } gap-8 items-center`}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Video Player */}
                            <div className="w-full md:w-1/2">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl bg-black/40">
                                    <div className="aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src={video.url}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="w-full md:w-1/2">
                                <div className="backdrop-blur-xl bg-black/40 rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-4xl font-bold text-orange-400 addthefont">
                                            {String(video.id).padStart(2, "0")}
                                        </span>
                                        <div className="h-1 flex-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 addthefont">
                                        {video.title}
                                    </h3>
                                    <p className="text-gray-200 text-lg leading-relaxed">
                                        {video.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Rage System */}
                <div
                    className="mt-16 backdrop-blur-xl bg-gradient-to-br from-red-500/10 to-pink-500/20 rounded-3xl p-8 md:p-12 border border-red-400/30 shadow-2xl"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 addthefont flex items-center gap-3">
                        <span className="text-4xl">💥</span>
                        Rage Mechanics
                    </h2>
                    <p className="text-gray-200 text-lg leading-relaxed mb-6">
                        Rage activates when your health drops below a certain threshold, giving you
                        access to powerful comeback tools. You can choose between Rage Art (a
                        cinematic super move) or Rage Drive (an enhanced special move with unique
                        properties).
                    </p>
                    <ul className="space-y-4 text-gray-200 text-lg">
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 text-2xl">★</span>
                            <span>
                                <strong className="text-white">Rage Art:</strong> Armored attack that can
                                turn the tide of battle, but highly punishable if blocked
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 text-2xl">★</span>
                            <span>
                                <strong className="text-white">Rage Drive:</strong> Character-specific
                                enhanced move that can lead to massive damage combos
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 text-2xl">★</span>
                            <span>
                                <strong className="text-white">Strategic Use:</strong> Save Rage for
                                critical moments or use it to close out rounds decisively
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 text-2xl">★</span>
                            <span>
                                <strong className="text-white">Defense:</strong> Learn to recognize Rage
                                Art animations and punish them appropriately
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Strategy Tips */}
                <div
                    className="mt-12 backdrop-blur-xl bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 addthefont">
                        Pro Strategies
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-400/20">
                            <h3 className="text-xl font-bold text-orange-300 mb-3">Heat Management</h3>
                            <p className="text-gray-200">
                                Don't waste Heat on single hits. Use it to extend combos, apply pressure,
                                or close out rounds when you have a life lead.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-xl p-6 border border-red-400/20">
                            <h3 className="text-xl font-bold text-red-300 mb-3">Rage Timing</h3>
                            <p className="text-gray-200">
                                Save Rage for guaranteed situations or when you need a comeback. Random
                                Rage Arts are easily punished by experienced players.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeatRage;
