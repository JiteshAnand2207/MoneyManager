# Release Plan

## Release target

The only evidenced distribution target is a Windows NSIS installer. macOS, Linux, auto-update, hosted deployment, and store distribution are not in approved scope.

## Versioning and branches

- Release from protected `main` only.
- Use semantic versions and annotated tags such as `v1.0.1`.
- Keep short-lived release-fix branches only when a release candidate needs an isolated correction.
- Ensure `package.json`, lockfile metadata, installer name, release notes, and tag agree.

The current `1.0.0` version is not trusted as a released baseline because no Git history/provenance exists and the inspected installer is unsigned.

## Release stages

1. **Scope freeze:** PM confirms supported requirements, currency/terms, security model, target Windows versions, and signing approach.
2. **Baseline green:** clean install, lint, build, all automated suites, and dependency policy pass.
3. **Data rehearsal:** back up fixtures; test legacy/current/corrupt migration and recovery.
4. **Candidate build:** build from a clean, identified commit in a controlled environment; sign if approved/configured.
5. **Candidate verification:** install, first launch, login, actual/planned flow, relaunch persistence, upgrade, uninstall, and retention tests.
6. **Evidence package:** record checksum, build environment, test results, signing identity/status, release notes, known issues, and rollback steps.
7. **Approval/tag:** PM signs off; create annotated tag and GitHub release only after a remote exists.
8. **Post-release:** retain source/tag/evidence and monitor reported data-loss/security issues with highest priority.

## Rollback

Before any upgrade, preserve the last known-good installer and a compatible data backup. If the candidate fails, stop distribution, restore the previous application version, and restore data only through a tested compatibility/recovery path. Never overwrite newer user data blindly with an older schema.

## Release readiness checklist

- [ ] Requirements and open decisions approved
- [ ] Manifest/lockfile synchronized; clean `npm ci` proven
- [ ] CI required checks green on release commit
- [ ] Data schema/version/migrations and recovery verified
- [ ] Security review complete; password claim accurate
- [ ] Browser and Electron E2E green
- [ ] Installer install/upgrade/uninstall matrix green
- [ ] Windows versions/architectures documented
- [ ] Product metadata, icon, author/publisher, license accurate
- [ ] Code signing applied or explicit risk acceptance recorded
- [ ] Dependency audit result recorded
- [ ] Bundle-size decision recorded
- [ ] User/data documentation current
- [ ] SHA-256 checksum generated
- [ ] Known issues and rollback steps published
- [ ] PM approval received

## Current blockers

Dependency drift, absent tests/CI, data-integrity gaps, unresolved security expectations, no verified packaged smoke test, absent remote/history, and unsigned release output.

