import { useEffect, useState } from "react";
import { Save, RotateCcw, Plus, X } from "lucide-react";
import { type Move, moveTargets, MoveFlags } from "../lib/models/Move";
import { usePokedexContext } from "../lib/providers/PokedexProvider";
import FormSection from "../components/pokemon/FormSection";
import InputField from "../components/ui/InputField";
import CustomSelect from "../components/ui/CustomSelect";
import InfoTooltip from "../components/ui/InfoTooltip";
import DeleteButton from "../components/ui/DeleteButton";
import TypeBubble from "../components/TypeBubble";
import MoveList from "../components/pokemon/MoveList";
import NewMoveForm from "../components/forms/NewMoveForm";

const MovesPage = () => {
  const {
    moves,
    types,
    selectedMove,
    setSelectedMove,
    setMoveData,
    removeMove,
  } = usePokedexContext();

  const [editData, setEditData] = useState<Move | null>(moves[0] || null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (moves.length > 0) {
      if (!selectedMove) {
        // Set first move as selected if none is selected
        setSelectedMove(moves[0]);
        setEditData(moves[0]);
      } else {
        // Update editData to match the currently selected move
        const currentMove = moves.find((m) => m.id === selectedMove.id);
        if (currentMove) {
          setEditData(currentMove);
        } else {
          // Selected move no longer exists, select first available
          setSelectedMove(moves[0]);
          setEditData(moves[0]);
        }
      }
    }
  }, [moves, selectedMove, setSelectedMove]);

  const resetChanges = () => {
    if (selectedMove) {
      setEditData(selectedMove);
    }
  };

  const saveChanges = () => {
    if (!selectedMove || !editData) {
      console.error("No Move selected or edit data available");
      return;
    }

    console.log(
      `Attempting to save changes to ${selectedMove.name}:`,
      editData
    );

    setMoveData(editData);
  };

  function handleInputChange(field: string, value: string | number): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      };
    });
  }

  function handleFlagsChange(index: number, value: string): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;
      const flags = [...prev.flags];
      flags[index] = value;
      return {
        ...prev,
        flags,
      };
    });
  }

  function addFlag(): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        flags: [...prev.flags, ""],
      };
    });
  }

  function removeFlag(index: number): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;
      const flags = [...prev.flags];
      flags.splice(index, 1);
      return {
        ...prev,
        flags,
      };
    });
  }

  const onSubmitNewMove = (newMove: Move) => {
    // Select the new move
    setSelectedMove(newMove);
    setEditData(newMove);
  };

  // Early return if no data is available
  if (!editData || !selectedMove) {
    return (
      <div className="flex h-screen text-slate-200 shadow-xl items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No Move Data</h2>
          <p className="text-slate-400">Loading Move data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen text-slate-200 shadow-xl">
      {/* Left Sidebar - Move List */}
      <MoveList
        moves={moves}
        selectedMove={selectedMove}
        onMoveSelect={(move) => {
          console.log("Selected Move:", move);
          setSelectedMove(move);
          setEditData(move);
        }}
        onAddMove={() => {
          setModalOpen(true);
        }}
      />

      {/* Main Content - Move Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 h-25 bg-slate-800 border-b-3 border-slate-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{editData.name}</h1>
              <div className="flex items-center gap-4 mt-1">
                <TypeBubble type={editData.type} />
                <p className="text-slate-300">{editData.category}</p>
                <span className="text-slate-400">•</span>
                <p className="text-slate-300">Power: {editData.power || "—"}</p>
                <span className="text-slate-400">•</span>
                <p className="text-slate-300">Accuracy: {editData.accuracy}%</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={resetChanges}
                className="flex bg-slate-700 items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <DeleteButton
                onConfirm={() => {
                  if (
                    window.confirm(
                      `NOTICE: Deleting this move will not remove it from any Pokemon that learn it.`
                    )
                  ) {
                    removeMove(editData.id);
                  }
                }}
              />
              <button
                onClick={saveChanges}
                className="flex items-center text-emerald-100 gap-2 px-4 py-2 bg-emerald-600 shadow-sm rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <Save className="w-5 h-5 text-emerald-200" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-800">
          <div className="max-w-4xl mx-auto space-y-8">
            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="ID"
                  value={editData.id}
                  onChange={(value) => handleInputChange("id", value)}
                  tooltip={{
                    description:
                      "The unique identifier for this move. Usually all caps no spaces.",
                  }}
                />
                <InputField
                  label="Name"
                  value={editData.name}
                  onChange={(value) => handleInputChange("name", value)}
                />
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Type
                  </label>
                  <CustomSelect
                    value={editData.type}
                    onChange={(value) => handleInputChange("type", value)}
                    options={Object.keys(types)}
                    placeholder="Select type..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Type
                  </label>
                  <CustomSelect
                    value={editData.category}
                    onChange={(value) => handleInputChange("category", value)}
                    options={["Physical", "Special", "Status"]}
                    placeholder="Select category..."
                  />
                </div>
              </div>
              <div className="mt-4">
                <InputField
                  label="Description"
                  type="textarea"
                  value={editData.description}
                  onChange={(value) => handleInputChange("description", value)}
                  rows={3}
                />
              </div>
            </FormSection>

            <FormSection title="Battle Stats">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InputField
                  label="Power"
                  type="number"
                  value={editData.power}
                  onChange={(value) => handleInputChange("power", value)}
                  tooltip={{
                    description:
                      "The base power of the move. 0 for status moves.",
                  }}
                />
                <InputField
                  label="Accuracy"
                  type="number"
                  value={editData.accuracy}
                  onChange={(value) => handleInputChange("accuracy", value)}
                  tooltip={{
                    description:
                      "Hit chance percentage (0-100). 0 means it never misses.",
                  }}
                />
                <InputField
                  label="PP"
                  type="number"
                  value={editData.pp}
                  onChange={(value) => handleInputChange("pp", value)}
                  tooltip={{
                    description:
                      "Power Points - how many times this move can be used.",
                  }}
                />
                <InputField
                  label="Priority"
                  type="number"
                  value={editData.priority}
                  onChange={(value) => handleInputChange("priority", value)}
                  tooltip={{
                    description: "Move priority. Higher numbers go first.",
                  }}
                />
              </div>
            </FormSection>

            <FormSection title="Advanced Properties">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2">
                    Target
                    <InfoTooltip description="What the move targets in battle." />
                  </label>
                  <CustomSelect
                    value={editData.target}
                    onChange={(value) => handleInputChange("target", value)}
                    options={moveTargets}
                    placeholder="Select target..."
                  />
                </div>
                <InputField
                  label="Function Code"
                  value={editData.functionCode}
                  onChange={(value) => handleInputChange("functionCode", value)}
                  tooltip={{
                    description:
                      "The internal function code that defines the move's effect. Click for more info.",
                    link: "https://essentialsdocs.fandom.com/wiki/Move_effects",
                  }}
                />
                <InputField
                  label="Effect Chance"
                  type="number"
                  value={editData.effectChance}
                  onChange={(value) => handleInputChange("effectChance", value)}
                  tooltip={{
                    description:
                      "Percentage chance for secondary effects to occur.",
                  }}
                />
              </div>
            </FormSection>

            {/* Flags */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6 mb-60">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  Flags
                  <InfoTooltip description="Special properties that affect how the move behaves in battle." />
                </h2>
                <button
                  onClick={addFlag}
                  className="px-3 py-1 text-sm border border-slate-500 rounded-md text-slate-500 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Flag
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editData.flags.map((flag, index) => (
                  <div className="flex items-center gap-2" key={index}>
                    <div className="flex-1">
                      <CustomSelect
                        value={flag}
                        onChange={(value) => handleFlagsChange(index, value)}
                        options={MoveFlags as unknown as string[]}
                        placeholder="Select flag..."
                      />
                    </div>
                    <button
                      onClick={() => removeFlag(index)}
                      className="px-2 py-1 h-fit text-rose-300 hover:text-rose-400 cursor-pointer rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {editData.flags.length === 0 && (
                  <div className="col-span-full">
                    <p className="text-slate-500 italic py-4 text-center">
                      No flags added yet
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      <NewMoveForm
        onClose={() => {
          setModalOpen(false);
        }}
        isOpen={modalOpen}
        onSubmit={onSubmitNewMove}
      />
    </div>
  );
};

export default MovesPage;
