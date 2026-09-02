# Milestones

## M0 — Team-ready baseline

**Objective:** Make the project safe to assign and reproducible from source.

**Why it exists:** There was no Git metadata or collaboration framework, and the dependency lockfile does not match the manifest.

**Dependencies:** PM decision on authoritative dependency versions; GitHub repository details for remote configuration.

**Deliverables:** Local `main` repository, ignore policy, PR/issue templates, planning/onboarding docs, synchronized dependency files, proven clean bootstrap.

**Implementation areas:** repository root, `.github/`, `docs/`, `package.json`, `package-lock.json`.

**Complexity:** Medium.

**Acceptance criteria:**

- Generated, secret, local, and user-data files are ignored.
- A new developer can follow `SETUP.md` from a clean checkout.
- `npm ls --depth=0`, lint, and build complete without dependency-invalid errors.
- `main` workflow and review rules are documented.
- The backlog and requirements traceability are internally consistent.

**Testing requirements:** Clean-clone/install check on supported Node; lint/build; secret/artifact ignore inspection.

**Completion definition:** `REPO-001`–`REPO-003`, `DOC-001`, `DOC-002`, `SETUP-001`, and `SETUP-002` are complete, and the GitHub remote/protection follow-up is assigned.

## M1 — Data integrity and local security

**Objective:** Protect finance data and define an honest, testable local access-control boundary.

**Why it exists:** The only data file is written non-atomically, accepts unvalidated renderer data, has no schema version, and stores the password in plaintext.

**Dependencies:** M0; `AUTH-001` PM decision before `AUTH-002`; `DATA-001` interface before persistence migration work.

**Deliverables:** Approved threat model, versioned schema/migrations, runtime validation, atomic save/backup/recovery behavior, surfaced storage errors, protected credential approach, Electron IPC/CSP/navigation hardening.

**Implementation areas:** `src/types.ts`, `src/context/AppContext.tsx`, `src/store/storage.ts`, `electron/main.js`, `electron/preload.js`, HTML/CSS as needed.

**Complexity:** Large.

**Acceptance criteria:**

- Existing valid user data loads without loss.
- Invalid/corrupt data produces a recoverable, user-visible state.
- Interrupted writes do not destroy the last known-good data.
- Renderer data is validated before disk write.
- Password/security claims match the implemented threat model.
- Electron blocks unapproved navigation/window creation and uses an explicit CSP.

**Testing requirements:** Schema/migration fixtures, corruption tests, storage error tests, IPC integration tests, credential migration tests, Electron manual security smoke test.

**Completion definition:** `DATA-001`–`DATA-003`, `AUTH-001`–`AUTH-002`, and `SEC-001`–`SEC-002` pass review and associated QA evidence.

## M2 — Financial correctness and usability

**Objective:** Preserve the current workflow while correcting known defects and resolving user-visible ambiguity.

**Why it exists:** Core flows work, but domain return values, local dates, chart labels, currency, terminology, calculation semantics, and modal accessibility need tightening.

**Dependencies:** M0; agreed persisted interfaces from M1 for shared-state changes; PM decisions for currency/terminology/chart semantics.

**Deliverables:** Baseline behavior specification, accurate/idempotent mutations, consistent formatting, local-date fix, readable chart ticks, approved wording/calculations, accessible dialogs and responsive verification.

**Implementation areas:** transaction/calculation utilities, context, graph, shared transaction board/modals, global styles.

**Complexity:** Medium.

**Acceptance criteria:**

- Actual and planned totals match approved formulas over edge-case fixtures.
- Invalid fulfill/reactivate/delete requests return accurate failure results and do not corrupt links.
- Default dates match the user's local calendar date.
- Chart axes are readable for small and large values.
- Approved currency/locale and terms are consistent across all screens.
- Core workflows are keyboard operable with appropriate focus and dialog semantics.

**Testing requirements:** Utility tests, component tests, time-zone tests, accessibility checks, browser E2E for actual/planned cross-view behavior.

**Completion definition:** `CORE-001`–`CORE-003`, `BUG-001`–`BUG-003`, and `UX-001`–`UX-003` are complete with PM acceptance for semantic choices.

## M3 — Automated quality gates

**Objective:** Make regressions visible before merge and release.

**Why it exists:** There are no tests or CI despite financial calculations, linked records, and local persistence risks.

**Dependencies:** M0 test/dependency baseline; the implementation being tested from M1/M2.

**Deliverables:** Test harness, unit/integration/component/E2E/Electron/migration suites, CI quality gate, dependency/security scan policy.

**Implementation areas:** test configuration and fixtures, `src/`, `electron/`, `.github/workflows/`, package scripts.

**Complexity:** Large.

**Acceptance criteria:**

- A single documented command runs all fast tests locally.
- CI runs install, lint, type/build, and tests on every PR.
- Critical financial and planned-link logic has deterministic coverage.
- Browser and Electron flows are both represented.
- Dependency findings fail or warn according to an approved severity policy.
- Test failures provide actionable artifacts without exposing local finance data.

**Testing requirements:** This milestone is the testing system; validate it by introducing controlled failing cases and observing CI failure before removal.

**Completion definition:** `QA-001`–`QA-008` and `CI-001`–`CI-002` are green on `main`.

## M4 — Release candidate

**Objective:** Produce and approve a controlled Windows release candidate.

**Why it exists:** A generated installer exists, but it is unsigned, outside source history, and lacks clean-build/install/upgrade evidence.

**Dependencies:** M1–M3; PM platform/signing/version decisions.

**Deliverables:** Final metadata/assets, bundle decision, signing outcome, end-user data/recovery guide, packaged smoke evidence, checksums, release notes, rollback/upgrade plan, annotated tag.

**Implementation areas:** electron-builder configuration, assets, documentation, release workflow/artifacts.

**Complexity:** Large.

**Acceptance criteria:**

- Installer is produced from a known clean commit and passes install/launch/upgrade/uninstall checks.
- Data retention and migration behavior are verified.
- Signing status is approved and accurately communicated.
- Release artifact checksum and provenance are recorded.
- No Critical/High issue remains unaccepted.
- Documentation reflects the shipped behavior and limitations.

**Testing requirements:** `QA-007` packaged smoke matrix, security checklist, clean-machine test, upgrade from supported prior data, rollback exercise.

**Completion definition:** `PERF-001`, `DOC-003`, and `REL-001`–`REL-003` are resolved; the PM marks release readiness accepted.

