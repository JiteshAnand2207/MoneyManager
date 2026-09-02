# LuckyDragon Project Overview

## Product in one paragraph

LuckyDragon is a single-user, local-first personal finance desktop application. It helps an individual record money already received or paid, track money expected to be received or paid, turn a planned record into a linked actual record, and view totals and time-based trends. The product has no server account, remote database, sync, sharing, or third-party finance integration.

## Intended user and problem

The only supported user profile in the available source material is an individual managing finances on one machine. The app addresses a lightweight tracking problem: keep actual and expected cash movements together, see who the counterparty is, understand current and expected net position, and review recent trends without configuring a hosted service.

## Main workflows

1. Launch the app and unlock a local data store with a password.
2. View actual income, expenditure, profit, expected receivables/payables, and net position.
3. Add a received-income or paid-expense record with date, amount, counterparty, and notes.
4. Filter transaction lists by date and counterparty; open details; delete eligible manual records.
5. Add a planned receivable or payable.
6. Mark a planned record received/paid. LuckyDragon preserves the planned history and creates a protected linked actual record.
7. Reactivate a processed planned record to remove the linked actual record and return it to pending status.
8. Change the local password or sign out.

## Confirmed functional scope

- Password gate and password change
- Actual deposits/income and withdrawals/outcomes
- Planned receivables and payables
- Linked planned-to-actual processing and reactivation
- Transaction details, deletion protections, date filtering, and counterparty filtering
- Totals for actual and planned records
- Date-based income, expenditure, and profit chart
- Electron JSON persistence and browser-development `localStorage` fallback
- Windows NSIS packaging

Planned transactions are clearly implemented, but they are not listed in the original README feature list. They are treated as existing behavior to preserve while the PM confirms whether they are contractual scope.

## Technology stack

| Layer | Technology | Role |
|---|---|---|
| UI | React 19 + TypeScript | Components, routes, forms, state-driven screens |
| Routing | React Router 7 | Login and protected application routes |
| Build/dev | Vite 8 + TypeScript project references | Browser dev server and production bundle |
| Desktop | Electron + electron-builder | Native window, preload bridge, JSON persistence, NSIS installer |
| Charts | Recharts | Area chart for actual financial activity |
| Utilities | date-fns, uuid | Dates and identifiers |
| Styling | One global CSS file | Dark responsive application layout |
| Lint | oxlint | Static checks |

There is no backend service, database server, ORM, API, analytics service, or cloud infrastructure.

## Architecture at a glance

```text
React pages/components
        |
        v
AppContext (session state + domain mutations)
        |
        v
storage.ts adapter
   |              |
Electron IPC      Browser localStorage
   |
preload.js -> main.js -> userData/money-manager-data.json
```

The entire application state is stored as one `AppData` object. Transaction classification and summary calculations live in pure utility modules. The Electron renderer is isolated from Node and can call only `loadData` and `saveData` through the preload bridge.

## Data model

`AppData` contains:

- `password: string`
- `transactions: Transaction[]`
- `debts: Debt[]`
- `debtPayments: DebtPayment[]`

Transactions contain identity, date, amount, deposit/withdrawal type, actual/planned/processed status, counterparty, details, and optional planned/actual link fields. Debt and debt-payment interfaces and CSS exist, but no route or component uses those arrays.

## Current quality state

- `npm run build`: passes; emits a bundle-size warning for the approximately 653 kB minified JS chunk.
- `npm run lint`: passes with five warnings.
- Browser smoke test: passes for login, actual entry, planned entry, fulfillment, linked history, graph/totals, responsive rendering, settings display, and sign-out; no browser console errors were observed.
- Electron persistence/runtime: source and package contents inspected, but not interactively smoke-tested.
- Automated tests and CI: absent.
- Clean install: blocked by manifest/lockfile drift.
- Installer: present from a prior build, but generated, unsigned, and not release-verified.

## Security posture

Positive controls already present include Electron context isolation and disabled renderer Node integration. Important gaps are plaintext password storage, a public default password shown in the UI, unvalidated renderer-to-main save payloads, no explicit Content Security Policy, no navigation/window restrictions, and no documented data recovery strategy. The password is therefore a convenience gate, not encryption or strong local access control.

## Delivery approach

Preserve the working application and harden it incrementally. First establish a reproducible Git/dependency baseline and resolve product decisions. Next protect data and the Electron boundary, correct known behavior, add automated tests and CI, and finally verify/sign a release candidate. Use short-lived task branches from protected `main`; do not add a `development` branch unless team/release scale later justifies it.

## Where to go next

- Product truth and coverage: `REQUIREMENTS.md`
- Evidence-based implementation state: `CURRENT_STATUS.md`
- Detailed component boundaries: `ARCHITECTURE.md`
- Sequenced delivery plan: `MASTER_PLAN.md` and `MILESTONES.md`
- Assignable tasks: `TASK_BREAKDOWN.md`
- Decisions needed: `OPEN_QUESTIONS.md`

