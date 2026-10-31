# Cadet Promotion Tracker

Squadron-level view of every cadet's progress toward their next achievement,
built from the CAP eServices **Cadet Full Track Report**.

## Weekly routine

1. In eServices, run the Cadet Full Track Report for the unit and export CSV.
2. Save it to the squadron file share.
3. Open `index.html` in Chrome or Edge.
4. Drag the CSV onto the page (or use the import button).
5. Print.

Nothing is saved. Closing the tab clears the roster. The CSV on the file
share is the only copy of the data.

## Known gaps (being fixed)

- Requirement rules are not yet verified against current CAP publications
  (e.g. drill shown where an achievement doesn't require it).
- Colors are not yet the official CAP palette.
- Columns for flight, duty position, pinned status and mentors come from the
  old hand-maintained file. eServices does not export them, so they are blank
  after import and will be removed or replaced.
