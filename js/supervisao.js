document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const busca = params.get("busca");

  const res = await fetch("data/supervisoras.json");
  const supervisoes = await res.json();

  if (id) {
    const resCoord = await fetch("data/coordenadoras.json");
    const coordenacoes = await resCoord.json();
    renderDetalhe(id, supervisoes, coordenacoes, busca);
  } else {
    renderLista(supervisoes);
  }
});

function renderLista(supervisoes) {
  const grid = document.querySelector("#supervisoes-grid");
  if (!grid) return;

  const html = supervisoes.map(s => `
    <a href="supervisao.html?id=${s.id}" class="card">
      <div class="card-foto-wrapper">
        <img class="card-foto" src="${s.logo}" alt="${s.nome}">
        <img class="card-foto-mini" src="${s.supervisora_foto}" alt="${s.supervisora}">
      </div>
      <h3 class="card-titulo">${s.nome}</h3>
      <p class="card-subtitulo">${s.supervisora}</p>
    </a>
  `).join("");

  grid.insertAdjacentHTML("beforeend", html);
}

function renderDetalhe(id, supervisoes, coordenacoes, busca) {
  const supervisao = supervisoes.find(s => s.id === id);

  if (!supervisao) {
    document.querySelector("#conteudo").insertAdjacentHTML("beforeend", `<p class="erro">Supervisão não encontrada.</p>`);
    return;
  }

  document.title = `${supervisao.nome} | Feminina Voltz`;

  const coordenacoesDaSupervisao = coordenacoes.filter(c => c.supervisaoId === id);

  const coordenacoesHtml = coordenacoesDaSupervisao.map(c => `
    <a href="coordenacao.html?id=${c.id}" class="card">
      <div class="card-foto-wrapper">
        <img class="card-foto" src="${c.coordenacao_foto}" alt="${c.nome}">
        <img class="card-foto-mini" src="${c.coordenadora_foto}" alt="${c.coordenadora}">
      </div>
      <h3 class="card-titulo">${c.nome}</h3>
      <p class="card-subtitulo">${c.coordenadora}</p>
    </a>
  `).join("");

  const html = `
  <section class="detalhe-header">

    <div class="supervisora-info">
      <img class="supervisora-foto" src="${supervisao.supervisora_foto}" alt="${supervisao.supervisora}">
      <p>${supervisao.supervisora}</p>
    </div>

    <img class="detalhe-foto" src="${supervisao.logo}" alt="${supervisao.nome}">

    <div class="detalhe-informacoes">
      <h1>${supervisao.nome}</h1>

      <p class="detalhe-significado">
        <strong>Significado:</strong> ${supervisao.significado}
      </p>

      <p class="detalhe-simbolo">
        <strong>Símbolo:</strong> ${supervisao.simbolo}
      </p>

      <p class="detalhe-base">
        <strong>Base bíblica:</strong> ${supervisao.base_biblica}
      </p>

      <p class="detalhe-personagem">
        <strong>Personagem bíblica:</strong> ${supervisao.personagem_biblica}
      </p>
    </div>

  </section>

  <section class="coordenacoes-secao">
    <div class="container coordenacoes-grid">
      ${coordenacoesHtml}
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