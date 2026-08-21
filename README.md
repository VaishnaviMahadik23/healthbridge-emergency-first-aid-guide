-------------------
# HealthBridge – Emergency First-Aid Information Guide

HealthBridge is a polished, responsive frontend website that helps users browse general first-aid guidance and emergency-preparedness information. It is designed as an educational information platform and clearly reminds users to contact qualified professionals or local emergency services in serious situations.

> Important: HealthBridge provides educational information only. It is not a substitute for professional medical advice, diagnosis, treatment, or emergency services.

## Features

- Responsive healthcare-inspired UI built with Bootstrap 5
- Searchable and filterable first-aid guide library
- Alphabetical sorting and search suggestions
- Detailed guide modal with steps, safety warnings, and related guides
- Interactive “What do you need help with?” decision flow
- Emergency preparedness checklist with progress tracking
- Favorite and recently viewed guide support
- Dark and light mode preference
- LocalStorage persistence for user preferences and saved content
- Accessible keyboard-friendly components and Bootstrap tooltips/toasts
- Dedicated emergency-information page with safety reminders

## Built With

- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript
- Bootstrap Icons
- LocalStorage

## Run Locally

1. Clone this repository.
2. Open the project folder.
3. Open `index.html` in a browser, or run a local static server.

Example local server command:

```bash
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Project Structure

```text
healthbridge/
├── index.html
├── guides.html
├── emergency.html
├── favorites.html
├── css/
│   └── style.css
└── js/
    ├── data.js
    ├── app.js
    ├── guides.js
    ├── favorites.js
    └── theme.js

```

## GitHub Upload Steps

```bash
git init
git add .
git commit -m "Initial commit: HealthBridge frontend"
git branch -M main
git remote add origin https://github.com/VaishnaviMahadik23/healthbridge-emergency-first-aid-guide.git
git push -u origin main
```

Suggested commit message for future changes
--------------------------------------------
- `feat: add guide search and category filtering`
- `feat: persist favorites and checklist progress`
- `style: improve responsive healthcare UI`
- `docs: update project README`

Portfolio one-line summary
--------------------------
Built a responsive emergency-preparedness and first-aid information platform using Bootstrap 5 and vanilla JavaScript, featuring dynamic content, search/filtering, theme preferences, and LocalStorage-powered user interactions.
