# React + Vite + TypeScript Bootstrap

Minimal bootstrap repository with the following stack:

- Node.js v24 via `.nvmrc`
- React 19
- Vite 6
- TypeScript strict mode
- Biome (linter/formatter)
- Vitest (test + coverage)

## Requirements

- Node.js v24
- npm 10+

## Setup

1. Install and use Node.js v24:

	nvm use

2. Install dependencies:

	npm install

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - run typecheck and build production assets
- `npm run typecheck` - run strict TypeScript checks
- `npm run lint` - run Biome checks
- `npm run lint:fix` - run Biome auto-fixes
- `npm run test` - run Vitest in watch mode
- `npm run test:coverage` - run Vitest with coverage output

## Project Structure

- `src/` - application source files
- `vite.config.ts` - Vite and Vitest configuration
- `biome.json` - Biome formatter and linter configuration
- `tsconfig*.json` - strict TypeScript configuration