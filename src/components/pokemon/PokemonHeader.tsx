import type { Pokemon } from "../../lib/models/Pokemon";
import TypeBubble from "../TypeBubble";
import { theme } from "../../lib/theme/colors";
import ActionButtons from "../ui/ActionButtons";

interface PokemonHeaderProps {
  pokemon: Pokemon;
  onSave: () => void;
  onReset: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

const PokemonHeader = ({
  pokemon,
  onSave,
  onReset,
  onDelete,
  onSetDefault,
}: PokemonHeaderProps) => {
  return (
    <div
      className={`p-6 h-25 border-b-3 shadow-sm
        ${theme.colors.primary.borderDark} ${theme.colors.primary.bg}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {pokemon.name}
            {pokemon.formName && (
              <span className={`ml-2 ${theme.colors.primary.textMuted}`}>
                ({pokemon.formName})
              </span>
            )}
          </h1>
          <div className="flex">
            <p className={`mt-1 mr-10 ${theme.colors.primary.textMuted}`}>
              #{pokemon.dexNumber} - The {pokemon.category} Pokemon
            </p>
            <div className="flex gap-2 mt-1">
              {pokemon.types.map((type) => (
                <TypeBubble key={type} type={type} />
              ))}
            </div>
          </div>
        </div>
        <ActionButtons
          onSetDefault={onSetDefault}
          onReset={onReset}
          onDelete={onDelete}
          onSave={onSave}
        />
      </div>
    </div>
  );
};

export default PokemonHeader;
