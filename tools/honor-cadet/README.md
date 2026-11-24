# Honor Cadet Evaluator

Scores cadets for a unit Honor Cadet recognition on five categories, 1 to 3 each:
initiative, leadership, military bearing, teamwork and reliability.

| Score | Meaning |
|---|---|
| 1 | Improvement needed |
| 2 | Meets expectations |
| 3 | Exceeds expectations |

Overall score is out of 15. A 3 needs a Why observation; a 1 needs a Why Not observation.

## Flow

1. **Score.** A cadet command team member (C/CC, C/DC, C/XO, C/1st SGT, C/Flt CC, C/Flt SGT)
   enters their CAPID, last name and role; the recognition period defaults to the current
   two-month block. For each cadet: CAPID, last name, flight, duty position, five scores and
   observations. Submit checks the sheet, builds a PDF and opens the share menu, like
   the Drill Evaluator. If sharing is unavailable or fails, the PDF is saved to the device and
   the evaluator attaches it to an email.
2. **Tally.** The command staff drops every submitted PDF on the Tally tab. The scores ride
   inside each PDF (base64 JSON in the PDF Keywords field, prefix `HCE1:`), so nothing is
   retyped. Cadets are ranked by overall score; ties, incomplete scores and mixed periods are
   flagged; observations are listed by cadet.
3. **Select.** The top-ranked cadet is preselected (unless tied) and the reason is drafted from
   the Why observations. The command staff edits either, then saves a selection record PDF and
   copies the announcement and Honor Wall entry.

Nothing is saved in the browser (D-004); the PDFs are the record. No names are stored in this
repository. PDFs are built with jsPDF 2.5.1 and jspdf-autotable 3.8.2 from cdnjs, so Submit
needs an internet connection.

Honor Cadet is a unit-level recognition, not a CAP decoration under CAPR 39-3.
