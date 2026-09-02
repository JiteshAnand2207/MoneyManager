# LuckyDragon Setup

## Supported development environment

- Windows is required to produce the current NSIS installer target.
- Node.js 22.12 or newer is required by the dependency set found in the current lockfile; Node.js 24.16.0 was used for the planning audit.
- npm 11.13.0 was used for the planning audit.

No application environment variables are currently read, so no `.env.example` is provided. If configuration is introduced, add only documented non-secret placeholders and keep real `.env*` files ignored.

## Known dependency issue

`package.json` reports application version `1.0.0`, while the lockfile root reports `0.0.0`. The lockfile also resolves `concurrently`, `electron`, and `uuid` outside the ranges declared in `package.json`. The existing installed dependency tree therefore reports `ELSPROBLEMS`.

Until `SETUP-001` is completed, a clean `npm ci` is not a supported/reproducible setup path. Do not regenerate or commit the lockfile incidentally in an unrelated task. The assigned developer should decide whether the manifest or lockfile versions are authoritative, synchronize them in one PR, and prove the result from a clean checkout.

## Install and run

After `SETUP-001` is merged, the canonical install command is:

```bash
npm ci
```

For the current unsynchronized checkout only, `npm install` can reconcile local dependencies but will change `package-lock.json`; make that change only on the `SETUP-001` branch.

Browser development:

```bash
npm run dev
```

Open `http://localhost:5173`. A new data store uses password `123`.

Electron development:

```bash
npm run electron:dev
```

The script runs Vite on port 5173, waits for it to respond, and launches Electron with developer tools.

## Checks

```bash
npm run lint
npm run build
```

At the planning baseline both commands pass. Lint emits five warnings: two Fast Refresh export warnings and three hook-dependency warnings in `TransactionBoard.tsx`.

There is no automated test command yet. `QA-001` adds the test harness.

## Build the Windows installer

```bash
npm run electron:build
```

Output is generated under `release/` and must not be committed. The existing inspected installer was not digitally signed. Packaging and installer execution still require release-candidate verification.

## Local data

- Electron: `money-manager-data.json` under Electron's per-user `userData` directory.
- Browser development: the `money-manager-data` key in `localStorage` for the development origin.

Browser and Electron stores are separate. The JSON shape contains `password`, `transactions`, `debts`, and `debtPayments`. The debt arrays currently have no connected UI and must not be treated as a committed product requirement without PM confirmation.

Back up the desktop JSON file before migration work. Current writes are synchronous and non-atomic; malformed data falls back to defaults in some paths without a user-visible recovery message.

## Troubleshooting

- If port 5173 is busy, stop the conflicting process; Electron development currently expects that exact port.
- If the UI remains on “Loading LuckyDragon…”, inspect data-load errors and the JSON file. The current app does not surface all load failures.
- If dependencies are marked invalid, compare `package.json`, the lockfile root, and `npm ls --depth=0`; resolve only through `SETUP-001`.
- If the font is unavailable offline, the app falls back to system fonts because DM Sans is currently loaded from Google Fonts.

