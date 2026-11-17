# Changelog

## 0.5.1 - 2026-11-17

- Lodging brief: one line per overnight stop with its nights; room count shown on the budgeted hotel line instead of its own line.

## 0.5.0 - 2026-11-17

- Budget restated in today's costs by category: lodging, travel, per diem (meals), gear. Brief shows per person and total for the maximum and the best case, plus pay-to-play cost per person.
- Per diem added: group meals ($40/person) and personal meals ($125/person), estimated from the schedule.
- Fee field replaced by computed pay-to-play cost; At a glance and nomination email use it.
- Budget detail grouped by category with subtotals; editor adds a Category column.

## 0.4.2 - 2026-11-17

- Budget of record is the maximum (6 cadets, 4 adults, 6 rooms); brief adds a best-case callout (core assumption: 6 cadets, 2 adults sharing, 4 rooms) with the per-person refund.
- Budget detail shows best case and maximum side by side; Metro fares and pullovers priced per person.
- Fee set to $400 to cover the maximum; nomination email and At a glance say "up to" with the refund note.
- Trip Editor: maximum and best-case room counts; people counts come from Size.

## 0.4.1 - 2026-11-17

- Budget built on the maximum party: 6 cadets and 4 adults in 6 rooms, 2 per room, split by sex; odd cadet takes a rollaway. Metro fares and pullovers sized for 10.
- Rooming rules rewritten around the 6-room maximum; savings only from an even adult split.
- Participant file adds a sex column; People and rooms shows rooms needed against rooms budgeted.
- Open item: confirm the van seats 10.

## 0.4.0 - 2026-11-17

- Plan rewritten as a short brief (at a glance, concept of operations, personnel, lodging and rooming, transport, safety, budget, timeline, open items) with details in Appendices A-L.
- Trip Editor: one-line entry for each At a glance item; one-line summary per day for the brief; Rates and rooms; Rooming rules.
- Budget: hotel and fuel worked out from rates (hotel $200/night + 14.25% Arlington tax; fuel $3.91/gal AAA national average, 12 Nov 2026). Brief shows per-person cost against the fee and the fee that covers it.
- Personnel: supervision ratio stated (two-deep, 1 adult per 12 cadets overnight, CAPR 60-2 section 2.6 per ICL May 2024) and checked against the plan's size.

## 0.3.1 - 2026-11-17

- Setup renamed Trip Editor.
- Section jump links removed.

## 0.3.0 - 2026-11-17

- Split the plan into a fixed core and a trip file. Setup view edits the trip: NLD date, sites, schedule days, lodging, drive legs, Metro, hospitals, side trips, budget, size, fee, and email highlights. The plan redraws as you type.
- Every date follows the NLD date: trip days, key dates (backward plan stepping around federal holidays and Thanksgiving week), emails, forms, and the CAPF 160 date.
- Side trips switch on and off; tagged rows hide everywhere.
- Trip file saves and loads as JSON (nothing is stored by the page). The 2027 trip is built in.
- Budget shows what the fee leaves for items still to quote.
- Safety brief adds street crossings, crowds, and lodging cards to match the CAPF 160 risks.

## 0.2.0 - 2026-11-17

- CAPF 160 built into the page: fill blocks 1-3 on screen, download the official form filled (layout untouched). Preparer left blank for whoever prepares it.
- Risk rows made reusable: 13 common trip-and-event risks. Flight 93 row removed. Added street crossings, crowds and separation, security incidents, illness and medication, lodging and cadet protection, fatigue and hydration.
- Key dates rebuilt as a backward plan from sign-in (set up, commit, prepare, go, close out), avoiding federal holidays.
- Packing list: items Capitol security stops.

## 0.1.0 - 2026-11-17

- First draft for review: 2025 operations plan, safety brief, and route maps folded into one 2027 plan.
- Dates set from the expected NLD 2027 Hill day (Thu 25 Feb 2027, inside CAP's 21-28 Feb 2027 Civic Leadership Academy week); marked to confirm.
- Names and phones replaced by roles; participant file loads them at run time.
- Safety section mirrors the 2027 CAPF 160 (9 hazards; walking, Metro platform, and Flight 93 added; post-inauguration row now civil unrest).
- Budget carries 2025 actuals; hotel and lodge marked for re-quote.
