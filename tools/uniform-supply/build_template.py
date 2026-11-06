"""Build the VT-014 Uniform Supply workbook template.

Reads the item list from catalog.js (JSON between the /*DATA*/ markers) and
writes an .xlsx to the path given, default ./uniform-supply-template.xlsx.
The .xlsx is never committed (scripts/pii-scan.sh blocks it); import it into
the squadron Google Drive.

    python build_template.py /path/to/out.xlsx

Tabs: Legend, Catalog, Sizes & SKUs, Kit Summary, Sample Pack List.
The sample pack list uses a made-up cadet (SAMPLE) to show the format.
"""
import json
import pathlib
import re
import sys

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

HERE = pathlib.Path(__file__).parent
VANGUARD_HOME = "https://www.vanguardmil.com"

# shared/brand/cap-brand.css
BODY, SECTION, SILVER = "4D4D4D", "63666A", "9EA2A2"
SCARLET, ULTRA = "BA0C2F", "001489"
HEAD_FILL, INPUT_FILL = "EEF0F0", "FFF8DC"

F_BODY = Font(name="Arial", size=10, color=BODY)
F_BODY_L = Font(name="Arial", size=11, color=BODY)
F_HEAD = Font(name="Arial", size=10, color=SECTION, bold=True)
F_TITLE = Font(name="Arial", size=14, color=SECTION, bold=True)
F_LINK = Font(name="Arial", size=10, color=ULTRA, underline="single")
F_DATE = Font(name="Arial", size=10, color=SCARLET)
F_MONO = Font(name="Arial", size=11, color=BODY)
FILL_HEAD = PatternFill("solid", fgColor=HEAD_FILL)
FILL_IN = PatternFill("solid", fgColor=INPUT_FILL)
THIN = Side(style="thin", color=SILVER)
BOX = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
WRAP = Alignment(wrap_text=True, vertical="top")
CENTER = Alignment(horizontal="center", vertical="top", wrap_text=True)
MONEY = '$#,##0.00;($#,##0.00);"-"'
KIT_KEYS = ["K1", "K2", "K3", "K4"]


def load_catalog():
    src = (HERE / "catalog.js").read_text(encoding="utf-8")
    m = re.search(r"/\*DATA\*/(.*?)/\*DATA\*/", src, re.S)
    if not m:
        sys.exit("catalog.js: DATA markers not found")
    items = json.loads(m.group(1))
    kits = dict(re.findall(r'^\s*(K\d):\s*"([^"]+)"', src, re.M))
    ids = [i["id"] for i in items]
    if len(ids) != len(set(ids)):
        sys.exit("catalog.js: duplicate item ids")
    for it in items:
        if it["source"] == "Vanguard" and not it["products"]:
            sys.exit(f"{it['id']}: Vanguard item with no product")
        if it["custom"] and it["custom"] != it["custom"].upper():
            sys.exit(f"{it['id']}: personalization prompt must be ALL CAPS")
        for p in it["products"]:
            for label, sku, price in p["variants"]:
                if not sku or price is None:
                    sys.exit(f"{it['id']}: variant '{label}' missing SKU or price")
    return items, kits


def header(ws, row, heads_widths):
    for c, (h, w) in enumerate(heads_widths, 1):
        cell = ws.cell(row=row, column=c, value=h)
        cell.font, cell.fill, cell.border = F_HEAD, FILL_HEAD, BOX
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        if w:
            ws.column_dimensions[get_column_letter(c)].width = w
    ws.row_dimensions[row].height = 30


def put(ws, r, c, v, font=F_BODY, align=WRAP, fmt=None, fill=None, border=BOX):
    cell = ws.cell(row=r, column=c, value=v)
    cell.font, cell.alignment = font, align
    if border:
        cell.border = border
    if fmt:
        cell.number_format = fmt
    if fill:
        cell.fill = fill
    return cell


def from_price(it):
    prices = [v[2] for p in it["products"] for v in p["variants"]]
    return min(prices) if prices else 0


def build_catalog(ws, items):
    header(ws, 1, [("Item ID", 9), ("Uniform", 12), ("Item", 28),
                   ("K1 Cadet OCP", 8), ("K2 Senior OCP", 8), ("K3 Cadet Blues", 8), ("K4 Senior CWU", 8),
                   ("Size question", 18), ("Personalize (ALL CAPS)", 16), ("Source", 13),
                   ("From ($)", 10), ("Reg cite", 26), ("Notes", 50)])
    for r, it in enumerate(items, 2):
        vals = [it["id"], it["uniform"], it["item"]] + [it["kits"].get(k) for k in KIT_KEYS] + \
               [it["ask"] or None, it["custom"] or None, it["source"], from_price(it), it["cite"], it["note"] or None]
        for c, v in enumerate(vals, 1):
            cell = put(ws, r, c, v, align=CENTER if 4 <= c <= 7 else WRAP,
                       fmt=MONEY if c == 11 else None)
            if 4 <= c <= 7:
                cell.fill = FILL_IN
    ws.freeze_panes = "D2"
    ws.auto_filter.ref = f"A1:M{len(items) + 1}"
    return len(items) + 1


def build_variants(ws, items):
    header(ws, 1, [("Item ID", 9), ("Item", 26), ("Style", 8), ("Search Vanguard for this exact title", 58),
                   ("Option", 10), ("Choose", 34), ("SKU", 12), ("Price ($)", 10)])
    r = 2
    for it in items:
        for p in it["products"]:
            for label, sku, price in p["variants"]:
                vals = [it["id"], it["item"], p["style"] or None, p["title"],
                        p["option"] or None, label or "(no choice)", sku, price]
                for c, v in enumerate(vals, 1):
                    put(ws, r, c, v, fmt=MONEY if c == 8 else None)
                r += 1
    ws.freeze_panes = "C2"
    ws.auto_filter.ref = f"A1:H{r - 1}"


def build_summary(ws, kits, last):
    rng = lambda col: f"Catalog!${col}$2:${col}${last}"
    price, source = rng("K"), rng("J")
    header(ws, 1, [("Kit", 6), ("Name", 36), ("Lines", 8), ("Pieces to order", 10),
                   ("Est. Vanguard cost ($)", 14), ("Member-provided lines", 12)])
    for r, (k, col) in enumerate(zip(KIT_KEYS, "DEFG"), 2):
        q = rng(col)
        vals = [k, kits.get(k, k), f'=COUNTIF({q},">0")',
                f'=SUMPRODUCT(({source}="Vanguard")*{q})',
                f'=SUMPRODUCT(({source}="Vanguard")*{q}*{price})',
                f'=SUMPRODUCT(({source}="Member")*({q}>0))']
        for c, v in enumerate(vals, 1):
            put(ws, r, c, v, fmt=MONEY if c == 5 else None)
    put(ws, 7, 2, "New cadet, OCP + Blues", border=None)
    put(ws, 7, 5, "=E2+E4", font=F_HEAD, fmt=MONEY, border=None)
    put(ws, 8, 2, "New senior, OCP + CWU", border=None)
    put(ws, 8, 5, "=E3+E5", font=F_HEAD, fmt=MONEY, border=None)
    put(ws, 10, 1, "Estimate at each item's lowest size price, before shipping. "
                   "Large sizes of a few items cost more (Sizes & SKUs tab).", border=None)
    ws.merge_cells("A10:F11")


def build_legend(ws):
    ws.column_dimensions["A"].width = 22
    ws.column_dimensions["B"].width = 92
    put(ws, 1, 1, "VT-014 Uniform Supply", font=F_TITLE, align=Alignment(), border=None)
    rows = [
        ("What this is", "Every item the squadron orders for a new member's first uniform. Members never "
         "see this list; they give name spelling and sizes only."),
        ("Kits", "K1 Cadet OCP, K2 Senior OCP, K3 Cadet Blues (Class B, short sleeve), K4 Senior "
         "Corporate Working Uniform. The squadron funds the first uniform; members use their Curry "
         "voucher for anything extra."),
        ("Where to order", "Vanguard only. Start at the home page and search for the exact title on the "
         "pack list. This workbook has no links to product pages, on purpose."),
        ("No swaps", "If the size on the pack list is sold out or missing, stop on that line, mark it "
         "NOT AVAILABLE, and move on. Never pick a different item or size."),
        ("Personalizing", "Type names in ALL CAPS, exactly as the pack list shows. Vanguard leaves out "
         "accented letters (Ñ, É) and cannot add hyphens on the website; flag those to the supply officer."),
        ("SKU", "Each size has its own SKU. The supply officer audits SKUs against past orders."),
        ("Edit these cells", "Tinted cells on Catalog (kit quantities, numbers or blank). Everything else "
         "is rebuilt from catalog.js in the CAP repo."),
        ("Prices", "Read from vanguardmil.com on 6 Nov 2026."),
    ]
    r = 3
    for k, v in rows:
        put(ws, r, 1, k, font=F_HEAD, border=None)
        put(ws, r, 2, v, border=None)
        r += 1
    put(ws, r, 1, "Vanguard home", font=F_HEAD, border=None)
    put(ws, r, 2, VANGUARD_HOME, font=F_LINK, border=None).hyperlink = VANGUARD_HOME
    r += 1
    put(ws, r, 1, "Regulation", font=F_HEAD, border=None)
    put(ws, r, 2, "CAPR 39-1 (3 Mar 2020) with ICLs 21-01, 25-02, 26-04, 26-14. OCP rules cite ICL 26-14 "
                  "Chapter 7, effective 30 Nov 2026. ABU wear ends 31 Oct 2028.", font=F_DATE, border=None)
    r += 1
    put(ws, r, 2, "Template only. Member data lives in the squadron Google Drive, never in the CAP repo.",
        border=None)


# Made-up member for the sample pack list. Not a real person.
SAMPLE = {
    "request": "SAMPLE-01", "name": "SAMPLE", "member": "Cadet", "style": "Male",
    "kits": ["K1", "K3"],
    "sizes": {"OCP-01": "Youth Size 12", "OCP-02": "Youth Size 12", "OCP-03": "Medium",
              "OCP-04": "44 inches", "OCP-05": "7 Regular Male- 9 Regular Female", "OCP-06": "Medium",
              "OCP-07": "7", "BLU-01": "14 1/2 Neck Measurement", "BLU-02": "28",
              "BLU-03": "Standard", "BLU-04": "7", "BLU-07": "Large"},
}


def pick(it, style, size):
    for p in it["products"]:
        if p["style"] and p["style"] != style:
            continue
        for label, sku, price in p["variants"]:
            if label == (size or ""):
                return p, label, sku, price
    sys.exit(f"sample: no variant for {it['id']} / {style} / {size}")


def build_pack_list(ws, items, kits):
    widths = [4, 22, 44, 26, 16, 14, 5, 10, 7, 11]
    for c, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(c)].width = w
    s = SAMPLE
    put(ws, 1, 1, f"Pack list {s['request']}  (sample, made-up member)", font=F_TITLE,
        align=Alignment(), border=None)
    put(ws, 2, 1, f"For: {s['name']}, {s['member']}, {s['style']} uniform style.  "
                  f"Kits: {', '.join(kits[k] for k in s['kits'])}.", font=F_BODY_L, border=None)
    ws.merge_cells("A2:J2")
    steps = ("Thank you for outfitting a new member. Go to vanguardmil.com, search each title below "
             "exactly as written, choose the option shown, type any name in ALL CAPS, set the quantity, "
             "and add it to the cart. Tick the box when it is in. If the option is sold out or missing, "
             "do not substitute: tick Not available and keep going.")
    put(ws, 3, 1, steps, font=F_BODY_L, border=None)
    ws.merge_cells("A3:J3")
    ws.row_dimensions[3].height = 58
    hr = 5
    header(ws, hr, [("#", None), ("Item", None), ("Search Vanguard for", None), ("Choose", None),
                    ("Type (ALL CAPS)", None), ("SKU", None), ("Qty", None), ("Price ($)", None),
                    ("In cart", None), ("Not available", None)])
    r, n = hr + 1, 0
    first = r
    local = []
    for it in items:
        qty = sum(it["kits"].get(k, 0) for k in s["kits"])
        if not qty:
            continue
        if it["source"] != "Vanguard":
            local.append((it, qty))
            continue
        p, label, sku, price = pick(it, s["style"], s["sizes"].get(it["id"]))
        n += 1
        choose = (f"{p['option']}: {label}" if p["option"] else label) if label else "Nothing to choose"
        typed = s["name"] if it["custom"] == "LAST NAME" else (it["custom"] or None)
        if it["item"] == "Polo with CAP seal, personalized":
            choose += ". Tick the embroidery box."
        vals = [n, it["item"], p["title"], choose, typed, sku, qty, price * qty, "☐", "☐"]
        for c, v in enumerate(vals, 1):
            put(ws, r, c, v, font=F_MONO if c in (3, 4, 5) else F_BODY_L,
                align=CENTER if c in (1, 7, 9, 10) else WRAP, fmt=MONEY if c == 8 else None)
        r += 1
    last = r - 1
    r += 1
    put(ws, r, 2, "Cart check before checkout", font=F_HEAD, border=None)
    ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=4)
    r += 1
    put(ws, r, 2, "Lines on this list", border=None)
    put(ws, r, 7, f"=COUNT(A{first}:A{last})", font=F_HEAD, align=CENTER)
    r += 1
    put(ws, r, 2, "Pieces", border=None)
    put(ws, r, 7, f"=SUM(G{first}:G{last})", font=F_HEAD, align=CENTER)
    r += 1
    put(ws, r, 2, "Expected subtotal", border=None)
    put(ws, r, 8, f"=SUM(H{first}:H{last})", font=F_HEAD, fmt=MONEY)
    r += 1
    put(ws, r, 2, "The cart should show the same number of pieces and the same subtotal, less any "
                  "line marked Not available. If it does not, stop and ask the supply officer.",
        border=None)
    ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=10)
    ws.row_dimensions[r].height = 30
    if local:
        r += 2
        put(ws, r, 2, "Not ordered from Vanguard", font=F_HEAD, border=None)
        ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=4)
        for it, qty in local:
            r += 1
            put(ws, r, 2, it["item"], border=None)
            put(ws, r, 3, it["note"], border=None)
    # Print: fit width, let height run to a second page if needed.
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth, ws.page_setup.fitToHeight = 1, 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.print_title_rows = f"{hr}:{hr}"


def main():
    out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "uniform-supply-template.xlsx")
    items, kits = load_catalog()
    wb = Workbook()
    wb.active.title = "Legend"
    build_legend(wb.active)
    last = build_catalog(wb.create_sheet("Catalog"), items)
    build_variants(wb.create_sheet("Sizes & SKUs"), items)
    build_summary(wb.create_sheet("Kit Summary"), kits, last)
    build_pack_list(wb.create_sheet("Sample Pack List"), items, kits)
    wb.save(out)
    n_var = sum(len(p["variants"]) for it in items for p in it["products"])
    print(f"wrote {out} ({len(items)} items, {n_var} sizes)")


if __name__ == "__main__":
    main()
