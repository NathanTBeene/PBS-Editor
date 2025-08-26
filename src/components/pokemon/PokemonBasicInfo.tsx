import type { Pokemon } from "../../lib/models/Pokemon";
import InputField from "../ui/InputField";
import FormSection from "./FormSection";

interface PokemonBasicInfoProps {
  pokemon: Pokemon;
  handleInputChange: (field: string, value: string | number) => void;
}

const PokemonBasicInfo = ({
  pokemon,
  handleInputChange,
}: PokemonBasicInfoProps) => {
  return (
    <FormSection title="Basic Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="ID"
          value={pokemon.id}
          onChange={(value) => handleInputChange("id", value)}
          tooltip={{
            description:
              "The unique identifier for this Pokémon. Essentials standard is all caps no spaces.",
          }}
        />
        <InputField
          label="Name"
          value={pokemon.name}
          onChange={(value) => handleInputChange("name", value)}
        />
        <InputField
          label="Form Name"
          value={pokemon.formName || ""}
          onChange={(value) => handleInputChange("formName", value)}
        />
        <InputField
          label="Category"
          value={pokemon.category}
          onChange={(value) => handleInputChange("category", value)}
        />
        <InputField
          label="Generation"
          type="number"
          value={pokemon.generation}
          onChange={(value) => handleInputChange("generation", value)}
        />
        <InputField
          label="Dex #"
          type="number"
          value={pokemon.dexNumber}
          onChange={(value) => handleInputChange("dexNumber", value)}
        />
      </div>
      <div className="mt-4">
        <InputField
          label="Pokedex Entry"
          type="textarea"
          value={pokemon.pokedex}
          onChange={(value) => handleInputChange("pokedex", value)}
          rows={3}
        />
      </div>
    </FormSection>
  );
};

export default PokemonBasicInfo;
