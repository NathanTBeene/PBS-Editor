import { Plus } from "lucide-react";

interface ArraySectionProps {
  title: string;
  addLabel: string;
  className?: string;
  children: React.ReactNode;
  addToArray: (field: string) => void;
}

const ArraySection = ({
  title,
  addLabel,
  children,
  addToArray,
  className = "",
}: ArraySectionProps) => {
  return (
    <section
      className={`bg-slate-700/40 rounded-lg shadow-lg p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold ">{title}</h2>
        <button
          onClick={() => addToArray("eggGroups")}
          className="px-3 py-1 text-sm border border-slate-500 rounded-md text-slate-500 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          {addLabel}
        </button>
      </div>
      {children}
    </section>
  );
};

export default ArraySection;
