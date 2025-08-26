import { X } from "lucide-react";
import CustomAutocomplete from "../ui/CustomAutocomplete";
import { usePokedexContext } from "../../lib/providers/PokedexProvider";

interface AbilitySelectProps {
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  placeholder?: string;
}

const AbilitySelect = ({
  value,
  onChange,
  onRemove,
  placeholder,
}: AbilitySelectProps) => {
  const { abilities } = usePokedexContext();

  return (
    <div className="relative flex items-center">
      <div className="flex-1">
        <CustomAutocomplete
          value={value}
          onChange={onChange}
          options={abilities.map((ability) => ability.name.toUpperCase())}
          placeholder={placeholder}
        />
      </div>

      {onRemove && (
        <button
          onClick={onRemove}
          className="p-1 text-rose-300 hover:text-rose-400 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default AbilitySelect;
