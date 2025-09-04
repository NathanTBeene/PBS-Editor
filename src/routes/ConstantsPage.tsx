import { useState } from "react";
import { Trash2, Plus, Save, X, Palette, ArrowDownToLine } from "lucide-react";
import { usePokedexContext } from "../lib/providers/PokedexProvider";
import { useAlertContext } from "@/lib/providers/AlertProvider";
const ConstantsScreen = () => {
  const {
    types,
    genderRatios,
    growthRates,
    eggGroups,
    colors,
    shapes,
    habitats,
    evolutionMethods,
    addConstant,
    removeConstant,
    resetConstants,
    getTypeColor,
    updateTypeColor,
  } = usePokedexContext();

  const [activeSection, setActiveSection] = useState("types");
  const [newItemName, setNewItemName] = useState("");
  const [editingType, setEditingType] = useState<string | null>(null);
  const [editingColor, setEditingColor] = useState<string>("");

  const { showWarning } = useAlertContext();

  const sections = [
    { key: "types", label: "Types", data: types },
    { key: "genderRatio", label: "Gender Ratios", data: genderRatios },
    { key: "growthRate", label: "Growth Rates", data: growthRates },
    { key: "eggGroup", label: "Egg Groups", data: eggGroups },
    { key: "color", label: "Colors", data: colors },
    { key: "shape", label: "Shapes", data: shapes },
    { key: "habitat", label: "Habitats", data: habitats },
    {
      key: "evolutionMethod",
      label: "Evolution Methods",
      data: evolutionMethods,
    },
  ];

  const handleAddItem = () => {
    if (newItemName.trim()) {
      addConstant(activeSection, newItemName.trim().replace(/\s+/g, ""));
      setNewItemName("");
    }
  };

  const handleRemoveItem = async (item: string) => {
    if (
      await showWarning(
        "Remove Constant",
        `Are you sure you want to remove "${item}" from "${activeSection}"? This action cannot be undone.`
      )
    ) {
      removeConstant(activeSection, item);
    }
  };

  const handleEditTypeColor = (typeName: string) => {
    setEditingType(typeName);
    setEditingColor(getTypeColor(typeName));
  };

  const handleSaveTypeColor = () => {
    if (editingType && editingColor) {
      updateTypeColor(editingType, editingColor);
      setEditingType(null);
      setEditingColor("");
    }
  };

  const handleCancelEdit = () => {
    setEditingType(null);
    setEditingColor("");
  };

  const resetToDefault = async () => {
    if (
      await showWarning(
        "Reset to Default",
        `Are you sure you want to reset "${activeSection}" to its default values? This action cannot be undone.`
      )
    ) {
      resetConstants(activeSection);
    }
  };

  const renderTypeItem = (typeName: string) => (
    <div
      key={typeName}
      className="bg-slate-600 rounded-lg border border-slate-500 p-3 min-w-0"
    >
      {editingType === typeName ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-5 h-5 rounded border-1 border-slate-500 flex-shrink-0"
                style={{ backgroundColor: editingColor }}
              />
              <span className="font-medium text-sm truncate">{typeName}</span>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={handleSaveTypeColor}
                className="p-1 text-green-600 hover:bg-green-100 rounded"
                title="Save"
              >
                <Save className="w-3 h-3" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1 text-white hover:bg-slate-400 rounded cursor-pointer transition-all"
                title="Cancel"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="color"
              value={editingColor}
              onChange={(e) => setEditingColor(e.target.value)}
              className="w-6 h-6 rounded border border-slate-400 cursor-pointer"
            />
            <input
              type="text"
              value={editingColor}
              onChange={(e) => setEditingColor(e.target.value)}
              className="flex-1 px-2 py-1 text-xs border border-slate-500 rounded"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-5 h-5 rounded border-1 border-slate-500 flex-shrink-0"
              style={{ backgroundColor: getTypeColor(typeName) }}
            />
            <span className="font-medium text-sm truncate">{typeName}</span>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={() => handleEditTypeColor(typeName)}
              className="p-1 text-blue-400 hover:bg-blue-200 rounded transition-colors cursor-pointer"
              title="Edit Color"
            >
              <Palette className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleRemoveItem(typeName)}
              className="p-1 text-rose-400 hover:bg-rose-200 rounded transition-colors cursor-pointer"
              title="Remove"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderArrayItem = (item: string) => (
    <div
      key={item}
      className="bg-slate-600 rounded-lg border border-slate-500 p-3 flex items-center justify-between gap-2"
    >
      <span className="font-medium text-sm truncate">{item}</span>
      <button
        onClick={() => handleRemoveItem(item)}
        className="p-1 text-rose-400 hover:bg-rose-200 rounded transition-colors flex-shrink-0 cursor-pointer"
        title="Remove"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );

  const activeData = sections.find((s) => s.key === activeSection)?.data;

  return (
    <div className="max-w-[70vw] h-[90vh] rounded-xl shadow-xl mx-auto my-auto p-8 bg-slate-800">
      <div className="mb-5">
        <h1 className="text-3xl font-bold mb-2">PBS Constants Editor</h1>
        <p className="text-gray-300">
          Manage Pokemon Essentials constants and their properties
        </p>
        <p className="text-amber-200">
          NOTE: Constants should have no spaces and be CamelCase. Any spaces
          will be trimmed.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-3">
          <div className="bg-slate-700 shadow-md rounded-lg p-4">
            <h2 className="font-semibold mb-3">Categories</h2>
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeSection === section.key
                      ? "bg-blue-500"
                      : "hover:bg-slate-600"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="bg-slate-700 shadow-lg rounded-lg border border-slate-500">
            {/* Header */}
            <div className="border-b p-6 border-slate-500 relative">
              <h2 className="text-2xl font-semibold">
                {sections.find((s) => s.key === activeSection)?.label}
              </h2>
              <p className="text-gray-300 mt-1">
                {activeSection === "types"
                  ? "Manage Pokemon types and their colors"
                  : `Manage ${sections
                      .find((s) => s.key === activeSection)
                      ?.label.toLowerCase()}`}
              </p>
              <button
                onClick={resetToDefault}
                className="absolute top-4 right-4 flex bg-slate-600 items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-500 transition-colors shadow-sm cursor-pointer"
              >
                <ArrowDownToLine className="w-4 h-4" />
                Default
              </button>
            </div>

            {/* Add New Item */}
            <div className="p-6 border-b bg-slate-700 border-slate-500">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                  placeholder={`Enter new ${sections
                    .find((s) => s.key === activeSection)
                    ?.label.toLowerCase()
                    .slice(0, -1)}`}
                  className="flex-1 px-4 py-2 border border-slate-500 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <button
                  onClick={handleAddItem}
                  disabled={!newItemName.trim()}
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="p-6 overflow-y-auto max-h-125">
              <div className="flex flex-wrap gap-3">
                {activeSection === "types" ? (
                  Object.keys(activeData || {}).map(renderTypeItem)
                ) : Array.isArray(activeData) ? (
                  activeData.length > 0 ? (
                    activeData.map(renderArrayItem)
                  ) : (
                    <div className="w-full text-center py-8 text-gray-500">
                      No{" "}
                      {sections
                        .find((s) => s.key === activeSection)
                        ?.label.toLowerCase()}{" "}
                      found
                    </div>
                  )
                ) : (
                  <div className="w-full text-center py-8 text-gray-500">
                    Loading...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstantsScreen;
