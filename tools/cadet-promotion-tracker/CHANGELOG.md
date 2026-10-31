# Changelog

## 0.8.1 - 2026-10-31
Weekly report styling.
- Section titles and column labels medium grey; data rows black.
- Count shown as "TITLE : 5" with the number in black at title size.
- Each section ordered by achievement, then cadet last name.

## 0.8.0 - 2026-10-31
- "Print weekly packet" is now "Print weekly report": one report with four
  sections, each with a count: To Be Pinned (rank to be pinned), Proctored
  Test Needed (achievement), Drill Test Needed (achievement), Ready to Promote
  (rank to be recognized). CAPID and cadet name on every line; columns align
  across sections. The roster prints separately (All cadets > Print this view).

## 0.7.0 - 2026-10-31
Print fixes after a physical test print (Canon office laser).
- Margins built into the page: 0.4 in top/bottom, 0.3 in sides, identical
  whatever the print dialog's Margins setting; clears the printer's
  unprintable edge.
- Printed roster titled "Cadet Promotion Tracker".
- In print, CAPID, cadet name and progress % are larger than the rest of the
  row, matching the screen.
- Tile legend prints at the foot of every roster page.

## 0.6.8 - 2026-10-31
- Screen title enlarged (20pt to 28pt).

## 0.6.7 - 2026-10-31
- Print keeps a ~0.1 in gap on every edge of every page even when the print
  dialog is set to Margins: None (spacer rows repeat with the table header
  and footer).

## 0.6.6 - 2026-10-31
- Printed roster opens with the six KPI tiles under the title (first page only).

## 0.6.5 - 2026-10-31
- Print margin 0.1 in, plus a 0.1 in side inset that holds even when the
  print dialog is set to Margins: None.

## 0.6.4 - 2026-10-31
- Print: letter landscape (11 x 8.5 in), 0.25 in margins. Only the column
  header row repeats on each new page; rows never split across pages.

## 0.6.3 - 2026-10-31
- "Next grade" header renamed "Next"; grade set at the Achv size (bold, blue).

## 0.6.2 - 2026-10-31
- Progress and Eligible tightened; the freed width goes to the Cadet column.

## 0.6.1 - 2026-10-31
- Requirements column set apart with equal space on both sides; tiles stay
  on one line. Extra space between Progress and Eligible.

## 0.6.0 - 2026-10-31
- Tiles limited to L A D F C P ORL WRT. S (Welcome Course, encampment,
  leadership academy) removed; those are not tracked.
- Not-required tiles toned down to light grey.
- Grade column removed; Next grade and Achv are separate aligned columns.
  Milestones abbreviated WB, MIT, EHRT, EAKR, SPTZ.
- Progress centered; eligible date set smaller.

## 0.5.0 - 2026-10-31
- Every cadet shows the same tile block, left to right:
  L A D F C P ORL WRT S. Tiles not required for the cadet's achievement are
  dark grey and excluded from progress.
- SVC, ESY and SPH removed: ORL covers SDA presentation or speech, WRT covers
  SDA writing or essay (both stand in for staff service).
- S = special: Welcome Course (Ach 1), encampment (Mitchell), leadership
  academy (Eaker). W tile removed; C covers the Wingman Course at Ach 1.
- Report card moved to one control at the top: pick a cadet, or all cadets
  in the current view (one page each).
- "Done" renamed "Progress".

## 0.4.0 - 2026-10-31
Layout and print refinements.
- KPI tiles (cadets, ready, to be pinned, proctored, drill, stalled) replace
  the filter buttons; click one to filter.
- Single-letter tiles: L, A, D, F, C, W (Wingman + Welcome, Ach 1), P
  (participation & inspection; replaces DC). SDA tiles SVC, WRT, ORL.
- Time-in-grade tile removed; Eligible column shows the date with a
  countdown box, a red +days box when past, or Ready.
- Ready now also requires the eligible date to be reached.
- Progress shows the percent only. Text legend. Source line and search removed.
- Report card: one-page progress report per cadet for parents.

## 0.3.0 - 2026-10-31
Rebuilt from scratch on a cited rules table (D-002).
- Requirement tiles per achievement: grey until eServices shows a date or
  value, then filled. Percent complete per cadet.
- Rules from CAPR 60-1 (18 Aug 2025) and CAPVA 60-101a/b; Achievements 15-16
  added; drill stops after Achievement 8 / Wright Brothers.
- DC tile = Deputy Commander sign-off (participation, oath, leadership
  expectations, uniform).
- Stalled (56+ days past eligible, not ready) shown on the roster.
- To be pinned: load last week's export with this week's; promotions between
  them are listed. Pinned column removed.
- Reports: roster, to be pinned, proctored tests, drill tests, ready to
  promote; "Print weekly packet" prints all five.
- Reads CSV or Excel. CAP official palette.

## 0.2.0 - 2026-10-31
Removed fields eServices does not export (D-002, D-003).
- Removed Flight, Duty Position, Encampment toggle, Mentorship tab and Notes.
- Mitchell Award now shows "Encampment (not in eServices export; verify)"
  instead of reading a hand-ticked box. Rules rework follows in 0.3.0.
- Verified against the 31 Oct 2026 export (31 cadets, XLSX).

## 0.1.0 - 2026-10-31
Imported from the Google Antigravity build (TRACKER.html, 12 Oct 2026).
- Removed the embedded cadet roster (names, emails, CAPIDs).
- Removed browser storage; the roster now lives only in the open tab.
- Removed "Save HTML File", which wrote cadet data into the HTML file.
- No other behavior changes. Rules and branding fixes follow in later versions.
