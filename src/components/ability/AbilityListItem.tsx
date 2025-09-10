import React from "react";
import type { Ability } from "@/lib/models/Ability";

interface AbilityListItemProps {
  ability: Ability;
  selectedAbility: Ability | null;
  abilityRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  selectAndScrollToAbility: (ability: Ability) => void;
}

const AbilityListItem = ({
  ability,
  selectedAbility,
  abilityRefs,
  selectAndScrollToAbility,
}: AbilityListItemProps) => {
  return (
    <div
      key={ability.id}
      ref={(el) => {
        abilityRefs.current[ability.id] = el;
      }}
      className={`p-3 border-b border-slate-500 bg-gradient-to-r from-slate-800/10 to-slate-800 cursor-pointer transition-colors ${
        selectedAbility?.id === ability.id
          ? "bg-blue-600/20 border-l-4 border-l-blue-600/40"
          : "hover:bg-slate-600/40"
      }`}
      onClick={() => {
        selectAndScrollToAbility(ability);
      }}
    >
      <div className="flex items-center gap-3 my-2">
        <div className="flex-1 min-w-0">
          <div className="pl-3 font-medium truncate text-medium">
            {ability.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbilityListItem;
