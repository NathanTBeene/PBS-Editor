import { usePokedexContext } from "../lib/providers/PokedexProvider";

const PokemonPage = () => {
  const { pokemon, abilities } = usePokedexContext();

  return (
    <div>
      <h1>Pokemon Page</h1>
      <div>
        {pokemon.map((poke) => (
          <div key={poke.id}>
            <h2>{poke.name}</h2>
            <p>Type: {poke.types.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonPage;
