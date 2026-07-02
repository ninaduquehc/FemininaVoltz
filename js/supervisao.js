document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const res = await fetch("data/supervisoras.json");
  const supervisoes = await res.json();

  if (id) {
    const resCoord = await fetch("data/coordenadoras.json");
    const coordenacoes = await resCoord.json();
    renderDetalhe(id, supervisoes, coordenacoes);
  } else {
    renderLista(supervisoes);
  }
});

function renderLista(supervisoes) {
  const grid = document.querySelector("#supervisoes-grid");
  if (!grid) return;

  const html = supervisoes.map(s => `
    <a href="supervisao.html?id=${s.id}" class="card">
      <img class="card-foto" src="${s.logo}" alt="${s.nome}">
      <h3 class="card-titulo">${s.nome}</h3>
      <p class="card-subtitulo">${s.supervisora}</p>
    </a>
  `).join("");

  grid.insertAdjacentHTML("beforeend", html);
}

function renderDetalhe(id, supervisoes, coordenacoes) {
  const supervisao = supervisoes.find(s => s.id === id);

  if (!supervisao) {
    document.body.insertAdjacentHTML("beforeend", `<p class="erro">Supervisão não encontrada.</p>`);
    return;
  }

  document.title = `${supervisao.nome} | Feminina Voltz`;

  const coordenacoesDaSupervisao = coordenacoes.filter(c => c.supervisaoId === id);

  const coordenacoesHtml = coordenacoesDaSupervisao.map(c => `
    <a href="coordenacao.html?id=${c.id}" class="card">
      <img class="card-foto" src="${c.coordenacao_foto}" alt="${c.nome}">
      <h3 class="card-titulo">${c.nome}</h3>
      <p class="card-subtitulo">${c.coordenadora}</p>
    </a>
  `).join("");

  const html = `
    <section class="detalhe-header">
      <img class="detalhe-foto" src="${supervisao.logo}" alt="${supervisao.nome}">
      <h1>${supervisao.nome}</h1>
      <p class="detalhe-significado"><strong>Significado:</strong> ${supervisao.significado}</p>
      <p class="detalhe-simbolo"><strong>Símbolo:</strong> ${supervisao.simbolo}</p>
      <p class="detalhe-base"><strong>Base bíblica:</strong> ${supervisao.base_biblica}</p>
      <p class="detalhe-personagem"><strong>Personagem bíblica:</strong> ${supervisao.personagem_biblica}</p>
      <div class="supervisora-info">
        <img class="supervisora-foto" src="${supervisao.supervisora_foto}" alt="${supervisao.supervisora}">
        <p>${supervisao.supervisora}</p>
      </div>
    </section>

    <section class="container coordenacoes-grid">
      ${coordenacoesHtml}
    </section>
  `;

  document.body.insertAdjacentHTML("beforeend", html);
}