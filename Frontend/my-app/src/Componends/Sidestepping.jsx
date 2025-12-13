import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Sidestepping = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const videos = [
        {
            id: 1,
            title: "Sidestepping Fundamentals",
            url: "https://www.youtube.com/embed/9IxMTvFeVJo?si=NUVdXEH_d5P05Htg",
            description:
                "Master the basics of sidestepping in Tekken. Learn when to sidestep, which direction to step, and how to create whiff punish opportunities.",
        },
        {
            id: 2,
            title: "Character-Specific Sidestep Guide",
            url: "https://www.youtube.com/embed/6eIfUfSg3-M?si=bLHiUtzP_tiPuwh5",
            description:
                "Discover which moves can be sidestepped for each character. Learn the optimal sidestep direction against common strings and attacks.",
        },
        {
            id: 3,
            title: "Advanced Sidestep Techniques",
            url: "https://www.youtube.com/embed/ZzJLhus_VtI?si=NMgLE9skHD5Nealr",
            description:
                "Take your movement to the next level with advanced techniques like sidewalk canceling, Korean backdash integration, and sidestep blocking.",
        },
    ];

    const techniques = [
        {
            name: "Sidestep Left (SSL)",
            description: "Step into the background by tapping up",
            color: "from-blue-500/20 to-cyan-500/20",
            border: "border-blue-400/30",
        },
        {
            name: "Sidestep Right (SSR)",
            description: "Step into the foreground by tapping down",
            color: "from-purple-500/20 to-pink-500/20",
            border: "border-purple-400/30",
        },
        {
            name: "Sidewalk",
            description: "Hold the sidestep direction to walk sideways",
            color: "from-green-500/20 to-emerald-500/20",
            border: "border-green-400/50",
        },
        {
            name: "Sidestep Block",
            description: "Block immediately after sidestepping",
            color: "from-orange-500/20 to-red-500/20",
            border: "border-orange-400/50",
        },
    ];

    return (
        <div className="min-h-screen py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 addthefont">
                        Sidestepping
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Movement is the foundation of defense. Learn to sidestep linear attacks,
                        create whiff punish opportunities, and dominate the neutral game.
                    </p>
                </div>

                {/* Techniques Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12" data-aos="fade-up">
                    {techniques.map((technique, index) => (
                        <div
                            key={index}
                            className={`backdrop-blur-xl bg-gradient-to-br ${technique.color} rounded-2xl p-6 border ${technique.border} shadow-xl hover:scale-105 transition-all duration-300`}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <h3 className="text-2xl font-bold text-white mb-2 addthefont">
                                {technique.name}
                            </h3>
                            <p className="text-gray-200 text-lg">{technique.description}</p>
                        </div>
                    ))}
                </div>

                {/* Introduction Card */}
                <div
                    className="backdrop-blur-xl bg-black/40 rounded-3xl p-8 md:p-12 mb-12 border border-white/20 shadow-2xl"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-bold text-white mb-4 addthefont">
                        Why Sidestepping Matters
                    </h2>
                    <p className="text-gray-200 text-lg leading-relaxed mb-6">
                        Sidestepping is one of the most powerful defensive tools in Tekken. By moving
                        perpendicular to your opponent's attack, you can avoid linear moves entirely
                        and create massive punishment opportunities. Unlike blocking, which still puts
                        you in a defensive position, successful sidesteps give you frame advantage and
                        position control.
                    </p>
                    <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-indigo-400/30">
                        <p className="text-gray-200 text-lg italic">
                            "The best defense is not being there when the attack arrives. Master
                            sidestepping, and you'll make your opponent whiff at will."
                        </p>
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
                                        <span className="text-4xl font-bold text-purple-400 addthefont">
                                            {String(video.id).padStart(2, "0")}
                                        </span>
                                        <div className="h-1 flex-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
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

                {/* Practice Tips */}
                <div
                    className="mt-16 backdrop-blur-xl bg-black/40 rounded-3xl p-8 md:p-12 border border-purple-400/30 shadow-2xl"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 addthefont">
                        Practice Drills
                    </h2>
                    <ul className="space-y-4 text-gray-200 text-lg">
                        <li className="flex items-start gap-3">
                            <span className="text-purple-400 text-2xl">→</span>
                            <span>
                                Record the CPU doing common strings and practice sidestepping them consistently
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-400 text-2xl">→</span>
                            <span>
                                Learn which direction to sidestep against your main character's most used moves
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-400 text-2xl">→</span>
                            <span>
                                Practice sidewalk canceling to maintain movement while staying ready to block
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-400 text-2xl">→</span>
                            <span>
                                Integrate sidestepping into your Korean backdash for unpredictable movement
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidestepping;
