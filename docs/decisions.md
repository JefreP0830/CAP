# Standing decisions

| ID | Date | Decision | Why |
|---|---|---|---|
| D-001 | 2026-10-31 | No cadet or member data in this repo. Tools are code only; data stays on the squadron file share and loads at run time. | Rosters include minors' personal information. Git history is permanent. |
| D-002 | 2026-10-31 | CAP eServices is the source of truth. The promotion tracker is a read-only view of the weekly Cadet Full Track Report. | Removes manual transposition and the inconsistency it caused. |
| D-003 | 2026-10-31 | No manual notes or edits in the tracker. Corrections are made in eServices and appear in the next export. | Shared hand-edited files were the source of error. |
| D-004 | 2026-10-31 | Tools persist nothing in the browser. | Squadron PCs are shared machines. |
| D-005 | 2026-10-31 | One repo, one folder per tool. Shared brand tokens in `shared/`. Distribute as a single HTML file (GitHub Release) and, once public, via GitHub Pages. | One place to maintain; works offline and without installs. |
