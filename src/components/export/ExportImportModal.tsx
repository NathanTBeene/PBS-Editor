import React from "react";
import Modal from "../ui/Modal";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import {
  exportAbilitiesToPBS,
  exportMovesToPBS,
  exportPokemonToPBS,
} from "@/lib/services/exportFormatter";
import { FolderUp, FileDown } from "lucide-react";
import { useToastNotifications } from "@/lib/hooks/useToast";

interface ExportModalProps {
  triggerElement: React.ReactNode;
}

const ExportImportModal = ({ triggerElement }: ExportModalProps) => {
  const { pokemon, moves, abilities } = usePokedexContext();

  const toast = useToastNotifications();

  const handleImportPokemon = () => {
    // openFileDialog(".txt", (file) => {
    //   // Handle the imported file
    //   console.log("Imported file:", file);
    // });
  };

  const handleImportMoves = () => {};

  const handleImportAbilities = () => {};

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

  return (
    <Modal
      triggerElement={triggerElement}
      title="Manage Data"
      maxWidth="max-w-2xl"
      contentClass="max-h-[80vh] overflow-y-auto"
      showCloseButton={true}
      onClose={() => {}}
    >
      {/* Import */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Import</h2>
          <p className="text-slate-400 text-sm">
            Import your data from an existing PBS file.
          </p>
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
        </div>
      </div>

      <hr className="my-4 border-slate-700" />

      {/* Export */}
      <div>
        <div className="mb-4">
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
        </div>
      </div>
    </Modal>
  );
};

export default ExportImportModal;
