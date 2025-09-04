import ArraySection from "@/components/layout/ArraySection";
import CustomSelect from "@/components/ui/CustomSelect";
import { moveFlags, type Move } from "@/lib/models/Move";
import { X } from "lucide-react";
import React from "react";

const MoveFlagsSection = ({
  move,
  setMove,
}: {
  move: Move;
  setMove: React.Dispatch<React.SetStateAction<Move | null>>;
}) => {
  const handleFlagChange = (index: number) => (newValue: string) => {
    const updatedFlags = [...move.flags];
    updatedFlags[index] = newValue;
    setMove({ ...move, flags: updatedFlags });
  };

  const handleRemoveFlag = (index: number) => () => {
    const updatedFlags = move.flags.filter((_, i) => i !== index);
    setMove({ ...move, flags: updatedFlags });
  };

  const handleAddFlag = () => {
    setMove({ ...move, flags: [...move.flags, ""] });
  };

  return (
    <ArraySection
      title="Move Flags"
      addLabel="Add Flag"
      addToArray={handleAddFlag}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {move.flags.map((flag, index) => (
          <div className="flex items-center gap-2" key={index}>
            <div className="flex-1">
              <CustomSelect
                value={flag}
                onChange={handleFlagChange(index)}
                options={moveFlags}
                placeholder="Select flag..."
              />
            </div>
            <button
              onClick={handleRemoveFlag(index)}
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

export default MoveFlagsSection;
