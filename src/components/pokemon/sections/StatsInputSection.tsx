import type { Pokemon } from "@/lib/models/Pokemon";

interface StatsInputSectionProps {
  title: string;
  type: "base" | "effort";
  pokemon: Pokemon;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}

const StatsInputSection = ({
  title,
  type,
  pokemon,
  setPokemon,
}: StatsInputSectionProps) => {
  const handleStatChange = (stat: string, value: string) => {
    if (type === "base") {
      setPokemon({
        ...pokemon,
        baseStats: {
          ...pokemon.baseStats,
          [stat]: parseInt(value, 10),
        },
      });
    } else {
      setPokemon({
        ...pokemon,
        effortValues: {
          ...pokemon.effortValues,
          [stat]: parseInt(value, 10),
        },
      });
    }
  };

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    stat: string
  ) => {
    const value = e.target.value;
    if (value === "") {
      handleStatChange(stat, "0");
    }
  };

  return (
    <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(
          type === "base" ? pokemon.baseStats || {} : pokemon.effortValues || {}
        ).map(([stat, value]) => (
          <div key={stat}>
            <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">
              {stat.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleStatChange(stat, e.target.value)}
              onBlur={(e) => handleOnBlur(e, stat)}
              className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
              min="0"
              max="255"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsInputSection;
