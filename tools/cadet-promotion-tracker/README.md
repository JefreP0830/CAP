# Cadet Promotion Tracker

Unit view of every cadet's progress toward their next achievement, built
from the CAP eServices **Cadet Full Track Report**. Read-only: eServices is
the source of truth (docs/decisions.md).

## Weekly routine

The same steps appear on the tracker's load screen.

In eServices:
1. Menu > Cadet Programs > Cadet Promotions > Reports.
2. Report: Cadet Promotions Track Report. Reg-Wing-Unit: your unit.
3. Search by Organization; confirm your unit.
4. Check Only Show Cadet's Current Achievement (the tracker copes if missed).
5. Export to Excel. Leave the file in Downloads with its dated name; keep it
   for next week's To Be Pinned comparison.

In the tracker:
6. Load eServices exports: select this week's and last week's files
   together (Ctrl+click).
7. Print this view (wall roster), Print weekly report, or Print report card.

The unit shown on screen and in print comes from the export, so any squadron
can use the tracker.

Nothing is saved. Closing the tab clears the roster.

## Tiles

Each cadet shows only the tiles their next achievement requires. A tile fills
in when eServices has a date or value for it. Rules live in the `RULES` and
`TILES` tables at the top of the script, with their sources.

Every cadet shows the same tiles in the same order. Light grey blank tiles are not
required for that cadet's achievement.

| Tile | Meaning | Export column(s) |
|---|---|---|
| L | Leadership test / milestone exam | LeadLabDateP, LeadershipInteractiveDate, LeadLabScore >= 80 |
| A | Aerospace test / milestone exam | AEDateP, AEInteractiveDate, AEScore >= 80, AEModuleOrTest |
| D | Drill test | DrillDate, DrillScore |
| F | Fitness test (CPFT) | PhyFitTest |
| C | Character (Wingman Course at Ach 1) | CharacterDevelopment |
| P | Participation & inspection | ActivePart, CadetOath, LeadershipExpectationsDate, UniformDate |
| ORL | SDA oral presentation, or speech (Ach 8, Eaker) | OralPresentationDate, SpeechDate |
| WRT | SDA technical writing, or essay (Ach 8, Eaker, Spaatz) | TechnicalWritingAssignmentDate, EssayDate |

Not tracked: Welcome Course (Ach 1), encampment (Mitchell) and leadership
academy (Eaker). Check these in eServices before approving those promotions.

The Eligible column shows NextApprovalDate: a plain box counts down the days,
a red box counts days past it, and Ready means every tile is complete and the
date has been reached. Use **Print report card** at the top to print a one-page progress report
for one cadet, or for every cadet in the current view.

Status is evaluated as of the export date, not the day you print.
