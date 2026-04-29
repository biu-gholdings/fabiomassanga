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
})();
