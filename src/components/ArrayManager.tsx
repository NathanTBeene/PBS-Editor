import { Plus, X } from "lucide-react";
import CustomSelect from "./CustomSelect";
import CustomAutocomplete from "./CustomAutocomplete";
import AbilitySelect from "./AbilitySelect";

interface ArrayManagerProps {
  title: string;
  items: string[];
  onItemChange: (index: number, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  type: "select" | "autocomplete" | "ability" | "text";
  options?: string[];
  placeholder?: string;
  maxItems?: number;
  gridCols?: string;
  showRemoveButton?: (index: number, items: string[]) => boolean;
  emptyMessage?: string;
}

const ArrayManager = ({
  title,
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
  type,
  options = [],
  placeholder = "",
  maxItems,
  gridCols = "grid-cols-1 md:grid-cols-3",
  showRemoveButton = (index, items) => items.length > 1,
  emptyMessage,
}: ArrayManagerProps) => {
  const canAddMore = !maxItems || items.length < maxItems;

  const renderInput = (item: string, index: number) => {
    switch (type) {
      case "select":
        return (
          <CustomSelect
            value={item}
            onChange={(value) => onItemChange(index, value)}
            options={options}
            placeholder={placeholder}
            className="flex-1"
          />
        );
      case "autocomplete":
        return (
          <CustomAutocomplete
            value={item}
            onChange={(value) => onItemChange(index, value)}
            options={options}
            placeholder={placeholder}
            className="w-full"
          />
        );
      case "ability":
        return (
          <AbilitySelect
            value={item}
            onChange={(value) => onItemChange(index, value)}
            onRemove={() => onRemoveItem(index)}
            placeholder={placeholder}
          />
        );
      case "text":
        return (
          <input
            type="text"
            value={item}
            onChange={(e) => onItemChange(index, e.target.value)}
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {title}
      </label>
      <div className={`grid ${gridCols} gap-2 mb-4`}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {renderInput(item, index)}
              {type !== "ability" && showRemoveButton(index, items) && (
                <button
                  onClick={() => onRemoveItem(index)}
                  className="p-1 text-rose-300 hover:text-rose-400 cursor-pointer transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
          ))
        ) : (
          emptyMessage && (
            <p className="text-slate-500 italic col-span-full">
              {emptyMessage}
            </p>
          )
        )}
      </div>
      {canAddMore && (
        <button
          onClick={onAddItem}
          className="px-3 py-2 border border-slate-500 text-slate-500 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add {title.slice(0, -1)}
        </button>
      )}
    </div>
  );
};

export default ArrayManager;