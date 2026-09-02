# PM Dashboard

Last updated: 2026-09-02

## PROJECT STATUS

| Field | Value |
|---|---|
| Current Milestone | M0 — Team-ready baseline |
| Overall Status | At risk: planning/repository structure is ready, but dependency reproducibility and product/security decisions block implementation sequencing |
| Major Blockers | Manifest/lockfile drift; no GitHub remote; unresolved threat model, currency/terminology, debt scope, release metadata/signing |
| Integration Risks | Shared `AppContext`/types/storage files; planned-to-actual link integrity; destructive migrations; Electron-only persistence; dependency-file conflicts |

## TEAM PROGRESS TABLE

| Task ID | Task | Owner | Branch | Status | Dependencies | PR | Notes |
|---|---|---|---|---|---|---|---|
| REPO-001 | Initialize local Git baseline | Unassigned | — | Completed | None | — | Local `main`; no remote/commit |
| REPO-002 | Harden ignore/secret hygiene | Unassigned | — | Completed | None | — | Generated directories ignored |
| REPO-003 | Add collaboration templates | Unassigned | — | Completed | DOC-001 vocabulary | — | Configure labels later |
| DOC-001 | Create PM planning docs | Unassigned | — | Completed | Audit | — | 38-task backlog |
| DOC-002 | Update onboarding docs | Unassigned | — | Completed | DOC-001 | — | Revisit after setup/tests |
| SETUP-001 | Synchronize manifest/lockfile | Unassigned | — | Not Started | OQ-012/013 | — | First engineering priority |
| AUTH-001 | Define security threat model | Unassigned | — | Blocked | PM input | — | Product/security decision |
| CORE-001 | Capture behavior and clear warnings | Unassigned | — | Not Started | SETUP-002 for tests | — | Specs can begin now |
| QA-001 | Add test harness | Unassigned | — | Blocked | SETUP-002 | — | Dependency-file conflict |
| DATA-001 | Version/validate persisted data | Unassigned | — | Blocked | SETUP-002, AUTH-001 coordination | — | High-risk shared interface |

Use `TASK_BREAKDOWN.md` for the complete backlog. Add rows here when tasks are assigned or enter the integration queue; do not duplicate all 38 tasks unless active tracking needs it.

## MILESTONE PROGRESS

| Milestone | Total Tasks | Completed | In Progress | Blocked | Remaining |
|---|---:|---:|---:|---:|---:|
| M0 — Team-ready baseline | 7 | 5 | 0 | 1 | 1 |
| M1 — Data integrity and local security | 7 | 0 | 0 | 2 | 5 |
| M2 — Financial correctness and usability | 9 | 0 | 0 | 2 | 7 |
| M3 — Automated quality gates | 10 | 0 | 0 | 0 | 10 |
| M4 — Release candidate | 5 | 0 | 0 | 3 | 2 |
| **Total** | **38** | **5** | **0** | **8** | **25** |

## INTEGRATION QUEUE

| PR / Task | Developer | Depends On | Review Status | Integration Status |
|---|---|---|---|---|
| — | — | — | No PRs | Queue empty |

## RELEASE READINESS

| Area | State | Evidence / gap |
|---|---|---|
| Requirement Coverage | Partial | All supported requirements mapped; several product decisions open |
| Tests | Not ready | Manual browser smoke passed; no automated tests, Electron or installer test |
| Security | Not ready | Plaintext password; IPC/CSP/data durability gaps; audit inconclusive |
| Documentation | Planning-ready | PM/developer docs prepared; end-user recovery guide remains |
| Deployment | Not ready | Windows packaging exists; clean build/provenance/signing absent |
| Known Issues | Open | See `CURRENT_STATUS.md` and `OPEN_QUESTIONS.md` |

## NEXT PM ACTIONS

1. Answer OQ-001–OQ-018, prioritizing dependency versions, threat model, currency/terms, and release identity.
2. Provide developer names, specialties, capacity, and reviewers.
3. Provide/approve the GitHub repository URL and branch-protection administrator.
4. Assign `SETUP-001`, `AUTH-001`, and `CORE-001` first; queue QA-001 immediately after clean setup.
5. Do not approve a production release until M1–M4 gates are satisfied.

