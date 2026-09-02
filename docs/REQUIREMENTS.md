# Requirements and Traceability

## Source policy

The source of truth available for this planning pass consists of the user-provided planning brief, the pre-existing README, source/configuration files, generated build/package artifacts, and observed behavior. No separate product specification, design file, API contract, or deployment document was present. Requirements below are labeled by source; implementation-derived behavior is not promoted to contractual scope without PM confirmation.

## Functional requirements

| ID | Requirement | Source | Current state |
|---|---|---|---|
| FR-001 | Provide a desktop personal-finance application for a local user. | README, package configuration | Partially complete; app and Windows packaging exist, packaged runtime needs verification. |
| FR-002 | Require a password at startup and allow sign-out. | README, routes/UI | Implemented and browser-verified; security strength is inadequate. |
| FR-003 | Allow the user to change the password. | README, UI/context | Implemented; UI verified, submission not re-exercised during audit, plaintext storage remains. |
| FR-004 | Record actual received income and paid withdrawals/outcomes. | README, implementation | Implemented and add-income path browser-verified. |
| FR-005 | Capture date, positive amount, type, counterparty/details for a transaction. | README plus implementation fields | Implemented; validation is client-side only. |
| FR-006 | Review actual records in separate received and paid views. | README, implementation | Implemented and browser-verified. |
| FR-007 | Filter relevant views by date range. | README, implementation | Implemented; default is the last six months. |
| FR-008 | Filter transaction views by counterparty. | Implementation-derived | Implemented; contractual status needs confirmation. |
| FR-009 | Show actual income, expenditure, and profit totals and a trend chart. | README, implementation | Implemented and browser-verified; chart tick formatting has a known defect. |
| FR-010 | Track planned money to receive and money to pay. | Implementation-derived | Implemented and browser-verified; not named in original README feature list. |
| FR-011 | Fulfill a planned record by preserving it as processed and creating a linked protected actual record. | Implementation-derived | Implemented; main flow browser-verified. |
| FR-012 | Reactivate a processed plan by removing its linked actual record and making the plan pending. | Implementation-derived | Implemented in code; needs automated/integration verification. |
| FR-013 | Prevent direct deletion of processed planned records and auto-generated actual records. | Implementation-derived | Implemented; auto-generated protection browser-verified. |
| FR-014 | Display actual/planned fund summaries and a calculated net position. | Implementation-derived | Implemented; labels/formulas require PM confirmation. |
| FR-015 | Persist data locally across sessions. | README, Electron/browser storage | Implemented in principle; Electron persistence and recovery need verification/hardening. |
| FR-016 | Build a Windows installer into `release/`. | README, electron-builder config | Build path exists; prior artifact is unsigned and not release-verified. |

## Non-functional requirements supported by the material

| ID | Requirement | Source | Current state |
|---|---|---|---|
| NFR-001 | Preserve working implementation and make incremental changes. | Planning brief | Required delivery constraint. |
| NFR-002 | Keep credentials/secrets and generated/local artifacts out of Git. | Planning brief | Ignore rules prepared; Git has no history yet, so historical scan is not applicable. |
| NFR-003 | Maintain data integrity between planned and actual records. | Existing link/protection logic | Partial; no schema validation, migration, atomic write, or test coverage. |
| NFR-004 | Provide a practical multi-developer Git/PR workflow. | Planning brief | Documentation/templates prepared; remote branch protection cannot be configured until a GitHub repository exists. |
| NFR-005 | Include automated unit, integration, UI, and release testing appropriate to risk. | Planning brief | Not started. |
| NFR-006 | Make setup and builds reproducible. | Planning brief | Blocked by dependency manifest/lockfile drift. |
| NFR-007 | Protect local financial data and credentials. | README's “secure” wording plus planning brief | Not satisfied; threat model and implementation need decisions/work. |
| NFR-008 | Support responsive use at the existing 900 px breakpoint. | Styles/implementation-derived | Browser-verified at 800 px; formal accessibility/responsive coverage absent. |
| NFR-009 | Produce a controlled, verifiable desktop release. | README/build config plus planning brief | Partial; signing, clean build, packaged smoke test, checksum, and rollback evidence are missing. |

## Explicitly out of scope or unsupported by current sources

These items must not be assumed: cloud sync, remote accounts, multi-user roles, bank import, budgets, recurring transactions, category/tag management, export/import, mobile apps, macOS/Linux packaging, notifications, analytics, telemetry, localization, or external finance integrations.

Debt data types and extensive debt-related CSS are present, but there is no debt UI, route, behavior, or README requirement. Debt management is `BLOCKED / UNCLEAR`, not automatically scheduled as a feature.

## Requirement-to-task traceability

| Requirement | Source | Task(s) | Status |
|---|---|---|---|
| FR-001 | README/package | SETUP-002, QA-006, QA-007, REL-001, REL-003 | Needs verification |
| FR-002 | README/UI | CORE-001, AUTH-001, AUTH-002, QA-004, QA-005 | Partially complete |
| FR-003 | README/UI | AUTH-001, AUTH-002, QA-004 | Partially complete |
| FR-004 | README/code | CORE-001, QA-002, QA-004, QA-005 | Implemented; regression coverage missing |
| FR-005 | README/code | CORE-001, SEC-001, QA-004 | Implemented; boundary validation missing |
| FR-006 | README/code | CORE-001, QA-004, QA-005 | Implemented; regression coverage missing |
| FR-007 | README/code | CORE-001, BUG-001, QA-002, QA-005 | Implemented; date edge cases open |
| FR-008 | Code | CORE-001, QA-004 | Implemented; PM confirmation requested |
| FR-009 | README/code | BUG-003, CORE-003, QA-002, QA-005 | Partially complete |
| FR-010 | Code | CORE-001, UX-001, QA-004, QA-005 | Implemented; scope confirmation requested |
| FR-011 | Code | CORE-002, QA-003, QA-004, QA-005 | Implemented; hardening/tests missing |
| FR-012 | Code | CORE-002, QA-003, QA-004, QA-005 | Needs verification |
| FR-013 | Code | CORE-002, QA-003, QA-004 | Partially verified |
| FR-014 | Code | CORE-003, UX-001, QA-002, QA-005 | Needs product verification |
| FR-015 | README/storage | DATA-001, DATA-002, DATA-003, QA-003, QA-006, QA-008 | Partially complete |
| FR-016 | README/build config | SETUP-002, QA-007, REL-001, REL-002, REL-003 | Needs verification |
| NFR-001 | Planning brief | All tasks; review/merge rules | Active constraint |
| NFR-002 | Planning brief | REPO-002, CI-002 | Prepared; CI check remains |
| NFR-003 | Code/brief | DATA-001, DATA-002, CORE-002, QA-003, QA-008 | Not satisfied |
| NFR-004 | Planning brief | REPO-001, REPO-003, DOC-001, DOC-002 | Locally prepared; remote pending |
| NFR-005 | Planning brief | QA-001 through QA-008, CI-001 | Not started |
| NFR-006 | Planning brief | SETUP-001, SETUP-002, CI-001 | Blocked by lockfile drift |
| NFR-007 | README/brief | AUTH-001, AUTH-002, SEC-001, SEC-002, CI-002 | Not satisfied |
| NFR-008 | CSS/code | UX-002, UX-003, QA-005 | Partially verified |
| NFR-009 | README/brief | QA-007, REL-001, REL-002, REL-003 | Not release-ready |

## Coverage validation result

Every supported major requirement maps to at least one backlog task. Existing functionality is scheduled for regression protection and targeted hardening, not blanket rebuilding. Testing, integration, security, documentation, and release work are represented. Unsupported feature ideas remain out of scope or in `OPEN_QUESTIONS.md`.

