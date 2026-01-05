import { useState, useEffect, useMemo } from "react";
import { usePokedexContext } from "../lib/providers/PokedexProvider";
import { useAlertContext } from "@/lib/providers/AlertProvider";
import FormSection from "@/components/layout/FormSection";
import InputField from "@/components/ui/InputField";
import type { Item } from "@/lib/models/Item";
import ItemList from "@/components/item/ItemList";
import ItemHeader from "@/components/item/ItemHeader";
import Autocomplete from "@/components/ui/Autocomplete";
import ItemFlagSection from "@/components/item/ItemFlagSection";

const ItemsPage = () => {
  const {
    items,
    selectedItem,
    setSelectedItem,
    setItemToDefault,
    removeItem,
    setItemData,
    pockets,
    fieldUses,
    battleUses,
    moves
  } = usePokedexContext();

  const { showWarning, showError } = useAlertContext();

  const [editData, setEditData] = useState<Item | null>(null);

  useEffect(() => {
    if (!selectedItem && items.length > 0) {
      setSelectedItem(items[0]);
    }
  }, [items, selectedItem, setSelectedItem]);

  useEffect(() => {
    if (selectedItem) {
      setEditData(selectedItem);
    }
  }, [selectedItem]);

  const validateItem = (item: Item): string[] | null => {
    const errors: string[] = [];

    if (!item.id || item.id.trim() === "" || item.id === "[]") {
      errors.push("ID");
    }
    if (!item.name || item.name.trim() === "") {
      errors.push("Name");
    }
    if (!item.description || item.description.trim() === "") {
      errors.push("Description");
    }
    if (item.price === undefined || item.price === null || isNaN(Number(item.price))) {
      errors.push("Price");
    }
    if (!item.pocket || item.pocket.trim() === "") {
      errors.push("Pocket");
    }

    return errors.length > 0 ? errors : null;
  };

  const handleSave = async () => {
    if (!selectedItem || !editData) return;

    const validationErrors = validateItem(editData);
    if (validationErrors) {
      console.error("Validation Errors:", validationErrors);
      showError(
        "Validation Errors",
        `The following fields have an invalid input or have been left blank:\n\n ${validationErrors.join(
          "\n"
        )}`
      );
      return;
    }

    if (selectedItem.id !== editData.id) {
      const response = await showWarning(
        "Different Item ID",
        `You've changed the unique Item id for ${selectedItem.name}. If you proceed, this item will be overwritten. It is recommended that if you want to change the ID, you instead create a new Item.`
      );

      if (!response) {
        const id = selectedItem.id;
        setEditData((prev) => (prev ? { ...prev, id } : null));
        return;
      }
    }

    console.log("Saving Item Data", editData);
    setItemData(editData);
  };

  const handleDefault = async () => {
    if (!selectedItem || !editData) return;
    if (
      await showWarning(
        "Reset to Default",
        `This will reset all details for ${selectedItem.name} to their default values. Are you sure you want to do this?`
      )
    ) {
      setItemToDefault(selectedItem.id);
      setEditData((prev) => (prev ? { ...prev, ...selectedItem } : null));
    }
  };

  const handleReset = () => {
    if (!selectedItem || !editData) return;
    setEditData(selectedItem);
  };

  const handleDelete = () => {
    if (!selectedItem || !editData) return;
    removeItem(selectedItem.id);
    setSelectedItem(null);
  };

  const handleSelectItem = async (item: Item) => {
    setSelectedItem(item);
    setEditData(item);
  };

  const memoItemList = useMemo(() => {
    return (
      <ItemList
        selectedItem={selectedItem}
        onItemSelect={handleSelectItem}
      />
    );
  }, [items, selectedItem]);

  if (!editData || !selectedItem) {
    return (
      <div className="flex h-screen text-slate-200 shadow-xl items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No Item Data</h2>
          <p className="text-slate-400">Loading Item data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen min-w-[70vw] w-full text-slate-200 shadow-xl">
      {/* Left Sidebar - Move List */}
      {memoItemList}

      {/* Main Content - Move Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <ItemHeader
          item={selectedItem}
          onSave={handleSave}
          onReset={handleReset}
          onDelete={handleDelete}
          onSetDefault={handleDefault}
        />

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-800">
          <div className="max-w-4xl mx-auto space-y-8 mb-60">
            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-4">
                <InputField
                  label="ID"
                  value={editData.id}
                  onChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, id: value as string } : null
                    )
                  }
                />
                <Autocomplete
                  title="Pocket"
                  value={editData.pocket}
                  onValueChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, pocket: value as string } : null
                    )
                  }
                  options={pockets}
                />
                <InputField
                  label="Name"
                  value={editData.name}
                  onChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, name: value as string } : null
                    )
                  }
                />
                <InputField
                  label="Name Plural"
                  value={editData.namePlural}
                  onChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, namePlural: value as string } : null
                    )
                  }
                />
                <InputField
                  label="Portion Name"
                  value={editData.portionName || ""}
                  onChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, portionName: value as string } : null
                    )
                  }
                  tooltip={{
                    description:
                      "The name of a portion of that item. E.g. '1 bag of Stardust' rather than '1 Stardust'.",
                  }}
                />
                <InputField
                  label="Portion Name Plural"
                  value={editData.portionNamePlural || ""}
                  onChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, portionNamePlural: value as string } : null
                    )
                  }
                  tooltip={{
                    description:
                      "The plural form of the portion name. E.g. '2 bags of Stardust' rather than '2 Stardust'.",
                  }}
                />
              </div>
              <InputField
                label="Description"
                type="textarea"
                rows={5}
                value={editData.description}
                onChange={(value) =>
                  setEditData((prev) =>
                    prev ? { ...prev, description: value as string } : null
                  )
                }
              />
            </FormSection>

            {/* Price */}
            <FormSection title="Pricing">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  label="Buy Price"
                  type="number"
                  min={0}
                  value={editData.price}
                  onChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, price: value as number } : null
                    )
                  }
                />
                <InputField
                  label="Sell Price"
                  type="number"
                  value={editData.sellPrice}
                  onChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, sellPrice: value as number } : null
                    )
                  }
                  tooltip={{
                    description:
                      "Typically half the buy price. If 0, the item cannot be sold in shops.",
                  }}
                />
                <InputField
                  label="BP Price"
                  type="number"
                  value={editData.bpPrice || 1}
                  onChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, bpPrice: value as number } : null
                    )
                  }
                  tooltip={{
                    description:
                      "Cost of the item in Battle Points",
                  }}
                />
              </div>
            </FormSection>
            <FormSection title="In-Game Use Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                  title="Field Use"
                  value={editData.fieldUse || ""}
                  onValueChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, fieldUse: value as string } : null
                    )
                  }
                  options={fieldUses}
                  tooltip={{
                    description:
                      "The effect this item has when used in the field. Click for more details about each effect.",
                    link:
                      "https://essentialsdocs.fandom.com/wiki/Defining_an_item"
                  }}
                />
                <Autocomplete
                  title="Battle Use"
                  value={editData.battleUse || ""}
                  onValueChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, battleUse: value as string } : null
                    )
                  }
                  options={battleUses}
                  tooltip={{
                    description:
                      "The effect this item has when used in battle. Click for more details about each effect.",
                    link:
                      "https://essentialsdocs.fandom.com/wiki/Defining_an_item"
                  }}
                />
                <Autocomplete
                  title="Move"
                  value={editData.move || ""}
                  onValueChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, move: value as string } : null
                    )
                  }
                  options={moves.map((move) => move.id)}
                  tooltip={{
                    description:
                      "If this item is a TM or HM, the ID of the move it teaches."
                  }}
                />
              </div>
            </FormSection>
            <FormSection title="Miscellaneous" tooltip="These options should only be changed for Key Items or special cases as they default to true for most items.">
              <div className="flex flex-wrap gap-4">
                <InputField
                  label="Consumable"
                  type="checkbox"
                  value={editData.consumable}
                  onChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, consumable: value as boolean } : null
                    )
                  }
                />
                <InputField
                  label="Show Quantity"
                  type="checkbox"
                  value={editData.showQuantity}
                  onChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, showQuantity: value as boolean } : null
                    )
                  }
                />
              </div>
            </FormSection>
            <ItemFlagSection item={editData} setItem={setEditData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
