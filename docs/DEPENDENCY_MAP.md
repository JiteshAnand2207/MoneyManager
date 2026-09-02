# Dependency and Parallelization Map

## Critical path

```text
SETUP-001 -> SETUP-002 -> QA-001 -> DATA-001 -> DATA-002
                                      |             |
                                      v             v
                                    QA-008        QA-006 -> QA-007 -> REL-003
```

Security gate:

```text
AUTH-001 -> AUTH-002 -> QA-003/QA-004/QA-006 -> CI-001 -> REL-003
```

Product semantics gate:

```text
currency + terminology + chart decisions
       |              |             |
    CORE-003        UX-001        BUG-003
       \              |             /
             QA-002/QA-004/QA-005
```

## Task dependency summary

| Task/group | Must follow | Enables |
|---|---|---|
| SETUP-001 | PM/engineering version choice | SETUP-002, QA-001, CI-001, CI-002 |
| SETUP-002 | SETUP-001 | Reliable onboarding and CI |
| AUTH-002 | AUTH-001, DATA-001 | Auth tests and release security sign-off |
| DATA-002 | DATA-001 | QA-006, QA-007 |
| DATA-003 | DATA-001 | QA-003, QA-006 |
| CORE-002 | CORE-001; coordinate with DATA-001 | QA-003, QA-004, QA-005 |
| CORE-003 | PM currency/chart decision | QA-002, QA-004, QA-005 |
| QA-001 | SETUP-002 | QA-002, QA-003, QA-004, QA-008, CI-001 |
| QA-005 | QA-001 and stable M2 behavior | Release browser evidence |
| QA-006 | DATA-001/002/003, SEC-001, QA-001 | QA-007 |
| QA-007 | QA-005, QA-006, REL-001, signing decision recorded | REL-003 |
| CI-001 | SETUP-002, QA-001 | Protected-branch required checks |
| REL-003 | All release-blocking tasks | Production tag/release |

## Safe parallel lanes

| Lane | Tasks | Notes |
|---|---|---|
| Dependency baseline | SETUP-001 -> SETUP-002 | One owner; lockfile has very high conflict risk. |
| Product decisions | AUTH-001, UX-001, REL-001 | PM-led; can proceed together. |
| Isolated correctness | BUG-001, BUG-003 | Separate files if BUG-001 uses a new date utility. |
| Audit/documentation | UX-003, DOC-003 | Evidence work can start before implementation. |
| Security design | SEC-001, SEC-002 | Can design together; coordinate Electron file ownership. |
| Test planning | CORE-001, QA-001 | Can draft concurrently, but package scripts/config must be owned by QA-001. |

## Sequential/shared-core work

| Shared area | Tasks likely to collide | Coordination rule |
|---|---|---|
| `package.json`, `package-lock.json` | SETUP-001, QA-001, CI-002, PERF-001 | Land SETUP-001 first; one dependency owner at a time. |
| `src/types.ts` | DATA-001, AUTH-002, CORE-002 | DATA-001 defines the versioned interface first. |
| `src/context/AppContext.tsx` | DATA-001/003, AUTH-002, CORE-002, QA-003 | Agree on interfaces; sequence implementation PRs. |
| `src/store/storage.ts` | DATA-001/003, QA-003 | Land validation contract before error UI tests. |
| `electron/main.js`, `preload.js` | DATA-002/003, SEC-001/002, QA-006 | Partition by agreed IPC/storage functions or sequence. |
| `src/index.css` | SEC-002, UX-002/003 | Use small scoped changes and rebase immediately before review. |
| `GraphPage.tsx` | BUG-003, CORE-003, QA-005 | Approve formatting semantics, then land fix before E2E snapshots. |
| PM docs | All status updates | PM or designated release coordinator owns final merges. |

## Integration test triggers

- Any transaction model/status change: actual + planned component and E2E suites.
- Any fulfillment/reactivation change: verify both sides of the link and reload persistence.
- Any data schema/storage change: legacy, current, corrupt, write-failure, and Electron tests.
- Any auth change: first run, legacy password migration, correct/incorrect login, change password, relaunch.
- Any chart/calculation change: utility fixtures plus browser totals/chart checks.
- Any Electron/security change: development Electron smoke plus packaged smoke before release.

