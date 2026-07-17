document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const busca = params.get("busca");

  const res = await fetch("data/coordenadoras.json");
  const coordenacoes = await res.json();

  if (id) {
    const resSuper = await fetch("data/supervisoras.json");
    const supervisoes = await resSuper.json();
    renderDetalhe(id, coordenacoes, supervisoes, busca);
  } else {
    renderLista(coordenacoes);
  }
});

function renderLista(coordenacoes) {
  const grid = document.querySelector("#coordenacoes-grid");
  if (!grid) return;

  const html = coordenacoes.map(c => `
    <a href="coordenacao.html?id=${c.id}" class="card">
      <div class="card-foto-wrapper">
        <img class="card-foto" src="${c.coordenacao_foto}" alt="${c.nome}">
        <img class="card-foto-mini" src="${c.coordenadora_foto}" alt="${c.coordenadora}">
      </div>
      <h3 class="card-titulo">${c.nome}</h3>
      <p class="card-subtitulo">${c.coordenadora}</p>
    </a>
  `).join("");

  grid.insertAdjacentHTML("beforeend", html);
}

function renderDetalhe(id, coordenacoes, supervisoes, busca) {
  const coordenacao = coordenacoes.find(c => c.id === id);

  if (!coordenacao) {
    document.body.insertAdjacentHTML("beforeend", `<p class="erro">Coordenação não encontrada.</p>`);
    return;
  }

  document.title = `${coordenacao.nome} | Feminina Voltz`;

  const supervisao = supervisoes.find(s => s.id === coordenacao.supervisaoId);
  const mostrarSupervisora = Boolean(supervisao);

  const lideresHtml = coordenacao.lideres.map(l => `
    <div class="lider-card">
      <img class="lider-foto" src="${l.foto}" alt="${l.nome}">
      <p class="lider-nome">${l.nome}</p>
    </div>
  `).join("");

  const html = `
  <section class="detalhe-header">

    <div class="coordenadora-info">
      <p>Coordenadora</p>

      <div class="detalhe-foto-wrapper">
        <img class="coordenadora-foto" src="${coordenacao.coordenadora_foto}" alt="${coordenacao.coordenadora}">
        ${mostrarSupervisora ? `
          <a href="supervisao.html?id=${supervisao.id}" class="detalhe-foto-mini-link" title="Ver supervisão">
            <img class="detalhe-foto-mini" src="${supervisao.supervisora_foto}" alt="${supervisao.supervisora}">
          </a>
        ` : ""}
      </div>

      <p>${coordenacao.coordenadora}</p>

      ${mostrarSupervisora ? `
        <a href="supervisao.html?id=${supervisao.id}" class="supervisora-badge-texto">Supervisora:<br>${supervisao.supervisora}</a>
      ` : ""}
    </div>

    <img class="detalhe-foto" src="${coordenacao.coordenacao_foto}" alt="${coordenacao.nome}">

    <div class="detalhe-informacoes">
      <h1>${coordenacao.nome}</h1>

      <p class="detalhe-significado">
        <strong>Significado:</strong> ${coordenacao.significado}
      </p>

      <p class="detalhe-simbolo">
        <strong>Símbolo:</strong> ${coordenacao.simbolo}
      </p>

      <p class="detalhe-base">
        <strong>Base bíblica:</strong> ${coordenacao.base_biblica}
      </p>

      <p class="detalhe-personagem">
        <strong>Personagem bíblica:</strong> ${coordenacao.personagem_biblica}
      </p>
    </div>

  </section>

  <section class="lideres-secao">
    <div class="container">
      <h2 class="secao-titulo">Líderes</h2>
      <div class="lideres-grid">
        ${lideresHtml}
      </div>
    </div>
  </section>
`;

  document.querySelector("#conteudo").insertAdjacentHTML("beforeend", html);

  // HOVER CONJUNTO (foto mini + texto da supervisora)
  // Só roda AGORA, porque só agora esses elementos existem de fato na página
  const fotoMini = document.querySelector(".detalhe-foto-mini");
  const textoSupervisora = document.querySelector(".supervisora-badge-texto");

  if (fotoMini && textoSupervisora) {
    const elementosHover = [fotoMini, textoSupervisora];

    elementosHover.forEach(elemento => {
      elemento.addEventListener("mouseenter", () => {
        fotoMini.classList.add("hover-ativo");
        textoSupervisora.classList.add("hover-ativo");
      });
      elemento.addEventListener("mouseleave", () => {
        fotoMini.classList.remove("hover-ativo");
        textoSupervisora.classList.remove("hover-ativo");
      });
    });
  }

  if (busca) {
    destacarTexto(busca);
  }
}

// DESTACAR TEXTO
function destacarTexto(busca) {

  const conteudo = document.querySelector("#conteudo");

  if (!conteudo) return;

  function normalizar(texto) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const buscaNormalizada = normalizar(busca);

  function percorrerNos(elemento) {

    elemento.childNodes.forEach(no => {

      if (no.nodeType === Node.TEXT_NODE) {

        const textoOriginal = no.textContent;
        const textoNormalizado = normalizar(textoOriginal);
        const indice = textoNormalizado.indexOf(buscaNormalizada);

        if (indice !== -1) {

          // pega a posição correta no texto original
          let contador = 0;
          let inicioOriginal = 0;

          for (let i = 0; i < textoOriginal.length; i++) {
            const caractereNormalizado = normalizar(textoOriginal[i]);
            contador += caractereNormalizado.length;

            if (contador > indice) {
              inicioOriginal = i;
              break;
            }
          }

          const fimOriginal = inicioOriginal + busca.length;

          const fragmento = document.createDocumentFragment();

          const antes = textoOriginal.substring(0, inicioOriginal);
          const destaque = textoOriginal.substring(inicioOriginal, fimOriginal);
          const depois = textoOriginal.substring(fimOriginal);

          if (antes) {
            fragmento.appendChild(document.createTextNode(antes));
          }

          const mark = document.createElement("mark");
          mark.textContent = destaque;
          fragmento.appendChild(mark);

          if (depois) {
            fragmento.appendChild(document.createTextNode(depois));
          }

          no.replaceWith(fragmento);
        }

      } else {
        percorrerNos(no);
      }

    });
  }

  percorrerNos(conteudo);
}