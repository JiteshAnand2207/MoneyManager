# Contributing to LuckyDragon

## Before starting

1. Read `docs/PROJECT_OVERVIEW.md`, `docs/ARCHITECTURE.md`, and the task entry in `docs/TASK_BREAKDOWN.md`.
2. Confirm the task owner and dependencies in `docs/TEAM_ASSIGNMENTS.md` and `docs/PM_DASHBOARD.md`.
3. Do not start a task marked `BLOCKED / INPUT NEEDED`.
4. Flag scope that is not supported by `docs/REQUIREMENTS.md`; do not silently expand the product.
5. Pull the latest `main` before creating a branch.

## Branches

`main` is the default and protected branch. A long-lived `development` branch is not recommended for the current small team; add one only if release trains later require it.

Use one short-lived branch per task:

- `feature/<task-id>-short-description`
- `fix/<task-id>-short-description`
- `test/<task-id>-short-description`
- `docs/<task-id>-short-description`
- `chore/<task-id>-short-description`

Examples: `feature/core-002-mutation-results`, `fix/bug-003-chart-ticks`.

Create a branch from current `main`:

```bash
git switch main
git pull --ff-only
git switch -c fix/bug-003-chart-ticks
```

## Commits

Use focused commits with the task ID:

```text
feat(CORE-002): return accurate mutation results
fix(BUG-003): format small chart axis values
test(QA-002): cover transaction calculations
docs(DOC-003): document data recovery
chore(SETUP-001): synchronize dependency lockfile
```

Do not mix unrelated formatting, generated artifacts, or dependency upgrades into a feature commit. Never commit `.env` files, credentials, `node_modules/`, `dist/`, `release/`, test reports, or local finance data.

## Staying current

Before requesting review:

```bash
git fetch origin
git rebase origin/main
npm run lint
npm run build
```

Run task-specific tests once the test harness exists. If a rebase conflicts, resolve only files understood by the task owner, rerun checks, and ask the owner of shared/core files to review the resolution. Do not force-push another developer's branch.

High-conflict files are `src/context/AppContext.tsx`, `src/types.ts`, `src/index.css`, `package.json`, `package-lock.json`, `README.md`, and PM status documents. Coordinate ownership before changing them.

## Pull requests

- Open a focused PR linked to one primary task ID.
- Complete the PR template and include evidence for every acceptance criterion.
- Keep generated output out of the PR unless a release task explicitly requires it.
- Require at least one engineering approval and passing required checks.
- Require review from the owner of any shared/core file touched.
- Use squash merge into `main` unless preserving separate commits materially improves traceability.
- Delete the feature branch after merge.

PM approval is required when a PR changes product scope, user-visible financial calculations, persisted data shape, authentication behavior, release configuration, or accepted terminology/currency. Routine fixes that stay inside approved acceptance criteria need engineering review but not an extra PM gate.

## Integration and conflicts

Integration testing occurs on each PR for the affected workflow and on `main` before a release candidate. Changes to data shape must include migration/compatibility tests. Changes to planned transactions must verify both planned and actual views. Changes to Electron persistence must be tested in Electron, not only a browser.

If two tasks need the same shared file, prefer sequencing them. When parallel work is unavoidable, agree on a small interface first, land the interface change, then rebase both branches.

## Releases

Release candidates are built from `main` after the release-readiness checklist passes. Use annotated semantic-version tags such as `v1.0.1`. Record test evidence, known issues, installer checksum, upgrade/rollback notes, and signing status. Do not publish an unsigned installer as a trusted production release without an explicit PM decision.

