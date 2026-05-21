const section = document.querySelector<HTMLElement>("[data-results-grid]");
const values = Array.from(document.querySelectorAll<HTMLElement>("[data-count-value]"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const formatValue = (value: number) => new Intl.NumberFormat("en-MY", { maximumFractionDigits: 0 }).format(value);

const setFinalValues = () => {
  values.forEach((value) => {
    const target = Number(value.dataset.countTo ?? value.textContent ?? 0);
    value.textContent = formatValue(target);
  });
};

const animateValues = () => {
  const duration = 1200;
  const start = performance.now();

  values.forEach((value) => {
    value.textContent = "0";
  });

  const step = (timestamp: number) => {
    const progress = Math.min(1, (timestamp - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);

    values.forEach((value) => {
      const target = Number(value.dataset.countTo ?? 0);
      value.textContent = formatValue(Math.round(target * eased));
    });

    if (progress < 1) {
      window.requestAnimationFrame(step);
      return;
    }

    setFinalValues();
  };

  window.requestAnimationFrame(step);
};

if (section && values.length > 0) {
  if (reducedMotion.matches) {
    setFinalValues();
  } else {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        animateValues();
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
  }
}

export {};
