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

  // ---- Scroll reveal ----
  const revealTargets = document.querySelectorAll(
    ".story-row, .stat-card, .explore-card, .meta-card, .mockup-box"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));

  [document.querySelectorAll(".case-meta-row .meta-card"),
   document.querySelectorAll(".case-stats .stat-card"),
   document.querySelectorAll(".case-mockups .mockup-box"),
   document.querySelectorAll(".explore-grid .explore-card")].forEach((group) => {
    group.forEach((el, i) => { el.style.transitionDelay = `${i * 0.08}s`; });
  });
});