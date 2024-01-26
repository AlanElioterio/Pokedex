const pokemondiv = document.getElementById("lista-de-pokemons")
const loadMoreButton = document.getElementById("btn_loadpokemon")
const limit = 12;
let offset = 0;
let maxRecords = 151;

function loadPokemonItems(offset, limit) {

    function criaItemHtml(pokemon){
        return `<li class="pokemon ${pokemon.type}" onClick='showDetail(this)'>
            
            <div class="infos">
                <span class="nome">${pokemon.name}</span>
                <span class="numero">#${pokemon.number}</span>
            </div>
            
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type)=> `<li class='type ${type}'>${type}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        
        </li>`
    }

    pokeApi.getPokemon(offset, limit).then((pokemonList = []) => {
        pokemondiv.innerHTML += pokemonList.map((pokemon) => criaItemHtml(pokemon)).join('')
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset 
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadPokemonItems(offset, limit)
    }

})
