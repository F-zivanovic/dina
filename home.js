document.addEventListener("DOMContentLoaded", () => {
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
      // ease toward the real cursor position for a soft trailing feel
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;
      glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ---- Mark sections/cards for scroll-reveal ----
  const revealTargets = document.querySelectorAll(
    ".section-head, .service-card, .work-card, .process-quote, .process-step, .cta"
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

  // Stagger service cards and work cards within their grid
  const staggerGroups = [
    document.querySelectorAll(".services-grid .service-card"),
    document.querySelectorAll(".work-grid .work-card"),
    document.querySelectorAll(".process-steps .process-step"),
  ];

  staggerGroups.forEach((group) => {
    group.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });
});