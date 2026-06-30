document.addEventListener("DOMContentLoaded", () => {

  const navbar = `
<header>
  <nav class="navbar">
    <div class="container">

      <img class="navbar-logo" src="static/imagens/LOGO_VOLTZ.png" alt="Logo Feminina Voltz">

      <a class="navbar-brand" href="index.html">
        Feminina Voltz
      </a>

      <button class="navbar-toggler" type="button" aria-controls="menu" aria-expanded="false" aria-label="Abrir menu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-menu" id="menu">

        <ul class="navbar-nav">

          <li class="nav-item">
            <a class="nav-link" href="supervisoes.html">Supervisões</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="coordenacoes.html">Coordenações</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="legados.html">Legados</a>
          </li>

        </ul>

        <form class="search-form">
          <button type="button" class="search-btn">
            <i class="bi bi-search"></i>
          </button>
          <input class="search-input" type="search" placeholder="Pesquisar">
        </form>

      </div>

    </div>
  </nav>
</header>
  `;

  const footer = `
<footer class="footer">

  <section id="contato" class="container">

    <ul class="contato-lista">
      <li>
        <a href="https://www.youtube.com/@elevevoltz" target="_blank" class="social-item">
          <i class="bi bi-youtube"></i>
          <span>@elevevoltz</span>
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/elevevoltz/" target="_blank" class="social-item">
          <i class="bi bi-instagram"></i>
          <span>@elevevoltz</span>
        </a>
      </li>
    </ul>

  </section>

  <p class="copyright">© 2026 Lideranças Feminina Voltz</p>

</footer>
  `;

  document.body.insertAdjacentHTML("afterbegin", navbar);
  document.body.insertAdjacentHTML("beforeend", footer);

  // SEARCH TOGGLE
  const searchForm = document.querySelector(".search-form");
  const searchBtn = document.querySelector(".search-btn");

  if (searchForm && searchBtn) {
    searchBtn.addEventListener("click", () => {
      searchForm.classList.toggle("active");
      if (searchForm.classList.contains("active")) {
        searchForm.querySelector("input").focus();
      }
    });
  }

  // MENU MOBILE TOGGLE (substitui o data-bs-toggle do Bootstrap)
  const menuBtn = document.querySelector(".navbar-toggler");
  const menu = document.querySelector(".navbar-menu");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("show");
      menuBtn.setAttribute("aria-expanded", isOpen);
    });
  }

});