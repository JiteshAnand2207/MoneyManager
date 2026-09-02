# LuckyDragon Master Plan

## Mission

Turn the existing working LuckyDragon prototype into a reproducible, regression-protected, data-safe Windows desktop release without rebuilding functioning features or expanding product scope without approval.

## Current baseline

The core browser experience works and the application builds. The project is not release-ready because clean dependency installation is not reproducible, sensitive data is weakly protected, persistence lacks recovery guarantees, automated tests/CI are absent, and the desktop installer has not been signed or smoke-tested from a controlled build.

## Delivery principles

- Preserve observable behavior unless a requirement or approved fix says otherwise.
- Resolve product/security decisions before implementing them.
- Put data compatibility and recovery ahead of cosmetic improvements.
- Add tests around existing behavior before risky shared-core changes.
- Keep work in small task branches from protected `main`.
- Sequence tasks that modify persisted types, `AppContext`, or dependency files.
- Keep generated outputs and local financial data out of Git.

## Milestone sequence

| Milestone | Outcome | Complexity | Depends on |
|---|---|---|---|
| M0 — Team-ready baseline | Reproducible checkout, governance, and authoritative docs | Medium | PM decisions on dependency versions for full completion |
| M1 — Data integrity and local security | Defined threat model, safe schema/persistence, hardened Electron boundary | Large | M0; PM security decision |
| M2 — Financial correctness and usability | Known defects fixed and user-visible semantics approved | Medium | M0; schema interface from M1 where relevant |
| M3 — Automated quality gates | Unit through packaged-flow tests and CI protect the product | Large | M0; affected M1/M2 implementation |
| M4 — Release candidate | Controlled, documented, verified Windows release artifact | Large | M1–M3; signing/platform decisions |

Detailed objectives, deliverables, acceptance criteria, and completion definitions are in `MILESTONES.md`. All 37 tasks are in `TASK_BREAKDOWN.md`.

## Critical dependency chain

```text
SETUP-001 lockfile decision/sync
  -> SETUP-002 clean bootstrap
  -> QA-001 test harness
  -> DATA-001 versioned schema
  -> DATA-002 safe persistence
  -> QA-006 Electron persistence tests
  -> QA-007 packaged installer smoke test
  -> REL-003 release candidate and tag
```

Security runs alongside the data chain after a PM decision:

```text
AUTH-001 threat model
  -> AUTH-002 credential protection
  -> QA-003/QA-004/QA-006
  -> CI-001
  -> REL-003
```

## Immediate parallel work

After assigning owners, these can begin with limited overlap:

- `SETUP-001` — one owner only for `package.json`/`package-lock.json`.
- `AUTH-001` — PM/engineering decision document; no implementation until approved.
- `CORE-001` — record regression behavior and remove existing lint warnings without changing semantics.
- `BUG-003` — chart tick fix, primarily isolated to `GraphPage.tsx`.
- `UX-003` — accessibility/responsive audit, initially read-only evidence.
- `DOC-003` — end-user data/security/recovery guidance based on approved behavior.
- `REL-001` — collect release metadata decisions without changing packaging yet.

Do not run `DATA-001`, `CORE-002`, and `AUTH-002` concurrently without first agreeing on the `AppData`/context interface; all are likely to touch shared core files.

## Integration strategy

1. Land dependency and baseline test infrastructure first.
2. Establish persisted schema/migration interfaces in a narrow PR.
3. Rebase security, persistence, and context mutation work onto that interface.
4. Run cross-view tests for every planned/actual linkage change.
5. Add Electron-specific tests before packaging.
6. Cut a release candidate only from a green `main` with documented product decisions.

High-conflict files and ownership guidance are detailed in `DEPENDENCY_MAP.md`.

## PM control points

PM approval is required before:

- accepting or dropping planned transactions as contractual scope;
- implementing the credential/data protection model;
- choosing currency, locale, calculation semantics, or terminology;
- adding debt management or any unsupported feature;
- changing persisted data in a backward-incompatible way;
- publishing an unsigned installer or selecting release platforms;
- tagging a release candidate as production-ready.

## Definition of project release readiness

- Supported requirements are accepted and mapped to passing evidence.
- All Critical/High findings in `CURRENT_STATUS.md` are closed or explicitly accepted.
- A clean checkout installs, lints, tests, builds, and packages on a documented environment.
- Existing local data survives upgrade/migration tests with recovery available.
- Core browser and Electron workflows pass automated and manual smoke tests.
- The installer has an approved signing status, checksum, release notes, and rollback instructions.
- Documentation matches the shipped product and known issues are explicit.
- `main` is protected, required checks are enforced, and the release tag points to the verified commit.

## Planning validation

The final cross-check found coverage for all README features and all material implemented workflows. Existing features are represented as regression/hardening work rather than rebuild tasks. The plan includes repository setup, product decisions, data and security work, UX/correctness fixes, tests at multiple levels, CI, integration, documentation, packaging, and release evidence. Unsupported scope remains excluded or explicitly blocked.

