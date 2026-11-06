"""Build the VT-014 Uniform Supply workbook template (Catalog tab first).

Reads the item list from catalog.js (JSON between the /*DATA*/ markers) and
writes an .xlsx to the path given, default ./uniform-supply-template.xlsx.
The .xlsx is never committed (scripts/pii-scan.sh blocks it); import it into
the squadron Google Drive.

    python build_template.py /path/to/out.xlsx
"""
import json
import pathlib
import re
import sys

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

HERE = pathlib.Path(__file__).parent

# shared/brand/cap-brand.css
BODY = "4D4D4D"      # --cap-body
SECTION = "63666A"   # --cap-section (headers, never darker than body)
SILVER = "9EA2A2"    # --cap-silver
SCARLET = "BA0C2F"   # --cap-scarlet, regulation dates only
ULTRA = "001489"     # --cap-ultramarine
HEAD_FILL = "EEF0F0"  # light silver tint
INPUT_FILL = "FFF8DC"  # light tint = cells staff edit

F_BODY = Font(name="Arial", size=10, color=BODY)
F_HEAD = Font(name="Arial", size=10, color=SECTION, bold=True)
F_TITLE = Font(name="Arial", size=14, color=SECTION, bold=True)
F_LINK = Font(name="Arial", size=10, color=ULTRA, underline="single")
F_DATE = Font(name="Arial", size=10, color=SCARLET)
FILL_HEAD = PatternFill("solid", fgColor=HEAD_FILL)
FILL_IN = PatternFill("solid", fgColor=INPUT_FILL)
THIN = Side(style="thin", color=SILVER)
BOX = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
WRAP = Alignment(wrap_text=True, vertical="top")

KIT_KEYS = ["K1", "K2", "K3", "K4"]


def load_catalog():
    src = (HERE / "catalog.js").read_text(encoding="utf-8")
    m = re.search(r"/\*DATA\*/(.*?)/\*DATA\*/", src, re.S)
    if not m:
        sys.exit("catalog.js: DATA markers not found")
    items = json.loads(m.group(1))
    kits = dict(re.findall(r'^\s*(K\d):\s*"([^"]+)"', src, re.M))
    ids = [i["id"] for i in items]
    dupes = {x for x in ids if ids.count(x) > 1}
    if dupes:
        sys.exit(f"catalog.js: duplicate ids {sorted(dupes)}")
    for i in items:
        if i["alt_for"] and i["alt_for"] not in ids:
            sys.exit(f"{i['id']}: alt_for {i['alt_for']} is not an item id")
        if i["alt_for"] and i["kits"]:
            sys.exit(f"{i['id']}: an alternate must not carry kit quantities")
    return items, kits


COLS = [  # (header, width, key)
    ("Item ID", 9, "id"),
    ("Uniform", 12, "uniform"),
    ("Item", 30, "item"),
    ("Vanguard product name", 40, "vanguard"),
    ("Vanguard #", 12, "sku"),
    ("Unit price ($)", 11, "price"),
    ("Link", 9, "url"),
    ("K1 Cadet OCP", 8, "K1"),
    ("K2 Senior OCP", 8, "K2"),
    ("K3 Cadet Blues", 8, "K3"),
    ("K4 Senior CWU", 8, "K4"),
    ("Alternate for", 10, "alt_for"),
    ("Needs size", 16, "size"),
    ("Custom text", 16, "custom"),
    ("Source", 14, "source"),
    ("Reg cite", 28, "cite"),
    ("Notes", 50, "notes"),
]
EDITABLE = {"price", "K1", "K2", "K3", "K4", "notes"}


def build_catalog(ws, items):
    for c, (head, width, _) in enumerate(COLS, 1):
        cell = ws.cell(row=1, column=c, value=head)
        cell.font, cell.fill, cell.border = F_HEAD, FILL_HEAD, BOX
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        ws.column_dimensions[get_column_letter(c)].width = width
    ws.row_dimensions[1].height = 30
    for r, it in enumerate(items, 2):
        for c, (_, _, key) in enumerate(COLS, 1):
            if key in KIT_KEYS:
                val = it["kits"].get(key)  # None stays blank: SUMPRODUCT-safe
            elif key == "url":
                val = "Open" if it["url"] else None
            else:
                val = it[key] if it[key] not in ("",) else None
            cell = ws.cell(row=r, column=c, value=val)
            cell.font, cell.border, cell.alignment = F_BODY, BOX, WRAP
            if key == "price":
                cell.number_format = '$#,##0.00;($#,##0.00);"-"'
            if key == "url" and it["url"]:
                cell.hyperlink = it["url"]
                cell.font = F_LINK
            if key in KIT_KEYS:
                cell.alignment = Alignment(horizontal="center", vertical="top")
            if key in EDITABLE:
                cell.fill = FILL_IN
    ws.freeze_panes = "D2"
    ws.auto_filter.ref = f"A1:{get_column_letter(len(COLS))}{len(items) + 1}"
    return len(items) + 1


def build_summary(ws, kits, last):
    rng = lambda col: f"Catalog!${col}$2:${col}${last}"
    price, source = rng("F"), rng("O")
    heads = ["Kit", "Name", "Lines", "Vanguard pieces", "Est. Vanguard cost ($)",
             "Lines with unverified price", "Member-sourced lines"]
    widths = [6, 36, 8, 10, 14, 14, 12]
    for c, (h, w) in enumerate(zip(heads, widths), 1):
        cell = ws.cell(row=1, column=c, value=h)
        cell.font, cell.fill, cell.border = F_HEAD, FILL_HEAD, BOX
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        ws.column_dimensions[get_column_letter(c)].width = w
    ws.row_dimensions[1].height = 30
    for r, (k, col) in enumerate(zip(KIT_KEYS, "HIJK"), 2):
        q = rng(col)
        vals = [
            k, kits.get(k, k),
            f"=COUNTIF({q},\">0\")",
            f"=SUMPRODUCT(({source}=\"Vanguard\")*{q})",
            f"=SUMPRODUCT(({source}=\"Vanguard\")*{q}*{price})",
            f"=SUMPRODUCT(({source}=\"Vanguard\")*({q}>0)*({price}=\"\"))",
            f"=SUMPRODUCT(({source}=\"Member\")*({q}>0))",
        ]
        for c, v in enumerate(vals, 1):
            cell = ws.cell(row=r, column=c, value=v)
            cell.font, cell.border = F_BODY, BOX
            if c == 5:
                cell.number_format = '$#,##0.00'
    r = 6
    cell = ws.cell(row=r, column=1, value="Total")
    cell.font, cell.border = F_HEAD, BOX
    ws.cell(row=r, column=2, value="All four kits").font = F_BODY
    for c in (3, 4, 5, 6, 7):
        L = get_column_letter(c)
        cell = ws.cell(row=r, column=c, value=f"=SUM({L}2:{L}5)")
        cell.font, cell.border = F_HEAD, BOX
        if c == 5:
            cell.number_format = '$#,##0.00'
    ws.cell(row=8, column=2, value="New cadet, OCP + Blues").font = F_BODY
    c = ws.cell(row=8, column=5, value="=E2+E4"); c.font, c.number_format = F_HEAD, '$#,##0.00'
    ws.cell(row=9, column=2, value="New senior, OCP + CWU").font = F_BODY
    c = ws.cell(row=9, column=5, value="=E3+E5"); c.font, c.number_format = F_HEAD, '$#,##0.00'
    note = ("Costs are default lines only, before shipping and before swapping "
            "alternates (female Blues, adult OCP for a larger cadet). Lines with "
            "an unverified price count as $0 until a price is entered on Catalog.")
    n = ws.cell(row=11, column=1, value=note)
    n.font, n.alignment = F_BODY, WRAP
    ws.merge_cells("A11:G13")


def build_legend(ws):
    ws.column_dimensions["A"].width = 22
    ws.column_dimensions["B"].width = 90
    ws["A1"] = "VT-014 Uniform Supply: Catalog"
    ws["A1"].font = F_TITLE
    rows = [
        ("What this is", "Master list of every orderable uniform item. One row per item; "
         "kits are columns. Members never see this list; they give name spelling and sizes only."),
        ("Kits", "K1 Cadet OCP, K2 Senior OCP, K3 Cadet Blues (Class B, short sleeve), "
         "K4 Senior Corporate Working Uniform. The squadron funds the first uniform; "
         "members use their Curry voucher for supplemental items."),
        ("Edit these cells", "Tinted cells only: Unit price, the four kit quantity columns, Notes. "
         "Kit quantities must be numbers or blank, never text, or the Kit Summary breaks."),
        ("Alternates", "A row with 'Alternate for' filled replaces that default line at order time "
         "(female Blues pieces, youth vs adult OCP, skirt, unhemmed slacks). Alternates carry no kit quantity."),
        ("Source", "Vanguard = order on vanguardmil.com. Squadron stock = issue from the VT-014 locker "
         "(unit patch). Member = member provides (shoes, white undershirt); still logged for kit completeness."),
        ("Custom text", "Last name = name tapes and cadet nameplate. First and last name = CWU polo. "
         "Vanguard drops accented letters on custom items; check the spelling before ordering."),
        ("Adding an item", "Add it to catalog.js in the CAP repo and rebuild, so the repo stays the "
         "source of truth. A one-off edit here is fine for a price change."),
        ("Example row", "OCP-11 shows the expected format: qty 2 in K1 and K2, Custom text "
         "'Last name', Source 'Vanguard', a paragraph cite."),
        ("Prices", "Taken from vanguardmil.com on 6 Nov 2026. Blank price = not yet verified "
         "(OCP-17 blank 2x2 tab CAP6038, BLU-09 cadet cap device CAP0748A)."),
    ]
    r = 3
    for k, v in rows:
        a, b = ws.cell(row=r, column=1, value=k), ws.cell(row=r, column=2, value=v)
        a.font, b.font = F_HEAD, F_BODY
        a.alignment = b.alignment = WRAP
        r += 1
    a = ws.cell(row=r, column=1, value="Regulation")
    a.font, a.alignment = F_HEAD, WRAP
    b = ws.cell(row=r, column=2, value=("CAPR 39-1 (3 Mar 2020) with ICLs 21-01, 25-02, 26-04, 26-14. "
                                         "OCP rules cite ICL 26-14 Chapter 7, effective 30 Nov 2026. "
                                         "ABU wear ends 31 Oct 2028."))
    b.font, b.alignment = F_DATE, WRAP
    r += 1
    c = ws.cell(row=r, column=2, value="Template only. Member data lives in the squadron Google Drive, never in the CAP repo.")
    c.font, c.alignment = F_BODY, WRAP


def main():
    out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "uniform-supply-template.xlsx")
    items, kits = load_catalog()
    wb = Workbook()
    build_legend(wb.active)
    wb.active.title = "Legend"
    last = build_catalog(wb.create_sheet("Catalog"), items)
    build_summary(wb.create_sheet("Kit Summary"), kits, last)
    wb.save(out)
    print(f"wrote {out} ({len(items)} items)")


if __name__ == "__main__":
    main()
