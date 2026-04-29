(function () {
  const path = window.location.pathname.split("/").pop() || "index.html";

  const routes = {
    "index.html": "home",
    "Biography.html": "biography",
    "Media.html": "media",
    "Images.html": "images"
  };

  const titles = {
    home: "Fábio G. Massanga",
    biography: "Biography — Fábio G. Massanga",
    media: "Media — Fábio G. Massanga",
    images: "Images — Fábio G. Massanga"
  };

  const current = routes[path] || "home";
  document.title = titles[current] || "Fábio G. Massanga";

  document.querySelectorAll("[data-nav]").forEach((item) => {
    item.classList.toggle("active", item.dataset.nav === current);
    if (item.dataset.nav === current) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
})();
