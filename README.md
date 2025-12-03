# Minticity Mini User Dashboard

Mini case study for a user management dashboard built with Next.js 16 (App Router), TypeScript, and TailwindCSS. Data is provided by [JSONPlaceholder `/users`](https://jsonplaceholder.typicode.com/users); create/delete operations are simulated on the frontend.

## Working methodology

1. **Planning via GitHub Issues** – Case scope was broken down into small issues (setup, API client, list, detail, create, delete, search, pagination, shared form). Each issue mapped to a dedicated branch (e.g., `feature/03-users-list`).
2. **Terminal-first workflow** – Branching and issue creation were driven through CLI (`gh issue create ...`, `git checkout -b feature/...`). Every branch went through lint/type-check before being merged via PR.
3. **Mocked CRUD behaviour** – Create/delete actions mutate cookie-backed storage, ensuring the UI reflects changes instantly while respecting the case requirement of “front-end simulation”.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript + TailwindCSS v4
- Native `fetch` for API calls, server actions for form submits
- Bun as the package manager/runtime

## Getting Started

```bash
bun install
bun dev
```

## Useful scripts

- `bun run lint`
- `bun run format`
- `bun run type-check`

## Features implemented

- User list with “Details”, “Delete”, and “New User” actions
- Detail view reuses the create form UI with populated fields
- Add new user form with validation (server action) + mock POST
- Delete action with optimistic feedback, applies to local + remote users
- Client-side search (name/username/email) and pagination

NEW user/silme entries live only inside browser cookies; clearing site data resets them to the base JSONPlaceholder dataset.
