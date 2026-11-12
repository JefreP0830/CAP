"""VT-014 OCP Uniform Worksheet: builds index.html (one Letter page, with a Print button on screen).

    python build.py

Uses utility-cap-gray.png beside this script if present (local print copy only);
otherwise draws the utility cap. Rajdhani (SIL OFL) is embedded from fonts/.
"""
import pathlib

OUT = pathlib.Path(__file__).parent
W, H = 816, 1056
ULTRA, BLACK70, SILVER = "#001489", "#4D4D4D", "#9EA2A2"
GARMENT, FILL, DETAIL, FIELD = "#8F9393", "#F4F5F5", "#A7ABAB", "#ECEEEE"
MARGIN = 40


class Piece:
    def __init__(self, bbox):
        self.parts, self.bbox = [], bbox

    def shape(self, d, stroke=GARMENT, fill=FILL):
        self.parts.append(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="SW14" '
                          f'stroke-linejoin="round" stroke-linecap="round"/>')

    def detail(self, d):
        self.parts.append(f'<path d="{d}" fill="none" stroke="{DETAIL}" stroke-width="SW10" '
                          f'stroke-linejoin="round" stroke-linecap="round"/>')

    def raw(self, s):
        self.parts.append(s)

    def place(self, cx, cy, scale):
        x0, y0, x1, y1 = self.bbox
        bx, by = (x0 + x1) / 2, (y0 + y1) / 2
        body = ("".join(self.parts).replace("SW14", f"{1.4 / scale:.2f}")
                .replace("SW10", f"{1.0 / scale:.2f}").replace("SW13", f"{1.3 / scale:.2f}"))
        return f'<g transform="translate({cx},{cy}) scale({scale}) translate({-bx},{-by})">{body}</g>'


def patch(p, x, y, w, h, rx=1.5, text=None, size=5.6):
    p.raw(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="#FFFFFF" stroke="{ULTRA}" stroke-width="SW13"/>')
    if text:
        p.raw(f'<text x="{x + w / 2}" y="{y + h / 2 + size * 0.36}" font-size="{size}" fill="{ULTRA}" '
              f'text-anchor="middle" letter-spacing="0.3">{text}</text>')


def shield(p, x, y, w, h):
    p.raw(f'<path d="M{x},{y} L{x + w},{y} L{x + w},{y + h * 0.62} Q{x + w},{y + h * 0.9} {x + w / 2},{y + h} '
          f'Q{x},{y + h * 0.9} {x},{y + h * 0.62} Z" fill="#FFFFFF" stroke="{ULTRA}" stroke-width="SW13"/>')


# ---- utility (patrol) cap: three-quarter view, crown rising to the back, long bill curving down-left
ucap = Piece((0, 2, 78, 59))
ucap.shape("M20,42 C17,30 19,20 27,15 L64,4 Q75,1 77,10 L78,38 Q50,46 20,42 Z")
ucap.detail("M27,15 Q50,14 76,8")              # top panel edge
ucap.detail("M19,32 Q49,37 78,30")             # band
ucap.detail("M44,12 L52,26")                   # crown seam
ucap.shape("M26,41 Q8,44 2,55 Q6,59 14,57 Q32,52 50,45 Q38,40 26,41 Z")  # bill

import base64
UCAP_SCALE = 1.1
_cap_png = OUT / "utility-cap-gray.png"
if _cap_png.exists():
    from PIL import Image
    _iw, _ih = Image.open(_cap_png).size
    _b64 = base64.b64encode(_cap_png.read_bytes()).decode()
    ucap = Piece((0, 0, _iw, _ih))
    ucap.raw(f'<image href="data:image/png;base64,{_b64}" x="0" y="0" width="{_iw}" height="{_ih}"/>')
    UCAP_SCALE = 58 / _ih

# ---- watch cap
wcap = Piece((0, 0, 54, 44))
wcap.shape("M0,44 L0,24 Q0,0 27,0 Q54,0 54,24 L54,44 Z")
wcap.shape("M0,30 L54,30 L54,44 L0,44 Z")

# ---- t-shirt, fleece
tee = Piece((0, 0, 44, 40))
tee.shape("M14,0 Q22,7 30,0 L44,5 L44,15 L37,15 L37,40 L7,40 L7,15 L0,15 L0,5 Z")
fleece = Piece((0, 0, 58, 52))
fleece.shape("M18,4 L8,10 L0,50 L8,51 L13,22 L13,52 L45,52 L45,22 L50,51 L58,50 L50,10 L40,4 L36,0 L22,0 Z")
fleece.detail("M29,0 L29,52")

# ---- coat with insignia
cx = 172
coat = Piece((cx - 128, 270, cx + 128, 472))
coat.shape(f"M{cx - 22},270 L{cx - 78},284 L{cx - 108},298 L{cx - 128},468 L{cx - 100},472 L{cx - 84},360 "
           f"L{cx - 80},470 L{cx + 80},470 L{cx + 84},360 L{cx + 100},472 L{cx + 128},468 L{cx + 108},298 "
           f"L{cx + 78},284 L{cx + 22},270 Z")
coat.detail(f"M{cx - 22},270 L{cx - 18},286 L{cx + 18},286 L{cx + 22},270")
coat.detail(f"M{cx},286 L{cx},470")
patch(coat, cx - 106, 302, 20, 14)
for k in range(1, 4):
    coat.raw(f'<line x1="{cx - 106}" y1="{302 + k * 3.5}" x2="{cx - 86}" y2="{302 + k * 3.5}" stroke="{ULTRA}" stroke-width="0.5"/>')
shield(coat, cx - 106, 324, 20, 26)
patch(coat, cx + 86, 300, 20, 9, text="AUX", size=5.5)
shield(coat, cx + 86, 318, 20, 26)
patch(coat, cx - 76, 318, 62, 13, text="LAST NAME")
patch(coat, cx + 14, 318, 62, 13, text="CIVIL AIR PATROL", size=5)
patch(coat, cx - 9, 340, 18, 18, rx=2)

# ---- pants (no belt) and belt (separate)
pants = Piece((0, 0, 164, 318))
pants.shape("M4,0 L0,318 L68,318 L82,68 L96,318 L164,318 L160,0 Z")
pants.detail("M82,0 L82,68")
pants.detail("M4,14 L160,14")
belt = Piece((0, 4, 124, 42))
belt.shape("M0,16 L114,16 L124,23 L114,30 L0,30 Z")      # strap with tip
belt.shape("M14,8 L38,8 L38,38 L14,38 Z")              # buckle frame
belt.detail("M19,13 L33,13 L33,33 L19,33 Z")

# ---- one glove
glove = Piece((0, 0, 44, 60))
pts = [(0, 60), (0, 24), (2, 20), (6, 20), (8, 24), (8, 10), (10, 6), (14, 6), (16, 10),
       (16, 4), (18, 0), (22, 0), (24, 4), (24, 8), (26, 4), (30, 4), (32, 8),
       (32, 34), (38, 26), (42, 26), (44, 30), (36, 50), (32, 60)]
glove.shape("M" + " L".join(f"{x},{y}" for x, y in pts) + " Z")
glove.detail("M0,52 L32,52")

# ---- boot sock, side view: leg, heel at back, foot to the toe
sock = Piece((0, 0, 62, 74))
sock.shape("M10,0 L32,0 L32,44 Q32,48 36,49 L52,53 Q62,56 62,64 Q62,74 51,74 L18,74 Q6,74 6,62 L10,46 Z")
sock.detail("M10,8 L32,8")
sock.detail("M10,4 L32,4")

# ---- combat boot, side view: shaft, laces, toe cap, heel and sole
boot = Piece((0, 0, 76, 74))
boot.shape("M10,0 L36,0 L38,36 L60,46 Q72,50 72,60 L72,64 L4,64 L4,54 Q8,30 10,0 Z")
boot.shape("M2,64 L74,64 L74,72 Q74,74 72,74 L4,74 Q2,74 2,72 Z", fill="#E2E4E4")
boot.detail("M38,36 Q52,40 60,46")
for i, yy in enumerate((8, 16, 24, 32)):
    boot.detail(f"M{30 + i * 0.6},{yy} L{40 + i * 2},{yy + 2}")
boot.detail("M58,50 Q62,58 72,60")
boot.detail("M4,56 L20,56")

# ---------------------------------------------------------------- sections
# items: (name, sizes). sizes [] = none, ["one size"] = no entry needed
SECTIONS = [
    ("HEAD",
     [("Utility cap", ["head"])],
     [("Duty cap (watch cap)", ["one size"])],
     [(ucap, 360, 38, UCAP_SCALE), (wcap, 458, 40, 1.1)], 72),
    ("UPPER BODY",
     [("T-shirt", ["chest"]), ("Coat", ["chest"]), ("Fleece jacket", ["chest"])],
     [("Name tapes (x3)", []), ("CIVIL AIR PATROL tape", []), ("US flag", []), ("Squadron patch", []),
      ("CAP AUX tab", []), ("Wing patch", []), ("Grade insignia", [])],
     [(coat, 408, 104, 0.98), (tee, 364, 252, 1.2), (fleece, 452, 252, 1.2)], 296),
    ("LOWER BODY",
     [("Pants", ["waist", "length"])],
     [("Belt", ["waist"])],
     [(pants, 374, 70, 0.4), (belt, 466, 70, 0.62)], 140),
    ("HANDS AND FEET",
     [("Gloves", ["hand"]), ("Boot socks", ["shoe size"])],
     [("Boots", ["shoe size, width"])],
     [(glove, 336, 52, 1.15), (sock, 408, 52, 1.0), (boot, 484, 52, 1.0)], 0),
]

COL_W = 226
LX, RX = MARGIN, W - MARGIN - COL_W
RH_SIZED, RH_PLAIN = 72, 38
out = []


def box(x, y, letter):
    return (f'<rect x="{x}" y="{y - 13}" width="16" height="16" rx="1.5" fill="none" stroke="{BLACK70}" stroke-width="1"/>'
            f'<text x="{x + 20}" y="{y}" font-size="12.5" fill="{BLACK70}">{letter}</text>')


def item(name, sizes, top, x0):
    """Title with Y/N on the same line; size field(s) underneath. Returns (svg, height)."""
    x_end = x0 + COL_W
    ty = top + 18
    s = (f'<text x="{x0}" y="{ty}" font-size="14" fill="#000000">{name}</text>'
         + box(x_end - 64, ty, "Y") + box(x_end - 30, ty, "N"))
    if not sizes:
        return s, RH_PLAIN
    fy = ty + 10
    if sizes == ["one size"]:
        s += f'<text x="{x0}" y="{fy + 15}" font-size="10" fill="{BLACK70}">one size, no measurement needed</text>'
        return s, RH_SIZED
    w = (COL_W - 6 * (len(sizes) - 1)) / len(sizes)
    for k, lab in enumerate(sizes):
        x = x0 + k * (w + 6)
        s += (f'<rect x="{x:.1f}" y="{fy}" width="{w:.1f}" height="26" rx="2" fill="{FIELD}"/>'
              f'<text x="{x + 5:.1f}" y="{fy + 10}" font-size="8.5" fill="{BLACK70}">{lab}</text>')
    return s, RH_SIZED


y = 190
for title, left, right, art, min_h in SECTIONS:
    out.append(f'<text x="{MARGIN}" y="{y}" font-size="11" fill="{ULTRA}" letter-spacing="1.2">{title}</text>'
               f'<line x1="{MARGIN}" y1="{y + 7}" x2="{W - MARGIN}" y2="{y + 7}" stroke="{ULTRA}" stroke-width="0.9"/>')
    top = y + 24
    heights = []
    for col, x0 in ((left, LX), (right, RX)):
        t = top
        for n, s in col:
            svg_, h = item(n, s, t, x0)
            out.append(svg_)
            t += h
        heights.append(t - top)
    for piece, pcx, dy, sc in art:
        out.append(piece.place(pcx, top + dy, sc))
    y = top + max(heights + [min_h]) + 20


def field(x, y, w, lab):
    return (f'<text x="{x}" y="{y}" font-size="10" fill="{ULTRA}" letter-spacing="0.4">{lab}</text>'
            f'<rect x="{x}" y="{y + 6}" width="{w}" height="28" rx="2" fill="{FIELD}"/>')


FY = 128
header = (
    f'<text x="{MARGIN}" y="62" font-family="Rajdhani, Arial, sans-serif" font-weight="600" font-size="30" fill="{ULTRA}">OCP Uniform Self-Check</text>'
    f'<text x="{W - MARGIN}" y="62" font-family="Rajdhani, Arial, sans-serif" font-weight="600" font-size="18" fill="{ULTRA}" text-anchor="end">VT-014</text>'
    f'<line x1="{MARGIN}" y1="74" x2="{W - MARGIN}" y2="74" stroke="{ULTRA}" stroke-width="1.5"/>'
    f'<text x="{MARGIN}" y="100" font-size="13" fill="{BLACK70}">Print legibly. Mark everything completely. '
    f'All sizes in inches. Return completed sheet to Supply Officer.</text>'
    + field(MARGIN, FY, 196, "MEMBER LAST NAME") + field(MARGIN + 212, FY, 110, "MEMBER CAPID")
    + field(MARGIN + 338, FY, 110, "DATE COMPLETED")
    + f'<line x1="{MARGIN + 466}" y1="{FY - 12}" x2="{MARGIN + 466}" y2="{FY + 32}" stroke="{SILVER}" stroke-width="1"/>'
    + field(MARGIN + 484, FY, 140, "SUPPLY OFFICER CAPID") + field(MARGIN + 640, FY, W - 2 * MARGIN - 640, "DATE RECEIVED"))

svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" '
       f'font-family="Arial, Helvetica, sans-serif">' + header + "".join(out) + "</svg>")
_font = next(f for f in (OUT / "fonts" / "rajdhani-latin-600-normal.woff2", OUT / "rajdhani-latin-600-normal.woff2") if f.exists())
FONT = base64.b64encode(_font.read_bytes()).decode()
CSS = f"""
@font-face{{font-family:Rajdhani;font-weight:600;src:url(data:font/woff2;base64,{FONT}) format('woff2')}}
html,body{{margin:0;background:#EEF0F0;font-family:Arial,Helvetica,sans-serif;color:{BLACK70}}}
.bar{{display:flex;align-items:center;gap:12px;padding:12px 16px;background:#FFFFFF;border-bottom:3px solid {ULTRA}}}
.bar a{{color:{ULTRA};text-decoration:none;font-size:14px}}
.bar h1{{flex:1;margin:0;font:600 22px Rajdhani,Arial,sans-serif;color:{ULTRA}}}
.bar button{{font:15px Arial,Helvetica,sans-serif;color:#FFFFFF;background:{ULTRA};border:0;border-radius:4px;
  padding:10px 22px;cursor:pointer}}
.bar button:focus-visible{{outline:3px solid #FFCD00;outline-offset:2px}}
.sheet{{width:816px;max-width:calc(100% - 32px);margin:20px auto;background:#FFFFFF;
  box-shadow:0 1px 4px rgba(0,0,0,.18);border:1px solid #D9DBDB}}
.sheet svg{{display:block;width:100%;height:auto}}
@page{{size:Letter;margin:0}}
@media print{{
  html,body{{background:#FFFFFF;width:816px;height:1056px;overflow:hidden}}
  .bar{{display:none}}
  .sheet{{margin:0;max-width:none;box-shadow:none;border:0}}
}}
"""
html = ("<!doctype html><html lang='en'><head><meta charset='utf-8'>"
        "<meta name='viewport' content='width=device-width, initial-scale=1'>"
        "<title>OCP Uniform Worksheet</title><style>" + CSS + "</style></head><body>"
        "<div class='bar'><a href='../../'>CAP Tools</a><h1>OCP Uniform Worksheet</h1>"
        "<button type='button' onclick='window.print()'>Print</button></div>"
        "<div class='sheet'>" + svg + "</div></body></html>")
(OUT / "index.html").write_text(html, encoding="utf-8")
print("ok, content ends at y =", y)
