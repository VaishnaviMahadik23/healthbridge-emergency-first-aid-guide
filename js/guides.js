let activeCategory = "All";
let activeSearch = "";
let guideModal = null;

function renderGuides() {
    const guidesGrid = document.getElementById("guidesGrid");
    const resultsMeta = document.getElementById("resultsMeta");
    const sortSelect = document.getElementById("sortSelect");

    if (!guidesGrid || !resultsMeta || !sortSelect) {
        return;
    }

    const searchTerm = activeSearch.trim().toLowerCase();

    let filteredGuides = guides.filter((guide) => {
        const matchesCategory =
            activeCategory === "All" ||
            guide.category === activeCategory;

        const searchableText = `
            ${guide.title}
            ${guide.category}
            ${guide.description}
        `.toLowerCase();

        return matchesCategory && searchableText.includes(searchTerm);
    });

    if (sortSelect.value === "az") {
        filteredGuides = [...filteredGuides].sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    }

    resultsMeta.textContent =
        `${filteredGuides.length} guide${
            filteredGuides.length === 1 ? "" : "s"
        } found`;

    guidesGrid.innerHTML = filteredGuides.length
        ? filteredGuides.map((guide) => guideCard(guide)).join("")
        : `
            <div class="empty-state">
                <i class="bi bi-search-heart"></i>
                <h3>No guides match that search</h3>
                <p>Try a different term or clear your filters.</p>
                <button
                    class="btn btn-primary"
                    type="button"
                    id="emptyClearFilters"
                >
                    Clear filters
                </button>
            </div>
        `;

    document
        .getElementById("emptyClearFilters")
        ?.addEventListener("click", clearGuideFilters);
}

function clearGuideFilters() {
    activeCategory = "All";
    activeSearch = "";

    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");

    if (searchInput) {
        searchInput.value = "";
    }

    if (sortSelect) {
        sortSelect.value = "default";
    }

    document.querySelectorAll("[data-filter]").forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.filter === "All"
        );
    });

    renderGuides();
}

function saveRecentGuide(id) {
    const recent = getStoredArray(RECENT_KEY).filter(
        (recentId) => recentId !== id
    );

    localStorage.setItem(
        RECENT_KEY,
        JSON.stringify([id, ...recent].slice(0, 4))
    );
}

function openGuide(id, updateUrl = true) {
    const guide = guides.find((item) => item.id === id);

    if (!guide || !guideModal) {
        return;
    }

    saveRecentGuide(id);

    const modalTitle = document.getElementById("guideModalLabel");
    const guideDetail = document.getElementById("guideDetail");

    if (!modalTitle || !guideDetail) {
        return;
    }

    modalTitle.innerHTML = `
        <span class="guide-icon small-icon" aria-hidden="true">
            <i class="bi ${guide.icon}"></i>
        </span>
        ${guide.title}
    `;

    guideDetail.innerHTML = `
        <div class="detail-warning">
            <i class="bi bi-exclamation-triangle-fill"></i>

            <div>
                <strong>Important:</strong>
                This is general educational information, not a substitute
                for emergency services or professional medical care.
                If you believe there is a serious emergency, contact
                local emergency services now.
            </div>
        </div>

        <div class="detail-overview">
            <span class="badge-soft">${guide.category}</span>
            <p>${guide.overview}</p>
        </div>

        <h3>General steps</h3>

        <div class="timeline">
            ${guide.steps
                .map(
                    (step, index) => `
                        <div class="timeline-step">
                            <span>${index + 1}</span>
                            <p>${step}</p>
                        </div>
                    `
                )
                .join("")}
        </div>

        <div class="detail-grid">
            <section>
                <h3>
                    <i class="bi bi-x-octagon"></i>
                    What to avoid
                </h3>

                <ul>
                    ${guide.avoid
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                </ul>
            </section>

            <section class="urgent-box">
                <h3>
                    <i class="bi bi-telephone-plus"></i>
                    Seek urgent professional help if
                </h3>

                <ul>
                    ${guide.urgent
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                </ul>
            </section>
        </div>

        <div class="contact-reminder">
            <i class="bi bi-headset"></i>

            <div>
                <strong>Emergency contact reminder</strong>
                <br>
                Use your local emergency number or local
                poison-information service as appropriate.
                Follow their instructions.
            </div>
        </div>

        <h3 class="mt-4">Related guides</h3>

        <div class="related-list">
            ${guide.related
                .map((relatedId) => {
                    const relatedGuide = guides.find(
                        (item) => item.id === relatedId
                    );

                    if (!relatedGuide) {
                        return "";
                    }

                    return `
                        <button
                            type="button"
                            data-open-guide="${relatedGuide.id}"
                        >
                            <i class="bi ${relatedGuide.icon}"></i>
                            ${relatedGuide.title}
                            <i class="bi bi-arrow-right"></i>
                        </button>
                    `;
                })
                .join("")}
        </div>
    `;

    if (updateUrl) {
        history.replaceState(
            null,
            "",
            `?guide=${encodeURIComponent(id)}`
        );
    }

    guideModal.show();
}

function initializeGuidesPage() {
    const modalElement = document.getElementById("guideModal");

    if (!modalElement) {
        return;
    }

    guideModal = bootstrap.Modal.getOrCreateInstance(modalElement);

    const categoryFilters = document.getElementById("categoryFilters");
    const searchInput = document.getElementById("searchInput");
    const suggestions = document.getElementById("suggestions");
    const sortSelect = document.getElementById("sortSelect");
    const clearFiltersButton = document.getElementById("clearFilters");

    if (!categoryFilters || !searchInput || !suggestions || !sortSelect) {
        return;
    }

    const categories = [
        "All",
        ...new Set(guides.map((guide) => guide.category))
    ];

    categoryFilters.innerHTML = categories
        .map(
            (category) => `
                <button
                    class="filter-chip ${
                        category === "All" ? "active" : ""
                    }"
                    type="button"
                    data-filter="${category}"
                >
                    ${category}
                </button>
            `
        )
        .join("");

    categoryFilters.addEventListener("click", (event) => {
        const button = event.target.closest("[data-filter]");

        if (!button) {
            return;
        }

        activeCategory = button.dataset.filter;

        categoryFilters
            .querySelectorAll("[data-filter]")
            .forEach((filterButton) => {
                filterButton.classList.toggle(
                    "active",
                    filterButton === button
                );
            });

        renderGuides();
    });

    searchInput.addEventListener("input", () => {
        activeSearch = searchInput.value;

        const searchTerm = activeSearch.trim().toLowerCase();

        const matches = searchTerm
            ? guides
                  .filter((guide) =>
                      guide.title.toLowerCase().includes(searchTerm)
                  )
                  .slice(0, 4)
            : [];

        suggestions.innerHTML = matches
            .map(
                (guide) => `
                    <button
                        type="button"
                        data-open-guide="${guide.id}"
                        role="option"
                    >
                        <i class="bi ${guide.icon}"></i>
                        ${guide.title}
                    </button>
                `
            )
            .join("");

        suggestions.classList.toggle(
            "d-none",
            !searchTerm || !matches.length
        );

        renderGuides();
    });

    document.addEventListener("click", (event) => {
        const openButton = event.target.closest("[data-open-guide]");

        if (openButton) {
            suggestions.classList.add("d-none");
            openGuide(openButton.dataset.openGuide);
            return;
        }

        if (!event.target.closest(".search-wrap")) {
            suggestions.classList.add("d-none");
        }
    });

    sortSelect.addEventListener("change", renderGuides);
    clearFiltersButton?.addEventListener("click", clearGuideFilters);

    modalElement.addEventListener("hidden.bs.modal", () => {
        history.replaceState(null, "", window.location.pathname);
    });

    renderGuides();

    const initialGuide = new URLSearchParams(
        window.location.search
    ).get("guide");

    if (initialGuide) {
        setTimeout(() => openGuide(initialGuide, false), 150);
    }
}

document.addEventListener("DOMContentLoaded", initializeGuidesPage);
