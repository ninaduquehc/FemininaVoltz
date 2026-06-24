document.addEventListener("DOMContentLoaded", () => {

  const navbar = `
<header>
  <nav class="navbar navbar-expand-lg fixed-top py-3">
    <div class="container">

      <img class="navbar-logo" src="static/imagens/LOGO_VOLTZ.png" alt="Logo Feminina Voltz">

      <a class="navbar-brand" href="index.html">
        Feminina Voltz
      </a>

      <button class="navbar-toggler" type="button"
        data-bs-toggle="collapse"
        data-bs-target="#menu"
        aria-controls="menu"
        aria-expanded="false"
        aria-label="Abrir menu">

        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="menu">

        <form class="search-form ms-auto">
          
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
<footer class="footer text-center p-3 mt-5">

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

  <p class="copyright mb-0">
    © 2026 Lideranças Feminina Voltz
  </p>

</footer>
  `;

  document.body.insertAdjacentHTML("afterbegin", navbar);
  document.body.insertAdjacentHTML("beforeend", footer);

  // ✅ SEARCH TOGGLE (TEM QUE VIR AQUI EM BAIXO)
  const form = document.querySelector(".search-form");
  const btn = document.querySelector(".search-btn");

  if (form && btn) {
    btn.addEventListener("click", () => {
      form.classList.toggle("active");

      if (form.classList.contains("active")) {
        form.querySelector("input").focus();
      }
    });
  }

});