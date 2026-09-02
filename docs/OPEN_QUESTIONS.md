# Open Questions and Assumptions

## Product decisions needed

| ID | Question | Why it matters | Current assumption |
|---|---|---|---|
| OQ-001 | Are planned receivables/payables, fulfillment, and reactivation required product scope? | They are implemented but absent from the original README feature list. | Preserve behavior; do not expand/remove it. |
| OQ-002 | Is debt management intended? | Debt types, arrays, and CSS exist, but there is no UI/route or stated requirement. | Do not schedule feature implementation or delete dormant structures. |
| OQ-003 | What currency and locale are required? Single fixed value or user-configurable? | Every amount is hardcoded to USD/`en-US`. | Preserve USD until PM decision. |
| OQ-004 | Are “Income & Outcome,” “Paid,” “Total To Received,” and “Total To Paid” approved terms? | Wording is inconsistent/awkward and affects tests/docs. | Preserve current copy except obvious defect fixes after approval. |
| OQ-005 | Should chart profit be per-day or cumulative over the selected range? | Current points show daily profit while summary shows range total. | Treat current daily behavior as provisional. |
| OQ-006 | Should the default six-month filter hide older records, or should all-time/custom presets exist? | Users may mistake filtered totals for lifetime totals. | Keep current six-month default and label tests accordingly. |

## Security and data decisions needed

| ID | Question | Why it matters | Current assumption |
|---|---|---|---|
| OQ-007 | What threat model must the password satisfy? | Hashing, OS credential storage, encryption, recovery, and UX differ materially. | Current password is only a convenience gate and must not be called secure. |
| OQ-008 | Is financial-data encryption at rest required? | Password hashing alone does not protect the JSON contents. | Not assumed; decision required before architecture. |
| OQ-009 | What backup/export/recovery behavior is required? | Local-only data is vulnerable to corruption/device loss. | Implement safe internal backup/recovery; do not add export/cloud sync without approval. |
| OQ-010 | What should happen to user data on uninstall? | Release testing and user trust require an explicit retention policy. | Preserve user data unless the user explicitly requests removal. |
| OQ-011 | Is browser mode a supported product or development convenience only? | Security/storage behavior differs from Electron. | Treat as development convenience; test enough to protect UI logic. |

## Release and repository decisions needed

| ID | Question | Why it matters | Current assumption |
|---|---|---|---|
| OQ-012 | Which `concurrently`, `electron`, and `uuid` versions are authoritative: manifest ranges or lockfile resolutions? | Clean installs are currently not reproducible. | Do not choose silently; resolve in SETUP-001. |
| OQ-013 | Is `1.0.0` already released, or is the existing installer only a local prototype? | Determines next version and migration/support commitments. | Treat it as an unverified prototype artifact. |
| OQ-014 | Which Windows versions and CPU architectures are supported? | Drives installer/test matrix. | Only x64 output is evidenced; no support promise inferred. |
| OQ-015 | Must releases be code-signed, and who owns the certificate? | Current installer is unsigned. | Production release needs signing or explicit PM risk acceptance. |
| OQ-016 | What GitHub organization/repository URL should be used, and who administers branch protection? | No remote exists. | Initialize local `main`; do not create/push a remote. |
| OQ-017 | Who are the developers, reviewers, and specialties/capacity? | Needed to populate assignments and sequence shared-file work. | Leave assignments empty. |
| OQ-018 | What license, publisher/author name, support contact, and final product identity should ship? | Current author is the placeholder `User`; release metadata is incomplete. | Do not invent values. |

## Verification questions

- Does the existing Windows installer launch and persist data correctly on a clean machine?
- Does an upgrade preserve existing `money-manager-data.json` content?
- Does reactivation behave correctly with legacy or malformed link fields?
- Should the external Google Fonts request be removed for a fully offline/privacy-preserving build?
- Is any original requirements/design material missing from this session?

