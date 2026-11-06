# Uniform Supply (VT-014)

Outfits new members, tracks Vanguard orders through issue, and keeps a
permanent record of who received what.

**Status:** Catalog tab built. Members, Requests, Ledger, Open Items tabs and
the branded intake form (Apps Script) come next.

## How it works

1. A new member (or parent) fills in a short branded form: legal last name,
   first name, CAPID, cadet or senior, sizes. They never see a parts list.
2. Supply staff open a request (`MILLER-01`), apply the member's kit from the
   Catalog, swap alternates (female Blues, youth vs adult OCP), and enter the
   order in Vanguard by hand.
3. Each item moves through the Ledger: Requested, Ordered, Received, Issued,
   Acknowledged. The member acknowledges receipt with their CAPID.

## Kits

| Kit | Contents |
|---|---|
| K1 Cadet OCP | Coat, trousers, t-shirt, belt, boots, socks, cap, 2 name tapes, CAP tape, flag, AUX, Vermont Wing, VT-014 patch |
| K2 Senior OCP | K1 in adult sizes, plus blank 2x2 tab |
| K3 Cadet Blues | Short-sleeve shirt, trousers or slacks, belt, flight cap and device, nameplate, socks; shoes and undershirt member-sourced |
| K4 Senior CWU | Personalized polo, tactical gray trousers, black rigger belt, socks; shoes member-sourced |

The squadron funds the first uniform. Members use their Curry voucher for
supplemental items.

## Files

- `catalog.js`: the item list, the single source. Edit here, then rebuild.
- `build_template.py`: writes the workbook (`python build_template.py out.xlsx`).

The `.xlsx` is never committed. Build it, then import it into the squadron
Google Drive (File > Import > Upload in Google Sheets).

## Data rule

This tool keeps live data in a Google Sheet, unlike the repo's read-only
tools (docs/decisions.md D-002, D-004). Member names, CAPIDs and sizes live
in the squadron Drive only, never in this repo (D-001).
