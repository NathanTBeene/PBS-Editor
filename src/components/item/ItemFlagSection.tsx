import type { Item } from "@/lib/models/Item";
import ArraySection from "../layout/ArraySection";
import InputField from "../ui/InputField";
import CustomSelect from "../ui/CustomSelect";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import { X } from "lucide-react";
import FormSection from "../layout/FormSection";

const ItemFlagSection = ({
  item,
  setItem
}: {
  item: any;
  setItem: React.Dispatch<React.SetStateAction<Item | null>>;
}) => {
  const { types, itemFlags } = usePokedexContext();

  const handleAddFlag = () => {
    setItem({ ...item, flags: [...item.flags, ""] });
  }

  const handleFlagChange = (index: number) => (newValue: string) => {
    const updatedFlags = [...item.flags];
    updatedFlags[index] = newValue;
    setItem({ ...item, flags: updatedFlags });
  };

  const handleRemoveFlag = (index: number) => () => {
    const updatedFlags = item.flags.filter((_: any, i: number) => i !== index);
    setItem({ ...item, flags: updatedFlags });
  };

  const addNaturalGift = () => {
    setItem({
      ...item,
      naturalGift: { type: "NORMAL", power: 60 }
    });
  }

  const removeNaturalGift = () => {
    const updatedItem = { ...item };
    delete updatedItem.naturalGift;
    setItem(updatedItem);
  }

  const changeNaturalGift = (gift: { type: string; power: number }) => {
    setItem({
      ...item,
      naturalGift: gift
    });
  };

  return (
    <>
      <FormSection title="Fling and Natural Gift">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <InputField
            label="Fling Value"
            type="number"
            defaultValue={0}
            value={item.flingValue}
            onChange={(value) => {
              setItem((prev) =>
                prev ? { ...prev, flingValue: parseInt(value as string) } : null
              )
            }}
            tooltip={{
              description:
                "Determines the power of the move Fling when this item is used with it. Set to 0 to make the item unusable with Fling.",
            }}
          />
          {item.naturalGift && (
            <>
              <CustomSelect
                label="Natural Gift Type"
                value={item.naturalGift?.type || "NORMAL"}
                options={Object.keys(types)}
                placeholder="Select Type"
                onChange={(value) => {
                  changeNaturalGift({
                    type: value,
                    power: item.naturalGift?.power || 60
                  });
                }}
              />
              <InputField
                label="Natural Gift Power"
                type="number"
                defaultValue={0}
                value={item.naturalGift?.power ?? ""}
                onChange={(value) => {
                  changeNaturalGift({
                    type: item.naturalGift?.type || "NORMAL",
                    power: value === "" ? "" as any : Number(value)
                  });
                }}
              />
            </>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Natural Gift"
            type="checkbox"
            value={item.naturalGift ? true : false}
            onChange={() => {
              if (item.naturalGift) {
                removeNaturalGift();
              } else {
                addNaturalGift();
              }
            }}
            tooltip={{
              description:
                "Whether or not this item can be used with the move Natural Gift.",
            }}
          />
        </div>
      </FormSection>
      <ArraySection title="Flags" addLabel="Add Flag" addToArray={handleAddFlag}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {item.flags.map((flag: string, index: number) => (
            <div className="flex items-center gap-2" key={index}>
              <div className="flex-1">
                <CustomSelect
                  value={flag}
                  onChange={handleFlagChange(index)}
                  options={itemFlags}
                  placeholder="Select flag..."
                />
              </div>
              <button
                onClick={handleRemoveFlag(index)}
                className="px-2 py-1 h-fit text-rose-300 hover:text-rose-400 cursor-pointer rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </ArraySection>
    </>
  )
}

export default ItemFlagSection
