# Component Architecture Tree

```
App
├── RouterView
│   ├── AuthLayout                     (route: /login)
│   │   └── RouterView
│   │       └── LoginView
│   │           ├── BaseInput  (x2)
│   │           └── BaseButton
│   │
│   └── DefaultLayout                  (route: / — requiresAuth guard)
│       ├── Sidebar
│       │   └── RouterLink (x5 nav items)
│       ├── Navbar
│       │   └── (reads useAcademicRecord, useAuth)
│       ├── RouterView
│       │   ├── DashboardView
│       │   │   ├── StatsCard (x4)
│       │   │   ├── GPAChart
│       │   │   ├── ProgressCard
│       │   │   ├── SummaryCard (xN, wrapped in RouterLink)
│       │   │   ├── DataTable
│       │   │   └── EmptyState
│       │   │
│       │   ├── SemestersView
│       │   │   ├── SemesterCard (xN)
│       │   │   ├── BaseModal → SemesterForm → BaseInput, BaseSelect, BaseButton
│       │   │   ├── ConfirmDialog → BaseModal, BaseButton
│       │   │   └── EmptyState
│       │   │
│       │   ├── SemesterDetailView
│       │   │   ├── StatsCard (x3)
│       │   │   ├── CourseCard (xN)
│       │   │   ├── BaseModal → CourseForm → BaseInput, GradeSelector, BaseButton
│       │   │   ├── ConfirmDialog
│       │   │   └── EmptyState
│       │   │
│       │   ├── WhatIfView
│       │   │   ├── BaseInput (x3)
│       │   │   ├── StatsCard (x3)
│       │   │   └── ProgressCard
│       │   │
│       │   ├── ProfileView
│       │   │   ├── BaseInput (x6)
│       │   │   └── BaseButton
│       │   │
│       │   └── SettingsView
│       │       ├── ConfirmDialog
│       │       └── BaseButton (x2)
│       │
│       └── Footer
│
└── ToastNotification                  (mounted once at App root, global singleton)
```

## Shared / cross-cutting components

Used across multiple views above:

- `BaseButton`, `BaseInput`, `BaseSelect`, `BaseModal`, `ConfirmDialog`, `EmptyState`, `ToastNotification`
- `StatsCard`, `SummaryCard`, `ProgressCard`, `GPAChart`, `DataTable`
- `SemesterCard`, `SemesterForm`, `CourseCard`, `CourseForm`, `GradeSelector`

## State & composables (not part of the visual tree, but consumed throughout)

- `useAcademicRecord` — single source of truth for semesters/courses/profile
- `useAuth` — simulated authentication state, read by the router guard
- `useToast` — global toast notification bus
- `useLocalStorage` — generic persistence helper used by the store
