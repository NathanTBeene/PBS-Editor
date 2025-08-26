interface StatsInputSectionProps {
  title: string;
  stats: Record<string, number>;
  onStatChange: (stat: string, value: number) => void;
}

const StatsInputSection = ({
  title,
  stats,
  onStatChange,
}: StatsInputSectionProps) => {
  return (
    <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(stats || {}).map(([stat, value]) => (
          <div key={stat}>
            <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">
              {stat.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => onStatChange(stat, parseInt(e.target.value))}
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
