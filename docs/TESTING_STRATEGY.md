# Testing Strategy

## Goals

Protect financial calculations, planned/actual link integrity, local data durability, authentication behavior, and Windows packaging while keeping the normal PR loop fast.

## Current baseline

No automated test framework, test files, test script, or CI workflow exists. The 2026-09-02 audit used build/lint and a manual controlled browser smoke flow. Electron and installer behavior remain unverified.

## Proposed layers

| Layer | Scope | Primary risks | Suggested tooling |
|---|---|---|---|
| Unit | Transaction utilities, calculations, date/currency helpers, schema parsing | Incorrect totals/classification/date edges | Vitest |
| Context/storage integration | Mutations, linked records, load/save errors, schema migrations | Orphans, false success, data loss | Vitest + React Testing Library where React is involved |
| Component | Login, add/detail/fulfill/reactivate, filters, accessible dialogs | Broken user workflows and semantics | React Testing Library + user-event |
| Browser E2E | Protected routing, actual/planned cross-view flow, graph, responsive state | Wiring/rendering regressions | Playwright or equivalent approved in QA-005 |
| Electron integration | Preload API, IPC validation, JSON persistence/reload, navigation policy | Browser-only false confidence, unsafe disk writes | Electron-compatible Playwright harness or targeted process integration tests |
| Packaged smoke | Install, launch, persist, upgrade, uninstall/data retention | Bad artifact/release process | Controlled Windows VM/manual automation |

Tool choices are suggested, not installed in this planning pass. Prefer the smallest supported set and avoid duplicate runners.

## Critical test matrix

### Transactions and calculations

- Received and paid records individually and on the same date
- Positive decimal amounts and rounding boundaries
- Planned, processed, actual, legacy missing-status, and auto-generated classifications
- Empty data, negative net position, large values, and values below 1,000
- Inclusive start/end date filtering
- Local-midnight and time-zone boundaries
- Exact/case/whitespace counterparty behavior, preserving current semantics until approved

### Planned lifecycle

- Fulfill pending receivable and payable
- Preserve processed planned history
- Create exactly one correctly typed linked actual record
- Reject repeated fulfillment and invalid IDs
- Reactivate once; remove only the linked actual record
- Handle missing, duplicate, or malformed link IDs without unrelated deletion
- Prevent direct deletion of protected records
- Persist/reload every lifecycle state

### Authentication and data

- New-store initial credential behavior
- Correct/incorrect login and sign-out
- Password-change validation and approved secure-storage migration
- Valid current and legacy data
- Missing optional fields
- Invalid JSON, invalid nested values, unsupported schema version
- Interrupted/failed write, backup restore, and user-visible error
- Oversized/untrusted IPC payload rejection

### UI and accessibility

- Keyboard-only navigation and visible focus
- Dialog focus entry, trap, Escape/close, and focus restoration
- Labels/names for inputs and icon buttons
- Responsive layouts around the 900 px breakpoint
- Empty, filtered-empty, and populated views
- Chart accessible summary and readable tick formats

### Desktop/release

- Dev Electron load and reload persistence
- Packaged `file://` routing and asset loading
- First install, launch, close/relaunch, upgrade, uninstall
- User-data retention policy and migration
- Offline startup/font fallback
- Signing identity/status and artifact checksum

## PR gates

Every PR should run lint, TypeScript/production build, and the relevant fast tests. Shared-data, auth, financial-calculation, or Electron changes require targeted integration evidence. User-visible changes include before/after evidence and keyboard checks. No test may rely on or upload real user finance data.

## Release gates

- Clean checkout/install/build on the documented Node/npm version
- All automated suites green on the exact release commit
- Manual Windows packaged smoke matrix complete
- Migration tested from every supported prior schema/data fixture
- No unaccepted Critical/High security or data-integrity issue
- Dependency/security scan recorded or explicitly waived with reason
- Installer checksum, signing status, known issues, and rollback steps recorded

## Coverage approach

Do not chase a percentage alone. Require explicit case coverage for the critical matrix and use line/branch coverage to identify gaps. Set numerical thresholds only after the baseline suite exists; increases should be monotonic for core/domain modules.

## Test data

Use deterministic fictional records and fixed clock/time-zone controls. Never copy the user's desktop JSON or browser storage into fixtures, logs, screenshots, or CI artifacts.

