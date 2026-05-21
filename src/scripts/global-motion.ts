const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
const heroItems = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-item]"));

const enableHeroStagger = () => {
  heroItems.forEach((item, index) => {
    item.style.setProperty("--motion-delay", `${index * 60}ms`);
  });

  window.requestAnimationFrame(() => {
    heroItems.forEach((item) => item.classList.add("is-visible"));
  });
};

const enableReveals = () => {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );

  revealElements.forEach((element) => observer.observe(element));
};

const enableAnchorScroll = () => {
  document.addEventListener("click", (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");

    if (!link) return;

    const url = new URL(link.href, window.location.href);

    if (!url.hash || url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", url.hash);
  });
};

if (!reducedMotion.matches) {
  document.documentElement.dataset.motionReady = "true";
  enableHeroStagger();
  enableReveals();
  enableAnchorScroll();
}

export {};
