document.addEventListener("DOMContentLoaded", () => {
  const navbar = `
  <header>
    <nav class="navbar navbar-expand-lg fixed-top py-3">
      <div class="container">
        <a class="navbar-brand" href="index.html">Feminina Voltz</a>

        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="menu">

          <form class="d-flex ms-auto" role="search">
            <input
              id="campoPesquisa"
              class="form-control"
              type="search"
              placeholder="Pesquisa">
          </form>

        </div>

      </div>
    </nav>
  </header>
  `;

  const footer = `
  <footer class="text-center p-3 mt-5">
    <section id="contato" class="container section">

      <ul class="contato-lista">

        <a href="#" class="social-item">

            <i class="bi bi-youtube"></i>
            <span>@elevevoltz</span>

        </a>

        <a href="#" class="social-item">

            <i class="bi bi-instagram"></i>
            <span>@elevevoltz</span>

        </a>

      </ul>

    </section>

    <p class="mb-0">
      © 2026 - Lideranças Feminina Voltz
    </p>
  </footer>
  `;

  document.body.insertAdjacentHTML("afterbegin", navbar);
  document.body.insertAdjacentHTML("beforeend", footer);
});
