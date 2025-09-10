import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import type { Ability } from "@/lib/models/Ability";
import AbilityListItem from "./AbilityListItem";
import NewAbilityForm from "../forms/NewAbilityForm";

interface AbilityListProps {
  selectedAbility: Ability | null;
  onAbilitySelect: (ability: Ability) => void;
}

const AbilityList = ({
  selectedAbility,
  onAbilitySelect,
}: AbilityListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasScrolledToSelected, setHasScrolledToSelected] = useState(false);

  const { abilities } = usePokedexContext();

  const filteredAbilities = useMemo(() => {
    return abilities.filter(
      (ability) =>
        ability.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ability.id.includes(searchTerm)
    );
  }, [abilities, searchTerm]);

  const abilityRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedAbility) {
      scrollToAbility(selectedAbility?.id || "", false);
    }
  }, [abilities]);

  // Initial scroll to selected ability when component mounts or selected ability changes
  useEffect(() => {
    if (selectedAbility && !hasScrolledToSelected) {
      // Use setTimeout to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        scrollToAbility(selectedAbility.id, false); // false = instant scroll for initial positioning
        setHasScrolledToSelected(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [selectedAbility, hasScrolledToSelected]);

  // Smooth scroll when user selects a different ability
  useEffect(() => {
    if (selectedAbility && hasScrolledToSelected) {
      scrollToAbility(selectedAbility.id, true); // true = smooth scroll for user interactions
    }
  }, [selectedAbility, hasScrolledToSelected]);

  // Reset scroll flag when search changes
  useEffect(() => {
    if (searchTerm) {
      setHasScrolledToSelected(false);
    }
  }, [searchTerm]);

  const scrollToAbility = (abilityId: string, smooth: boolean = true) => {
    const abilityElement = abilityRefs.current[abilityId];
    const containerElement = listContainerRef.current;

    if (abilityElement && containerElement) {
      const containerRect = containerElement.getBoundingClientRect();
      const abilityRect = abilityElement.getBoundingClientRect();

      // Calculate if element is already visible
      const isVisible =
        abilityRect.top >= containerRect.top &&
        abilityRect.bottom <= containerRect.bottom;

      if (!isVisible) {
        // Calculate scroll position to center the element
        const elementTop = abilityElement.offsetTop;
        const elementHeight = abilityElement.offsetHeight;
        const containerHeight = containerElement.clientHeight;

        const scrollTop = elementTop - containerHeight / 2 + elementHeight / 2;

        containerElement.scrollTo({
          top: Math.max(0, scrollTop),
          behavior: smooth ? "smooth" : "instant",
        });
      }
    }
  };

  const selectAndScrollToAbility = (ability: Ability) => {
    onAbilitySelect(ability);
    // Don't manually scroll here - let the useEffect handle it
  };

  return (
    <div className="w-80 bg-gradient-to-r from-slate-800/40 to-slate-800 flex flex-col">
      {/* Search Header */}
      <div className="p-4 flex items-center h-25 border-b-3 border-slate-700 shadow-md">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Moves..."
              className="w-full pl-10 pr-4 py-2 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300/70 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <NewAbilityForm
            onAbilityAdded={(ability) => {
              console.log("New ability added:", ability);
              selectAndScrollToAbility(ability);
            }}
          />
        </div>
      </div>

      {/* Ability List */}
      <div
        ref={listContainerRef}
        className="flex-1 overflow-y-auto border-r-3 border-slate-700"
      >
        {filteredAbilities
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((ability) => (
            <AbilityListItem
              key={ability.id}
              ability={ability}
              selectedAbility={selectedAbility}
              abilityRefs={abilityRefs}
              selectAndScrollToAbility={selectAndScrollToAbility}
            />
          ))}
      </div>
    </div>
  );
};

export default AbilityList;
