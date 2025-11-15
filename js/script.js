/* 
Anotações:
- Tudo que leva tempo para retornar é assicrona. Então, usar async e await.
- 
*/

const pokemonImagem = document.querySelector('.pokemon__imagem')
const pokemonNome = document.querySelector('.pokemon__nome')
const pokemonID = document.querySelector('.pokemon__id')

const formulario = document.querySelector('.form')
const busca = document.querySelector('.input__pesquisar')

let maxPokemon = 1026

const chamarApi = async (pokemon) => {
    const apiResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    const dadosApi = await apiResposta.json()

    return dadosApi
    
}

const exibirPokemon = async (pokemon=94) =>{

    const dadosApi = await chamarApi(pokemon)

    if (dadosApi.id < 649) {
        pokemonImagem.src = dadosApi['sprites']['other']['home']['front_default']

    } else {
        pokemonImagem.src = dadosApi['sprites']['other']['home']['front_default']
    }

    pokemonNome.innerHTML = dadosApi.name.slice(0,1).toUpperCase() + dadosApi.name.slice(1) // deixa a primeira letra em maiúscula 
    pokemonID.innerHTML = dadosApi.id

}

formulario.addEventListener('submit', (event) =>{ // evento aciona com o submit
    event.preventDefault() // evita envio de campo vazio
    let buscarPokemon = busca.value.toLowerCase().trim()
    const isIdVAlido = !isNaN(buscarPokemon) && buscarPokemon > 0 && buscarPokemon <= maxPokemon
    const isNomeValido = isNaN(buscarPokemon) && buscarPokemon.length > 2

    if (isIdVAlido || isNomeValido){
        exibirPokemon(buscarPokemon)
        busca.value = ""
    }else {
        pokemonImagem.src = "./images/Pokemon_n_encontrado.png"
        pokemonNome.innerHTML = "Não Encontrado!"
        pokemonID.innerHTML = ''
        busca.value = ""
    }

})

// inicia com 1° pokemon
window.onload = () => {
  exibirPokemon()
};


/* 
Nível Fácil — ajustes rápidos e visuais

    Tratar input vazio ou com espaço antes de buscar. sim, com trim() e .preventDefault()

    Exibir uma mensagem simples de erro (“Pokémon não encontrado”). ok, para id < 0 ou maior que o total de pokemons, além de nome n encontrado. 

    Limpar o campo de busca após enviar. ok, com "" string vazia

    Colocar a primeira letra maiúscula no nome do Pokémon. ok, slice(1) e toLowerCase()

*/