import React from "react";
import FormSection from "../FormSection";
import InfoTooltip from "@/components/ui/InfoTooltip";
import type { Pokemon } from "@/lib/models/Pokemon";
import { GenderRatios, GrowthRates } from "@/lib/models/constants";
import CustomSelect from "@/components/ui/CustomSelect";
import InputField from "@/components/ui/InputField";

const GameMechanicsSection = ({
  pokemon,
  setPokemon,
}: {
  pokemon: Pokemon;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}) => {
  const handleFieldChange = (field: keyof Pokemon, value: any) => {
    setPokemon((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  return (
    <FormSection title="Game Mechanics">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Catch Rate */}
        <div>
          <InputField
            label="Catch Rate"
            tooltip={{
              description:
                "Number between 0 and 255. The higher the number, the more likely it is to catch. (0 means it can only be caught with a Master Ball)",
            }}
            type="number"
            value={pokemon.catchRate}
            onChange={(value) =>
              handleFieldChange("catchRate", value as number)
            }
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
            min={1}
            max={255}
          />
        </div>
        {/* Base Happiness */}
        <div>
          <InputField
            label="Base Happiness"
            type="number"
            value={pokemon.happiness}
            onChange={(value) =>
              handleFieldChange("happiness", value as number)
            }
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
            min={1}
            max={255}
          />
        </div>
        {/* Base Experience */}
        <div>
          <InputField
            label="Base Experience"
            type="number"
            value={pokemon.baseExp}
            onChange={(value) => handleFieldChange("baseExp", value as Number)}
            min={0}
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
          />
        </div>
        {/* Growth Rate */}
        <div>
          <label className="flex gap-2 items-center relative text-sm font-medium text-slate-300 mb-2">
            Growth Rate
            <InfoTooltip
              description="The growth rate of this Pokémon. Click for more information."
              link="https://bulbapedia.bulbagarden.net/wiki/Experience"
            />
          </label>
          <CustomSelect
            value={pokemon.growthRate}
            onChange={(value) => handleFieldChange("growthRate", value)}
            options={GrowthRates}
            placeholder="Select growth rate..."
          />
        </div>
        {/* Gender Ratio */}
        <div>
          <label className="flex gap-2 items-center relative text-sm font-medium text-slate-300 mb-2">
            Gender Ratio
            <InfoTooltip description="The ratio of Pokémon that will be female for this species." />
          </label>
          <CustomSelect
            value={pokemon.genderRatio}
            onChange={(value) => handleFieldChange("genderRatio", value)}
            options={GenderRatios}
            placeholder="Select gender ratio..."
          />
        </div>
        {/* Hatch Steps */}
        <div>
          <InputField
            label="Hatch Steps"
            tooltip={{
              description:
                "Number of steps required for this Pokémon to hatch.",
            }}
            type="number"
            value={pokemon.hatchSteps}
            onChange={(value) =>
              handleFieldChange("hatchSteps", value as number)
            }
            min={1}
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
          />
        </div>
        {/* Incense */}
        <div>
          <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2 relative">
            Incense
            <InfoTooltip description="The item ID of an item that must be held by the parent Pokémon to breed this Pokémon." />
          </label>
          <input
            type="text"
            value={pokemon.incense || ""}
            onChange={(e) => handleFieldChange("incense", e.target.value)}
            onBlur={() => {
              handleFieldChange(
                "incense",
                pokemon.incense?.replace(/\s+/g, "")
              );
            }}
            className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
          />
        </div>
      </div>
    </FormSection>
  );
};

export default GameMechanicsSection;
