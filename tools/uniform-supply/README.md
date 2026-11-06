# Uniform Supply (VT-014)

Outfits new members, tracks Vanguard orders through issue, and keeps a
permanent record of who received what.

**Status:** Catalog, Sizes & SKUs, Kit Summary and a sample pack list built. Members, Requests, Ledger, Open Items tabs and
the branded intake form (Apps Script) come next.

## How it works

1. A new member (or parent) fills in a short branded form: legal last name,
   first name, CAPID, cadet or senior, male or female uniform style, sizes.
   They never see a parts list.
2. Supply staff open a request (`MILLER-01`), print its pack list, and enter
   the order in Vanguard by hand.
3. Each item moves through the Ledger: Requested, Ordered, Received, Issued,
   Acknowledged. The member acknowledges receipt with their CAPID.

## Ordering rules

- No links to Vanguard product pages. Staff start at vanguardmil.com and
  search the exact title printed on the pack list.
- No swaps. If a size is sold out or missing, mark the line NOT AVAILABLE and
  move on. Never substitute.
- Personalized text goes in ALL CAPS.
- Every size has its own SKU on the pack list; the supply officer audits SKUs
  against past orders.
- Male/female uniform style and youth/adult OCP sizes are chosen by the
  member at intake, so the pack list shows one exact product per line.

## Kits

| Kit | Contents |
|---|---|
| K1 Cadet OCP | Coat, trousers, t-shirt, belt, boots, socks, cap, 2 name tapes, CAP tape, flag, AUX, Vermont Wing, VT-014 patch |
| K2 Senior OCP | K1, adult sizes only, plus blank 2x2 tab |
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
