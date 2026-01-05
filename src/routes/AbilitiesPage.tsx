import { useState, useEffect, useMemo } from "react";
import { type Ability } from "../lib/models/Ability";
import { usePokedexContext } from "../lib/providers/PokedexProvider";
import { useAlertContext } from "@/lib/providers/AlertProvider";
import AbilityList from "@/components/ability/AbilityList";
import AbilityHeader from "@/components/ability/sections/AbilityHeader";
import FormSection from "@/components/layout/FormSection";
import InputField from "@/components/ui/InputField";
import AbilityFlagsSection from "@/components/ability/sections/AbilityFlagsSection";

const AbilitiesPage = () => {
  const {
    abilities,
    selectedAbility,
    setSelectedAbility,
    setAbilityToDefault,
    removeAbility,
    setAbilityData,
  } = usePokedexContext();

  const { showWarning, showError } = useAlertContext();

  const [editData, setEditData] = useState<Ability | null>(
    abilities[0] || null
  );

  useEffect(() => {
    if (selectedAbility) {
      setEditData(selectedAbility);
    }
  }, [selectedAbility, setSelectedAbility]);

  const validateAbility = (ability: Ability): string[] | null => {
    const errors: string[] = [];

    if (!ability.id || ability.id.trim() === "" || ability.id === "[]") {
      errors.push("ID");
    }
    if (!ability.name || ability.name.trim() === "") {
      errors.push("Name");
    }
    if (!ability.description || ability.description.trim() === "") {
      errors.push("Description");
    }

    return errors.length > 0 ? errors : null;
  };

  const handleSave = async () => {
    if (!selectedAbility || !editData) return;

    const validationErrors = validateAbility(editData);
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

    if (selectedAbility.id !== editData.id) {
      const response = await showWarning(
        "Different Ability ID",
        `You've changed the unique Ability id for ${selectedAbility.name}. If you proceed, this ability will be overwritten. It is recommended that if you want to change the ID, you instead create a new Ability.`
      );

      if (!response) {
        const id = selectedAbility.id;
        setEditData((prev) => (prev ? { ...prev, id } : null));
        return;
      }
    }

    console.log("Saving Ability Data", editData);
    setAbilityData(editData);
  };

  const handleDefault = async () => {
    if (!selectedAbility || !editData) return;

    if (
      await showWarning(
        "Reset to Default",
        `This will reset all details for ${selectedAbility.name} to their default values. Are you sure you want to do this?`
      )
    ) {
      setAbilityToDefault(selectedAbility.id);
      setEditData((prev) => (prev ? { ...prev, ...selectedAbility } : null));
    }
  };

  const handleReset = () => {
    if (!selectedAbility || !editData) return;
    setEditData(selectedAbility);
  };

  const handleDelete = () => {
    if (!selectedAbility || !editData) return;
    removeAbility(selectedAbility.id);
    setSelectedAbility(null);
  };

  const handleSelectAbility = async (ability: Ability) => {
    setSelectedAbility(ability);
    setEditData(ability);
  };

  const memoAbilityList = useMemo(() => {
    return (
      <AbilityList
        selectedAbility={selectedAbility}
        onAbilitySelect={handleSelectAbility}
      />
    );
  }, [abilities, selectedAbility]);

  if (!editData || !selectedAbility) {
    return (
      <div className="flex h-screen text-slate-200 shadow-xl items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No Ability Data</h2>
          <p className="text-slate-400">Loading Ability data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen min-w-[70vw] w-full text-slate-200 shadow-xl">
      {/* Left Sidebar - Move List */}
      {memoAbilityList}

      {/* Main Content - Move Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AbilityHeader
          ability={selectedAbility}
          onSave={handleSave}
          onReset={handleReset}
          onDelete={handleDelete}
          onSetDefault={handleDefault}
        />

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-800">
          <div className="max-w-4xl mx-auto space-y-8 mb-60">
            <FormSection title="Basic Information">
              <div className="space-y-4">
                <InputField
                  label="ID"
                  value={editData.id}
                  onChange={(value) =>
                    setEditData((prev) =>
                      prev ? { ...prev, id: value as string } : null
                    )
                  }
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
              </div>
            </FormSection>
            <AbilityFlagsSection ability={editData} setAbility={setEditData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbilitiesPage;
