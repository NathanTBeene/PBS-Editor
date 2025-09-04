import FormSection from "@/components/pokemon/FormSection";
import CustomSelect from "@/components/ui/CustomSelect";
import InputField from "@/components/ui/InputField";
import type { Move } from "@/lib/models/Move";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";

interface BasicMoveInfoProps {
  move: Move;
  setMove: React.Dispatch<React.SetStateAction<Move | null>>;
}

const BasicMoveInfo = ({ move, setMove }: BasicMoveInfoProps) => {
  const { types } = usePokedexContext();

  return (
    <FormSection title="Basic Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="ID"
          value={move.id}
          onChange={(value) => setMove({ ...move, id: value as string })}
          tooltip={{
            description:
              "The unique identifier for this move. Usually all caps no spaces.",
          }}
        />
        <InputField
          label="Name"
          value={move.name}
          onChange={(value) => setMove({ ...move, name: value as string })}
        />
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Type
          </label>
          <CustomSelect
            value={move.type}
            onChange={(value) => setMove({ ...move, type: value as any })}
            options={Object.keys(types)}
            placeholder="Select type..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <CustomSelect
            value={move.category}
            onChange={(value) => setMove({ ...move, category: value as any })}
            options={["Physical", "Special", "Status"]}
            placeholder="Select category..."
          />
        </div>
      </div>
      <div className="mt-4">
        <InputField
          label="Description"
          type="textarea"
          value={move.description}
          onChange={(value) =>
            setMove({ ...move, description: value as string })
          }
          rows={3}
        />
      </div>
    </FormSection>
  );
};

export default BasicMoveInfo;
