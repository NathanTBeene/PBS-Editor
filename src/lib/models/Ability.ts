export interface Ability {
  id: string;
  name: string;
  description: string;
  flags: string[];
}

export const defaultAbility = {
  id: "[]",
  name: "Unnamed",
  description: "???",
  flags: [] as string[],
};
