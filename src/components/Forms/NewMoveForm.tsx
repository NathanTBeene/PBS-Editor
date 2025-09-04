import { useState } from "react";
import Modal from "../ui/Modal";
import type { Move } from "../../lib/models/Move";
import { usePokedexContext } from "../../lib/providers/PokedexProvider";
import InputField from "../ui/InputField";
import CustomAutocomplete from "../ui/CustomAutocomplete";
import { useAlertContext } from "@/lib/providers/AlertProvider";
import { Plus } from "lucide-react";
import { Dialog } from "radix-ui";

const NewMoveForm = () => {
  const [name, setName] = useState("");
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { moves, isMoveInPokedex, addMove } = usePokedexContext();

  const { showError } = useAlertContext();

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Please enter a valid Move identifier.");
      showError("Invalid Identifier", "Please enter a valid Move identifier.");
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

    addMove(name.trim().toUpperCase(), selectedMove || undefined);
    const index = moves.findIndex((m) => m.id === name.trim().toUpperCase());
    setSelectedMove(moves[index]);
    clearFields();
  };

  const clearFields = () => {
    setName("");
    setSelectedMove(null);
    setError(null);
  };

  const handleClose = () => {
    clearFields();
  };

  const triggerButton = () => {
    return (
      <div className="p-2 px-3 bg-emerald-600 text-emerald-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-emerald-500 transition-colors">
        <Plus className="w-5 h-5" />
      </div>
    );
  };

  return (
    <>
      <Modal
        triggerElement={triggerButton()}
        onClose={handleClose}
        title="New Move"
      >
        <InputField
          label="Move Identifier"
          type="text"
          value={name}
          onChange={(e) => setName(e as string)}
          placeholder="Ex. FLAMETHROWER"
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

          <Dialog.Close className="flex flex-1 relative h-full items-center justify-center">
            <div
              onClick={handleSubmit}
              className="px-4 w-40 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              Submit
            </div>
          </Dialog.Close>
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
