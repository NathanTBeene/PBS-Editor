import { useState } from "react";
import Modal from "../ui/Modal";
import type { Pokemon } from "../../lib/models/Pokemon";
import { usePokedexContext } from "../../lib/providers/PokedexProvider";
import InputField from "../ui/InputField";
import { Plus } from "lucide-react";
import { Dialog } from "radix-ui";
import { useAlertContext } from "@/lib/providers/AlertProvider";
import Autocomplete from "../ui/Autocomplete";

const NewPokemonForm = () => {
  const [name, setName] = useState("");
  const [selectedMon, setSelectedMon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { pokemon, isPokemonInPokedex, addPokemon } = usePokedexContext();

  const { showError } = useAlertContext();

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Please enter a valid Pokémon identifier.");
      showError(
        "Invalid Identifier",
        "Please enter a valid Pokémon identifier."
      );
      setSelectedMon(null);
      return;
    }

    if (isPokemonInPokedex(name.trim().toUpperCase())) {
      setError(
        "This Pokémon identifier is already in the Pokédex. Please choose another Identifier."
      );
      return;
    }

    if (selectedMon && !isPokemonInPokedex(selectedMon.id)) {
      setError("Could not find the Base Pokémon.");
      setSelectedMon(null);
      return;
    }

    addPokemon(name.trim().toUpperCase(), selectedMon || undefined);
    clearFields();
  };

  const clearFields = () => {
    setName("");
    setSelectedMon(null);
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
        title="New Pokémon"
      >
        <InputField
          label="Pokémon Identifier"
          type="text"
          value={name}
          onChange={(e) => setName(e as string)}
          placeholder="Ex. PIKACHU"
          tooltip={{
            description:
              "This must be unique. Spaces will be removed and everything converted to uppercase.",
          }}
        />

        <div className="flex items-center gap-2 mt-4 h-20">
          <div className="flex-1 relative">
            <p className=" text-slate-300 font-semibold text-sm absolute -top-6">
              Base Pokemon (Optional)
            </p>
            <Autocomplete
              inputClass="max-w-45"
              options={pokemon.map((mon) => mon.id)}
              value={selectedMon?.id || ""}
              onValueChange={(value) => {
                const selected = pokemon.find((mon) => mon.id === value);
                setSelectedMon(selected || null);
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

export default NewPokemonForm;
