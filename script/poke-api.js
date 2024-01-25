const pokeApi = {}

function converterPokemonApiDetailEmPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
    const [type] = types

    pokemon.type = type
    pokemon.types = types

    pokemon.photo = pokeDetail.sprites.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(converterPokemonApiDetailEmPokemon)
}

pokeApi.getPokemon = (offset = 0, limit = 10) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response)=> response.json())
    .then((json) => json.results)
    .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails)=> pokemonDetails)
    .catch((error) => console.error(`Erro na requisição da API: ${error}`))

}
