import { useState } from "react";
import {
  Zap,
  Users,
  Target,
  Settings,
  ChevronRight,
  Github,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const navigate = useNavigate();

  const sourceCodeLink = "https://github.com/NathanTBeene/PBS-Editor";

  const navigateToSourceCode = () => {
    window.open(sourceCodeLink, "_blank");
  };

  const navigationCards = [
    {
      title: "Pokemon",
      description: "Edit Pokemon species data, stats, types, and abilities",
      icon: Target,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      hoverGlow: "hover:shadow-red-500/25",
      link: "/pokemon",
    },
    {
      title: "Moves",
      description: "Manage move data, power, accuracy, and effects",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      hoverGlow: "hover:shadow-blue-500/25",
      link: "/moves",
    },
    {
      title: "Abilities",
      description: "Configure Pokemon abilities, flags, and their descriptions",
      icon: Star,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      hoverGlow: "hover:shadow-purple-500/25",
      link: "/abilities",
    },
    {
      title: "Constants",
      description:
        "Edit game constants like types, genderRatios, and more. Reactively updates choices in editor.",
      icon: Settings,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      hoverGlow: "hover:shadow-emerald-500/25",
      link: "/constants",
    },
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="relative z-10 border-b border-slate-700/50 backdrop-blur-sm h-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3 pointer-events-none">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">PBS Editor</h1>
                <p className="text-sm text-slate-400">Pokemon Essentials</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <p className="text-sm text-slate-400 self-end">
                Created by Aten2049
              </p>
              <button
                className="text-slate-400 hover:text-white transition-all rounded-lg flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-600/50 cursor-pointer p-2"
                onClick={navigateToSourceCode}
              >
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">
                  Source Code
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-2 mb-8 pointer-events-none">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">
              Now with live constant editing!
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 pointer-events-none">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Pokemon Essentials
            </span>
            <br />
            <span className="text-slate-200">PBS Editor</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed pointer-events-none">
            A powerful and modern user interface for editing PBS data to be used
            within Pokemon Essentials. You can import, edit, and export your own
            PBS files or use the defaults included with this editor.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate("/pokemon")}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Start Editing</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button
              className="flex items-center space-x-2 text-slate-300 hover:text-white px-8 py-4 rounded-xl border border-slate-600 hover:border-slate-500 transition-colors cursor-pointer"
              onClick={navigateToSourceCode}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">View Documentation</span>
            </button>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationCards.map((card, index) => {
            const IconComponent = card.icon;
            const isHovered = hoveredCard === index;

            return (
              <button
                key={card.title}
                className={`group cursor-pointer relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:scale-105 ${card.bgColor} ${card.borderColor} ${card.hoverGlow} hover:shadow-2xl`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(card.link)}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                    {card.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {card.description}
                  </p>

                  <div className="flex items-center text-slate-300 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">
                      Edit {card.title}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/10 transition-colors duration-500"></div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
