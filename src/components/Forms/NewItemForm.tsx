import { useState } from "react";
import Modal from "../ui/Modal";
import { usePokedexContext } from "../../lib/providers/PokedexProvider";
import InputField from "../ui/InputField";
import { Plus } from "lucide-react";
import { Dialog } from "radix-ui";
import { useAlertContext } from "@/lib/providers/AlertProvider";
import Autocomplete from "../ui/Autocomplete";
import type { Item } from "@/lib/models/Item";

const NewItemForm = () => {
  const [name, setName] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { items, isItemInPokedex, addItem } = usePokedexContext();

  const { showError } = useAlertContext();

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Please enter a valid Item identifier.");
      showError(
        "Invalid Identifier",
        "Please enter a valid Item identifier."
      );
      setSelectedItem(null);
      return;
    }

    if (isItemInPokedex(name.trim().toUpperCase())) {
      setError(
        "This Item identifier is already in the Pokédex. Please choose another Identifier."
      );
      return;
    }

    if (selectedItem && !isItemInPokedex(selectedItem.id)) {
      setError("Could not find the Base Item.");
      setSelectedItem(null);
      return;
    }

    addItem(name.trim().toUpperCase(), selectedItem || undefined);
    clearFields();
  };

  const clearFields = () => {
    setName("");
    setSelectedItem(null);
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
        title="New Item"
      >
        <InputField
          label="Item Identifier"
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
              Base Item (Optional)
            </p>
            <Autocomplete
              inputClass="max-w-45"
              options={items.map((item) => item.id)}
              value={selectedItem?.id || ""}
              onValueChange={(value) => {
                const selected = items.find((item) => item.id === value);
                setSelectedItem(selected || null);
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

export default NewItemForm;
