document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const busca = params.get("busca");

  const res = await fetch("data/legados.json");
  const legados = await res.json();

  if (id) {
    renderDetalhe(id, legados, busca);
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

function renderDetalhe(id, legados, busca) {
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

      <div class="detalhe-informacoes">

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

        <p>
          <strong>Informações:</strong>
          ${legado.informacoes}
        </p>

      </div>

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
  if (busca) {
    destacarTexto(busca);
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

              const caractereNormalizado = normalizar(
                textoOriginal[i]
              );


              contador += caractereNormalizado.length;


              if (contador > indice) {
                inicioOriginal = i;
                break;
              }

            }


            const fimOriginal =
              inicioOriginal + busca.length;


            const fragmento =
              document.createDocumentFragment();


            const antes =
              textoOriginal.substring(
                0,
                inicioOriginal
              );


            const destaque =
              textoOriginal.substring(
                inicioOriginal,
                fimOriginal
              );


            const depois =
              textoOriginal.substring(
                fimOriginal
              );


            if (antes) {
              fragmento.appendChild(
                document.createTextNode(antes)
              );
            }


            const mark = document.createElement("mark");
            mark.textContent = destaque;

            fragmento.appendChild(mark);


            if (depois) {
              fragmento.appendChild(
                document.createTextNode(depois)
              );
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
}