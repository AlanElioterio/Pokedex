const home = document.getElementById("home")
const pokedetail = document.getElementById("pokemon_Detail")
const voltarButton = document.getElementById("voltar_home")

function voltaProHub(){
    home.style.display = 'block'
    pokedetail.style.display = 'none'
}

function criaDivDetail(pokemonEstat){
    const pokemon = pokemonEstat;

    return `
    <div class="info_pokemon">

            <div class="detail_pokemon">
                <div class="detalhe">
                    
                    <h1 style='text-transform:capitalize'>${pokemon.name}</h1>
                    <p>#${pokemon.number}</p>

                    <button id="voltar_home" onClick='voltaProHub()'>
                        <img src="./assets/icone_Esquerda.svg"> 
                    </button>
                </div>

                <div class="imagem_pokemon ${pokemon.type}">
                    <img src="${pokemon.photo}"/>
                </div>

                <div class="informacoes_pokemon">
                    
                    <div class="types_info">
                        ${pokemon.types.map((type)=> `<span class="type_info ${type}">${type}</span>`).join(' ')}
                    </div>
                    
                    <table class="tbl_estatisticas">
                        ${pokemon.est.map((est_info)=>`
                            <tr class="linha_est">
                                <td class='est_nome'>${est_info.stat.name}</td>
                                <td>${est_info.base_stat}</td>
                                <td> 
                                    <div class="bar_progress">
                                        <div class="bar_status ${pokemon.type}" style="width:${est_info.base_stat}%"></div>
                                    </div>
                                </td>
                            </tr>
                        `).join(' ')}
                    </table>

                </div>
            </div>
            
        </div>`
}


function showDetail(pokemonDiv){
    const nome = pokemonDiv.childNodes[1].children[0].innerHTML;
    
    pokeApi.pegaEstat(nome).then((pokemonInfo) => {
        pokedetail.innerHTML = criaDivDetail(pokemonInfo)
    }).then(()=>{
        home.style.display = 'none'
        pokedetail.style.display = 'block'
    })

    
}

