import type { Pokemon } from "@/lib/models/Pokemon";
import InputField from "@/components/ui/InputField";
import FormSection from "@/components/pokemon/FormSection";
import type React from "react";

interface PokemonBasicInfoProps {
  pokemon: Pokemon;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}

const PokemonBasicInfo = ({ pokemon, setPokemon }: PokemonBasicInfoProps) => {
  return (
    <FormSection title="Basic Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="ID"
          value={pokemon.id}
          onChange={(value) => setPokemon({ ...pokemon, id: value as string })}
          tooltip={{
            description:
              "The unique identifier for this Pokémon. Essentials standard is all caps no spaces.",
          }}
        />
        <InputField
          label="Name"
          value={pokemon.name}
          onChange={(value) =>
            setPokemon({ ...pokemon, name: value as string })
          }
        />
        <InputField
          label="Form Name"
          value={pokemon.formName || ""}
          onChange={(value) =>
            setPokemon({ ...pokemon, formName: value as string })
          }
        />
        <InputField
          label="Category"
          value={pokemon.category}
          onChange={(value) =>
            setPokemon({ ...pokemon, category: value as string })
          }
        />
        <InputField
          label="Generation"
          type="number"
          value={pokemon.generation}
          onChange={(value) =>
            setPokemon({ ...pokemon, generation: value as number })
          }
          min={0}
        />
        <InputField
          label="Dex #"
          type="number"
          value={pokemon.dexNumber}
          onChange={(value) =>
            setPokemon({ ...pokemon, dexNumber: value as number })
          }
          min={0}
        />
      </div>
      <div className="mt-4">
        <InputField
          label="Pokedex Entry"
          type="textarea"
          value={pokemon.pokedex}
          onChange={(value) =>
            setPokemon({ ...pokemon, pokedex: value as string })
          }
          rows={3}
        />
      </div>
    </FormSection>
  );
};

export default PokemonBasicInfo;
