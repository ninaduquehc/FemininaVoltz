document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const res = await fetch("data/coordenadoras.json");
  const coordenacoes = await res.json();

  if (id) {
    renderDetalhe(id, coordenacoes);
  } else {
    renderLista(coordenacoes);
  }
});

function renderLista(coordenacoes) {
  const grid = document.querySelector("#coordenacoes-grid");
  if (!grid) return;

  const html = coordenacoes.map(c => `
    <a href="coordenacao.html?id=${c.id}" class="card">
      <img class="card-foto" src="${c.coordenacao_foto}" alt="${c.nome}">
      <h3 class="card-titulo">${c.nome}</h3>
      <p class="card-subtitulo">${c.coordenadora}</p>
    </a>
  `).join("");

  grid.insertAdjacentHTML("beforeend", html);
}

function renderDetalhe(id, coordenacoes) {
  const coordenacao = coordenacoes.find(c => c.id === id);

  if (!coordenacao) {
    document.body.insertAdjacentHTML("beforeend", `<p class="erro">Coordenação não encontrada.</p>`);
    return;
  }

  document.title = `${coordenacao.nome} | Feminina Voltz`;

  const lideresHtml = coordenacao.lideres.map(l => `
    <div class="lider-card">
      <img class="lider-foto" src="${l.foto}" alt="${l.nome}">
      <p class="lider-nome">${l.nome}</p>
    </div>
  `).join("");

  const html = `
    <section class="detalhe-header">
      <img class="detalhe-foto" src="${coordenacao.coordenacao_foto}" alt="${coordenacao.nome}">
      <h1>${coordenacao.nome}</h1>
      <div class="coordenadora-info">
        <img class="coordenadora-foto" src="${coordenacao.coordenadora_foto}" alt="${coordenacao.coordenadora}">
        <p>${coordenacao.coordenadora}</p>
      </div>
    </section>

    <section class="container lideres-grid">
      ${lideresHtml}
    </section>
  `;

  document.querySelector("#conteudo").insertAdjacentHTML("beforeend", html);
}