type FilterState = {
  q: string;
  category: string;
  duration: string;
  language: string;
  hrdOnly: boolean;
  view: "grouped" | "flat";
};

const root = document.querySelector<HTMLElement>("[data-programs-catalog]");

if (root) {
  const searchInput = root.querySelector<HTMLInputElement>("[data-program-search]");
  const categoryButtons = [...root.querySelectorAll<HTMLButtonElement>("[data-category-filter]")];
  const durationButtons = [...root.querySelectorAll<HTMLButtonElement>("[data-duration-filter]")];
  const languageButtons = [...root.querySelectorAll<HTMLButtonElement>("[data-language-filter]")];
  const viewButtons = [...root.querySelectorAll<HTMLButtonElement>("[data-view-mode]")];
  const hrdToggle = root.querySelector<HTMLInputElement>("[data-hrd-filter]");
  const cards = [...root.querySelectorAll<HTMLElement>("[data-program-card]")];
  const categoryGroups = [...root.querySelectorAll<HTMLElement>("[data-category-group]")];
  const groupedView = root.querySelector<HTMLElement>("[data-grouped-view]");
  const flatView = root.querySelector<HTMLElement>("[data-flat-view]");
  const emptyState = root.querySelector<HTMLElement>("[data-empty-state]");
  const resultsCount = root.querySelector<HTMLElement>("[data-results-count]");

  root.dataset.enhanced = "true";

  const initialParams = new URLSearchParams(window.location.search);
  const state: FilterState = {
    q: initialParams.get("q") ?? "",
    category: initialParams.get("category") ?? "all",
    duration: initialParams.get("duration") ?? "all",
    language: initialParams.get("language") ?? "all",
    hrdOnly: initialParams.get("hrdClaimable") === "true",
    view: initialParams.get("view") === "flat" ? "flat" : "grouped",
  };

  const setPressed = (buttons: HTMLButtonElement[], value: string) => {
    for (const button of buttons) {
      const isActive = button.value === value;
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.toggle("is-active", isActive);
    }
  };

  const syncUrl = () => {
    const params = new URLSearchParams();
    if (state.q) params.set("q", state.q);
    if (state.category !== "all") params.set("category", state.category);
    if (state.duration !== "all") params.set("duration", state.duration);
    if (state.language !== "all") params.set("language", state.language);
    if (state.hrdOnly) params.set("hrdClaimable", "true");
    if (state.view !== "grouped") params.set("view", state.view);

    const next = params.toString() ? `${window.location.pathname}?${params}` : window.location.pathname;
    window.history.replaceState({}, "", next);
  };

  const apply = () => {
    const query = state.q.trim().toLowerCase();
    const visibleIds = new Set<string>();

    for (const card of cards) {
      const matchesQuery = !query || (card.dataset.search ?? "").includes(query);
      const matchesCategory = state.category === "all" || card.dataset.category === state.category;
      const matchesDuration = state.duration === "all" || card.dataset.duration === state.duration;
      const matchesLanguage = state.language === "all" || card.dataset.language === state.language;
      const matchesHrd = !state.hrdOnly || card.dataset.hrd === "true";
      const isVisible = matchesQuery && matchesCategory && matchesDuration && matchesLanguage && matchesHrd;

      card.hidden = !isVisible;
      if (isVisible && card.dataset.courseId) visibleIds.add(card.dataset.courseId);
    }

    for (const group of categoryGroups) {
      const hasVisibleCard = [...group.querySelectorAll<HTMLElement>("[data-program-card]")].some(
        (card) => !card.hidden
      );
      group.hidden = !hasVisibleCard || state.view !== "grouped";
    }

    if (groupedView) groupedView.hidden = state.view !== "grouped";
    if (flatView) flatView.hidden = state.view !== "flat";
    if (emptyState) emptyState.hidden = visibleIds.size > 0;
    if (resultsCount) {
      const noun = visibleIds.size === 1 ? "course" : "courses";
      resultsCount.textContent = `${visibleIds.size} ${noun}`;
    }

    setPressed(categoryButtons, state.category);
    setPressed(durationButtons, state.duration);
    setPressed(languageButtons, state.language);
    setPressed(viewButtons, state.view);
    if (searchInput && searchInput.value !== state.q) searchInput.value = state.q;
    if (hrdToggle) hrdToggle.checked = state.hrdOnly;

    syncUrl();
  };

  searchInput?.addEventListener("input", () => {
    state.q = searchInput.value;
    apply();
  });

  for (const button of categoryButtons) {
    button.addEventListener("click", () => {
      state.category = button.value;
      apply();
    });
  }

  for (const button of durationButtons) {
    button.addEventListener("click", () => {
      state.duration = button.value;
      apply();
    });
  }

  for (const button of languageButtons) {
    button.addEventListener("click", () => {
      state.language = button.value;
      apply();
    });
  }

  for (const button of viewButtons) {
    button.addEventListener("click", () => {
      state.view = button.value === "flat" ? "flat" : "grouped";
      apply();
    });
  }

  hrdToggle?.addEventListener("change", () => {
    state.hrdOnly = hrdToggle.checked;
    apply();
  });

  apply();
}

export {};
