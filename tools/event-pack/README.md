# Event Pack Inspection

Phone app for inspecting a CAP 24-hour pack against the national Ground & UDF Team Tasks guide
(24 May 2004), Task O-0001, at three standards: Trainee minimum (items marked T), Ground Team
Member, Ground Team Leader. Rate each item Ready, Needs refit or Missing; the app builds the
refit list (Task O-0002, 4 R's) and shares a PDF. Also holds the 4 R's refit checklist and a
printable packing list. Stores nothing on the device.

Built from the Drill Evaluator (`tools/drill-test`). Item data: `src/pack.ts`.

    npm install
    npm run build:pages   # writes app/index.html (one self-contained file)

Live: https://jefrep0830.github.io/CAP/tools/event-pack/app/
