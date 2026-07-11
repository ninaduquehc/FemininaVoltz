# Feminina Voltz

Site institucional de lideranças do grupo **Feminina Voltz**, organizado em três níveis hierárquicos: **Supervisões**, **Coordenações** e **Legados**.

Construído inteiramente em **HTML, CSS e JavaScript puro** (vanilla), sem frameworks, bibliotecas de UI ou etapas de build — o projeto já teve Bootstrap, que foi completamente removido e substituído por CSS e JS próprios.

---

## 🎯 Sobre o projeto

O site apresenta a rede de liderança feminina do Voltz em três camadas:

- **Supervisões** — o nível mais alto da estrutura. Cada supervisão tem um significado espiritual, símbolo, base bíblica, personagem bíblica de referência e uma supervisora responsável, além das coordenações vinculadas a ela.
- **Coordenações** — subordinadas a uma supervisão (relacionadas via `supervisaoId`). Cada coordenação tem uma coordenadora, sua própria identidade (significado, símbolo, base bíblica) e uma lista de líderes.
- **Legados** — coordenações/supervisões que já passaram pela estrutura e seguiram para um novo momento ministerial, preservando sua identidade histórica dentro do site.

Cada nível tem uma página de **listagem** (grid de cards) e uma página de **detalhe**, navegável por parâmetro de URL (`?id=...`), além de uma **busca global** que varre os três níveis ao mesmo tempo.

---

## ✨ Funcionalidades

- **Navegação dinâmica por nível** — listagem e detalhe compartilhando o mesmo arquivo JS, com o comportamento definido pelo parâmetro `id` da URL.
- **Busca global inteligente** — pesquisa em tempo real nos três JSONs (supervisões, coordenações e legados), com normalização de texto (ignora acentos e maiúsculas/minúsculas) e exibição do trecho onde o termo foi encontrado.
- **Destaque do termo pesquisado** — ao acessar uma página de detalhe vinda da busca, o termo pesquisado é automaticamente grifado (`<mark>`) no conteúdo, e removido ao limpar a busca.
- **Dropdowns dinâmicos** — os menus de navegação (Coordenações, Supervisões, Legados) são gerados automaticamente a partir dos arquivos JSON, respeitando a mesma ordem dos dados — adicionar um novo item ao JSON já atualiza o menu, sem tocar no código.
- **Hierarquia visual entre líderes** — nas páginas de coordenação, a foto da supervisora responsável aparece sobreposta à foto da coordenadora, com identificação ao lado.
- **Layout compartilhado** — navbar e footer injetados dinamicamente em todas as páginas por um único arquivo (`layout.js`), evitando repetição de HTML.
- **Totalmente responsivo** — grids que viram colunas empilhadas, menu hambúrguer, busca reposicionada e conteúdo centralizado em telas menores.

---

## 🛠️ Tecnologias

- **HTML5**
- **CSS3** — Grid, Flexbox, variáveis CSS (custom properties) e media queries
- **JavaScript (Vanilla, ES6+)** — `fetch`, `async/await`, `URLSearchParams`, template literals, manipulação de DOM nativa
- **Google Fonts** — Cinzel, Cormorant Garamond, Poppins
- **SVG inline** para ícones (sem dependência de bibliotecas de ícones)

Nenhuma etapa de build é necessária — o site roda direto abrindo os arquivos `.html`, idealmente via um servidor local simples (ex: Live Server), para o `fetch` dos JSONs funcionar sem erros de CORS.

---

## 📂 Estrutura do projeto

```
FEMININAVOLTZ/
├── data/
│   ├── coordenadoras.json      # Dados de cada coordenação (coordenadora, líderes, foto, supervisaoId)
│   ├── supervisoras.json       # Dados de cada supervisão (significado, símbolo, base bíblica, supervisora)
│   └── legados.json            # Dados de cada legado (líder/coordenadora, significado, informações)
├── js/
│   ├── layout.js                # Injeta navbar e footer, controla busca global e dropdowns dinâmicos
│   ├── coordenacao.js           # Lista e detalhe das coordenações
│   ├── supervisao.js            # Lista e detalhe das supervisões (com coordenações relacionadas)
│   └── legado.js                # Lista e detalhe dos legados
├── static/
│   ├── css/
│   │   └── style.css            # Estilos globais, componentes e responsividade
│   └── imagens/                 # Fotos das lideranças e logos das supervisões/coordenações
├── index.html                   # Página inicial
├── supervisoes.html              # Listagem de supervisões
├── supervisao.html               # Detalhe de uma supervisão (?id=pure)
├── coordenacoes.html             # Listagem de coordenações
├── coordenacao.html              # Detalhe de uma coordenação (?id=consistent)
├── legados.html                  # Listagem de legados
├── legado.html                   # Detalhe de um legado (?id=bright)
└── README.md
```

---

## 🧭 Como funciona a navegação dinâmica

As páginas de detalhe (`coordenacao.html`, `supervisao.html` e `legado.html`) usam o mesmo arquivo JavaScript para dois comportamentos diferentes, dependendo da URL:

- `coordenacoes.html` → sem parâmetro na URL → renderiza a **listagem** de todas as coordenações
- `coordenacao.html?id=consistent` → com parâmetro `id` → renderiza o **detalhe** apenas daquela coordenação

O JS lê o parâmetro via `URLSearchParams`, busca o JSON correspondente com `fetch`, e monta o HTML dinamicamente com `insertAdjacentHTML`. Coordenações e supervisões se relacionam pelo campo `supervisaoId`, permitindo que a página de uma supervisão liste automaticamente todas as coordenações vinculadas a ela.

---

## 🔍 Busca global

A busca (acessível pelo ícone de lupa na navbar, presente em todas as páginas) funciona da seguinte forma:

1. Ao submeter o termo, o `layout.js` busca os três arquivos JSON (`supervisoras.json`, `coordenadoras.json`, `legados.json`) em paralelo.
2. O texto pesquisado e o conteúdo dos JSONs são normalizados (sem acentos, minúsculo) para permitir buscas mais flexíveis.
3. Os resultados são filtrados e exibidos em um dropdown, com o tipo do resultado (Supervisão / Coordenação / Legado) e um trecho de contexto.
4. Ao clicar em um resultado, o termo pesquisado é incluído na URL de destino (`?busca=...`) e automaticamente destacado (`<mark>`) na página de detalhe.

---

## 🎨 Identidade visual, inspiração e legado

Este projeto é a reconstrução completa de um site criado anos atrás pela minha antiga líder, Fernanda Guedes, em [Link do site do Google Sites](https://sites.google.com/view/coordenacoesvoltzfeminina/COORDENACOES-E-SUPERVISOES-VOLTZ-FEMININA?authuser=0), que reunia as informações de supervisões e coordenações do Feminina Voltz.

Quando o legado desse site foi passado para mim, decidi recriá-lo do zero, aplicando o que aprendi na faculdade — trocando a plataforma de blocos prontos por um site desenvolvido manualmente em HTML, CSS e JavaScript, com estrutura de dados própria (JSON), navegação dinâmica e um design mais autoral, refletindo a excelência e identidade do nosso ministério. A identidade visual (paleta de cores, símbolos e a própria organização hierárquica em Supervisões → Coordenações) segue a linha do site original, como forma de manter a essência e a história do projeto ao longo dessa transição.

---

## 🚧 Status do projeto

- [x] Remoção completa do Bootstrap (CSS e ícones substituídos por vanilla JS/CSS e SVG inline)
- [x] Layout compartilhado (navbar + footer) via `layout.js`
- [x] Listagem e detalhe de Coordenações
- [x] Listagem e detalhe de Supervisões
- [x] Listagem e detalhe de Legados
- [x] Busca global com destaque de termo pesquisado
- [x] Dropdowns de navegação dinâmicos (gerados a partir dos JSONs)
- [x] Responsividade completa (mobile, tablet e desktop)