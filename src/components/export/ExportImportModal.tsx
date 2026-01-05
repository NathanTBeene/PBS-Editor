import React, { useState } from "react";
import Modal from "../ui/Modal";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import {
  exportAbilitiesToPBS,
  exportMovesToPBS,
  exportPokemonToPBS,
  exportItemsToPBS,
} from "@/lib/services/exportFormatter";
import { FolderUp, FileDown } from "lucide-react";
import { useToastNotifications } from "@/lib/hooks/useToast";
import { importPokemon } from "@/lib/services/importPokemon";
import { Switch } from "radix-ui";
import { importMoves } from "@/lib/services/importMoves";
import { importAbilities } from "@/lib/services/importAbilities";
import { importItems } from "@/lib/services/importItems";

interface ExportModalProps {
  triggerElement: React.ReactNode;
}

const ExportImportModal = ({ triggerElement }: ExportModalProps) => {
  const {
    pokemon,
    setSelectedPokemon,
    moves,
    setSelectedMove,
    abilities,
    setSelectedAbility,
    items,
    setSelectedItem,
    importPokemonMerge,
    importPokemonOverride,
    importMovesMerge,
    importMovesOverride,
    importAbilitiesMerge,
    importAbilitiesOverride,
    importItemsMerge,
    importItemsOverride,
  } = usePokedexContext();

  const [importMode, setImportMode] = useState<"Override" | "Merge">(
    "Override"
  );
  const [importChecked, setImportChecked] = useState(false);

  const toast = useToastNotifications();

  const handleImportPokemon = () => {
    openFileDialog(".txt", (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;

        try {
          const importedPokemon = importPokemon(content);
          toast.showSuccess(
            `Successfully imported ${importedPokemon.length} Pokemon.`,
            "Import Successful"
          );
          if (importMode === "Merge") {
            importPokemonMerge(importedPokemon);
            toast.showSuccess(
              `Successfully merged imported data with existing Pokemon.`,
              "Merge Successful"
            );
          } else {
            importPokemonOverride(importedPokemon);
            toast.showSuccess(
              `Successfully overridden existing Pokemon data.`,
              "Override Successful"
            );
          }

          setSelectedPokemon(importedPokemon[0] || null);
        } catch (error: any) {
          toast.showError(error.message, "Import Failed");
        }
      };
      reader.readAsText(file);
    });
  };

  const handleImportMoves = () => {
    openFileDialog(".txt", (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;

        try {
          const importedMoves = importMoves(content);
          toast.showSuccess(
            `Successfully imported ${importedMoves.length} Moves.`,
            "Import Successful"
          );
          if (importMode === "Merge") {
            importMovesMerge(importedMoves);
            toast.showSuccess(
              `Successfully merged imported data with existing Moves.`,
              "Merge Successful"
            );
          } else {
            importMovesOverride(importedMoves);
            toast.showSuccess(
              `Successfully overridden existing Moves data.`,
              "Override Successful"
            );
          }

          setSelectedMove(importedMoves[0] || null);
        } catch (error: any) {
          toast.showError(error.message, "Import Failed");
        }
      };
      reader.readAsText(file);
    });
  };

  const handleImportAbilities = () => {
    openFileDialog(".txt", (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;

        try {
          const importedAbilities = importAbilities(content);
          toast.showSuccess(
            `Successfully imported ${importedAbilities.length} Abilities.`,
            "Import Successful"
          );
          if (importMode === "Merge") {
            importAbilitiesMerge(importedAbilities);
            toast.showSuccess(
              `Successfully merged imported data with existing Abilities.`,
              "Merge Successful"
            );
          } else {
            importAbilitiesOverride(importedAbilities);
            toast.showSuccess(
              `Successfully overridden existing Abilities data.`,
              "Override Successful"
            );
          }

          setSelectedAbility(importedAbilities[0] || null);
        } catch (error: any) {
          toast.showError(error.message, "Import Failed");
        }
      };
      reader.readAsText(file);
    });
  };

  const handleImportItems = () => {
    openFileDialog(".txt", (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;

        try {
          const importedItems = importItems(content);
          toast.showSuccess(
            `Successfully imported ${importedItems.length} Items.`,
            "Import Successful"
          );
          if (importMode === "Merge") {
            importItemsMerge(importedItems);
            toast.showSuccess(
              `Successfully merged imported data with existing Items.`,
              "Merge Successful"
            );
          } else {
            importItemsOverride(importedItems);
            toast.showSuccess(
              `Successfully overridden existing Items data.`,
              "Override Successful"
            );
          }

          setSelectedItem(importedItems[0] || null);
        } catch (error: any) {
          toast.showError(error.message, "Import Failed");
        }
      }
      reader.readAsText(file);
    });
  }

  const openFileDialog = (accept: string, callback: (file: File) => void) => {
    // Open a dialog to choose a txt file
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        callback(file);
      }
    };
    input.click();
  };

  const handleExportPokemon = () => {
    exportPokemonToPBS(pokemon);
  };

  const handleExportMoves = () => {
    exportMovesToPBS(moves);
  };

  const handleExportAbilities = () => {
    exportAbilitiesToPBS(abilities);
  };

  const handleExportItems = () => {
    exportItemsToPBS(items);
  };

  return (
    <Modal
      triggerElement={triggerElement}
      title="Manage Data"
      maxWidth="max-w-4xl"
      contentClass="max-h-[80vh] overflow-y-auto"
      showCloseButton={true}
      onClose={() => {}}
    >
      {/* Import */}
      <div>
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold mb-1">Import</h2>
            <p className="text-slate-400 text-sm">
              Import your data from an existing PBS file.
            </p>
          </div>

          {/* Import Mode Switch */}
          <div className="flex flex-col items-end">
            <p className="text-slate-300">Import Mode</p>
            <div className="flex items-center space-x-3">
              {
                importMode === "Override" && (
                  <p className="text-sm text-rose-400 mt-1">Override</p>
                )
              }
              {
                importMode === "Merge" && (
                  <p className="text-sm text-emerald-400 mt-1">Merge</p>
                )
              }
              <Switch.Root
                className="w-12 h-6 bg-slate-700 rounded-full relative shadow-inner mt-2 focus:outline-none"
                checked={importChecked}
                onCheckedChange={(checked) => {
                  setImportChecked(checked);
                  setImportMode(checked ? "Merge" : "Override");
                }}
                aria-label="Import Mode"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out translate-x-0 data-[state=checked]:translate-x-6" />
              </Switch.Root>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-between px-10 h-full">
          <button
            className="bg-slate-600 flex items-center justify-center w-60 px-10 py-6 rounded-lg hover:bg-sky-600 transition-all cursor-pointer"
            onClick={handleImportPokemon}
          >
            <FolderUp size={24} className="mr-2" />
            Pokemon
          </button>
          <button
            className="bg-slate-600 flex items-center justify-center w-60 px-10 py-6 rounded-lg hover:bg-amber-600 transition-all cursor-pointer"
            onClick={handleImportMoves}
          >
            <FolderUp size={24} className="mr-2" />
            Moves
          </button>
          <button
            className="bg-slate-600 flex items-center justify-center w-60 px-10 py-6 rounded-lg hover:bg-emerald-600 transition-all cursor-pointer"
            onClick={handleImportAbilities}
          >
            <FolderUp size={24} className="mr-2" />
            Abilities
          </button>
          <button
            className="bg-slate-600 flex items-center justify-center w-60 px-10 py-6 rounded-lg hover:bg-violet-600 transition-all cursor-pointer"
            onClick={handleImportItems}
          >
            <FolderUp size={24} className="mr-2" />
            Items
          </button>
        </div>
      </div>

      <hr className="my-4 border-slate-700" />

      {/* Export */}
      <div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Export</h2>
          <p className="text-slate-400 text-sm">
            Export your data to a formatted PBS file.
          </p>
        </div>
        <div className="flex gap-4 justify-between px-10 h-full">
          <button
            className="bg-slate-600 flex justify-center items-center w-50 px-10 py-6 rounded-lg hover:bg-sky-600 transition-all cursor-pointer"
            onClick={handleExportPokemon}
          >
            <FileDown size={24} className="mr-2" />
            Pokemon
          </button>
          <button
            className="bg-slate-600 flex justify-center items-center w-50 px-10 py-6 rounded-lg hover:bg-amber-600 transition-all cursor-pointer"
            onClick={handleExportMoves}
          >
            <FileDown size={24} className="mr-2" />
            Moves
          </button>
          <button
            className="bg-slate-600 flex justify-center items-center w-50 px-10 py-6 rounded-lg hover:bg-emerald-600 transition-all cursor-pointer"
            onClick={handleExportAbilities}
          >
            <FileDown size={24} className="mr-2" />
            Abilities
          </button>
          <button
            className="bg-slate-600 flex justify-center items-center w-50 px-10 py-6 rounded-lg hover:bg-violet-600 transition-all cursor-pointer"
            onClick={handleExportItems}
          >
            <FileDown size={24} className="mr-2" />
            Items
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExportImportModal;
