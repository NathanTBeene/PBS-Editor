import CustomSelect from "../components/ui/CustomSelect";

const AbilitiesPage = () => {
  const handleValueChange = (value: string) => {
    console.log("Selected ability:", value);
  };

  return (
    <div>
      <CustomSelect
        value=""
        onChange={handleValueChange}
        options={["Ability 1", "Ability 2", "Ability 3"]}
        placeholder="Select an ability"
      />
    </div>
  );
};

export default AbilitiesPage;
