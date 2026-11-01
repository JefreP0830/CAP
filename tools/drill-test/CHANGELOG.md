# Drill Evaluator changelog (tools/drill-test)

## 2026.10.31 (branch `drill-test/import`)

Source: Google AI Studio project "CAP Drill Evaluator" (v2026.07.12), imported as-is, then:

### Accuracy (CAPP 60-34, Sep 2024; text verified identical to the official PDF)
- Achievement numbers and names corrected: Ach 4 Rickenbacker (was "Wright Brothers - Part 1"), Wright Brothers Award placed between Ach 3 and 4, Ach 5 no honoree name, Ach 6 Doolittle.
- Achievement 7 is one 20-point test, 16 to pass; Problem #2 weighted 2-2-1-1-1-1-1-1; 1-of-2 partial credit on 2-point steps.
- Achievements 1, 2, 3 and Wright Brothers: standards replaced with the scorecard text (31 graded commands had been generic drill text); Ach 2 conditions corrected.
- Wright Brothers #47 Right, FACE reads "right", with a note that the pamphlet prints "left".

### Workflow
- Form takes only the cadet CAPID and proctor CAPID; email and unit fields removed. The app stores nothing on the phone.
- Hotwash: automatic "Commands to retrain" list from the scores, plus required Sustain and Improve lines (5 words minimum each).
- Finish screen: Save PDF and Share again, so a result is never stuck if no mail app opens.
- Achievement 7 answer keys (CAPP 60-34 pp.18-19) behind "Show answer key", tap to enlarge.

### Brand
- CAP palette and type from `shared/brand/cap-brand.css`; no icons, logo, animation or menu. Version shown top right.
- PDF: achievement as title, CAP subtitle, Ultramarine rule, S/U scores.

### Practice guides (replace the old Advanced Training items)
- Seven guides, each checked independently against its source: Squadron Formation, Guidon Bearer, Color Guard: Flag & Rifle Positions, Color Guard: Posting & Retrieving the Colors (CAPP 60-33, Nov 2025); Competition: Color Guard Standard Drill and Competition: Element Standard Drill (CAPP 60-75, Oct 2021); Change of Command (60-33 para 6.16, Figure 6.5).
- Figures are cut from the official PDFs. Photos of identifiable cadets are not included.
- Color Guard Standard Drill presentation-area diagram shown full width.

### Promotion scripts (third tab)
- 21 read-only scripts for pinning ceremonies, Achievement 1 through the Spaatz Award, grouped by phase; large type for reading aloud.
- Achievements with no CAP honoree go by their grade; where the grade does not change they are labelled "Ghost" (Achievements 9, 11, 12, 13, 16).
- From the squadron's cadet staff scripts (Oct 2026). Grades and honorees checked against CAP "Stripes to Diamonds": Achievement 5 has no honoree (the script had Lindbergh). Wording edits: "Phase II, the Leadership Phase" (was "and the"); Achievements 9 and 12 name their phase the same way; Achievement 15 "final phase" (was "highest phase").

### Publishing
- Published on GitHub Pages as one self-contained file: `tools/drill-test/app/index.html` (build with `npm run build:pages`), linked from the CAP Tools home page.
- Home-screen app icon in the Cadet Promotion Tracker style: a guidon with a gold finial, on Ultramarine (`public/icons/icon.svg`; generic mark, not a CAP emblem). No icons inside the app.
- Manifest paths made relative so the app installs from its Pages folder.

### Not yet done
- `server.ts` (Google Drive upload, unused by the app) and `src/services/geminiService.ts` (unused) still in the folder; to be removed with the hosting change.
