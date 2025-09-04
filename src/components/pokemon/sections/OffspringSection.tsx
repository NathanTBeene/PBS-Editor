import ArraySection from "@/components/layout/ArraySection";
import Autocomplete from "@/components/ui/Autocomplete";
import type { Pokemon } from "@/lib/models/Pokemon";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import { X } from "lucide-react";
import type React from "react";

interface OffspringSectionProps {
  currentPokemon: Pokemon;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}

const OffspringSection = ({
  currentPokemon,
  setPokemon,
}: OffspringSectionProps) => {
  const { pokemon } = usePokedexContext();

  const handleAddOffspring = () => {
    setPokemon({
      ...currentPokemon,
      offspring: [...(currentPokemon.offspring || []), ""],
    });
  };

  const handleOffspringChange = (index: number, newPokemon: string) => {
    setPokemon({
      ...currentPokemon,
      offspring: currentPokemon.offspring.map((mon, i) =>
        i === index ? newPokemon : mon
      ),
    });
  };

  const onRemoveOffspring = (index: number) => {
    setPokemon({
      ...currentPokemon,
      offspring: currentPokemon.offspring.filter((_, i) => i !== index),
    });
  };

  return (
    <ArraySection
      title="Offspring"
      addLabel="Add Pokémon"
      addToArray={handleAddOffspring}
    >
      <div className="grid grid-cols-3">
        {currentPokemon.offspring &&
          currentPokemon.offspring.map((mon, index) => (
            <div className="flex py-2 items-center" key={index}>
              <Autocomplete
                key={index}
                options={pokemon.map((p) => p.id)}
                value={mon}
                inputClass="w-full"
                onValueChange={(newPokemon) =>
                  handleOffspringChange(index, newPokemon)
                }
                placeholder="Select Pokémon..."
              />
              <button
                onClick={() => onRemoveOffspring(index)}
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

export default OffspringSection;
