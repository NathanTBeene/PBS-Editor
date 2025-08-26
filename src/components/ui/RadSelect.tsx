import { Select } from "radix-ui";

const RadSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger>Open</Select.Trigger>
      <Select.Content>
        <Select.Item value="item-1">Item 1</Select.Item>
        <Select.Item value="item-2">Item 2</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default RadSelect;
