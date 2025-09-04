import type { Pokemon } from "@/lib/models/Pokemon";
import FormSection from "../../layout/FormSection";
import TypeSelector from "../TypeSelector";
import AbilityArray from "../AbilityArray";

interface TypesAbilitiesSectionProps {
  pokemon: Pokemon;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}

const TypesAbilitiesSection = ({
  pokemon,
  setPokemon,
}: TypesAbilitiesSectionProps) => {
  return (
    <FormSection title="Types and Abilities" className="space-y-6">
      <TypeSelector pokemon={pokemon} setPokemon={setPokemon} />
      <AbilityArray pokemon={pokemon} setPokemon={setPokemon} />
      <AbilityArray pokemon={pokemon} setPokemon={setPokemon} isHidden />
    </FormSection>
  );
};

export default TypesAbilitiesSection;
