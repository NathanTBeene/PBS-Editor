import CustomSelect from "@/components/ui/CustomSelect";
import FormSection from "../FormSection";
import type { Pokemon } from "@/lib/models/Pokemon";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import InputField from "@/components/ui/InputField";

const PhysicalAttributesSection = ({
  currentPokemon,
  setPokemon,
}: {
  currentPokemon: Pokemon;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}) => {
  const { colors, shapes } = usePokedexContext();

  const handleInputChange = (field: string, value: string | number) => {
    // Update the current Pokemon's attributes
    setPokemon((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  return (
    <FormSection title="Physical Attributes">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <InputField
            label="Height (m)"
            type="number"
            min={0}
            value={currentPokemon.height}
            onChange={(value) => handleInputChange("height", value as number)}
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
          />
        </div>
        <div>
          <InputField
            label="Weight (kg)"
            type="number"
            min={0}
            value={currentPokemon.weight}
            onChange={(value) => handleInputChange("weight", value as number)}
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Color
          </label>
          <CustomSelect
            value={currentPokemon.color}
            onChange={(value) => handleInputChange("color", value)}
            options={colors}
            placeholder="Select color..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Shape
          </label>
          <CustomSelect
            value={currentPokemon.shape}
            onChange={(value) => handleInputChange("shape", value)}
            options={shapes}
            placeholder="Select shape..."
          />
        </div>
      </div>
    </FormSection>
  );
};

export default PhysicalAttributesSection;
