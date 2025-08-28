import CustomSelect from "@/components/ui/CustomSelect";
import FormSection from "../FormSection";
import type { Pokemon } from "@/lib/models/Pokemon";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";

const PhysicalAttributesSection = ({
  currentPokemon,
}: {
  currentPokemon: Pokemon;
}) => {
  const { colors, shapes, setCurrentPokemonData } = usePokedexContext();

  const handleInputChange = (field: string, value: string | number) => {
    // Update the current Pokemon's attributes
    setCurrentPokemonData({
      ...currentPokemon,
      [field]: value,
    });
  };

  return (
    <FormSection title="Physical Attributes">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Height (m)
          </label>
          <input
            type="number"
            step="0.1"
            value={currentPokemon.height}
            onChange={(e) =>
              handleInputChange("height", parseFloat(e.target.value))
            }
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={currentPokemon.weight}
            onChange={(e) =>
              handleInputChange("weight", parseFloat(e.target.value))
            }
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
