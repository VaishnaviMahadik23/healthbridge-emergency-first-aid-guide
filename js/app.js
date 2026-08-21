const FAVORITES_KEY = "hb-favorites";
const CHECKLIST_KEY = "hb-checklist";
const RECENT_KEY = "hb-recent";

function getFavs() {
    try {
        const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function setFavs(value) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(value));
}

function getStoredArray(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function toast(message) {
    const element = document.getElementById("appToast");

    if (!element) {
        return;
    }

    const messageElement = element.querySelector("span");

    if (messageElement) {
        messageElement.textContent = message;
    }

    bootstrap.Toast.getOrCreateInstance(element).show();
}

function guideCard(guide, compact = false) {
    if (!guide) {
        return "";
    }

    const isFavorite = getFavs().includes(guide.id);
    const columnClass = compact ? "col-md-6 col-lg-4" : "col-md-6 col-xl-4";
    const bookmarkIcon = isFavorite
        ? "bi-bookmark-heart-fill"
        : "bi-bookmark";

    return `
        <div class="${columnClass}">
            <article class="guide-card h-100">
                <div class="guide-card-top">
                    <span class="guide-icon" aria-hidden="true">
                        <i class="bi ${guide.icon}"></i>
                    </span>

                    <button
                        class="favorite-btn ${isFavorite ? "is-favorite" : ""}"
                        type="button"
                        data-favorite="${guide.id}"
                        aria-label="${isFavorite ? "Remove" : "Save"} ${guide.title}"
                        aria-pressed="${isFavorite}"
                    >
                        <i class="bi ${bookmarkIcon}"></i>
                    </button>
                </div>

                <span class="badge-soft">${guide.category}</span>

                <h3>${guide.title}</h3>

                <p>${guide.description}</p>

                <div class="guide-card-bottom">
                    <span class="urgency">
                        <i class="bi bi-circle-fill"></i>
                        ${guide.urgency}
                    </span>

                    <a
                        href="guides.html?guide=${guide.id}"
                        class="btn btn-sm btn-outline-primary"
                    >
                        View guide
                        <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </article>
        </div>
    `;
}

function renderChecklist() {
    const root = document.getElementById("checklist");

    if (!root || !Array.isArray(checklistItems)) {
        return;
    }

    const saved = getStoredArray(CHECKLIST_KEY)
        .map(Number)
        .filter((index) => Number.isInteger(index));

    root.innerHTML = checklistItems
        .map(
            (item, index) => `
                <label class="check-row">
                    <input
                        type="checkbox"
                        value="${index}"
                        ${saved.includes(index) ? "checked" : ""}
                    >
                    <span class="check-box" aria-hidden="true">
                        <i class="bi bi-check"></i>
                    </span>
                    <span>${item}</span>
                </label>
            `
        )
        .join("");

    updateChecklist();

    root.querySelectorAll('input[type="checkbox"]').forEach((input) => {
        input.addEventListener("change", () => {
            const checkedItems = [
                ...root.querySelectorAll('input[type="checkbox"]:checked')
            ].map((element) => Number(element.value));

            localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checkedItems));
            updateChecklist();
        });
    });
}

function updateChecklist() {
    const progressElement = document.getElementById("checklistProgress");

    if (!progressElement || !Array.isArray(checklistItems)) {
        return;
    }

    const checkedCount = document.querySelectorAll(
        '#checklist input[type="checkbox"]:checked'
    ).length;

    const total = checklistItems.length;
    const percentage = total
        ? Math.round((checkedCount / total) * 100)
        : 0;

    progressElement.innerHTML = `
        <div class="d-flex justify-content-between mb-2">
            <span>${checkedCount} of ${total} prepared</span>
            <strong>${percentage}% complete</strong>
        </div>

        <div
            class="progress"
            role="progressbar"
            aria-label="Emergency preparedness progress"
            aria-valuenow="${percentage}"
            aria-valuemin="0"
            aria-valuemax="100"
        >
            <div
                class="progress-bar"
                style="width: ${percentage}%"
            ></div>
        </div>
    `;
}

function initHelpFlow() {
    const root = document.getElementById("helpFlow");

    if (!root || !Array.isArray(guides)) {
        return;
    }

    const categories = [...new Set(guides.map((guide) => guide.category))];

    root.innerHTML = `
        <div class="flow-question">
            <span class="flow-number">1</span>

            <div>
                <h3>What situation are you looking for information about?</h3>

                <div class="flow-options">
                    ${categories
                        .map(
                            (category) => `
                                <button
                                    type="button"
                                    data-cat="${category}"
                                >
                                    ${category}
                                    <i class="bi bi-arrow-right"></i>
                                </button>
                            `
                        )
                        .join("")}
                </div>
            </div>
        </div>

        <div class="flow-question d-none" id="flowSituations"></div>
    `;

    root.querySelectorAll("[data-cat]").forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.cat;
            const categoryGuides = guides.filter(
                (guide) => guide.category === selectedCategory
            );

            const situations = document.getElementById("flowSituations");

            if (!situations) {
                return;
            }

            situations.classList.remove("d-none");

            situations.innerHTML = `
                <span class="flow-number">2</span>

                <div>
                    <h3>Choose a situation</h3>

                    <div class="flow-options">
                        ${categoryGuides
                            .map(
                                (guide) => `
                                    <a href="guides.html?guide=${guide.id}">
                                        <i class="bi ${guide.icon}"></i>
                                        ${guide.title}
                                        <i class="bi bi-arrow-right"></i>
                                    </a>
                                `
                            )
                            .join("")}
                    </div>
                </div>
            `;

            situations.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        });
    });
}

function renderHomeContent() {
    const quickAccess = document.getElementById("quickAccess");
    const featuredGuides = document.getElementById("featuredGuides");

    if (!quickAccess || !featuredGuides || !Array.isArray(guides)) {
        return;
    }

    quickAccess.innerHTML = guides
        .map(
            (guide) => `
                <div class="col-6 col-md-4 col-lg-3 col-xl">
                    <a
                        class="quick-card"
                        href="guides.html?guide=${guide.id}"
                    >
                        <i class="bi ${guide.icon}"></i>
                        <span>${guide.title}</span>
                        <i class="bi bi-arrow-up-right"></i>
                    </a>
                </div>
            `
        )
        .join("");

    featuredGuides.innerHTML = guides
        .slice(0, 3)
        .map((guide) => guideCard(guide, true))
        .join("");

    renderChecklist();
    initHelpFlow();

    document
        .getElementById("resetChecklist")
        ?.addEventListener("click", () => {
            localStorage.removeItem(CHECKLIST_KEY);
            renderChecklist();
            toast("Checklist reset.");
        });
}

function initializeGlobalUI() {
    document
        .querySelectorAll('[data-bs-toggle="tooltip"]')
        .forEach((element) => {
            bootstrap.Tooltip.getOrCreateInstance(element);
        });

    const scrollTopButton = document.getElementById("scrollTop");

    scrollTopButton?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", () => {
        scrollTopButton?.classList.toggle("show", window.scrollY > 500);
    });

    document.addEventListener("click", (event) => {
        const favoriteButton = event.target.closest("[data-favorite]");

        if (!favoriteButton) {
            return;
        }

        const id = favoriteButton.dataset.favorite;
        const favorites = getFavs();

        const nextFavorites = favorites.includes(id)
            ? favorites.filter((favoriteId) => favoriteId !== id)
            : [...favorites, id];

        setFavs(nextFavorites);

        document
            .querySelectorAll(`[data-favorite="${id}"]`)
            .forEach((button) => {
                const isFavorite = nextFavorites.includes(id);

                button.classList.toggle("is-favorite", isFavorite);
                button.setAttribute("aria-pressed", String(isFavorite));
                button.setAttribute(
                    "aria-label",
                    `${isFavorite ? "Remove" : "Save"} ${
                        guides.find((guide) => guide.id === id)?.title || "guide"
                    }`
                );

                const icon = button.querySelector("i");

                if (icon) {
                    icon.className = `bi ${
                        isFavorite
                            ? "bi-bookmark-heart-fill"
                            : "bi-bookmark"
                    }`;
                }
            });

        toast(
            nextFavorites.includes(id)
                ? "Guide saved to your favorites."
                : "Guide removed from your favorites."
        );
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeGlobalUI();

    if (document.body.dataset.page === "home") {
        renderHomeContent();
    }
});
