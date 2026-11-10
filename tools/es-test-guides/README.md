# ES & FEMA Study Companion

A personal study aid for these online tests:

| Sheet | Test |
|---|---|
| FEMA SID | Register for a FEMA Student ID and log in the first time |
| CAPT 116 | General Emergency Services (CAPR 60-3) |
| CAPT 117 | ES Continuing Education, Parts 1 to 3 |
| IS-100 | Introduction to ICS (IS-100.c) |
| IS-200 | Basic ICS for Initial Response (IS-200.c) |
| IS-700 | Introduction to NIMS (IS-700.b) |
| IS-800 | National Response Framework (IS-800.d) |

Each test sheet has core essentials with diagrams, then a 30-question practice
test with answers on the last page. Practice questions are original. They
cover the same ideas as each test, and none is copied from an exam. Do not
add real exam questions or answer keys (CAPR 40-2 §6.10; FEMA EMI policy).

Use: open a sheet from the top bar (each has its own link, e.g. `#is100`).
**Show answers** highlights the right choices on screen. **Print this sheet**
prints letter paper with the answers on the last page; **Print all** prints
every sheet.

## Editing

`index.html` is generated. Edit `build/practice.py` (practice questions) or
`build/build.py` (essentials, diagrams), then run `python3 build/build.py`.
Styles and script live in `build/template.html`.
