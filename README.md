# Temperature Blanket

An app that creates a temperature blanket automatically from daily
temperatures: each day's temperature maps to a colour, and the app tracks the
year so you can see the blanket — and what's still missing — at a glance.

## Tech stack
- **Frontend:** Angular 19, TypeScript, Apollo Angular (GraphQL), Socket.IO
  client, RxJS
- **Backend:** Node.js + TypeScript, GraphQL schema with resolvers, a forecast
  datasource for weather data, MongoDB
- **Tooling:** GraphQL Code Generator (typed operations on both sides),
  Docker + nginx, ESLint, Prettier

## How it's put together
- `src/app/` — Angular app: weather service, socket-io service, and small,
  tested pipes/services for temperature classes, missing days, and year
  selection; Apollo and logger interceptors
- `backend/` — GraphQL schema (`schema.graphql`), resolvers, and the forecast
  datasource; generated types are checked in under `__generated__/`

## Running locally
```bash
npm install
npm start            # Angular dev server on http://localhost:4201
npm run generate     # regenerate GraphQL types after schema changes
# backend: see backend/ — or run the whole stack with docker compose
docker compose up --build
```

Unit specs cover the pipes, services, and interceptors (`*.spec.ts`).
