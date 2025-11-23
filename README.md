# PokeAPI Frontend — HTML, CSS e JavaScript

Demo: https://pokemon-card-animado.vercel.app/

Projeto frontend que consome a **PokeAPI** (`https://pokeapi.co/`) para exibir informações de Pokémon em um card dinâmico, responsivo e estilizado com CSS.

O objetivo é demonstrar consumo de API, manipulação do DOM e boas práticas front-end, mantendo o projeto simples e didático.

#![PokeAPI](/images/img-readme-1.png)

---

## 🚀 Funcionalidade

O usuário pode buscar um Pokémon por nome ou ID, navegar entre Pokémons com botões e teclado, ver o sprite, tipos e alguns stats.

Com base nos dados retornados pela API (ex.: `types`, `stats`) o app aplica:

- Imagem de fundo e ícones específicos por tipo
- exibição das estatísticas principais (HP, ataque, defesa, velocidade)
- comportamento responsivo e animações (hover, transições, giro do card)

O app também verifica se o navegador está online e guarda o último Pokémon visualizado em `localStorage`.

---

## 🧱 Estrutura resumida

- `index.html` — interface
- `css/` — estilos (BEM, animações)
- `images/` — imagens e ícones
- `js/script.js` — lógica: fetch, render, eventos e estado

---

## 🧪 Tecnologias

- HTML5, CSS3, JavaScript (ES6+)
- PokeAPI (https://pokeapi.co/)

---

## 🐱‍👤 Como rodar

1. Baixe os arquivos
2. Abra `index.html` no navegador

---

Contribuições
- Sugestões e correções são bem-vindas. Abra uma issue descrevendo a proposta ou bug antes de enviar PRs.
# PokeAPI Frontend — HTML, CSS e JavaScript
