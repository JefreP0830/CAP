# Changelog

## 0.9.9 - 2026-11-13

- App icon: white quill pen with a gold nib.

## 0.9.8 - 2026-11-13

- Forthcoming rows link to each current regulation's PDF (CAPR 70-10 links to the CAPP 70-10 pamphlet, its only current form).

## 0.9.7 - 2026-11-13

- Title: NER-VTWG Publication Changes - Exec Summary.

## 0.9.6 - 2026-11-13

- A change with several OPRs counts under each; one tile per OPR.

## 0.9.5 - 2026-11-13

- Unofficial-communication disclaimer under the title.
- Progressive Discipline Handbook OPR: CC, DC, CS. OPR shows as code only in panels.

## 0.9.4 - 2026-11-13

- OPR tiles show the code only.

## 0.9.3 - 2026-11-13

- Readability pass: plainer wording, shorter Why lines, glossary of BLUF, ICL, OPR and supplement in the intro, OPR office names on tiles and panels.
- Mission pay row lists the actual new rates instead of one example.

## 0.9.2 - 2026-11-13

- Forecast Why lines rebuilt from research: current rule age, change-letter history, NHQ renames. Inferences marked "Our read".

## 0.9.1 - 2026-11-13

- Page title 30pt. "OCP uniform ratified". CAPR 70-10 forecast shows OPR DO (from CAPR 70-1).

## 0.9.0 - 2026-11-13

- Page title NER-VTWG Publication Changes, shown on screen and in print; Last checked under it.
- OPR tiles: count of posted changes per OPR; select a tile to filter posted and forthcoming rows by that OPR (select again or All to clear).

## 0.8.0 - 2026-11-13

- Headings: POSTED CHANGES for FY2027 Q1 (Oct - Dec); FORTHCOMING CHANGES.
- BLUF explained once in the intro, not on every row.
- Forecast rows use the posted-row panel (publication, dated, signed Pending, OPR, starts No date announced); First Seen line with source and odds.
- NHQ being-revised list split into one row per regulation with current date and OPR.

## 0.7.1 - 2026-11-13

- OPR line (bold black) between Dated and Starts on each change.
- Faint gray rule between rows.

## 0.7.0 - 2026-11-13

- Quarterly running record: "CHANGES for FY2027 Q1 (Oct - Dec)", one list sorted by start date.
- Added from NHQ Pubs Rundowns: ICL 26-12 (CAPR 30-1), CAPP 30-1 Sample Position Descriptions, Progressive Discipline Handbook.
- Forecasts: NHQ-announced rewrites (CAPR 50-1, 70-1, 70-10, 120-1, 130-1) replace the 130-2 and 30-1 guesses; CAPR 39-1 stays Likely.
- Data block: `changes` (single list), `dated`, optional `linkText`; forecasts may carry `unclear`.

## 0.6.1 - 2026-11-13

- BLUF, Application, Why and Expect labels in bold black.

## 0.6.0 - 2026-11-13

- Brief layout from Jef's mockup: month headers (November 2026, October 2026), each change a row with a gray side panel (title, official letter, publication, signed, starts) and the BLUF, Application and caution beside it. Stacks on phones.
- Data block: `ref` split into `doc` plus `signed` (changes) or `current` (forecasts).

## 0.5.0 - 2026-11-13

- Prepared by NER-VTWG DA.
- Only start dates (bold black) and phase-out dates (bold red) are emphasized; other dates plain.
- Bold card titles; more space between BLUF, Application and other lines.
- Removed Vermont action. Conflicts in an official letter show as "AI Detected Caution |" with a red bar.

## 0.4.0 - 2026-11-13

- Dates in bold black; phase-out deadlines in bold red (`{{date}}` in the data block).
- BLUF, Why and Expect run inline after a bar as short sentences instead of bullets.

## 0.3.1 - 2026-11-13

- "Vermont action" label in blue, inline after a bar, on every card.

## 0.3.0 - 2026-11-13

- Card header: start date and official-letter link on the reference line.
- "What changed" renamed "BLUF (bottom line up front)"; "Who" renamed "Application", inline after a bar.

## 0.2.0 - 2026-11-13

- Brand standard: body Arial 11pt 70% black, title Rajdhani 20pt, section titles Arial 16pt gray, card titles Arial 14pt Ultramarine, line spacing 1.2, no bold, nothing below 11pt.
- Shorter cards: fewer, shorter bullets; labels Who, Vermont action, Why, Expect.

## 0.1.0 - 2026-11-13

- Prototype. November 2026: ICL 26-14 (CAPR 39-1) and ICL 26-15 (CAPR 103-1); October recap ICL 26-13 (CAPR 60-2).
- Forecasts: CAPR 39-1 (Likely), CAPR 130-2 (Possible), CAPR 30-1 (Possible).
- Large-print layout, print to Letter, link to each official letter.
