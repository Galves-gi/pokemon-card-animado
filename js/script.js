const pokemonImagem = document.querySelector('.pokemon__imagem')
const pokemonNome = document.querySelector('.pokemon__nome')
const pokemonID = document.querySelector('.pokemon__id')

const formulario = document.querySelector('.form')
const busca = document.querySelector('.input__pesquisar') 

const pokemonHp = document.querySelector('.pokemon__hp')
const pokemonAtaque = document.querySelector('.pokemon__ataque-dano')
const pokemonDefesa = document.querySelector('.pokemon__defesa-valor')
const pokemonVelocidade = document.querySelector('.pokemon__velocidade-valor')


let maxPokemon = 1026

/* menu */
const botaoMenu = document.querySelector(".botao_menu")
const iconeMenu = document.querySelector(".icone_menu")
const headerNav = document.querySelector(".header_nav")

botaoMenu.addEventListener("click", ()=>{
    if (iconeMenu.classList.contains("icone-X")) { // contains(): Verifica se uma classe existe, retornando true ou false.

        iconeMenu.classList.remove("icone-X")
        iconeMenu.classList.add("anima-menu")
        headerNav.classList.add("show")
    }else{
        iconeMenu.classList.remove("anima-menu")
        iconeMenu.classList.add("icone-X")
        headerNav.classList.remove("show")
    }

}) 
/* menu */


/* botoões de mudar */
const botoesMudar = document.querySelectorAll(".botoes_mudar")
const carregamento = document.querySelector(".card")

botoesMudar.forEach(cada_botao =>{

    cada_botao.addEventListener("click", ()=>{
       
             if (!carregamento.classList.contains("girarCard")) {
               carregamento.classList.add("girarCard")
            } else{
                 carregamento.classList.remove("girarCard")
            }
    })

})

/* botoões de mudar */


/* chamar a api */
const chamarApi = async (pokemon) => {
    const apiResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    const dadosApi = await apiResposta.json()
    console.log(dadosApi);
    

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