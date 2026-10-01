const pokemonImagem = document.querySelector('.pokemon__imagem')
const pokemonNome = document.querySelector('.pokemon__nome')

const formulario = document.querySelector('.form')
const busca = document.querySelector('.input__pesquisar')

const pokemonHp = document.querySelector('.pokemon__hp')
const carregamento = document.querySelector(".card")
const containerParalelogramo = document.querySelector(".card-front_infor")

let maxPokemon = 1025
let ultimoAcesso

/* menu */
const botaoMenu = document.querySelector(".botao_menu")
const iconeMenu = document.querySelector(".icone_menu")
const headerNav = document.querySelector(".header_nav")

botaoMenu.addEventListener("click", () => {
  if (iconeMenu.classList.contains("icone-X")) { // contains(): Verifica se uma classe existe, retornando true ou false.
    iconeMenu.classList.remove("icone-X")
    iconeMenu.classList.add("anima-menu")
    headerNav.classList.add("show")
  } else {
    iconeMenu.classList.remove("anima-menu")
    iconeMenu.classList.add("icone-X")
    headerNav.classList.remove("show")
  }

})
/* --------------------------- */

// verificar se tem internet
const aviso = document.querySelector(".aviso")

function checarConexao() {
  !navigator.onLine ? aviso.style.display = "block" : aviso.style.display = "none"
}

/* 
eventos usam "online" (minúsculo)

mas a propriedade usa onLine (L maiúsculo)

Isso acontece porque o JavaScript herdou esse nome da Web API original, lá atrás, antes de padronizarem as coisas.
*/

window.addEventListener("offline", checarConexao)
window.addEventListener('online', checarConexao)



/* chamar a api */
const chamarApi = async (pokemon) => {
  const apiResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if (apiResposta.status === 200) {
    const dadosApi = await apiResposta.json()
    //console.log(dadosApi);

    return dadosApi
  }
}


/* botoões de mudar */
const botaoVoltar = document.querySelector(".btn-voltar")
const botaoProx = document.querySelector(".btn-prox")

function navegacao(direcao) {
  const valor = ultimoAcesso + direcao

  if (valor < 1 || valor > maxPokemon) return erroPokemon()

  exibirPokemon(valor)
}

botaoVoltar.addEventListener('click', () => navegacao(-1))

botaoProx.addEventListener('click', () => navegacao(1))
// mudar por teclas 
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') navegacao(-1)
  if (event.key === 'ArrowRight') navegacao(1)
})


// exibir pokemon
const exibirPokemon = async (pokemon = 94) => {
  carregamento.classList.add("girarCard");
  pokemonImagem.style.visibility = "hidden";

  const dadosApi = await chamarApi(pokemon);

  if (!dadosApi) {
    erroPokemon()
    carregamento.classList.add("girarCard")
    pokemonImagem.style.visibility = "visible";
    return;
  }

  const imgfundo =
    dadosApi.sprites.other.home.front_default ||
    "./images/Pokemon_n_encontrado.png";

  // Inicia o carregamento da imagem em segundo plano
  const imagemTemp = new Image();
  imagemTemp.src = imgfundo;

  // Aguarda o tempo da animação e o carregamento da imagem
  await Promise.all([
    new Promise(resolve => setTimeout(resolve, 600)),
    imagemTemp.decode().catch(() => { })
  ]);

  // Exibe somente após as duas etapas
  pokemonImagem.src = imagemTemp.src;
  pokemonImagem.alt = dadosApi.name;

  carregamento.classList.remove("girarCard");
  pokemonImagem.style.visibility = "visible";

  pokemonNome.innerHTML = dadosApi.name.slice(0, 1).toUpperCase() + dadosApi.name.slice(1)

  ultimoAcesso = dadosApi.id

  localStorage.setItem("ultima", ultimoAcesso)

  // niveis
  containerParalelogramo.innerHTML = ''
  const ARRAY_STATS = dadosApi.stats
  niveisHpAtaqueDefesa(ARRAY_STATS)

  //tipos
  const tipoPokemon = dadosApi.types
  tipo(tipoPokemon)

}

// retornar a cor de fundo e o icone
const corFundo = document.querySelector(".card-front_corpo")

const estiloPorTipos = [
  {
    nome_icone: "normal",
    img_icone: "/images/icones/normal.webp",
    cor_fundo: "/images/img-fundo/normal.webp"
  },
  {
    nome_icone: "fire",
    img_icone: "/images/icones/fire.webp",
    cor_fundo: "/images/img-fundo/fire.webp"
  },
  {
    nome_icone: "water",
    img_icone: "/images/icones/water.webp",
    cor_fundo: "/images/img-fundo/water.webp"
  },
  {
    nome_icone: "electric",
    img_icone: "/images/icones/electric.webp",
    cor_fundo: "/images/img-fundo/padrao.webp"
  },
  {
    nome_icone: "grass",
    img_icone: "/images/icones/grass.webp",
    cor_fundo: "/images/img-fundo/grass.webp"
  },
  {
    nome_icone: "ice",
    img_icone: "/images/icones/ice.webp",
    cor_fundo: "/images/img-fundo/ice.webp"
  },
  {
    nome_icone: "fighting",
    img_icone: "/images/icones/fighting.webp",
    cor_fundo: "/images/img-fundo/fighting.webp"
  },
  {
    nome_icone: "poison",
    img_icone: "/images/icones/poison.webp",
    cor_fundo: "/images/img-fundo/poison.webp"
  },
  {
    nome_icone: "ground",
    img_icone: "/images/icones/ground.webp",
    cor_fundo: "/images/img-fundo/ground.webp"
  },
  {
    nome_icone: "flying",
    img_icone: "/images/icones/flying.webp",
    cor_fundo: "/images/img-fundo/flying.webp"
  },
  {
    nome_icone: "psychic",
    img_icone: "/images/icones/psychic.webp",
    cor_fundo: "/images/img-fundo/psychic.webp"
  },
  {
    nome_icone: "bug",
    img_icone: "/images/icones/bug.webp",
    cor_fundo: "/images/img-fundo/bug.webp"
  },
  {
    nome_icone: "rock",
    img_icone: "/images/icones/rock.webp",
    cor_fundo: "/images/img-fundo/rock.webp"
  },
  {
    nome_icone: "ghost",
    img_icone: "/images/icones/ghost.webp",
    cor_fundo: "/images/img-fundo/ghost.webp"
  },
  {
    nome_icone: "dragon",
    img_icone: "/images/icones/dragon.webp",
    cor_fundo: "/images/img-fundo/dragon.webp"
  },
  {
    nome_icone: "dark",
    img_icone: "/images/icones/dark.webp",
    cor_fundo: "/images/img-fundo/dark.webp"
  },
  {
    nome_icone: "steel",
    img_icone: "/images/icones/steel.webp",
    cor_fundo: "/images/img-fundo/steel.webp"
  },
  {
    nome_icone: "fairy",
    img_icone: "/images/icones/fairy.webp",
    cor_fundo: "/images/img-fundo/fairy.webp"
  }
];

function tipo(tipo) {
  // imagem de fundo
  const primeiroTipo = tipo[0].type.name

  if (primeiroTipo) {
    const results = estiloPorTipos.find(item => item.nome_icone === primeiroTipo)

    const imgBackground = results.cor_fundo
    corFundo.style.backgroundImage = `url(${imgBackground})`
  } else {
    corFundo.style.backgroundColor = 'yellow'
  }


  // icones por tipos
  const containerIcones = document.querySelector(".icones")
  containerIcones.innerHTML = ''
  const icones = tipo

  for (const icon of icones) {
    const result = estiloPorTipos.find(item => item.nome_icone === icon.type.name)

    if (result) {
      const imgIcone = document.createElement('img')

      imgIcone.src = result.img_icone
      imgIcone.alt = result.nome_icone
      imgIcone.classList.add("pokemon__icone")

      containerIcones.appendChild(imgIcone)
    }
  }
}

// retornar os nivie de poder 
function niveisHpAtaqueDefesa(array) {
  const acessarIndice = [0, 1, 2, 5]

  const result = array.filter((nivel, index) => {
    return acessarIndice.includes(index)
  })

  for (const cada_nivel of result.slice(1)) {
    const niveisNomeStats = document.createElement('div')

    niveisNomeStats.classList.add('container-paralelogramo')

    const nomeMaiuscula = cada_nivel.stat.name.slice(0, 1).toUpperCase() + cada_nivel.stat.name.slice(1)

    niveisNomeStats.innerHTML = `
            <h3 class="pokemon__velocidade card-front_paralelogramo">${nomeMaiuscula}</h3>
            <p class="pokemon__velocidade-valor card-front_paralelogramo-valor">+${cada_nivel.base_stat}</p>
        `
    containerParalelogramo.appendChild(niveisNomeStats)

  }
  pokemonHp.innerHTML = result[0].base_stat
}

// pokemon aleatorio
const botaoAleatorio = document.querySelector(".btn-aleatorio")

botaoAleatorio.addEventListener('click', () => {
  const numeroAleatorio = Math.floor(Math.random() * maxPokemon - 0 + 1) + 0

  exibirPokemon(numeroAleatorio)
})


// pegar o input e enviar
formulario.addEventListener('submit', (event) => { // evento aciona com o submit
  event.preventDefault() // evita envio de campo vazio
  let buscarPokemon = busca.value.toLowerCase().trim()

  const isIdVAlido = !isNaN(buscarPokemon) && buscarPokemon > 0 && buscarPokemon <= maxPokemon
  const isNomeValido = isNaN(buscarPokemon) && buscarPokemon.length > 2

  if (isIdVAlido || isNomeValido) {
    exibirPokemon(buscarPokemon)
    busca.value = ""
  } else {
    erroPokemon()
  }

})

// card sem pokemon
function erroPokemon() {
  pokemonImagem.src = "./images/Pokemon_n_encontrado.webp"
  corFundo.style.backgroundColor = 'yellow'
  pokemonNome.innerHTML = "Não Encontrado!"
  busca.value = ""
}

// inicia com ultimo pokemon
window.onload = () => {
  const salvo = localStorage.getItem('ultima')

  salvo ? exibirPokemon(Number(salvo)) : exibirPokemon()
};

checarConexao()