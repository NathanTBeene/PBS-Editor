import type {
  EggGroup,
  EvolutionMethod,
  GenderRatio,
  GrowthRate,
  PokemonColor,
  PokemonEvolution,
  PokemonHabitat,
  PokemonShape,
  PokemonType,
} from "../models/constants";
import {
  type Pokemon,
  type PokemonMove,
  defaultPokemon,
} from "../models/Pokemon";

export const importPokemon = (data: string) => {
  // Check for a required pokemon field to make
  // sure it's a pokemon PBS and not another type
  if (!data.includes("GenderRatio")) {
    throw new Error("Invalid PBS file format.");
  }

  const sections: string[] = data.split("#-------------------------------");
  const pokemonList: Pokemon[] = [];

  sections.forEach((section, index) => {
    const lines = section.split("\n");
    const pokemon: Pokemon = { ...defaultPokemon };

    pokemon.dexNumber = index;

    lines.forEach((line) => {
      if (line.trim() === "" || line.startsWith("#")) return;

      line = line.trim();
      if (line.includes("[") && line.includes("]")) {
        pokemon.id = line.slice(1, -1);
        return;
      }

      const [key, value] = line.split("=");
      const pokemonKey = key.trim();
      const pokemonValue = value.trim();

      switch (pokemonKey) {
        case "Name":
          pokemon.name = pokemonValue;
          break;
        case "FormName":
          pokemon.formName = pokemonValue;
          break;
        case "Types":
          pokemon.types = pokemonValue
            .split(",")
            .filter((type) => type !== "")
            .map((type) => type.trim() as PokemonType);
          break;
        case "BaseStats":
          const [hp, attack, defense, speed, specialAttack, specialDefense] =
            pokemonValue.split(",").map((stat) => parseInt(stat.trim(), 10));
          pokemon.baseStats = {
            hp,
            attack,
            defense,
            speed,
            specialAttack,
            specialDefense,
          };
          break;
        case "GenderRatio":
          pokemon.genderRatio = pokemonValue as GenderRatio;
          break;
        case "GrowthRate":
          pokemon.growthRate = pokemonValue as GrowthRate;
          break;
        case "BaseExp":
          pokemon.baseExp = parseInt(pokemonValue, 10);
          break;
        case "EVs":
          pokemon.effortValues = parseEffortValues(pokemonValue);
          break;
        case "CatchRate":
          pokemon.catchRate = parseInt(pokemonValue, 10);
          break;
        case "Happiness":
          pokemon.happiness = parseInt(pokemonValue, 10);
          break;
        case "Abilities":
          pokemon.abilities = pokemonValue
            .split(",")
            .map((ability) => ability.trim());
          break;
        case "HiddenAbilities":
          pokemon.hiddenAbilities = pokemonValue
            .split(",")
            .map((ability) => ability.trim());
          break;
        case "Moves":
          pokemon.moves = parseMoves(
            pokemonValue.split(",").map((move) => move.trim())
          );
          break;
        case "TutorMoves":
          const array = pokemonValue.split(",").map((move) => move.trim());
          pokemon.tutorMoves = array.map((move) => {
            return { level: undefined, name: move } as PokemonMove;
          });
          break;
        case "EggMoves":
          const eggArray = pokemonValue.split(",").map((move) => move.trim());
          pokemon.eggMoves = eggArray.map((move) => {
            return { level: undefined, name: move } as PokemonMove;
          });
          break;
        case "EggGroups":
          pokemon.eggGroups = pokemonValue
            .split(",")
            .map((group) => group.trim() as EggGroup);
          break;
        case "HatchSteps":
          pokemon.hatchSteps = parseInt(pokemonValue, 10);
          break;
        case "Incense":
          pokemon.incense = pokemonValue.trim();
          break;
        case "Offspring":
          pokemon.offspring = pokemonValue
            .split(",")
            .map((child) => child.trim());
          break;
        case "Height":
          pokemon.height = parseFloat(pokemonValue);
          break;
        case "Weight":
          pokemon.weight = parseFloat(pokemonValue);
          break;
        case "Color":
          pokemon.color = pokemonValue.trim() as PokemonColor;
          break;
        case "Shape":
          pokemon.shape = pokemonValue.trim() as PokemonShape;
          break;
        case "Habitat":
          pokemon.habitat = pokemonValue.trim() as PokemonHabitat;
          break;
        case "Category":
          pokemon.category = pokemonValue.trim();
          break;
        case "Pokedex":
          pokemon.pokedex = pokemonValue.trim();
          break;
        case "Generation":
          pokemon.generation = parseInt(pokemonValue, 10);
          break;
        case "Flags":
          pokemon.flags = pokemonValue.split(",").map((flag) => flag.trim());
          break;
        case "WildItemCommon":
          pokemon.wildItemCommon = pokemonValue.trim();
          break;
        case "WildItemUncommon":
          pokemon.wildItemUncommon = pokemonValue.trim();
          break;
        case "WildItemRare":
          pokemon.wildItemRare = pokemonValue.trim();
          break;
        case "Evolutions":
          pokemon.evolutions = parseEvolutions(pokemonValue);
          break;
        default:
          break;
      }
    });

    if (pokemon.id) {
      pokemonList.push(pokemon);
    }
  });

  console.log(`Parsed ${pokemonList.length} Pokémon from internal PBS.`);
  return pokemonList;
};

const parseEffortValues = (value: string) => {
  const effortValues = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };
  const evArray = value.split(",").map((ev) => ev.trim());

  // Group evArray into pairs of two
  const pairs: [string, string][] = [];
  for (let i = 0; i < evArray.length; i += 2) {
    pairs.push([evArray[i], evArray[i + 1]]);
  }

  pairs.forEach(([key, value]) => {
    switch (key.toLowerCase()) {
      case "hp":
        effortValues.hp = parseInt(value, 10);
        break;
      case "attack":
        effortValues.attack = parseInt(value, 10);
        break;
      case "defense":
        effortValues.defense = parseInt(value, 10);
        break;
      case "special_attack":
        effortValues.specialAttack = parseInt(value, 10);
        break;
      case "special_defense":
        effortValues.specialDefense = parseInt(value, 10);
        break;
      case "speed":
        effortValues.speed = parseInt(value, 10);
        break;
    }
  });

  return effortValues;
};

const parseMoves = (value: string[]) => {
  // Group value into pairs of [level, move]
  const pairs: PokemonMove[] = [];
  for (let i = 0; i < value.length; i += 2) {
    const level = parseInt(value[i], 10);
    const name = value[i + 1];
    if (!isNaN(level) && name) {
      pairs.push({ level, name });
    }
  }
  return pairs;
};

const parseEvolutions = (value: string) => {
  const array = value.split(",").map((evolution) => evolution.trim());

  const evolutions = [];
  for (let i = 0; i < array.length; i += 3) {
    const id = array[i];
    const method = array[i + 1];
    const parameter = array[i + 2];
    if (id && method && parameter) {
      evolutions.push({
        id,
        method: method as EvolutionMethod,
        parameter,
      } as PokemonEvolution);
    }
  }
  return evolutions;
};
