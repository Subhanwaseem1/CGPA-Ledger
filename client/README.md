# CGPA Ledger — Student CGPA Calculator

A Vue 3 + Vite single-page application for tracking semester GPA and overall CGPA.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

Sign in with any university email and a password of 4+ characters.

## Tech Stack

- Vue 3 (`<script setup>`, Composition API)
- Vite
- Vue Router 4

## Project Structure

```
src/
├── assets/styles/       Design tokens (variables.css) + global styles (main.css)
├── components/
│   ├── layout/          Navbar, Sidebar, Footer
│   ├── ui/              BaseButton, BaseInput, BaseSelect, BaseModal,
│   │                    ConfirmDialog, EmptyState, ToastNotification
│   ├── data/            DataTable, StatsCard, SummaryCard, ProgressCard, GPAChart
│   ├── semester/        SemesterCard, SemesterForm
│   └── course/          CourseCard, CourseForm, GradeSelector
├── composables/         useAcademicRecord, useAuth, useToast, useLocalStorage
├── data/                sampleData.js
├── layouts/             DefaultLayout, AuthLayout
├── router/              index.js
├── utils/               gradeScale.js, gpaFormulas.js, id.js
└── views/               DashboardView, SemestersView, SemesterDetailView,
                         WhatIfView, ProfileView, SettingsView, LoginView, NotFoundView
```

## Features

- Dashboard with CGPA, credit-hour, and course stats, SVG GPA trend chart, and semester overview
- Full CRUD for semesters and courses with modals and confirm dialogs
- What-If Planner for projecting future CGPA
- Route-based authentication with navigation guard
- Light/dark theme toggle
- Data persistence via localStorage with reset and clear options in Settings
