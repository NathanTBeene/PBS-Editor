import ArraySection from "@/components/layout/ArraySection";
import InputField from "@/components/ui/InputField";
import type { Ability } from "@/lib/models/Ability";
import { X } from "lucide-react";

const AbilityFlagsSection = ({
  ability,
  setAbility,
}: {
  ability: Ability;
  setAbility: React.Dispatch<React.SetStateAction<Ability | null>>;
}) => {
  const handleAddFlag = () => {
    setAbility((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        flags: [...prev.flags, ""],
      };
    });
  };

  const handleRemoveFlag = (index: number) => {
    setAbility((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        flags: prev.flags.filter((_, i) => i !== index),
      };
    });
  };

  const handleChangeFlag = (index: number, value: string | number | boolean) => {
    setAbility((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        flags: prev.flags.map((flag, i) =>
          i === index ? (value as string) : flag
        ),
      };
    });
  };

  return (
    <ArraySection title="Flags" addLabel="Add Flag" addToArray={handleAddFlag}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ability?.flags.map((flag, index) => (
          <div className="flex py-2 items-center" key={index}>
            <InputField
              type="text"
              value={flag}
              onChange={(value) => handleChangeFlag(index, value)}
              className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
              placeholder="Enter flag..."
            />
            <button
              onClick={() => handleRemoveFlag(index)}
              className="px-2 py-1 h-fit text-rose-300 hover:text-rose-400 cursor-pointer rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ArraySection>
  );
};

export default AbilityFlagsSection;
