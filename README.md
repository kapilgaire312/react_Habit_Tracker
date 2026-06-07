# React Habit Tracker

A lightweight habit-tracking single-page app built with React and Vite. Tracks weekly habit completions, lets users add/edit habits, and persists data in the browser using Local Storage. Designed as a simple, zero-backend demo app.

Demo / Homepage: https://kapilgaire312.github.io/react_Habit_Tracker/

**Tech stack:** React, Vite, Tailwind CSS, React Router, LocalStorage

## Features
- Local authentication (signup/login) stored in `localStorage` (no backend)
- Add, edit, and remove habits with weekly goals
- Mark daily completions on a 7-day week view
- Week navigation (previous / next week) and per-week aggregation
- Persistent user-specific habit data using `localStorage`

## Quick Start

Prerequisites: Node.js (16+ recommended) and npm

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```


## Project structure (important files)

- `index.html` — app entry HTML
- `src/main.jsx` — React entry and router setup
- `src/App.jsx` — top-level app, routes, and state for users/habits
- `src/pages/` — views: `Home.jsx`, `Dashboard.jsx`, `MyHabits.jsx`, `AddHabits.jsx`, `LoginPage.jsx`, `SignUp.jsx`
- `src/Components/` — reusable UI: `NavBar.jsx`, `Login.jsx`
- `src/Hooks/useWeekDates.js` — custom hook returning the week's dates
- `src/utils/date.js` — date helpers used across the app
- `tailwind.config.js`, `postcss.config.js` — Tailwind setup

## How data is stored
- Users and habits are persisted in the browser `localStorage` under keys like `users`, `currentUser`, and `userHabits_<emailPrefix>`.


## Notes & Known limitations
- No backend or authentication beyond `localStorage` — not secure for real user data.
- Dates and month boundaries are handled in the frontend; edge cases may exist around month/year transitions.
