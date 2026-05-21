const section = document.querySelector<HTMLElement>("[data-courses-tabbed]");
const labels = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-course-label]"));
const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-course-panel]"));
const desktopTabs = window.matchMedia("(min-width: 1024px)");

const setActive = (id: string) => {
  labels.forEach((label) => {
    const active = label.dataset.target === id;
    label.classList.toggle("is-active", active);
    label.setAttribute("aria-current", active ? "true" : "false");
    label.setAttribute("aria-selected", active ? "true" : "false");
  });

  panels.forEach((panel) => {
    panel.toggleAttribute("hidden", panel.id !== id);
  });
};

const activeIndex = () => labels.findIndex((label) => label.classList.contains("is-active"));

const setActiveByIndex = (index: number, focus = false, syncScroll = false) => {
  const nextLabel = labels[index];
  const targetId = nextLabel?.dataset.target;

  if (!targetId) return;

  setActive(targetId);

  if (focus) {
    nextLabel.focus();
  }

  if (syncScroll && desktopTabs.matches && section && section.dataset.enhanced) {
    const rect = section.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const maxScroll = rect.height - window.innerHeight;
    const targetScroll = absoluteTop + (maxScroll / labels.length) * index + 10;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }
};

const onScroll = () => {
  if (!section || !desktopTabs.matches || !section.dataset.enhanced) return;

  const rect = section.getBoundingClientRect();
  const maxScroll = rect.height - window.innerHeight;

  if (maxScroll <= 0) return;

  let progress = -rect.top / maxScroll;
  progress = Math.max(0, Math.min(1, progress));

  let index = Math.floor(progress * labels.length);
  if (index >= labels.length) index = labels.length - 1;

  if (activeIndex() !== index) {
    setActiveByIndex(index, false, false);
  }
};

if (section && labels.length > 0 && panels.length > 0) {
  section.dataset.enhanced = "true";
  setActive(panels[0].id);

  labels.forEach((label) => {
    label.addEventListener("click", () => {
      const index = labels.indexOf(label);
      if (index >= 0) {
        setActiveByIndex(index, false, true);
      }
    });

    label.addEventListener("keydown", (event) => {
      const currentIndex = labels.indexOf(label);
      const lastIndex = labels.length - 1;
      const nextIndex =
        event.key === "ArrowRight" || event.key === "ArrowDown"
          ? (currentIndex + 1) % labels.length
          : event.key === "ArrowLeft" || event.key === "ArrowUp"
            ? (currentIndex - 1 + labels.length) % labels.length
            : event.key === "Home"
              ? 0
              : event.key === "End"
                ? lastIndex
                : -1;

      if (nextIndex < 0) return;

      event.preventDefault();
      setActiveByIndex(nextIndex, true, true);
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  
  // Initial check in case it loaded scrolled down
  onScroll();
}

export {};
