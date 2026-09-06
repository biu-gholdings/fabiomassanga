(function () {
  document.documentElement.classList.remove("no-js");

  // iOS/mobile scroll hardening: keep the document itself as the only
  // vertical scroll container and remove body locking from the mobile menu.
  const scrollFixStyle = document.createElement("style");
  scrollFixStyle.setAttribute("data-scroll-fix", "ios-v2");
  scrollFixStyle.textContent = `
    html, body {
      min-height: 100%;
      height: auto !important;
      overflow-x: hidden !important;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: auto;
    }

    body {
      overflow-y: auto !important;
      touch-action: pan-y pinch-zoom;
    }

    .page, main, section, article {
      touch-action: pan-y pinch-zoom;
    }

    @media (max-width: 900px) {
      html, body {
        overflow-y: auto !important;
        height: auto !important;
        min-height: 100% !important;
      }

      body.menu-open {
        overflow-y: auto !important;
        position: static !important;
        height: auto !important;
      }

      body.menu-open::before {
        pointer-events: none !important;
      }

      .header {
        position: sticky !important;
        top: 0;
      }

      .page {
        padding-top: 0 !important;
        margin-left: 0 !important;
        height: auto !important;
        min-height: 0 !important;
        overflow: visible !important;
      }

      .sidebar {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }
    }
  `;
  document.head.appendChild(scrollFixStyle);

  const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const routes = {
    "/": "home",
    "/index.html": "home",
    "/biography": "biography",
    "/biography/index.html": "biography",
    "/articles": "articles",
    "/articles/index.html": "articles",
    "/media": "media",
    "/media/index.html": "media",
    "/images": "images",
    "/images/index.html": "images",
    "/cubecoin": "cubecoin",
    "/cubecoin/index.html": "cubecoin"
  };

  const baseRoute = routes[normalizedPath] || "home";

  function applyState() {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    const current = baseRoute === "home" && hash === "cubecoin" ? "cubecoin" : baseRoute;
    document.querySelectorAll("[data-nav]").forEach((item) => {
      const isActive = item.dataset.nav === current;
      item.classList.toggle("active", isActive);
      if (isActive) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
  }

  applyState();
  window.addEventListener("hashchange", applyState);

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  const menuToggle = document.querySelector(".mobile-menu");
  const sidebar = document.querySelector(".sidebar");

  function clearStaleMenuLock() {
    if (!sidebar || !sidebar.classList.contains("open")) {
      document.body.classList.remove("menu-open");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  clearStaleMenuLock();
  window.addEventListener("pageshow", clearStaleMenuLock);
  window.addEventListener("popstate", clearStaleMenuLock);

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
      link.addEventListener("click", closeMenu);
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

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }
})();
