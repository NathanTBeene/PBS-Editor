import type { Pokemon } from "@/lib/models/Pokemon";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import Autocomplete from "../ui/Autocomplete";
import { Plus, X } from "lucide-react";
import React, { useEffect } from "react";
import { defaultAbility } from "@/lib/models/Ability";

interface AbilityArrayProps {
  pokemon: Pokemon;
  setPokemon: (updater: (prev: Pokemon | null) => Pokemon | null) => void;
  isHidden?: boolean;
}

const AbilityArray = ({ pokemon, setPokemon, isHidden }: AbilityArrayProps) => {
  const { abilities } = usePokedexContext();

  useEffect(() => {
    console.log("Abilities updated:", pokemon.abilities);
  }, [pokemon.abilities]);

  const handleAbilityChange = (index: number, value: string) => {
    setPokemon((prev) => {
      if (!prev) return prev;
      const updatedAbilities = isHidden
        ? [
            ...prev.hiddenAbilities.slice(0, index),
            value,
            ...prev.hiddenAbilities.slice(index + 1),
          ]
        : [
            ...prev.abilities.slice(0, index),
            value,
            ...prev.abilities.slice(index + 1),
          ];
      return {
        ...prev,
        ...(isHidden
          ? { hiddenAbilities: updatedAbilities }
          : { abilities: updatedAbilities }),
      };
    });
  };

  const handleAddAbility = () => {
    setPokemon((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ...(isHidden
          ? { hiddenAbilities: [...prev.hiddenAbilities, defaultAbility.id] }
          : { abilities: [...prev.abilities, defaultAbility.id] }),
      };
    });
  };

  const handleRemoveAbility = (index: number) => {
    setPokemon((prev) => {
      if (!prev) return prev;
      const updatedAbilities = isHidden
        ? prev.hiddenAbilities.filter((_, i) => i !== index)
        : prev.abilities.filter((_, i) => i !== index);
      return {
        ...prev,
        ...(isHidden
          ? { hiddenAbilities: updatedAbilities }
          : { abilities: updatedAbilities }),
      };
    });
  };

  const showRemoveButton = () =>
    isHidden
      ? pokemon.hiddenAbilities.length > 1
      : pokemon.abilities.length > 1;

  const abilitiesArray = pokemon.abilities.map(
    (ability, index) => (
      console.log("Rendering ability:", ability),
      (
        <div key={index} className="flex items-center gap-2 flex-1">
          <Autocomplete
            key={`${pokemon.id}-ability-${index}`} // Ensure re-mounting when ability changes
            value={ability}
            onValueChange={(value) => handleAbilityChange(index, value)}
            options={abilities.map((a) => a.id)}
            placeholder="Select ability..."
          />
          {showRemoveButton() && (
            <button
              onClick={() => handleRemoveAbility(index)}
              className="p-1 text-rose-300 hover:text-rose-400 cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      )
    )
  );

  const hiddenAbilitiesArray = pokemon.hiddenAbilities.map((ability, index) => (
    <div key={index} className="flex items-center gap-2 flex-1">
      <Autocomplete
        key={`${pokemon.id}-hidden-ability-${index}`}
        value={ability}
        onValueChange={(value) => handleAbilityChange(index, value)}
        options={abilities.map((a) => a.id)}
        placeholder="Select ability..."
      />
      {showRemoveButton() && (
        <button
          onClick={() => handleRemoveAbility(index)}
          className="p-1 text-rose-300 hover:text-rose-400 cursor-pointer transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      )}
    </div>
  ));

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {isHidden ? "Hidden Abilities" : "Abilities"}
      </label>
      <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-3">
        {isHidden ? hiddenAbilitiesArray : abilitiesArray}
      </div>
      <button
        onClick={handleAddAbility}
        className="px-3 py-2 border border-slate-500 text-slate-500 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors"
      >
        <Plus className="w-4 h-4" />
        {isHidden ? "Add Hidden Ability" : "Add Ability"}
      </button>
    </div>
  );
};

const areEqual = (
  prevProps: AbilityArrayProps,
  nextProps: AbilityArrayProps
) => {
  if (prevProps.isHidden !== nextProps.isHidden) return false;
  return prevProps.pokemon === nextProps.pokemon;
};

export default React.memo(AbilityArray, areEqual);
