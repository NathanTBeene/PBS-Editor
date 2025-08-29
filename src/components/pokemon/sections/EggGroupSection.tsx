import ArraySection from "@/components/layout/ArraySection";
import CustomSelect from "@/components/ui/CustomSelect";
import type { Pokemon } from "@/lib/models/Pokemon";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import { X } from "lucide-react";

interface EggGroupSectionProps {
  pokemon: Pokemon;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}

const EggGroupSection = ({ pokemon, setPokemon }: EggGroupSectionProps) => {
  const { eggGroups } = usePokedexContext();

  const handleAddGroup = () => {
    // Logic to add a new egg group
    const newGroup = eggGroups[0]; // Default to the first group
    setPokemon((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        eggGroups: [...prev.eggGroups, newGroup],
      };
    });
  };

  const handleRemoveGroup = (index: number) => {
    // Logic to remove an egg group
    setPokemon((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        eggGroups: prev.eggGroups.filter((_, i) => i !== index),
      };
    });
  };

  const handleGroupChange = (index: number, newGroup: string) => {
    setPokemon((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        eggGroups: prev.eggGroups.map((group, i) =>
          i === index ? newGroup : group
        ),
      };
    });
  };

  const shouldShowRemoveButton = () => {
    return pokemon.eggGroups.length > 1;
  };

  return (
    <ArraySection
      title="Egg Groups"
      addLabel="Add Egg Group"
      addToArray={handleAddGroup}
    >
      <div className="grid grid-cols-5">
        {pokemon.eggGroups.map((group, index) => (
          <div className="flex py-2 items-center" key={index}>
            <CustomSelect
              key={index}
              options={eggGroups}
              value={group}
              className="w-30"
              onChange={(newGroup) => handleGroupChange(index, newGroup)}
              placeholder="Groups..."
            />
            {shouldShowRemoveButton() && (
              <button
                onClick={() => handleRemoveGroup(index)}
                className="px-2 py-1 h-fit text-rose-300 hover:text-rose-400 cursor-pointer rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </ArraySection>
  );
};

export default EggGroupSection;
