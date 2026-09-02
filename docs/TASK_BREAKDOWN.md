# Engineering Task Breakdown

Status vocabulary: `COMPLETED`, `PARTIALLY COMPLETED`, `NOT STARTED`, `NEEDS VERIFICATION`, `BLOCKED / INPUT NEEDED`, `BLOCKED / DEPENDENCIES`.

## Backlog summary

| Area | Count | IDs |
|---|---:|---|
| Repository | 3 | REPO-001–003 |
| Documentation | 3 | DOC-001–003 |
| Setup/dependencies | 2 | SETUP-001–002 |
| Data/persistence | 3 | DATA-001–003 |
| Authentication | 2 | AUTH-001–002 |
| Security | 2 | SEC-001–002 |
| Core/domain | 3 | CORE-001–003 |
| Bugs | 3 | BUG-001–003 |
| UX/accessibility | 3 | UX-001–003 |
| QA/testing | 8 | QA-001–008 |
| CI | 2 | CI-001–002 |
| Performance | 1 | PERF-001 |
| Release | 3 | REL-001–003 |
| **Total** | **38** | |

## Repository and documentation

### REPO-001 — Initialize local Git baseline

- **Task ID:** REPO-001
- **Title:** Initialize local Git on `main`
- **Area:** Repository
- **Goal:** Establish non-destructive local version-control metadata without publishing or rewriting history.
- **Detailed Description:** Confirm no parent/current Git repository exists, initialize this directory with default branch `main`, and leave all content uncommitted for PM review.
- **Files / Modules likely involved:** `.git/` metadata only.
- **Dependencies:** None.
- **Can run in parallel with:** Documentation drafting.
- **Expected Output:** Local repository on `main`, no remote, no commit.
- **Acceptance Criteria:** `git status`, `git branch`, `git log`, and `git remote -v` accurately show the new local state; no source file is lost.
- **Tests Required:** Git inspection commands.
- **Integration Notes:** PM must supply/approve the GitHub remote before any push.
- **Complexity:** Small.
- **Suggested Skill Type:** Repository administration.
- **Status:** COMPLETED.

### REPO-002 — Harden ignore and secret hygiene

- **Task ID:** REPO-002
- **Title:** Ignore secrets, dependencies, build output, reports, caches, and local files
- **Area:** Repository/security
- **Goal:** Prevent accidental commits of generated or sensitive local content.
- **Detailed Description:** Expand `.gitignore` for `.env*`, `electron-builder.env`, `node_modules`, `dist`, `release`, coverage/E2E reports, logs, caches, temporary files, and OS/editor junk while allowing a future `.env.example`.
- **Files / Modules likely involved:** `.gitignore`.
- **Dependencies:** None.
- **Can run in parallel with:** REPO-003, DOC-001.
- **Expected Output:** Project-specific ignore policy.
- **Acceptance Criteria:** `git status --ignored` classifies current `node_modules/`, `dist/`, and `release/` as ignored; no credential-like first-party file is found.
- **Tests Required:** Ignore inspection and focused secret scan.
- **Integration Notes:** Recheck if future config introduces credentials or generated directories.
- **Complexity:** Small.
- **Suggested Skill Type:** Repository/security hygiene.
- **Status:** COMPLETED.

### REPO-003 — Add collaboration templates

- **Task ID:** REPO-003
- **Title:** Add PR and minimal issue templates
- **Area:** Repository/GitHub
- **Goal:** Make task evidence, dependencies, integration risk, and reviews consistent.
- **Detailed Description:** Add one PR template and concise templates for feature, bug, QA/integration, and documentation issues. Avoid assuming labels or repository URLs.
- **Files / Modules likely involved:** `.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/*`.
- **Dependencies:** DOC-001 task vocabulary.
- **Can run in parallel with:** REPO-002, DOC-002.
- **Expected Output:** Usable GitHub contribution forms/templates.
- **Acceptance Criteria:** Templates request task ID, acceptance evidence, tests, dependencies, data/security impact, and shared-file risks.
- **Tests Required:** Markdown/front-matter review.
- **Integration Notes:** Configure labels/owners later after the remote and team are known.
- **Complexity:** Small.
- **Suggested Skill Type:** GitHub workflow.
- **Status:** COMPLETED.

### DOC-001 — Create PM planning documentation

- **Task ID:** DOC-001
- **Title:** Create project overview, status, architecture, plan, milestones, backlog, dependencies, dashboard, and open questions
- **Area:** Documentation/project management
- **Goal:** Give the PM and new contributors one evidence-based source for planning.
- **Detailed Description:** Inspect all first-party source/configuration and relevant generated artifacts, record verified behavior and gaps, and create the requested Markdown suite without inventing scope.
- **Files / Modules likely involved:** `docs/*.md`.
- **Dependencies:** Repository/source audit.
- **Can run in parallel with:** REPO-002/003.
- **Expected Output:** Complete planning documentation with consistent IDs/statuses.
- **Acceptance Criteria:** Every supported requirement maps to tasks; all requested status categories are present; assignments remain empty.
- **Tests Required:** Cross-document ID/link/count validation and second source pass.
- **Integration Notes:** PM dashboard/status documents need a single update owner once development starts.
- **Complexity:** Large.
- **Suggested Skill Type:** Technical project planning.
- **Status:** COMPLETED.

### DOC-002 — Update developer onboarding

- **Task ID:** DOC-002
- **Title:** Make README, setup, and contribution instructions accurate
- **Area:** Documentation
- **Goal:** Prevent new contributors from relying on false security/reproducibility claims.
- **Detailed Description:** Document actual capabilities, limitations, scripts, storage, current lockfile issue, branching, commits, PR review, merge rules, and releases.
- **Files / Modules likely involved:** `README.md`, `SETUP.md`, `CONTRIBUTING.md`.
- **Dependencies:** DOC-001 findings.
- **Can run in parallel with:** REPO-003.
- **Expected Output:** Honest onboarding path that matches the code.
- **Acceptance Criteria:** Commands exist in `package.json`; current blockers are explicit; no environment variable is fabricated.
- **Tests Required:** Command/link review against repository.
- **Integration Notes:** Update after SETUP-001/002 and when test commands are added.
- **Complexity:** Medium.
- **Suggested Skill Type:** Developer documentation.
- **Status:** COMPLETED.

### DOC-003 — Publish end-user data and recovery guide

- **Task ID:** DOC-003
- **Title:** Document data location, backup, recovery, security, upgrade, and uninstall behavior
- **Area:** Documentation/support
- **Goal:** Let users protect local financial data and understand the security boundary.
- **Detailed Description:** After M1 decisions/implementation, write user-facing steps for backup, recovery, credential limitations/recovery, upgrade compatibility, and uninstall retention.
- **Files / Modules likely involved:** `README.md`, new or existing `docs/` user guide, release notes.
- **Dependencies:** AUTH-001/002, DATA-001/002/003, OQ-009/010.
- **Can run in parallel with:** PERF-001 after behavior stabilizes.
- **Expected Output:** Tested, non-misleading end-user guide.
- **Acceptance Criteria:** Instructions match actual Windows paths/behavior and are exercised on a packaged candidate.
- **Tests Required:** Follow guide on clean test profile with fictional data.
- **Integration Notes:** Must land before REL-003.
- **Complexity:** Medium.
- **Suggested Skill Type:** Technical writing/support.
- **Status:** NOT STARTED.

## Setup and dependencies

### SETUP-001 — Synchronize manifest and lockfile

- **Task ID:** SETUP-001
- **Title:** Resolve dependency/version drift
- **Area:** Setup/dependencies
- **Goal:** Make dependency resolution intentional and reproducible.
- **Detailed Description:** Decide whether manifest ranges or lockfile resolutions are authoritative for `concurrently`, `electron`, and `uuid`; align application version/dependency classification; regenerate the lockfile once; review compatibility/release notes for the chosen majors.
- **Files / Modules likely involved:** `package.json`, `package-lock.json`.
- **Dependencies:** PM/engineering answer to OQ-012/OQ-013.
- **Can run in parallel with:** AUTH-001, BUG-003, UX-003.
- **Expected Output:** A single coherent manifest/lockfile pair.
- **Acceptance Criteria:** `npm ci` and `npm ls --depth=0` succeed from a clean dependency directory; lint/build remain green.
- **Tests Required:** Clean install, lint, build, Electron dev launch.
- **Integration Notes:** Very high conflict; one owner and first merge priority. Do not bundle other upgrades.
- **Complexity:** Medium.
- **Suggested Skill Type:** Node dependency maintenance.
- **Status:** NOT STARTED.

### SETUP-002 — Verify clean bootstrap

- **Task ID:** SETUP-002
- **Title:** Prove setup from a clean checkout
- **Area:** Setup
- **Goal:** Ensure a collaborator can reproduce the project with only committed files.
- **Detailed Description:** On documented Windows/Node/npm versions, clone or copy a clean source tree, run canonical install, lint, build, browser dev, and Electron dev commands; update setup docs with exact supported versions.
- **Files / Modules likely involved:** `SETUP.md`, `README.md`; no product code expected.
- **Dependencies:** SETUP-001.
- **Can run in parallel with:** AUTH-001, UX-001 after SETUP-001 lands.
- **Expected Output:** Reproducibility evidence and corrected setup docs.
- **Acceptance Criteria:** All documented commands work without pre-existing `node_modules`, `dist`, or `release`.
- **Tests Required:** Clean-environment command transcript and smoke checks.
- **Integration Notes:** Required before QA/CI dependency changes.
- **Complexity:** Medium.
- **Suggested Skill Type:** Developer experience/release engineering.
- **Status:** BLOCKED / DEPENDENCIES.

## Data, authentication, and security

### DATA-001 — Version and validate persisted data

- **Task ID:** DATA-001
- **Title:** Add runtime schema versioning, validation, and migrations
- **Area:** Data/persistence
- **Goal:** Load only coherent data while preserving supported legacy records.
- **Detailed Description:** Define a versioned `AppData` schema, validate top-level/nested fields and transaction links, migrate known legacy missing fields, and reject unsupported or unsafe values with typed outcomes.
- **Files / Modules likely involved:** `src/types.ts`, new schema/migration module, `src/store/storage.ts`, `electron/main.js` interface.
- **Dependencies:** SETUP-002; coordinate with AUTH-001.
- **Can run in parallel with:** SEC-002, BUG-003 after interface agreement.
- **Expected Output:** Versioned parser/migrator and fixtures.
- **Acceptance Criteria:** Current and supported legacy fixtures load identically; invalid data never silently becomes a plausible empty financial history.
- **Tests Required:** QA-008 plus unit fixtures for every schema version/error.
- **Integration Notes:** Land interface before DATA-002, AUTH-002, CORE-002; high conflict.
- **Complexity:** Large.
- **Suggested Skill Type:** TypeScript data modeling.
- **Status:** NOT STARTED.

### DATA-002 — Make desktop persistence recoverable

- **Task ID:** DATA-002
- **Title:** Add atomic writes and last-known-good backup recovery
- **Area:** Electron/data
- **Goal:** Prevent a failed/interrupted write from destroying the only finance data file.
- **Detailed Description:** Write a temporary file, flush/close as appropriate, replace atomically where supported, retain a controlled backup, and define recovery behavior compatible with the schema layer.
- **Files / Modules likely involved:** `electron/main.js` or extracted persistence module.
- **Dependencies:** DATA-001.
- **Can run in parallel with:** AUTH-002 if file/module ownership is partitioned.
- **Expected Output:** Recoverable storage implementation with explicit failure results.
- **Acceptance Criteria:** Simulated interruption preserves last known-good data; corrupt primary can be detected and recovered without silent loss.
- **Tests Required:** QA-006 and QA-008 failure/recovery cases.
- **Integration Notes:** Coordinate with SEC-001 IPC contract and DOC-003.
- **Complexity:** Large.
- **Suggested Skill Type:** Electron/filesystem reliability.
- **Status:** NOT STARTED.

### DATA-003 — Surface load/save failures

- **Task ID:** DATA-003
- **Title:** Add explicit storage states and user-visible recovery actions
- **Area:** Data/UI
- **Goal:** Stop infinite loading and false confidence after persistence failure.
- **Detailed Description:** Return typed load/save outcomes, handle rejected Electron calls/localStorage failures, display recoverable errors, and avoid claiming a mutation is durable before save succeeds.
- **Files / Modules likely involved:** `src/store/storage.ts`, `src/context/AppContext.tsx`, new error/recovery UI, Electron bridge.
- **Dependencies:** DATA-001; DATA-002 contract for final behavior.
- **Can run in parallel with:** UX-002 after error-state design agreement.
- **Expected Output:** Loading, ready, saving, and error states with safe retry/recovery.
- **Acceptance Criteria:** Injected read/write failures are visible and never strand the app indefinitely or silently discard state.
- **Tests Required:** QA-003, QA-004, QA-006.
- **Integration Notes:** High conflict in `AppContext`; sequence with CORE-002/AUTH-002.
- **Complexity:** Large.
- **Suggested Skill Type:** React state/reliability.
- **Status:** NOT STARTED.

### AUTH-001 — Define local access-control threat model

- **Task ID:** AUTH-001
- **Title:** Approve password, encryption, and recovery requirements
- **Area:** Authentication/product security
- **Goal:** Choose an implementable security promise before changing stored credentials/data.
- **Detailed Description:** PM and engineering document whether the goal is a convenience gate, hashed local verifier, OS-bound secret, or encrypted finance store; define first-run, migration, forgotten-password, and recovery behavior.
- **Files / Modules likely involved:** `docs/OPEN_QUESTIONS.md`, `docs/REQUIREMENTS.md`, security decision record.
- **Dependencies:** PM answers OQ-007/008/009/011.
- **Can run in parallel with:** SETUP-001, CORE-001, REL-001.
- **Expected Output:** Approved security decision and acceptance criteria.
- **Acceptance Criteria:** Threat actors, protected assets, non-goals, credential storage, encryption, recovery, and browser-mode treatment are explicit.
- **Tests Required:** Decision review; no code test.
- **Integration Notes:** Blocks AUTH-002 and release security claims.
- **Complexity:** Medium.
- **Suggested Skill Type:** Product security architecture.
- **Status:** BLOCKED / INPUT NEEDED.

### AUTH-002 — Implement approved credential protection

- **Task ID:** AUTH-002
- **Title:** Replace plaintext password storage and migrate existing data
- **Area:** Authentication/security
- **Goal:** Make implementation match the approved threat model.
- **Detailed Description:** Implement the chosen verifier/secret/encryption flow, remove misleading default-password exposure if required, migrate legacy plaintext safely, and support approved recovery behavior without data loss.
- **Files / Modules likely involved:** `src/types.ts`, `src/context/AppContext.tsx`, storage/schema modules, Electron main/preload, login/settings UI.
- **Dependencies:** AUTH-001, DATA-001.
- **Can run in parallel with:** DATA-002 only with explicit file ownership.
- **Expected Output:** Secure-by-definition credential flow and migration.
- **Acceptance Criteria:** No plaintext credential remains where prohibited; first run/login/change/relaunch/recovery meet the decision; legacy data migrates once.
- **Tests Required:** QA-003/004/006/008 plus security review.
- **Integration Notes:** Very high conflict and data risk; small reviewed commits, backup fixtures mandatory.
- **Complexity:** Large.
- **Suggested Skill Type:** Application security/Electron.
- **Status:** BLOCKED / INPUT NEEDED.

### SEC-001 — Validate the IPC data boundary

- **Task ID:** SEC-001
- **Title:** Restrict IPC channels and validate save payloads in the main process
- **Area:** Electron security
- **Goal:** Ensure compromised renderer input cannot write arbitrary/invalid application data.
- **Detailed Description:** Apply runtime schema validation, payload limits, typed error responses, and least-privilege preload methods; avoid accepting an unconstrained object for `data:save`.
- **Files / Modules likely involved:** `electron/main.js`, `electron/preload.js`, shared schema/contract modules.
- **Dependencies:** DATA-001 contract.
- **Can run in parallel with:** SEC-002 if file ownership is agreed.
- **Expected Output:** Narrow validated IPC API.
- **Acceptance Criteria:** Invalid, oversized, or wrong-shaped payloads fail safely and do not modify the data file; valid payloads persist.
- **Tests Required:** QA-006 malicious/invalid payload cases.
- **Integration Notes:** Coordinate main-process changes with DATA-002/003.
- **Complexity:** Medium.
- **Suggested Skill Type:** Electron security.
- **Status:** NOT STARTED.

### SEC-002 — Harden renderer content and navigation

- **Task ID:** SEC-002
- **Title:** Add CSP, navigation/window restrictions, sandbox review, and offline font decision
- **Area:** Electron/web security
- **Goal:** Reduce renderer attack surface and avoid undeclared external access.
- **Detailed Description:** Define a production-compatible CSP, block unapproved navigation/window creation, review enabling renderer sandbox, and bundle/remove the Google Fonts request or explicitly approve it.
- **Files / Modules likely involved:** `index.html`, `src/index.css`, `electron/main.js`, packaging config/assets.
- **Dependencies:** OQ-011 and font/privacy decision; coordinate with dev-server CSP needs.
- **Can run in parallel with:** DATA-001, BUG-003.
- **Expected Output:** Documented Electron/web security controls and offline-safe typography.
- **Acceptance Criteria:** App functions under CSP, external navigation cannot escape policy, offline launch renders correctly, and security checklist passes.
- **Tests Required:** Browser/Electron console checks, navigation attempts, packaged offline smoke.
- **Integration Notes:** `index.css` and Electron main are shared/high-conflict.
- **Complexity:** Medium.
- **Suggested Skill Type:** Electron/browser security.
- **Status:** NOT STARTED.

## Core behavior, bugs, and UX

### CORE-001 — Capture the behavioral baseline

- **Task ID:** CORE-001
- **Title:** Specify current workflows and clear baseline lint warnings
- **Area:** Core/maintainability
- **Goal:** Protect working behavior before shared-core hardening.
- **Detailed Description:** Convert observed actual/planned/auth/summary behavior into executable or fixture-ready specifications; resolve the existing Fast Refresh and hook dependency warnings without changing semantics.
- **Files / Modules likely involved:** `DateRangeFilter.tsx`, `AppContext.tsx`, `TransactionBoard.tsx`, small utility extraction, test specifications.
- **Dependencies:** SETUP-002 for executable tests; specification can start earlier.
- **Can run in parallel with:** BUG-003, AUTH-001.
- **Expected Output:** Zero baseline lint warnings and reviewed behavior cases.
- **Acceptance Criteria:** Lint is clean; before/after browser behavior matches; specifications cover current README and implementation-derived flows.
- **Tests Required:** Lint/build and targeted smoke/regression tests.
- **Integration Notes:** Coordinate context edits with DATA/AUTH tasks; land early.
- **Complexity:** Medium.
- **Suggested Skill Type:** React/TypeScript maintenance.
- **Status:** NOT STARTED.

### CORE-002 — Make mutations accurate and idempotent

- **Task ID:** CORE-002
- **Title:** Correct add/delete/fulfill/reactivate result contracts and link invariants
- **Area:** Core/domain
- **Goal:** Return truthful outcomes and prevent duplicate/orphaned planned links.
- **Detailed Description:** Move domain decisions into testable pure/reducer-style operations, return failures for missing/wrong-status IDs, prevent repeat fulfillment, and handle malformed links without unrelated deletion.
- **Files / Modules likely involved:** `src/context/AppContext.tsx`, transaction utilities/new domain module, types.
- **Dependencies:** CORE-001, DATA-001 interface.
- **Can run in parallel with:** BUG-003; not with other `AppContext` owners.
- **Expected Output:** Deterministic transaction mutation API.
- **Acceptance Criteria:** Every mutation reports actual result; repeated/invalid calls are safe; link invariants hold across reload.
- **Tests Required:** QA-002/003/004/005.
- **Integration Notes:** High conflict; affects both transaction pages and persistence.
- **Complexity:** Large.
- **Suggested Skill Type:** TypeScript domain modeling/React state.
- **Status:** NOT STARTED.

### CORE-003 — Centralize approved financial presentation

- **Task ID:** CORE-003
- **Title:** Centralize currency, locale, date, and chart-profit semantics
- **Area:** Core/product behavior
- **Goal:** Remove hardcoded duplicated formatting after PM choices are explicit.
- **Detailed Description:** Introduce minimal shared formatting/configuration and implement the approved fixed/configurable currency, locale, precision, date display, and daily/cumulative chart semantics.
- **Files / Modules likely involved:** graph, fund overview, transaction board/detail, new formatting utility, possibly settings if approved.
- **Dependencies:** OQ-003/OQ-005 decisions; CORE-001.
- **Can run in parallel with:** UX-002 after interface agreement.
- **Expected Output:** Consistent financial presentation.
- **Acceptance Criteria:** All screens use one approved behavior; negative/decimal/large values and dates format consistently.
- **Tests Required:** QA-002/004/005.
- **Integration Notes:** Cross-cutting UI; define API first to reduce conflicts.
- **Complexity:** Medium.
- **Suggested Skill Type:** Product-facing TypeScript/React.
- **Status:** BLOCKED / INPUT NEEDED.

### BUG-001 — Use the local calendar date

- **Task ID:** BUG-001
- **Title:** Remove UTC date drift from transaction defaults
- **Area:** Bug/date handling
- **Goal:** Default a new or fulfilled transaction to the user's local day.
- **Detailed Description:** Replace `new Date().toISOString().slice(0, 10)` with a shared local-date helper and verify around positive/negative UTC offsets and midnight.
- **Files / Modules likely involved:** `TransactionModal.tsx`, `FulfillTransactionModal.tsx`, new date utility.
- **Dependencies:** CORE-001; coordinate helper with CORE-003.
- **Can run in parallel with:** BUG-003, UX-003.
- **Expected Output:** Consistent local `yyyy-MM-dd` defaults.
- **Acceptance Criteria:** Controlled clocks in multiple time zones select the local date on both forms.
- **Tests Required:** QA-002 unit tests and QA-004 component tests.
- **Integration Notes:** Prefer a small utility to avoid conflicting edits in both components.
- **Complexity:** Small.
- **Suggested Skill Type:** TypeScript/date testing.
- **Status:** NOT STARTED.

### BUG-002 — Guard invalid dates and ranges

- **Task ID:** BUG-002
- **Title:** Prevent malformed dates and invalid filter ranges from crashing or misleading views
- **Area:** Bug/validation
- **Goal:** Make date handling safe for legacy/corrupt records and user input.
- **Detailed Description:** Validate stored ISO dates before formatting, define behavior for invalid records, and make range validation explicit instead of relying only on input `min`/`max` attributes.
- **Files / Modules likely involved:** transaction utilities, graph, transaction board/detail, schema layer.
- **Dependencies:** DATA-001 date validation contract; CORE-001.
- **Can run in parallel with:** BUG-003 after schema behavior is agreed.
- **Expected Output:** Typed safe date/range handling.
- **Acceptance Criteria:** Invalid dates do not throw; start-after-end cannot silently produce confusing state; recovery behavior is visible and tested.
- **Tests Required:** QA-002/004/008.
- **Integration Notes:** Do not silently drop corrupt financial records without DATA-003 recovery UX.
- **Complexity:** Medium.
- **Suggested Skill Type:** Validation/React.
- **Status:** NOT STARTED.

### BUG-003 — Fix chart-axis currency labels

- **Task ID:** BUG-003
- **Title:** Render readable Y-axis values below and above 1,000
- **Area:** Bug/chart
- **Goal:** Stop small values such as $350 from producing repeated `$0k` tick labels.
- **Detailed Description:** Use an adaptive currency formatter for chart ticks and verify negative, decimal, thousand, million, and narrow-layout cases.
- **Files / Modules likely involved:** `src/pages/GraphPage.tsx`, shared formatter after CORE-003 if available.
- **Dependencies:** CORE-001; final implementation should align with OQ-003/CORE-003.
- **Can run in parallel with:** SETUP-001, BUG-001.
- **Expected Output:** Unambiguous chart scale labels.
- **Acceptance Criteria:** Distinct ticks remain readable for the tested $350 dataset and large ranges; tooltips remain accurate.
- **Tests Required:** Formatter unit tests and QA-005 visual/E2E check.
- **Integration Notes:** Low conflict if completed before CORE-003; otherwise use shared formatter.
- **Complexity:** Small.
- **Suggested Skill Type:** React/charting.
- **Status:** NOT STARTED.

### UX-001 — Approve terminology and calculation labels

- **Task ID:** UX-001
- **Title:** Resolve financial copy and summary semantics
- **Area:** Product/UX
- **Goal:** Ensure labels accurately describe the amounts users see.
- **Detailed Description:** PM reviews “Income & Outcome,” “Paid,” “To Receive/To Pay,” “Total To Received/Total To Paid,” “Remaining,” “Available Funds,” and “Net Position,” including whether totals are filtered or all-time and include actual amounts.
- **Files / Modules likely involved:** requirements/decision docs; later fund overview, pages, transaction utilities.
- **Dependencies:** PM answers OQ-001/004/006.
- **Can run in parallel with:** AUTH-001, SETUP-001, REL-001.
- **Expected Output:** Approved glossary and formulas.
- **Acceptance Criteria:** Each label has a formula/scope and sample expected value; README/UI/test names align.
- **Tests Required:** PM scenario review; later QA-002/004/005.
- **Integration Notes:** Blocks user-visible copy changes; no coding before approval.
- **Complexity:** Medium.
- **Suggested Skill Type:** Product analysis/content design.
- **Status:** BLOCKED / INPUT NEEDED.

### UX-002 — Make dialogs keyboard-accessible

- **Task ID:** UX-002
- **Title:** Add dialog semantics, focus management, Escape handling, and accessible confirmations
- **Area:** UX/accessibility
- **Goal:** Make transaction and settings workflows usable without a mouse or browser-native blocking dialogs.
- **Detailed Description:** Add proper modal roles/names, initial focus, focus trap/restoration, Escape behavior, and accessible application confirmation UI for destructive actions; verify icon controls and error announcements.
- **Files / Modules likely involved:** all modal components, `TransactionBoard.tsx`, CSS, possibly shared dialog component.
- **Dependencies:** CORE-001; coordinate with DATA-003 error UI.
- **Can run in parallel with:** CORE-003 after shared UI API agreement.
- **Expected Output:** Consistent accessible dialog behavior.
- **Acceptance Criteria:** Keyboard-only scenarios pass; focus never escapes an open dialog; screen readers receive names/errors; destructive confirmation remains explicit.
- **Tests Required:** QA-004 accessibility/keyboard tests and manual screen-reader spot check.
- **Integration Notes:** Shared modal refactor has moderate conflict; keep behavior incremental.
- **Complexity:** Medium.
- **Suggested Skill Type:** React accessibility.
- **Status:** NOT STARTED.

### UX-003 — Audit responsive and accessible presentation

- **Task ID:** UX-003
- **Title:** Verify responsive layouts, contrast, overflow, and chart alternatives
- **Area:** UX/QA
- **Goal:** Turn the observed compact-layout success into documented supported behavior.
- **Detailed Description:** Test around the 900 px breakpoint and common desktop sizes; inspect overflow, zoom, focus visibility, contrast, reduced motion, empty states, and non-visual access to chart totals/trends.
- **Files / Modules likely involved:** `src/index.css`, pages/components, audit notes/tests.
- **Dependencies:** CORE-001 for stable baseline.
- **Can run in parallel with:** SETUP-001, AUTH-001, BUG-001.
- **Expected Output:** Prioritized audit findings and scoped fixes/tests.
- **Acceptance Criteria:** No content/action is unreachable at supported sizes/zoom; critical WCAG issues are fixed or accepted.
- **Tests Required:** QA-004/005, keyboard checks, automated accessibility scan if chosen.
- **Integration Notes:** Audit first; split implementation into focused follow-ups if findings are broad.
- **Complexity:** Medium.
- **Suggested Skill Type:** Accessibility/responsive QA.
- **Status:** NOT STARTED.

## QA and CI

### QA-001 — Add the test harness

- **Task ID:** QA-001
- **Title:** Add minimal unit/component test infrastructure and scripts
- **Area:** QA/tooling
- **Goal:** Provide a fast deterministic test command for core and React code.
- **Detailed Description:** Select/install one runner and React test utilities, configure DOM environment/coverage/fixtures/fixed clock, and add documented npm scripts without changing product behavior.
- **Files / Modules likely involved:** `package.json`, `package-lock.json`, test config/setup, `SETUP.md`.
- **Dependencies:** SETUP-002.
- **Can run in parallel with:** Security design; not dependency work.
- **Expected Output:** `npm test` or approved equivalent with one representative passing test.
- **Acceptance Criteria:** Tests run locally and non-interactively; configuration supports TSX, fake time, and isolated storage.
- **Tests Required:** Self-test plus intentional-failure check.
- **Integration Notes:** High conflict with dependency files; land before other QA tasks.
- **Complexity:** Medium.
- **Suggested Skill Type:** Frontend test infrastructure.
- **Status:** NOT STARTED.

### QA-002 — Cover pure domain utilities

- **Task ID:** QA-002
- **Title:** Unit-test classification, filtering, totals, dates, and formatting
- **Area:** QA/unit
- **Goal:** Lock down financial rules and edge cases cheaply.
- **Detailed Description:** Add deterministic cases from `TESTING_STRATEGY.md` for transaction kinds, normalization, sums, fund formulas, dates, and formatting.
- **Files / Modules likely involved:** utility test files and fixtures.
- **Dependencies:** QA-001; CORE-003/UX-001 for final expected semantics.
- **Can run in parallel with:** QA-004 and SEC-001 after interfaces stabilize.
- **Expected Output:** Fast domain regression suite.
- **Acceptance Criteria:** Critical matrix cases pass with explicit expected values and no real user data.
- **Tests Required:** The new suite itself plus coverage report review.
- **Integration Notes:** Tests should expose ambiguity rather than encode unapproved semantics.
- **Complexity:** Medium.
- **Suggested Skill Type:** TypeScript unit testing.
- **Status:** NOT STARTED.

### QA-003 — Test context and storage integration

- **Task ID:** QA-003
- **Title:** Verify mutations, authentication state, persistence calls, and error outcomes
- **Area:** QA/integration
- **Goal:** Protect the application-state boundary.
- **Detailed Description:** Exercise load, add, delete, fulfill, repeat fulfill, reactivate, sign-in/out, password migration/change, and save failures with controlled storage adapters.
- **Files / Modules likely involved:** context/storage tests, fixtures, test adapters.
- **Dependencies:** QA-001, DATA-001/003, CORE-002; AUTH-002 for final auth cases.
- **Can run in parallel with:** QA-002, QA-004 by file partition.
- **Expected Output:** Deterministic integration coverage for state transitions.
- **Acceptance Criteria:** Return values and persisted snapshots match actual outcomes; link invariants survive reload.
- **Tests Required:** New integration suite.
- **Integration Notes:** Avoid testing React implementation details; share fixtures with QA-008.
- **Complexity:** Large.
- **Suggested Skill Type:** React/state integration testing.
- **Status:** NOT STARTED.

### QA-004 — Test component workflows and accessibility

- **Task ID:** QA-004
- **Title:** Cover login, forms, filters, details, fulfillment, reactivation, and dialogs
- **Area:** QA/component
- **Goal:** Verify user interactions independently of a full desktop runtime.
- **Detailed Description:** Use realistic user events to test validation, form success/failure, totals/list changes, filter states, protected actions, focus, keyboard, and error announcements.
- **Files / Modules likely involved:** component/page tests, render helpers.
- **Dependencies:** QA-001, CORE-001; final cases follow CORE-002, UX-002, DATA-003, AUTH-002.
- **Can run in parallel with:** QA-002/003 with separate files.
- **Expected Output:** Component-level workflow suite.
- **Acceptance Criteria:** All supported workflows have positive and negative cases; accessibility assertions cover modal behavior.
- **Tests Required:** New component suite.
- **Integration Notes:** Mock storage at the adapter boundary, not individual internal hooks.
- **Complexity:** Large.
- **Suggested Skill Type:** React Testing Library/accessibility.
- **Status:** NOT STARTED.

### QA-005 — Add browser end-to-end smoke tests

- **Task ID:** QA-005
- **Title:** Automate protected routing and actual/planned cross-view flows
- **Area:** QA/E2E
- **Goal:** Reproduce the successful manual browser audit on every suitable build.
- **Detailed Description:** Automate invalid/valid login, actual entry, planned entry/fulfillment, generated-record protection, graph/totals, filters, responsive viewport, and sign-out using fictional isolated data.
- **Files / Modules likely involved:** E2E config/tests, package scripts, CI artifacts.
- **Dependencies:** QA-001, stable CORE/BUG/UX behavior.
- **Can run in parallel with:** QA-006 once shared fixtures are agreed.
- **Expected Output:** Reliable browser smoke suite with failure screenshots/logs.
- **Acceptance Criteria:** Test starts from isolated storage, asserts values/URLs, and leaves no real/local user data.
- **Tests Required:** Run headless locally and in CI; intentional-failure artifact check.
- **Integration Notes:** Browser storage differs from Electron; do not treat this as desktop persistence proof.
- **Complexity:** Large.
- **Suggested Skill Type:** Browser automation/E2E.
- **Status:** NOT STARTED.

### QA-006 — Test Electron IPC and persistence

- **Task ID:** QA-006
- **Title:** Add Electron integration coverage for preload, IPC, disk, and reload
- **Area:** QA/Electron
- **Goal:** Verify the desktop-only trust and persistence boundary.
- **Detailed Description:** Use an isolated user-data directory to test load/save, schema rejection, write failure, backup recovery, renderer API exposure, reload persistence, CSP/navigation policy, and auth migration.
- **Files / Modules likely involved:** Electron integration tests/harness, main/preload modules, fixtures.
- **Dependencies:** QA-001, DATA-001/002/003, SEC-001/002; AUTH-002 for credential cases.
- **Can run in parallel with:** QA-005 after fixtures stabilize.
- **Expected Output:** Repeatable Electron integration suite.
- **Acceptance Criteria:** Tests never touch the user's real data directory; invalid IPC cannot mutate disk; valid data survives relaunch.
- **Tests Required:** New Electron suite on supported Windows environment.
- **Integration Notes:** Extract testable functions only as needed; avoid a main-process rewrite.
- **Complexity:** Large.
- **Suggested Skill Type:** Electron test automation.
- **Status:** NOT STARTED.

### QA-007 — Verify packaged installer lifecycle

- **Task ID:** QA-007
- **Title:** Run clean-machine install, launch, upgrade, uninstall, and retention smoke tests
- **Area:** QA/release
- **Goal:** Prove the artifact users receive, not only development mode.
- **Detailed Description:** Build from a known commit and test NSIS install, first launch, core flow, close/relaunch, upgrade from supported prior data, uninstall, data retention/removal policy, offline mode, and Windows trust/signing status.
- **Files / Modules likely involved:** Release evidence/checklist; product changes only for defects found.
- **Dependencies:** QA-005/006, REL-001, signing decision, clean build.
- **Can run in parallel with:** Final DOC-003 validation after candidate exists.
- **Expected Output:** Completed packaged smoke matrix with hashes and evidence.
- **Acceptance Criteria:** All approved cases pass on supported Windows versions/architectures; failures become linked bugs.
- **Tests Required:** Controlled VM/manual or automated packaged test.
- **Integration Notes:** Do not use the pre-existing unsigned artifact as authoritative.
- **Complexity:** Large.
- **Suggested Skill Type:** Windows release QA.
- **Status:** NOT STARTED.

### QA-008 — Test migrations and corruption recovery

- **Task ID:** QA-008
- **Title:** Build data compatibility and recovery fixture suite
- **Area:** QA/data
- **Goal:** Prevent upgrades or malformed input from losing financial history.
- **Detailed Description:** Create fictional fixtures for empty/current/legacy/missing-field/malformed/unsupported/partial-link data and assert migration, rejection, backup, and recovery outcomes.
- **Files / Modules likely involved:** fixture directory, schema/storage tests.
- **Dependencies:** QA-001, DATA-001/002/003; AUTH-002 for credential fixtures.
- **Can run in parallel with:** QA-002/003 using shared fixture conventions.
- **Expected Output:** Versioned compatibility suite.
- **Acceptance Criteria:** Every supported source version has expected output; corrupt/unsupported data remains recoverable and is never silently overwritten.
- **Tests Required:** New migration/recovery suite.
- **Integration Notes:** Fixtures contain no user data and become part of release compatibility policy.
- **Complexity:** Large.
- **Suggested Skill Type:** Data migration testing.
- **Status:** NOT STARTED.

### CI-001 — Add pull-request quality workflow

- **Task ID:** CI-001
- **Title:** Run clean install, lint, build, and tests in GitHub Actions
- **Area:** CI
- **Goal:** Block known-bad changes before merge.
- **Detailed Description:** Add a minimal pinned workflow for supported Node/npm with dependency caching, artifact-safe logs, timeouts, and required commands; add Electron jobs only where the runner supports them reliably.
- **Files / Modules likely involved:** `.github/workflows/ci.yml`, package scripts, docs.
- **Dependencies:** SETUP-002, QA-001; GitHub remote.
- **Can run in parallel with:** CI-002 after dependency contract stabilizes.
- **Expected Output:** Green required PR check.
- **Acceptance Criteria:** Clean PRs pass; controlled lint/build/test failures fail the check; secrets and user data are absent from artifacts.
- **Tests Required:** Workflow runs on test PR/branch before protection is required.
- **Integration Notes:** PM/admin must configure branch protection after workflow name is stable.
- **Complexity:** Medium.
- **Suggested Skill Type:** GitHub Actions/CI.
- **Status:** NOT STARTED.

### CI-002 — Add dependency and secret policy checks

- **Task ID:** CI-002
- **Title:** Automate dependency audit and repository hygiene policy
- **Area:** CI/security
- **Goal:** Detect vulnerable dependencies and accidental sensitive/generated files consistently.
- **Detailed Description:** Choose an audit/scanning method compatible with the registry environment, define severity/failure policy and exception process, and check for prohibited tracked paths/credential patterns.
- **Files / Modules likely involved:** CI workflow/config, security policy documentation.
- **Dependencies:** SETUP-001/002; GitHub remote; PM risk threshold.
- **Can run in parallel with:** CI-001 after setup stabilizes.
- **Expected Output:** Reproducible scan results and documented triage.
- **Acceptance Criteria:** A seeded prohibited file/finding is detected; false-positive exceptions are reviewed and time-bounded.
- **Tests Required:** Controlled CI validation.
- **Integration Notes:** Local `npm audit` was inconclusive due certificate failure; do not claim a clean baseline yet.
- **Complexity:** Medium.
- **Suggested Skill Type:** Supply-chain security/CI.
- **Status:** NOT STARTED.

## Performance and release

### PERF-001 — Resolve bundle-size warning

- **Task ID:** PERF-001
- **Title:** Measure and reduce or explicitly accept the main bundle size
- **Area:** Performance
- **Goal:** Address Vite's greater-than-500 kB minified chunk warning with evidence.
- **Detailed Description:** Analyze contribution from Recharts and routes, measure launch/load impact in Electron, then apply targeted route/chart lazy loading if useful or document an approved threshold.
- **Files / Modules likely involved:** `src/App.tsx`, chart import boundary, Vite config, package dependencies only if justified.
- **Dependencies:** SETUP-002; stable routes; no blocking product decision.
- **Can run in parallel with:** DOC-003 and release metadata work.
- **Expected Output:** Measured decision and no unexplained warning.
- **Acceptance Criteria:** Build output is below approved threshold or PM/engineering accept measured launch impact with rationale; behavior unchanged.
- **Tests Required:** Build size comparison, browser/Electron smoke, lazy-route test if changed.
- **Integration Notes:** Do not replace the chart library without evidence; avoid dependency conflict with QA work.
- **Complexity:** Medium.
- **Suggested Skill Type:** Frontend performance.
- **Status:** NOT STARTED.

### REL-001 — Finalize release metadata and support matrix

- **Task ID:** REL-001
- **Title:** Approve product identity, version, publisher, license, Windows targets, and icons
- **Area:** Release/product
- **Goal:** Ensure installer metadata is accurate and testable.
- **Detailed Description:** Resolve current placeholder author/version ambiguity, confirm package/app ID/product name, license/support contact, target Windows versions/architectures, and production icon assets.
- **Files / Modules likely involved:** `package.json`, assets, README/release docs, builder configuration.
- **Dependencies:** PM answers OQ-013/014/018.
- **Can run in parallel with:** AUTH-001, UX-001, SETUP-001 decision work.
- **Expected Output:** Approved release metadata specification and implementation PR.
- **Acceptance Criteria:** Installed application/file properties and documentation show approved consistent values.
- **Tests Required:** Package/build metadata inspection on candidate.
- **Integration Notes:** Coordinate version edits with SETUP-001; high conflict in `package.json`.
- **Complexity:** Medium.
- **Suggested Skill Type:** Product/release engineering.
- **Status:** BLOCKED / INPUT NEEDED.

### REL-002 — Implement or formally waive code signing

- **Task ID:** REL-002
- **Title:** Configure trusted Windows installer signing
- **Area:** Release/security
- **Goal:** Give users verifiable publisher provenance or document explicit risk acceptance.
- **Detailed Description:** Obtain/identify the approved certificate owner and secure CI signing method, configure electron-builder without committing secrets, timestamp artifacts, and verify Authenticode. If unsigned distribution is approved, document warnings and limitations.
- **Files / Modules likely involved:** protected CI secrets/settings, builder/release workflow, release docs.
- **Dependencies:** PM answer OQ-015, GitHub/CI environment, REL-001.
- **Can run in parallel with:** Late QA preparation, not final candidate build.
- **Expected Output:** Valid signed artifact or written PM waiver.
- **Acceptance Criteria:** Signature verifies to the approved publisher and private key never enters Git/logs, or waiver is explicit.
- **Tests Required:** Authenticode/timestamp verification on final artifact.
- **Integration Notes:** Requires external certificate authority/organizational ownership; never fabricate credentials.
- **Complexity:** Large.
- **Suggested Skill Type:** Windows code signing/release security.
- **Status:** BLOCKED / INPUT NEEDED.

### REL-003 — Produce and approve the release candidate

- **Task ID:** REL-003
- **Title:** Build, verify, document, checksum, and tag the release candidate
- **Area:** Release
- **Goal:** Create a traceable artifact from a known green commit.
- **Detailed Description:** Freeze scope, run all gates, build on a clean environment, complete packaged smoke/upgrade/recovery tests, record SHA-256/signing/build provenance, write release notes/known issues/rollback steps, obtain PM approval, and create the annotated tag/release.
- **Files / Modules likely involved:** release documentation/workflow; no new feature code.
- **Dependencies:** M1–M3, DOC-003, PERF-001 decision, REL-001/002, QA-007, GitHub remote.
- **Can run in parallel with:** None at final approval stage.
- **Expected Output:** Approved release artifact and immutable evidence tied to one commit/tag.
- **Acceptance Criteria:** `RELEASE_PLAN.md` checklist is complete; no unaccepted Critical/High issue; artifact hash/signature and rollback path are verified.
- **Tests Required:** Full automated suite and packaged release matrix.
- **Integration Notes:** PM-controlled final gate; do not publish during implementation tasks.
- **Complexity:** Large.
- **Suggested Skill Type:** Release management/QA.
- **Status:** BLOCKED / DEPENDENCIES.

## Suggested first five tasks

1. `SETUP-001` — unblock reproducible work and all dependency-touching tasks.
2. `AUTH-001` — settle the security promise before storing/migrating credentials.
3. `CORE-001` — capture behavior and eliminate baseline warnings before shared-core edits.
4. `QA-001` — immediately after SETUP-002, establish the regression harness.
5. `DATA-001` — define the safe persisted-data boundary before auth/persistence changes.

