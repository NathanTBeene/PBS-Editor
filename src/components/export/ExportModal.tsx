import React from "react";
import Modal from "../ui/Modal";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import {
  exportAbilitiesToPBS,
  exportMovesToPBS,
  exportPokemonToPBS,
} from "@/lib/services/exportFormatter";

interface ExportModalProps {
  triggerElement: React.ReactNode;
}

const ExportModal = ({ triggerElement }: ExportModalProps) => {
  const { pokemon, moves, abilities } = usePokedexContext();

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
      title="Export Data"
      maxWidth="max-w-2xl"
      contentClass="max-h-[80vh] overflow-y-auto"
      showCloseButton={true}
      onClose={() => {}}
    >
      <div className="mb-4">
        <p>Export your data to a formatted PBS file.</p>
      </div>
      <div className="flex gap-4 justify-between px-10 h-full">
        <button
          className="bg-slate-600 w-50 px-10 py-6 rounded-lg hover:bg-sky-600 transition-all cursor-pointer"
          onClick={handleExportPokemon}
        >
          Pokemon
        </button>
        <button
          className="bg-slate-600 w-50 px-10 py-6 rounded-lg hover:bg-amber-600 transition-all cursor-pointer"
          onClick={handleExportMoves}
        >
          Moves
        </button>
        <button
          className="bg-slate-600 w-50 px-10 py-6 rounded-lg hover:bg-emerald-600 transition-all cursor-pointer"
          onClick={handleExportAbilities}
        >
          Abilities
        </button>
      </div>
    </Modal>
  );
};

export default ExportModal;
