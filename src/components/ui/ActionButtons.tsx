import { ArrowDownToLine, RotateCcw, Save } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { theme } from "../../lib/theme/colors";

interface ActionButtonsProps {
  onSetDefault: () => void;
  onReset: () => void;
  onDelete: () => void;
  onSave: () => void;
}

const ActionButtons = ({
  onSetDefault,
  onReset,
  onDelete,
  onSave,
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={onSetDefault}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
          shadow-sm cursor-pointer
          ${theme.colors.button.primary}`}
      >
        <ArrowDownToLine className="w-4 h-4" />
        Default
      </button>
      <button
        onClick={onReset}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
          shadow-sm cursor-pointer
          ${theme.colors.button.primary}`}
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
      <DeleteButton
        onConfirm={() => {
          onDelete();
          // if (
          //   window.confirm(
          //     "NOTICE: Deleting this Pokemon will not remove it's ID from any other Pokemon. Evolutions, offspring, etc."
          //   )
          // ) {
          //   removePokemon(selectedPokemon.id);
          //   setSelectedPokemon(pokemon[0]);
          //   setpokemon(pokemon[0]);
          // }
        }}
      />
      <button
        onClick={onSave}
        className={`flex items-center
          ${theme.colors.accent.success} gap-2 px-4 py-2 shadow-sm rounded-lg transition-colors cursor-pointer`}
      >
        <Save className="w-5 h-5" />
        Save Changes
      </button>
    </div>
  );
};

export default ActionButtons;
