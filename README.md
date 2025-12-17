# Employee Management Dashboard

Live demo: https://employee-management-dashboard-with.vercel.app/

A lightweight React + Vite dashboard for viewing and managing employee data. This project demonstrates a small, component-driven UI built with Vite, React, and Ant Design, and includes a sample dataset in `src/data/employees.json`.

## Features

- List and search employees
- Component-based layout with a data table and drawer details
- Uses Ant Design for UI components

## Tech stack

- React 19
- Vite
- Ant Design

## Project structure (important files)

- `index.html` — app entry HTML
- `src/main.jsx` — React entry
- `src/App.jsx` — main app shell
- `src/components/ContentHeader.jsx` — header / controls
- `src/components/DataTable.jsx` — employee table and search
- `src/components/DrawerComponent.jsx` — details drawer
- `src/data/employees.json` — sample employee data

## Quick start

Prerequisites: Node.js (recommended >= 18) and npm.

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build locally

```bash
npm run preview
```

5. Lint the project

```bash
npm run lint
```

## Data

The app uses the sample dataset at `src/data/employees.json`. You can modify or replace this file to test with different data shapes.

## Development notes

- UI library: `antd` (Ant Design). Look in `src/components` for component implementations.
- Routing: this project is a single-page demo — add `react-router` if you need multiple views.
- State: simple local state is used; consider adding Context or a state library for larger apps.

## Contributing

Contributions and improvements are welcome. Please open issues or pull requests.

## License

This repository does not include a license by default. Add a `LICENSE` file if you intend to make this project open-source.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
