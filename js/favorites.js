function renderFavorites() {
    const favoritesGrid = document.getElementById("favoritesGrid");

    if (!favoritesGrid) {
        return;
    }

    const favoriteGuides = getFavs()
        .map((id) => guides.find((guide) => guide.id === id))
        .filter(Boolean);

    favoritesGrid.innerHTML = favoriteGuides.length
        ? favoriteGuides.map((guide) => guideCard(guide)).join("")
        : `
            <div class="empty-state">
                <i class="bi bi-bookmark-heart"></i>
                <h3>No saved guides yet</h3>
                <p>
                    Bookmark a guide to build a helpful reading list
                    on this device.
                </p>
                <a href="guides.html" class="btn btn-primary">
                    Browse guides
                </a>
            </div>
        `;

    const recentSection = document.getElementById("recentSection");
    const recentGrid = document.getElementById("recentGrid");

    if (!recentSection || !recentGrid) {
        return;
    }

    const recentGuides = getStoredArray(RECENT_KEY)
        .map((id) => guides.find((guide) => guide.id === id))
        .filter(Boolean);

    if (recentGuides.length) {
        recentSection.classList.remove("d-none");
        recentGrid.innerHTML = recentGuides
            .map((guide) => guideCard(guide))
            .join("");
    } else {
        recentSection.classList.add("d-none");
        recentGrid.innerHTML = "";
    }
}

document.addEventListener("DOMContentLoaded", renderFavorites);

document.addEventListener("click", (event) => {
    if (event.target.closest("[data-favorite]")) {
        setTimeout(renderFavorites, 0);
    }
});
