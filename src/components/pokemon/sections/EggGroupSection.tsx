import ArraySection from "@/components/layout/ArraySection";
import CustomSelect from "@/components/ui/CustomSelect";
import type { Pokemon } from "@/lib/models/Pokemon";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import { X } from "lucide-react";

interface EggGroupSectionProps {
  pokemon: Pokemon;
}

const EggGroupSection = ({ pokemon }: EggGroupSectionProps) => {
  const { setCurrentPokemonData, eggGroups } = usePokedexContext();

  const handleAddGroup = () => {
    // Logic to add a new egg group
    const newGroup = eggGroups[0]; // Default to the first group
    setCurrentPokemonData({
      ...pokemon,
      eggGroups: [...pokemon.eggGroups, newGroup],
    });
  };

  const handleRemoveGroup = (index: number) => {
    // Logic to remove an egg group
    setCurrentPokemonData({
      ...pokemon,
      eggGroups: pokemon.eggGroups.filter((_, i) => i !== index),
    });
  };

  const handleGroupChange = (index: number, newGroup: string) => {
    setCurrentPokemonData({
      ...pokemon,
      eggGroups: pokemon.eggGroups.map((group, i) =>
        i === index ? newGroup : group
      ),
    });
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
            <button
              onClick={() => handleRemoveGroup(index)}
              className="px-2 py-1 h-fit text-rose-300 hover:text-rose-400 cursor-pointer rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ArraySection>
  );
};

export default EggGroupSection;
