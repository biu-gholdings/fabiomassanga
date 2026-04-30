(function () {
  const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";

  const routes = {
    "/": "home",
    "/index.html": "home",
    "/biography": "biography",
    "/biography/index.html": "biography",
    "/media": "media",
    "/media/index.html": "media",
    "/images": "images",
    "/images/index.html": "images",
    "/cubecoin": "cubecoin",
    "/cubecoin/index.html": "cubecoin"
  };

  const titles = {
    home: "Fábio G. Massanga",
    biography: "Biography",
    media: "Media",
    images: "Images",
    cubecoin: "CubeCoin"
  };

  const baseRoute = routes[normalizedPath] || "home";

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

  const lightningCanvas = document.querySelector(".coin-lightning");
  const lightningRing = document.querySelector(".coin-hero-ring");

  if (lightningCanvas && lightningRing) {
    const ctx = lightningCanvas.getContext("2d");
    const bolts = [];
    const DPR = window.devicePixelRatio || 1;
    const degToRad = Math.PI / 180;

    function resizeCanvas() {
      const rect = lightningCanvas.getBoundingClientRect();
      lightningCanvas.width = Math.floor(rect.width * DPR);
      lightningCanvas.height = Math.floor(rect.height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function ringCenterInCanvas() {
      const canvasRect = lightningCanvas.getBoundingClientRect();
      const ringRect = lightningRing.getBoundingClientRect();
      return {
        x: ringRect.left - canvasRect.left + ringRect.width / 2,
        y: ringRect.top - canvasRect.top + ringRect.height / 2
      };
    }

    function randomDirection() {
      const map = [
        -170, -155, -140, -115, -95, -75, -55, -35,
        -10, 12, 28, 45, 62, 80
      ];
      const base = map[Math.floor(Math.random() * map.length)];
      return base * degToRad + (Math.random() * 0.2 - 0.1);
    }

    function spawnBolt() {
      const start = ringCenterInCanvas();
      const segments = 5 + Math.floor(Math.random() * 6);
      const step = 12 + Math.random() * 18;
      const points = [{ x: start.x, y: start.y }];
      let angle = randomDirection();
      let x = start.x;
      let y = start.y;

      for (let i = 0; i < segments; i++) {
        angle += (Math.random() - 0.5) * 0.6;
        x += Math.cos(angle) * step;
        y += Math.sin(angle) * step;
        points.push({ x, y });
      }

      const branches = [];
      const branchCount = Math.random() > 0.45 ? 1 : 2;
      for (let b = 0; b < branchCount; b++) {
        const basePoint = points[2 + Math.floor(Math.random() * Math.max(1, points.length - 3))];
        const bPoints = [{ x: basePoint.x, y: basePoint.y }];
        let bAngle = angle + (Math.random() > 0.5 ? -1 : 1) * (0.45 + Math.random() * 0.65);
        let bx = basePoint.x;
        let by = basePoint.y;
        const bSegments = 2 + Math.floor(Math.random() * 3);
        const bStep = step * 0.65;
        for (let i = 0; i < bSegments; i++) {
          bAngle += (Math.random() - 0.5) * 0.7;
          bx += Math.cos(bAngle) * bStep;
          by += Math.sin(bAngle) * bStep;
          bPoints.push({ x: bx, y: by });
        }
        branches.push(bPoints);
      }

      bolts.push({
        points,
        branches,
        life: 5 + Math.floor(Math.random() * 6),
        age: 0,
        width: 1.2 + Math.random() * 1.1
      });
    }

    function drawPath(path, alpha, width) {
      if (path.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
      ctx.strokeStyle = `rgba(255,210,60,${alpha})`;
      ctx.lineWidth = width;
      ctx.shadowColor = "rgba(255,210,60,0.95)";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    function tick() {
      ctx.clearRect(0, 0, lightningCanvas.width, lightningCanvas.height);

      if (Math.random() < 0.6) spawnBolt();
      if (Math.random() < 0.28) spawnBolt();

      for (let i = bolts.length - 1; i >= 0; i--) {
        const bolt = bolts[i];
        bolt.age += 1;
        const t = bolt.age / bolt.life;
        const alpha = Math.max(0, (1 - t) * (0.75 + Math.random() * 0.2));
        drawPath(bolt.points, alpha, bolt.width);
        bolt.branches.forEach((branch) => drawPath(branch, alpha * 0.85, Math.max(0.8, bolt.width - 0.35)));
        if (bolt.age >= bolt.life) bolts.splice(i, 1);
      }

      requestAnimationFrame(tick);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    requestAnimationFrame(tick);
  }
})();
