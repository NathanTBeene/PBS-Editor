import type { Pokemon } from "@/lib/models/Pokemon";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import CustomSelect from "@/components/ui/CustomSelect";
import { Plus, X } from "lucide-react";
import { useArrayManager } from "@/lib/hooks/useArrayManager";
import React from "react";

interface TypeSelectorProps {
  pokemon: Pokemon;
  setPokemon: (updater: (prev: Pokemon | null) => Pokemon | null) => void;
}

const TypeSelector = ({ pokemon, setPokemon }: TypeSelectorProps) => {
  const { types } = usePokedexContext();

  const { handleArrayChange, removeFromArray, addToArray } = useArrayManager({
    data: pokemon,
    setData: setPokemon,
  });

  const handleTypeChange = (index: number, value: string) => {
    handleArrayChange("types", index, value);
  };

  const handleAddType = () => {
    const defaultType = Object.keys(types)[0] || "NORMAL";
    addToArray("types", defaultType);
  };

  const handleRemoveType = (index: number) => {
    removeFromArray("types", index);
  };

  const canAddType = pokemon.types.length < 2; // Pokemon can have max 2 types
  const showRemoveButton = () => pokemon.types.length > 1;

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Types
      </label>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {pokemon.types.length > 0 ? (
          pokemon.types.map((type, index) => (
            <div key={index} className="flex items-center gap-2 flex-1">
              <CustomSelect
                value={type}
                options={Object.keys(types)}
                onChange={(value) => handleTypeChange(index, value)}
                placeholder="Select type"
                className="flex-1"
              />
              {showRemoveButton() && (
                <button
                  onClick={() => handleRemoveType(index)}
                  className="p-1 text-rose-300 hover:text-rose-400 cursor-pointer transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-slate-500 italic col-span-full">
            No types selected
          </p>
        )}
      </div>
      {canAddType && (
        <button
          onClick={handleAddType}
          className="px-3 py-2 border border-slate-500 text-slate-500 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Type
        </button>
      )}
    </div>
  );
};

const areEqual = (
  prevProps: TypeSelectorProps,
  nextProps: TypeSelectorProps
) => {
  return prevProps.pokemon === nextProps.pokemon;
};

export default React.memo(TypeSelector, areEqual);
