# LuckyDragon

LuckyDragon is a local-first personal finance tracker for recording received income, paid expenses, and planned money to receive or pay. It runs as a React web app during development and is packaged as a Windows desktop application with Electron.

## Current capabilities

- Password-gated startup with change-password UI
- Actual income and expense records with date, amount, counterparty, and notes
- Planned receivables and payables
- Planned-to-actual fulfillment with linked history and reactivation support
- Date-range and counterparty filters
- Income, expenditure, profit, expected balance, and net-position summaries
- Trend chart for actual transactions
- Local persistence through Electron JSON storage or browser `localStorage`
- Windows NSIS installer build

## Important limitations

- The password is currently stored in plaintext alongside finance data. It is a convenience gate, not strong protection against someone who can read local files or browser storage.
- There is no backend, cloud sync, multi-user access, or account recovery.
- `package-lock.json` is not synchronized with `package.json`; a clean `npm ci` is not yet a verified setup path. See [SETUP.md](SETUP.md) and `SETUP-001` in [the backlog](docs/TASK_BREAKDOWN.md).
- The checked-in installer is unsigned and should not be treated as release-ready.

## Quick start

Prerequisites: Windows for desktop packaging, Node.js 22.12 or newer, and npm. Node.js 24.16.0 and npm 11.13.0 were used during the 2026-09-02 planning audit.

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and use the initial password `123` for a new local data store.

Desktop development:

```bash
npm run electron:dev
```

Quality checks and installer build:

```bash
npm run lint
npm run build
npm run electron:build
```

The Windows installer is written to `release/`. That directory is generated and ignored by Git.

For the current lockfile caveat, storage locations, troubleshooting, and full setup instructions, read [SETUP.md](SETUP.md).

## Documentation

- [Project overview](docs/PROJECT_OVERVIEW.md)
- [Requirements and traceability](docs/REQUIREMENTS.md)
- [Current status](docs/CURRENT_STATUS.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Master plan](docs/MASTER_PLAN.md)
- [Milestones](docs/MILESTONES.md)
- [Engineering backlog](docs/TASK_BREAKDOWN.md)
- [PM dashboard](docs/PM_DASHBOARD.md)
- [Contributing workflow](CONTRIBUTING.md)

## Data and privacy

LuckyDragon sends no finance data to an application backend because none exists. The stylesheet currently requests the DM Sans font from Google Fonts when network access is available; the system font fallback is used otherwise. Desktop data is stored in `money-manager-data.json` inside Electron's per-user `userData` directory. Browser-development data is stored separately in the browser origin's `localStorage`.

Back up the desktop JSON data file before replacing an installation or testing data migrations. Formal backup/recovery behavior is still planned.

## Project state

The implemented browser workflow builds and was smoke-tested successfully during the planning audit. Automated tests, CI, secure credential storage, robust data migration/recovery, a reproducible clean install, packaged Electron smoke testing, and release signing remain open. The repository is prepared for planning and task assignment, but not yet for a production release.

