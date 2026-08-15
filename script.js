document.addEventListener("DOMContentLoaded", () => {
  // ---- Mobile nav toggle (full-screen overlay) ----
  const navToggle = document.getElementById("navToggle");
  const mobileMenuClose = document.getElementById("mobileMenuClose");
  const mobileMenu = document.getElementById("mobileMenu");

  const openMenu = () => {
    mobileMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", openMenu);
    mobileMenuClose?.addEventListener("click", closeMenu);
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  // ---- Cursor-following gradient glow ----
  const glow = document.getElementById("cursorGlow");
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (glow && supportsHover && !reducedMotion) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let active = false;

    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        active = true;
        glow.classList.add("is-active");
      }
    });

    document.addEventListener("mouseleave", () => {
      active = false;
      glow.classList.remove("is-active");
    });

    function tick() {
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;
      glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const pills = document.querySelectorAll(".filter-pill");
  const cards = document.querySelectorAll(".card");
  const emptyState = document.getElementById("emptyState");

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      // update active state
      pills.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");

      const filter = pill.dataset.filter;
      let visibleCount = 0;

      cards.forEach((card) => {
        const categories = card.dataset.categories.split(" ");
        const matches = filter === "all" || categories.includes(filter);

        card.classList.toggle("is-hidden", !matches);

        if (matches) {
          visibleCount++;
          // restart the reveal animation
          card.style.animation = "none";
          // eslint-disable-next-line no-unused-expressions
          card.offsetHeight; // force reflow
          card.style.animation = "";
        }
      });

      emptyState.hidden = visibleCount !== 0;
    });
  });
});