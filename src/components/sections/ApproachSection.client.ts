const decks = Array.from(document.querySelectorAll<HTMLElement>("[data-approach-flip]"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktop = window.matchMedia("(min-width: 1024px)");

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
const pageHold = 0.58;

let ticking = false;
let active = decks.length > 0;

const resetDeck = (deck: HTMLElement) => {
  const pages = Array.from(deck.querySelectorAll<HTMLElement>("[data-approach-page]"));

  pages.forEach((page, index) => {
    page.classList.toggle("is-active", index === 0);
    page.style.removeProperty("--approach-opacity");
    page.style.removeProperty("--approach-rotate");
    page.style.removeProperty("--approach-scale");
    page.style.removeProperty("--approach-y");
    page.style.removeProperty("--approach-z");
    page.style.removeProperty("--approach-fold-shadow");
  });
};

const updateDeck = (deck: HTMLElement) => {
  const track = deck.querySelector<HTMLElement>("[data-approach-track]");
  const pin = deck.querySelector<HTMLElement>("[data-approach-pin]");
  const pages = Array.from(deck.querySelectorAll<HTMLElement>("[data-approach-page]"));

  if (!track || !pin || pages.length === 0) return;

  if (reducedMotion.matches || !desktop.matches) {
    resetDeck(deck);
    return;
  }

  const trackRect = track.getBoundingClientRect();
  const pinTop = parseFloat(window.getComputedStyle(pin).top) || 0;
  const travel = Math.max(1, track.offsetHeight - pin.offsetHeight);
  const scrollProgress = clamp((pinTop - trackRect.top) / travel, 0, 1);
  const rawProgress = scrollProgress * (pages.length - 1);
  const currentIndex = clamp(Math.floor(rawProgress), 0, pages.length - 1);
  const segmentProgress = currentIndex === pages.length - 1 ? 0 : rawProgress - currentIndex;
  const turnProgress = segmentProgress <= pageHold ? 0 : clamp((segmentProgress - pageHold) / (1 - pageHold), 0, 1);
  const easedTurn = easeOut(turnProgress);
  const revealProgress = clamp((turnProgress - 0.34) / 0.66, 0, 1);
  const easedReveal = easeOut(revealProgress);
  const activeIndex = turnProgress > 0.72 ? Math.min(currentIndex + 1, pages.length - 1) : currentIndex;

  pages.forEach((page, index) => {
    let opacity = 0;
    let rotate = 10;
    let scale = 0.96;
    let y = 36;
    let z = -16 - index;
    let foldShadow = 0;

    if (index < currentIndex) {
      rotate = -84;
      scale = 0.9;
      y = -52;
      z = -24;
    } else if (index === currentIndex) {
      opacity = clamp(1 - easedTurn * 0.92, 0, 1);
      rotate = -84 * easedTurn;
      scale = 1 - easedTurn * 0.04;
      y = -44 * easedTurn;
      z = 48 - easedTurn * 72;
      foldShadow = easedTurn * 0.65;
    } else if (index === currentIndex + 1) {
      opacity = easedReveal;
      rotate = 9 * (1 - easedReveal);
      scale = 0.96 + easedReveal * 0.04;
      y = 34 * (1 - easedReveal);
      z = 10 + easedReveal * 34;
      foldShadow = (1 - easedReveal) * 0.14;
    }

    page.classList.toggle("is-active", index === activeIndex);
    page.style.setProperty("--approach-opacity", opacity.toFixed(3));
    page.style.setProperty("--approach-rotate", `${rotate.toFixed(2)}deg`);
    page.style.setProperty("--approach-scale", scale.toFixed(3));
    page.style.setProperty("--approach-y", `${y.toFixed(2)}px`);
    page.style.setProperty("--approach-z", `${z.toFixed(2)}px`);
    page.style.setProperty("--approach-fold-shadow", foldShadow.toFixed(3));
  });
};

const update = () => {
  ticking = false;

  if (!active) return;

  decks.forEach(updateDeck);
};

const requestUpdate = () => {
  if (!ticking) {
    ticking = true;
    window.requestAnimationFrame(update);
  }
};

if (decks.length > 0) {
  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          active = entries.some((entry) => entry.isIntersecting);
          requestUpdate();
        })
      : undefined;

  decks.forEach((deck) => {
    updateDeck(deck);
    deck.dataset.approachReady = "true";
    observer?.observe(deck);
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  reducedMotion.addEventListener("change", requestUpdate);
  desktop.addEventListener("change", requestUpdate);
  requestUpdate();
}

export {};
