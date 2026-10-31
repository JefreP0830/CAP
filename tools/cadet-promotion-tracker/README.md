# Cadet Promotion Tracker

Squadron view of every cadet's progress toward their next achievement, built
from the CAP eServices **Cadet Full Track Report**. Read-only: eServices is
the source of truth (docs/decisions.md).

## Weekly routine

1. In eServices, export the Cadet Full Track Report (CSV or Excel) and save it
   to the squadron file share. Keep the date eServices puts in the file name.
2. Open `index.html` in Chrome or Edge.
3. Load this week's export **and last week's** (select both, or drag both).
   The newest is the roster; the older one builds the To Be Pinned list.
4. Click **Print weekly packet**.

Nothing is saved. Closing the tab clears the roster.

## Tiles

Each cadet shows only the tiles their next achievement requires. A tile fills
in when eServices has a date or value for it. Rules live in the `RULES` and
`TILES` tables at the top of the script, with their sources.

| Tile | Meaning | Export column(s) |
|---|---|---|
| LDR | Leadership test / milestone exam | LeadLabDateP, LeadershipInteractiveDate, LeadLabScore >= 80 |
| DRL | Drill test | DrillDate, DrillScore |
| AE | Aerospace test / milestone exam | AEDateP, AEInteractiveDate, AEScore >= 80, AEModuleOrTest |
| FIT | Fitness test (CPFT) | PhyFitTest |
| CHR / WNG | Character / Wingman Course (Ach 1) | CharacterDevelopment |
| WEL | Welcome Course (Ach 1) | WelcomeCourseDate |
| DC | Deputy Commander sign-off | ActivePart, CadetOath, LeadershipExpectationsDate, UniformDate |
| SVC / WRT / ORL | SDA service, technical writing, oral presentation | StaffServiceDate, TechnicalWritingAssignmentDate, OralPresentationDate |
| ESY / SPH | Essay / speech (Ach 8, Eaker) | EssayDate, SpeechDate |
| ENC / ACD | Encampment (Mitchell) / leadership academy (Eaker) | SpecialActivityDate |
| TIG | Time in grade: eligible date reached | NextApprovalDate |

Status is evaluated as of the export date, not the day you print.
