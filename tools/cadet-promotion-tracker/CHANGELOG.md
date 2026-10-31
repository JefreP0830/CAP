# Changelog

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
