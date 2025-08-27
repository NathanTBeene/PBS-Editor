import type { Pokemon } from "../../lib/models/Pokemon";
import { usePokedexContext } from "../../lib/providers/PokedexProvider";
import CustomSelect from "../ui/CustomSelect";
import FormSection from "./FormSection";

interface TypesAbilitiesSectionProps {
  pokemon: Pokemon;
}

const TypesAbilitiesSection = ({ pokemon }: TypesAbilitiesSectionProps) => {
  const { types } = usePokedexContext();

  return (
    <FormSection title="Types and Abilities">
      <div className="space-y-6">
        <CustomSelect
          options={Object.keys(types)}
          value={pokemon.types[0]}
          onChange={() => {}}
        />
      </div>
    </FormSection>
  );
};

export default TypesAbilitiesSection;
