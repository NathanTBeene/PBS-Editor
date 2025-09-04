import FormSection from "@/components/pokemon/FormSection";
import CustomSelect from "@/components/ui/CustomSelect";
import InfoTooltip from "@/components/ui/InfoTooltip";
import InputField from "@/components/ui/InputField";
import { moveTargets, type Move } from "@/lib/models/Move";
import React from "react";

const AdvancedProperties = ({
  move,
  setMove,
}: {
  move: Move;
  setMove: React.Dispatch<React.SetStateAction<Move | null>>;
}) => {
  return (
    <FormSection title="Advanced Properties">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2">
            Target
            <InfoTooltip description="What the move targets in battle." />
          </label>
          <CustomSelect
            value={move.target}
            onChange={(value) => setMove({ ...move, target: value as string })}
            options={moveTargets}
            placeholder="Select target..."
          />
        </div>
        <InputField
          label="Function Code"
          value={move.functionCode}
          onChange={(value) =>
            setMove({ ...move, functionCode: value as string })
          }
          tooltip={{
            description:
              "The internal function code that defines the move's effect. Click for more info.",
            link: "https://essentialsdocs.fandom.com/wiki/Move_effects",
          }}
        />
        <InputField
          label="Effect Chance"
          type="number"
          value={move.effectChance}
          onChange={(value) =>
            setMove({ ...move, effectChance: value as number })
          }
          tooltip={{
            description: "Percentage chance for secondary effects to occur.",
          }}
          min={0}
          max={100}
        />
      </div>
    </FormSection>
  );
};

export default AdvancedProperties;
