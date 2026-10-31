# CAP repo - working rules

- Load the `cap-ecosystem` skill for CAP norms, branding and citation rules.
- **No cadet or member data in this repo, ever.** No rosters, CAPIDs, names,
  emails, or exports, including as test fixtures. Test with synthetic rows
  (CAPID 000001-style, example.com emails) or with real exports kept outside
  the repo.
- Run `scripts/pii-scan.sh --all` before every push.
- Tools are single self-contained HTML files that run in the browser, read
  files the user selects, and persist nothing (no localStorage, no IndexedDB,
  no self-saving HTML).
- eServices is the source of truth. Tools are read-only views of an export;
  they do not accept manual edits or notes (docs/decisions.md).
- Colors come from `shared/brand/cap-brand.css`. Requirement rules cite the
  current CAP publication to the paragraph.
- Each tool keeps a CHANGELOG.md; one logical change per commit.
