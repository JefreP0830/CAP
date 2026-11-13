# CAP Rule Changes (Vermont Wing)

One page, updated monthly, that tells members in plain words:

1. **Changes for the fiscal quarter**: a running record of official CAP publication changes
   (ICLs, regulations, pamphlets, handbooks) for the current FY quarter, sorted by start date.
   Main source: NHQ's monthly Pubs Rundown email, checked against the publication pages.
2. **May change next**: forecasts, marked *Likely* or *Possible*, each with the evidence behind it.
   A forecast never states new rule text as fact.

Written for readers aged 55-70 at a 3rd-6th grade reading level: CAP brand standard type
(nothing below 11pt), short bullets, one change per card, each card gives the BLUF (bottom line up front) and who it applies to,
and a link to the official letter. Dates print bold; phase-out deadlines print bold red.

## Monthly update

Edit only the `DATA` block at the top of the script in `index.html`:

- `heading`: the quarter, e.g. `CHANGES for FY2027 Q1 (Oct - Dec)`.
- `changes`: one object per change, any order (the page sorts by `starts`). Wrap a start date in `{braces}` for bold black, or `{{double braces}}` for a phase-out deadline in bold red.
- `next`: `odds` is `Likely` or `Possible`; `why` lists the evidence.
- `unclear`: optional; shown as "AI Detected Caution" when the official letter conflicts with itself.

Sources checked each month are listed in the page's "How we check" section.

## Forecast signals

- ICLs piling up on one regulation (rewrite pressure)
- An ICL that says a later revision will absorb it
- The Regulations for Preview page (drafts before release)
- Age of the base regulation

## Files

- `index.html`: the page, self-contained (Rajdhani embedded, nothing saved, no member data).
- `icons/`: app icon (generic mark, not a CAP official emblem).
