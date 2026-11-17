# NLD Operations Plan (Vermont Wing)

The wing's plan for CAP National Legislative Day 2027 as one printable page:
at-a-glance facts, open items, key dates, day-by-day schedule, lodging, routes and Metro,
safety (mirrors the CAPF 160), packing, forms, budget, message templates, and the AAR survey.

Folds in the 2025 operations plan, safety brief, and route maps. Built to be reused each year:
change the dates, re-check the "To confirm" list, and carry lessons into the AAR section.

## Participant file

Names, phones, rooms, wingmen, and allergies never live in this page or this repo.
Click **Blank participant file** for the CSV columns, fill it on the wing share, then
**Load participant file**. It fills the Activity Director line, senior member phones, the
allergy note in the safety brief, the roster, and room cards. Nothing is saved.

Columns: `role, rank, name, phone, unit, hotel_room, lodge_room, room_lead, wingman, allergies`.
Roles: Activity Director, Lead SM, Trail SM, Senior, Cadet. `room_lead`: Y or blank.

## CAPF 160

The Safety section holds the common risks for this trip and event (13 rows, the same
each year). Fill blocks 1-3 on the page and click **Download CAPF 160 (PDF)**: the page
fills the official form (CAPF 160, 01 Apr 2022, layout untouched) with blocks 1-3, every
risk row, block 10 (LOW) and block 11. The preparer signs 3g; the approval authority
completes block 12. Row 14 stays open for any side trip or risk unique to that year.

To change a risk, edit the `RISKS` list near the end of `index.html`; the page table and
the PDF both read from it. If NHQ revises the CAPF 160, replace the embedded blank form
(the `capf160-blank` script block, base64) and re-check the field names in `fill160`.

Embedded: pdf-lib 1.17.1 (MIT), stored base64 so `pii-scan.sh` does not misread its number tables as CAPIDs. Works offline.

## Files

- `index.html`: the page, self-contained (Rajdhani embedded, no member data).
- `icons/`: app icon (generic mark, not a CAP official emblem).
