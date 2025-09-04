import FormSection from "@/components/layout/FormSection";
import InputField from "@/components/ui/InputField";
import type { Move } from "@/lib/models/Move";
import React from "react";

const BattleStats = ({
  move,
  setMove,
}: {
  move: Move;
  setMove: React.Dispatch<React.SetStateAction<Move | null>>;
}) => {
  return (
    <FormSection title="Battle Stats">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InputField
          label="Power"
          type="number"
          value={move.power}
          onChange={(value) => setMove({ ...move, power: value as number })}
          tooltip={{
            description: "The base power of the move. 0 for status moves.",
          }}
          min={0}
        />
        <InputField
          label="Accuracy"
          type="number"
          value={move.accuracy}
          onChange={(value) => setMove({ ...move, accuracy: value as number })}
          tooltip={{
            description:
              "Hit chance percentage (0-100). 0 means it never misses.",
          }}
          min={0}
          max={100}
        />
        <InputField
          label="PP"
          type="number"
          value={move.pp}
          onChange={(value) => setMove({ ...move, pp: value as number })}
          tooltip={{
            description: "Power Points - how many times this move can be used.",
          }}
        />
        <InputField
          label="Priority"
          type="number"
          value={move.priority}
          onChange={(value) => setMove({ ...move, priority: value as number })}
          tooltip={{
            description: "Move priority. Higher numbers go first.",
          }}
        />
      </div>
    </FormSection>
  );
};

export default BattleStats;
