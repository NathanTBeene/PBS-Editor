import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import InputField from "@/components/ui/InputField";
import { useAlertContext } from "@/lib/providers/AlertProvider";
import { Plus } from "lucide-react";
import { Dialog } from "radix-ui";
import Autocomplete from "@/components/ui/Autocomplete";
import type { Ability } from "@/lib/models/Ability";

const NewAbilityForm = ({
  onAbilityAdded,
}: {
  onAbilityAdded: (ability: Ability) => void;
}) => {
  const [name, setName] = useState("");
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { abilities, isAbilityInPokedex, addAbility } = usePokedexContext();

  const { showError } = useAlertContext();

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Please enter a valid Ability identifier.");
      showError(
        "Invalid Identifier",
        "Please enter a valid Ability identifier."
      );
      setSelectedAbility(null);
      return;
    }

    if (isAbilityInPokedex(name.trim().toUpperCase())) {
      setError(
        "This Ability identifier is already in the Pokédex. Please choose another Identifier."
      );
      return;
    }

    if (selectedAbility && !isAbilityInPokedex(selectedAbility.id)) {
      setError("Could not find the Base Ability.");
      setSelectedAbility(null);
      return;
    }

    const newAbility = await addAbility(
      name.trim().toUpperCase(),
      selectedAbility || undefined
    );
    onAbilityAdded(newAbility);
    clearFields();
  };

  const clearFields = () => {
    setName("");
    setSelectedAbility(null);
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
        title="New Ability"
      >
        <InputField
          label="Ability Identifier"
          type="text"
          value={name}
          onChange={(e) => setName(e as string)}
          placeholder="Ex. OVERGROW"
          tooltip={{
            description:
              "This must be unique. Spaces will be removed and everything converted to uppercase.",
          }}
        />

        <div className="flex items-center gap-2 mt-4 h-20">
          <div className="flex-1 relative">
            <p className=" text-slate-300 font-semibold text-sm absolute -top-6">
              Base Ability (Optional)
            </p>
            <Autocomplete
              inputClass="max-w-45"
              options={abilities.map((ability) => ability.id)}
              value={selectedAbility?.id || ""}
              onValueChange={(value) => {
                const selected = abilities.find(
                  (ability) => ability.id === value
                );
                setSelectedAbility(selected || null);
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

export default NewAbilityForm;
