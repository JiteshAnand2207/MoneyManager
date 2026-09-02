# Current Status

Audit date: 2026-09-02

## What existed before this planning pass

- React/TypeScript/Vite application with Electron wrapper
- Login, actual transactions, planned transactions, graph/summary, settings, and sign-out routes
- Local Electron JSON and browser `localStorage` persistence paths
- Planned-to-actual link/protection logic
- Responsive global styling and image assets
- npm scripts for development, lint, browser build, and Windows installer build
- Generated `dist/`, unpacked Windows application, and NSIS installer
- A concise README and basic `.gitignore`

There was no Git repository metadata in this directory, no remote, no commit history, no documentation set beyond the README, no test suite, no CI/CD, no PR/issue templates, and no environment example. No environment variables are used.

## COMPLETED

- Production TypeScript/Vite build passes.
- Lint completes without errors.
- Login rejects an incorrect password and accepts the initial password in browser mode.
- Protected routes and sign-out work in the browser smoke test.
- Adding an actual received record updates the list, totals, and graph.
- Adding and fulfilling a planned receivable creates a processed history record and protected linked actual record.
- Auto-generated actual records are protected from direct deletion in the inspected UI.
- Empty and populated graph states render without browser console errors.
- The responsive layout renders at an 800 x 800 viewport.
- Electron uses context isolation and disables renderer Node integration.
- Browser build assets are referenced with relative paths suitable for `loadFile`.
- Planning documentation, collaboration templates, expanded ignore rules, and local Git initialization were completed in this pass.

## PARTIALLY COMPLETED

- Authentication: the workflow exists, but the password is plaintext and the default is publicly displayed.
- Change password: form and mutation exist, but the security model is inadequate and the submit path was not changed/tested during this audit.
- Persistence: both storage paths exist, but there is no schema version, strong validation, atomic write, recovery UI, or comprehensive failure handling.
- Transaction deletion/reactivation: code exists; the main fulfillment/protection path was observed, while destructive reactivation/deletion paths still need automated coverage.
- Financial summaries: calculations run, but terminology, currency, and whether trend profit should be daily or cumulative need confirmation.
- Responsive/accessibility support: responsive styling works in a compact smoke check; modal focus management, keyboard behavior, semantic labeling, and screen-reader behavior need audit.
- Packaging: a prior installer and unpacked application exist, but their provenance is outside Git and the installer is unsigned.

## NOT STARTED

- Automated unit, context/storage integration, component, browser E2E, Electron IPC, migration, and installer smoke tests
- CI build/lint/test workflow
- Automated dependency/security scanning policy
- Versioned data migration and corruption recovery
- Atomic file persistence and backup behavior
- Secure credential design/implementation
- Explicit Content Security Policy and Electron navigation/window restrictions
- Release signing, checksum, release notes, rollback procedure, and verified tag workflow
- Bundle-size improvement

## NEEDS VERIFICATION

- Clean installation from only committed files on a supported Node/npm version
- Electron development startup and persistence across relaunch
- Packaged application install, launch, upgrade, uninstall, and data retention behavior
- Reactivation removes exactly one correct linked actual record and remains safe on malformed legacy data
- Manual deletion result/error behavior under React concurrent update scheduling
- Malformed JSON and partial/corrupt record behavior
- Date behavior around local midnight/time-zone boundaries
- Dependency vulnerability state; registry audit failed because the local certificate chain could not be verified
- Whether generated `dist/` and `release/` artifacts match an authoritative source revision; no history exists

## BLOCKED / UNCLEAR

- Whether debt management is intended: debt types, arrays, calculation naming, and CSS exist, but no UI/route or README requirement does.
- Required currency/locale; code currently hardcodes USD and `en-US`.
- Intended terminology: “income/outcome,” “paid,” and “Total To Received/Total To Paid.”
- Whether graph profit is per-day or cumulative.
- Required security threat model: casual in-app gate, OS-bound secret, hashed verifier, or encrypted financial data.
- Supported operating systems beyond the existing Windows target.
- Code-signing expectation and certificate owner.
- GitHub organization/repository URL, collaborator identities, and branch-protection administrators.
- Release version/provenance: package manifest is `1.0.0`, lockfile root is `0.0.0`, and a generated `1.0.0` installer exists without repository history.

## Known problems and observations

| Severity | Finding | Evidence/impact | Planned task |
|---|---|---|---|
| Critical before release | Plaintext password and data | Local file/browser storage exposure; “secure” claim is not met | AUTH-001, AUTH-002 |
| High | Manifest/lockfile drift | `npm ls --depth=0` reports invalid `concurrently`, `electron`, and `uuid`; clean install is not proven | SETUP-001, SETUP-002 |
| High | Non-atomic/unvalidated persistence | Corruption or unexpected renderer payload can damage the only data file | DATA-001, DATA-002, SEC-001 |
| High | No automated tests or CI | Financial and link logic can regress unnoticed | QA-001–QA-008, CI-001 |
| Medium | Small chart values display repeated `$0k` ticks | Observed with a $350 dataset; chart is misleading | BUG-003 |
| Medium | UTC-derived default transaction date | Can select the wrong local calendar date near midnight | BUG-001 |
| Medium | Mutation APIs report success even for no-op invalid targets | Callers cannot reliably report domain failures | CORE-002 |
| Medium | Load/save failures are not surfaced | Load may hang/reject; users may believe data saved when it did not | DATA-003 |
| Medium | No CSP/navigation hardening | Expands Electron renderer risk, especially with an external font request | SEC-002 |
| Medium | Unsigned installer | Windows trust warnings and no publisher assurance | REL-002 |
| Low/Medium | Single JS chunk is about 653 kB minified | Vite emits a greater-than-500 kB warning | PERF-001 |
| Low | Five lint warnings | Fast Refresh organization and hook-dependency maintainability | CORE-001, QA-001 |
| Scope risk | Dormant debt model/styles | Contributors may mistakenly build or delete intended work | PM decision in OPEN_QUESTIONS |

## Verification evidence

| Check | Result |
|---|---|
| `npm run build` | Pass; Vite bundle-size warning |
| `npm run lint` | Pass; five warnings |
| `npm ls --depth=0` | Fail with `ELSPROBLEMS` due three invalid installed versions |
| `npm audit --omit=dev --json` | Inconclusive; registry certificate verification failed |
| Browser smoke test | Pass for core flow; no console issues observed |
| Installer Authenticode check | `NotSigned` |
| Git inspection before preparation | Not a Git repository |

