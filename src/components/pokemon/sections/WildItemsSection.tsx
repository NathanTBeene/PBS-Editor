import type { Pokemon } from "@/lib/models/Pokemon";
import FormSection from "../../layout/FormSection";

const WildItemsSection = ({
  pokemon,
  setPokemon,
}: {
  pokemon: Pokemon;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}) => {
  const handleFieldChange = (field: keyof Pokemon, value: string) => {
    setPokemon((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  return (
    <FormSection
      title="Wild Items"
      tooltip="The IDs of items that a wild Pokémon of this species can be found holding."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Common Item */}
        <div>
          <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2 relative">
            Wild Item Common (50%)
          </label>
          <input
            type="text"
            value={pokemon.wildItemCommon || ""}
            onChange={(e) =>
              handleFieldChange("wildItemCommon", e.target.value)
            }
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
          />
        </div>
        {/* Wild Item Uncommon (5%) */}
        <div>
          <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2 relative">
            Wild Item Uncommon (5%)
          </label>
          <input
            type="text"
            value={pokemon.wildItemUncommon || ""}
            onChange={(e) =>
              handleFieldChange("wildItemUncommon", e.target.value)
            }
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
          />
        </div>
        {/* Wild Item Rare (1%) */}
        <div>
          <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2 relative">
            Wild Item Rare (1%)
          </label>
          <input
            type="text"
            value={pokemon.wildItemRare || ""}
            onChange={(e) => handleFieldChange("wildItemRare", e.target.value)}
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
          />
        </div>
      </div>
    </FormSection>
  );
};

export default WildItemsSection;
