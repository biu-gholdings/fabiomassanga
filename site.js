(function () {
  const path = window.location.pathname.split("/").pop() || "index.html";

  const routes = {
    "index.html": "home",
    "biography.html": "biography",
    "media.html": "media",
    "images.html": "images"
  };

  const titles = {
    home: "Fábio G. Massanga",
    biography: "Biography",
    media: "Media",
    images: "Images",
    cubecoin: "CubeCoin"
  };

  const baseRoute = routes[path] || "home";

  function applyState() {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    const current = baseRoute === "home" && hash === "cubecoin" ? "cubecoin" : baseRoute;

    document.title = titles[current] || "Fábio G. Massanga";

    document.querySelectorAll("[data-nav]").forEach((item) => {
      const isActive = item.dataset.nav === current;
      item.classList.toggle("active", isActive);
      if (isActive) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
  }

  applyState();
  window.addEventListener("hashchange", applyState);

  const menuToggle = document.querySelector(".mobile-menu");
  const sidebar = document.querySelector(".sidebar");

  if (menuToggle && sidebar) {
    function closeMenu() {
      sidebar.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      sidebar.classList.add("open");
      document.body.classList.add("menu-open");
      menuToggle.setAttribute("aria-expanded", "true");
    }

    menuToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      if (sidebar.classList.contains("open")) closeMenu();
      else openMenu();
    });

    sidebar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    document.addEventListener("click", function (event) {
      if (!sidebar.classList.contains("open")) return;
      if (sidebar.contains(event.target) || menuToggle.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && sidebar.classList.contains("open")) closeMenu();
    });
  }
})();
