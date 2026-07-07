document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const res = await fetch("data/legados.json");
  const legados = await res.json();

  if (id) {
    renderDetalhe(id, legados);
  } else {
    renderLista(legados);
  }
});

function renderLista(legados) {
  const grid = document.querySelector("#legados-grid");
  if (!grid) return;

  const html = legados.map(l => `
    <a href="legado.html?id=${l.id}" class="card">
      <img class="card-foto" src="${l.logo}" alt="${l.nome}">
      <h3 class="card-titulo">${l.nome}</h3>
      <p class="card-subtitulo">${l.lider || l.coordenadora}</p>
    </a>
  `).join("");

  grid.insertAdjacentHTML("beforeend", html);
}

function renderDetalhe(id, legados) {
  const legado = legados.find(l => l.id === id);

  if (!legado) {
    document.querySelector("#conteudo").insertAdjacentHTML(
      "beforeend",
      `<p class="erro">Legado não encontrado.</p>`
    );
    return;
  }

  document.title = `${legado.nome} | Feminina Voltz`;

  const html = `
    <section class="detalhe-header">

      <img class="detalhe-foto"
           src="${legado.logo}"
           alt="${legado.nome}">

      <h1>${legado.nome}</h1>

      <p class="detalhe-significado">
        <strong>Significado:</strong>
        ${legado.significado}
      </p>

      <p class="detalhe-simbolo">
        <strong>Símbolo:</strong>
        ${legado.simbolo}
      </p>

      <p class="detalhe-base">
        <strong>Base bíblica:</strong>
        ${legado.base_biblica}
      </p>

      <p class="detalhe-personagem">
        <strong>Personagem bíblica:</strong>
        ${legado.personagem_biblica}
      </p>

      <p class="detalhe-informacoes">
        <strong>Informações:</strong>
        ${legado.informacoes}
      </p>

      <div class="coordenadora-info">
        <img
          class="coordenadora-foto"
          src="${legado.lider_foto}"
          alt="${legado.lider || legado.coordenadora}"
        >

        <p>${legado.lider || legado.coordenadora}</p>
      </div>

    </section>
  `;

  document.querySelector("#conteudo").insertAdjacentHTML("beforeend", html);
}