const section = document.querySelector<HTMLElement>("[data-testimonials]");
const track = section?.querySelector<HTMLElement>("[data-testimonial-track]");
const previous = section?.querySelector<HTMLButtonElement>("[data-testimonial-prev]");
const next = section?.querySelector<HTMLButtonElement>("[data-testimonial-next]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const scrollByCard = (direction: -1 | 1) => {
  if (!track) return;

  const card = track.querySelector<HTMLElement>(".testimonial-card");
  const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || "0");
  const distance = card ? card.offsetWidth + gap : track.clientWidth * 0.8;

  track.scrollBy({
    behavior: reducedMotion.matches ? "auto" : "smooth",
    left: distance * direction,
  });
};

if (section && track && previous && next) {
  previous.addEventListener("click", () => scrollByCard(-1));
  next.addEventListener("click", () => scrollByCard(1));
}

export {};
