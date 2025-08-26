import { useEffect, useState } from "react";
import Modal from "../Base/Modal";
import type { Move } from "../../lib/models/Move";
import { usePokedexContext } from "../../lib/providers/PokedexProvider";
import InputField from "../Base/InputField";
import CustomAutocomplete from "../Base/CustomAutocomplete";

interface NMFProps {
  onClose: () => void;
  isOpen?: boolean;
  onSubmit: (newMove: Move) => void;
}

const NewMoveForm = ({ onClose, isOpen, onSubmit }: NMFProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { moves, isMoveInPokedex, addMove } = usePokedexContext();

  useEffect(() => {
    if (isOpen) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Please enter a valid Move identifier.");
      setSelectedMove(null);
      return;
    }

    if (isMoveInPokedex(name.trim().toUpperCase())) {
      setError(
        "This Move identifier is already in the Pokédex. Please choose another Identifier."
      );
      return;
    }

    if (selectedMove && !isMoveInPokedex(selectedMove.id)) {
      setError("Could not find the Base Move.");
      setSelectedMove(null);
      return;
    }

    const newMove = addMove(
      name.trim().toUpperCase(),
      selectedMove || undefined
    );
    onSubmit(newMove);
    clearFields();
    onClose();
  };

  const clearFields = () => {
    setName("");
    setSelectedMove(null);
    setError(null);
  };

  const handleClose = () => {
    clearFields();
    onClose();
  };

  return (
    <>
      <Modal isOpen={modalOpen} onClose={handleClose} title="New Move">
        <InputField
          label="Move Identifier"
          type="text"
          value={name}
          onChange={(e) => setName(e as string)}
          placeholder="Ex. TACKLE"
          tooltip={{
            description:
              "This must be unique. Spaces will be removed and everything converted to uppercase.",
          }}
        />

        <div className="flex items-center gap-2 mt-4 h-20">
          <div className="flex-1 relative">
            <p className=" text-slate-300 font-semibold text-sm absolute -top-6">
              Base Move (Optional)
            </p>
            <CustomAutocomplete
              className="max-w-45"
              options={moves.map((move) => move.id)}
              value={selectedMove?.id || ""}
              onChange={(value) => {
                const selected = moves.find((move) => move.id === value);
                setSelectedMove(selected || null);
              }}
            />
          </div>

          <div className="flex flex-1 relative h-full items-center justify-center">
            <button
              onClick={handleSubmit}
              className="px-4 w-40 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-center max-w-80 m-auto">
            {error}
          </div>
        )}
      </Modal>
    </>
  );
};

export default NewMoveForm;
