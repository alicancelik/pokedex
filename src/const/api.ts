const API = 'https://pokeapi.co/api/v2/';
const itemsPerPage = 30;

const ApiGetPokemons = API + 'pokemon?offset=0&limit=' + itemsPerPage;
const ApiGetMoves = API + 'move?offset=0&limit=' + itemsPerPage;
const ApiGetPokemonByName = API + 'pokemon/';

const FullPokemonsAPI = 'https://gamepress.gg/sites/default/files/aggregatedjson/pokemon-data-full-en-PoGO.json';
const FullMovesAPI = 'https://gamepress.gg/sites/default/files/aggregatedjson/move-data-full-PoGO.json';

export { ApiGetPokemons, ApiGetMoves, ApiGetPokemonByName, FullPokemonsAPI, FullMovesAPI }