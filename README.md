# Feminina Voltz

Site institucional de lideranças do grupo Feminina Voltz, organizado em três níveis hierárquicos: **Supervisões**, **Coordenações** e **Legados**.

Inspirado na estrutura do [site anterior no Google Sites](https://sites.google.com/view/coordenacoesvoltzfeminina), este projeto foi reconstruído do zero em **HTML, CSS e JavaScript puro**, sem frameworks ou bibliotecas externas de UI (o projeto já teve Bootstrap, removido completamente).

## 🎯 Sobre o projeto

O site apresenta a rede de liderança feminina do Voltz em três camadas:

- **Supervisões** — o nível mais alto, cada uma com um significado espiritual, símbolo, base bíblica e uma supervisora responsável.
- **Coordenações** — subordinadas a uma supervisão (via `supervisaoId`), cada uma com uma coordenadora e suas líderes.
- **Legados** — coordenações/supervisões que já passaram pela estrutura e seguiram para um novo momento ministerial. *(em desenvolvimento)*

Cada nível tem uma página de **listagem** (grid de cards) e uma página de **detalhe**, navegável via parâmetro de URL (`?id=...`).

## 🛠️ Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, variáveis CSS)
- JavaScript (Vanilla, ES6+) — `fetch`, `async/await`, `URLSearchParams`, template literals
- Google Fonts (Cinzel, Cormorant Garamond, Poppins)
- SVG inline para ícones (sem dependência de bibliotecas de ícones)

Nenhuma etapa de build é necessária — o site roda direto abrindo os arquivos `.html` (idealmente via um servidor local simples, para o `fetch` dos JSONs funcionar sem erros de CORS).

## 📂 Estrutura do projeto

```
FEMININAVOLTZ/
├── data/
│   ├── coordenadoras.json     # Dados de cada coordenação (coordenadora, líderes, foto, supervisaoId)
│   └── supervisoras.json      # Dados de cada supervisão (significado, símbolo, base bíblica, supervisora)
├── js/
│   ├── layout.js               # Injeta navbar e footer em todas as páginas
│   ├── coordenacao.js          # Lista e detalhe das coordenações
│   └── supervisao.js           # Lista e detalhe das supervisões (com filtro de coordenações relacionadas)
├── static/
│   ├── css/
│   │   └── style.css           # Estilos globais, componentes e responsividade
│   └── imagens/                # Fotos das lideranças e logos das supervisões/coordenações
├── index.html                  # Página inicial
├── supervisoes.html             # Listagem de supervisões
├── supervisao.html              # Detalhe de uma supervisão (?id=pure)
├── coordenacoes.html            # Listagem de coordenações
├── coordenacao.html             # Detalhe de uma coordenação (?id=consistent)
├── legados.html                 # Página de legados (em construção)
└── README.md
```

## 🧭 Como funciona a navegação dinâmica

As páginas de detalhe (`coordenacao.html` e `supervisao.html`) usam o mesmo arquivo para dois comportamentos diferentes, dependendo da URL:

- `coordenacoes.html` → sem parâmetro na URL → renderiza a **listagem** de todas as coordenações
- `coordenacao.html?id=consistent` → com parâmetro `id` → renderiza o **detalhe** apenas daquela coordenação

O JS lê o parâmetro via `URLSearchParams`, busca o JSON correspondente com `fetch`, e monta o HTML dinamicamente com `insertAdjacentHTML`.

## 🚧 Status do projeto

- [x] Remoção completa do Bootstrap (CSS e ícones substituídos por vanilla JS/CSS e SVG inline)
- [x] Layout compartilhado (navbar + footer) via `layout.js`
- [x] Listagem e detalhe de Coordenações
- [x] Listagem e detalhe de Supervisões
- [x] Estilização dos cards e páginas de detalhe
- [ ] Estrutura de dados e páginas de **Legados**
- [ ] Revisão de responsividade em telas menores

## 📄 Licença

Projeto de uso interno do Feminina Voltz. Todos os direitos reservados.