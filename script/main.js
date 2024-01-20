console.log("x")
const offset = 24;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

function criaItemHtml(pokemon){
    let urlstring = ""
    let urlsep = pokemon.url.split('/')

    urlstring = urlsep[urlsep.length-2]

    return `<li class="pokemon">
        <div class="infos">
            <span class="nome">${pokemon.name}</span>
            <span class="numero">#1</span>
        </div>
        
        
        <div class="detail">
            <ol class="types">
                <li class="type">${pokemon.name}</li>
                <li class="type">${pokemon.name}</li>
            </ol>

            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${urlsep}.svg" alt="Articuno">
        </div>
    
    </li>`
}

const pokemondiv = document.getElementById("lista-de-pokemons")

fetch(url)
    .then((response)=> response.json())
    .then((json) => json.results)
    .then((pokemonList) => {
        // debugger
        let i = 0;

        while(i < pokemonList.length){

            const pokemonn = pokemonList[i]

            pokemondiv.innerHTML += criaItemHtml(pokemonn)
            
            i = i + 1
        }
    })
    .catch((error) => console.error(`Erro na requisição da API: ${error}`));



