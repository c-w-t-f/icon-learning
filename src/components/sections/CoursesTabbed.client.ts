const section = document.querySelector<HTMLElement>("[data-courses-tabbed]");
const labels = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-course-label]"));
const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-course-panel]"));
const desktopTabs = window.matchMedia("(min-width: 1024px)");
let wheelDelta = 0;
let wheelLocked = false;

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

const setActiveByIndex = (index: number, focus = false) => {
  const nextLabel = labels[index];
  const targetId = nextLabel?.dataset.target;

  if (!targetId) return;

  setActive(targetId);

  if (focus) {
    nextLabel.focus();
  }
};

if (section && labels.length > 0 && panels.length > 0) {
  section.dataset.enhanced = "true";
  setActive(panels[0].id);

  labels.forEach((label) => {
    label.addEventListener("click", () => {
      const targetId = label.dataset.target;
      const target = targetId ? document.getElementById(targetId) : null;

      if (!target) return;

      setActive(target.id);
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
      setActiveByIndex(nextIndex, true);
    });
  });

  section.addEventListener(
    "wheel",
    (event) => {
      if (!desktopTabs.matches || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("a, button, input, select, textarea, summary")) return;

      const currentIndex = activeIndex();
      if (currentIndex < 0) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;
      const canMove = nextIndex >= 0 && nextIndex < labels.length;

      if (!canMove) return;

      event.preventDefault();
      wheelDelta += event.deltaY;

      if (wheelLocked || Math.abs(wheelDelta) < 48) return;

      setActiveByIndex(nextIndex);
      wheelDelta = 0;
      wheelLocked = true;
      window.setTimeout(() => {
        wheelLocked = false;
      }, 260);
    },
    { passive: false }
  );
}

export {};
