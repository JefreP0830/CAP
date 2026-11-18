"""Builds ../index.html: a classroom slide deck for the FEMA and eServices tests.
Reuses the study companion's diagrams and CSS, so a diagram fix updates both.
Run: python3 deck.py   (no dependencies)"""
import re, sys
from html import escape as e
from pathlib import Path

HERE = Path(__file__).resolve().parent
GUIDE = HERE.parent.parent / "es-test-guides" / "build"
sys.path.insert(0, str(GUIDE))
import build as G  # the study companion generator; its write step only runs as __main__

VERSION = "1.0.1"

# ---------------------------------------------------------------- guide CSS, minus mobile and print rules
def strip_media(css, query):
    i = css.find(query)
    while i != -1:
        j, depth = css.index("{", i), 0
        k = j
        while True:
            depth += {"{": 1, "}": -1}.get(css[k], 0)
            k += 1
            if depth == 0:
                break
        css = css[:i] + css[k:]
        i = css.find(query)
    return css

tpl = (GUIDE / "template.html").read_text()
GCSS = tpl[tpl.index("<style>") + 7: tpl.index("</style>")]
GCSS = strip_media(strip_media(GCSS, "@media (max-width:760px)"), "@media print")

# ---------------------------------------------------------------- new visuals (deck only)
ROADMAP = """
<div class="dk-lanes">
 <p class="lab">Part 1 &middot; FEMA Independent Study, on training.fema.gov</p>
""" + G.flow([("FEMA SID", "Student ID. Do this first"), ("IS-100", "Incident Command System (ICS) basics"),
              ("IS-200", "Growing the ICS organization"), ("IS-700", "National Incident Management System (NIMS)"),
              ("IS-800", "National Response Framework (NRF)")]) + """
 <p class="lab">Part 2 &middot; eServices</p>
""" + G.flow([("CAPT 116", "General Emergency Services"), ("CAPT 117", "Emergency services continuing education, three parts")], "dk-half") + """
</div>"""

SIDFLOW = G.flow([
 ("Register", "One email holds one SID. Password 14+ characters. Age 10 or older for credit."),
 ("First login", "Multifactor authentication (MFA): enter the 6-digit code. Device remembered 21 days."),
 ("Take the exam", "training.fema.gov/is. Enter your SID. 75% passes."),
 ("Certificate", "In the National Disaster &amp; Emergency Management University (NDEMU) Student Portal, and emailed. Save the PDF."),
])

RULES = """
<div class="dk-rules">
 <div class="dk-rc"><b>Span of control</b>
  <div class="dk-scale">""" + "".join(
    f'<span class="{"best" if n == 5 else "in" if 3 <= n <= 7 else ""}">{n}</span>' for n in range(1, 10)) + """</div>
  <div class="dk-scl"><span>Too few</span><span>3 to 7 &middot; 5 is best</span><span>Too many: add a supervisor</span></div>
 </div>
 <div class="dk-rc"><b>Unity of command</b>
  <div class="dk-uc"><span class="dk-box">One supervisor</span><span class="dk-vl"></span><span class="dk-box me">You</span></div>
  <p>Each person reports to one supervisor. Orders follow the chain of command; information is shared freely.</p>
 </div>
 <div class="dk-rc"><b>Common terminology</b>
  <div class="dk-say"><span class="yes">&ldquo;Engine 2, return to staging&rdquo;</span><span class="no">&ldquo;E2, 10-8, back to the barn&rdquo;</span></div>
  <p>Plain language on the radio. No 10-codes or agency jargon.</p>
 </div>
 <div class="dk-rc"><b>Dispatch and deployment</b>""" + G.flow([("Requested", ""), ("Through the system", ""), ("Deploy", "")], "dk-mini") + """
  <p><span class="dk-never">Never</span> self-dispatch. Arrive and check in.</p>
 </div>
</div>"""

# Leaner deck-only versions of two text-heavy guide diagrams (same classes, fewer words).
MBASE_LEAN = G.flow([
 ("Before you go", "Where, when, and to whom you report. Pack for a long stay."),
 ("Check in", "At any designated location. Sent straight to a task? Report to that supervisor."),
 ("Work", "Unit log: ICS form 214. 24-hour time. Clear text on the radio."),
 ("Demobilize", "Finish the job. Return radios and gear. Check out."),
])
ZOOM_LEAN = ('<div class="zoom">' + "".join(
    f'<div class="zp" style="--i:{n}"><span class="zw">{w}</span><b>{t}</b><span class="zd">{d}</span><em>{a}</em></div>'
    for n, (w, t, d, a) in enumerate([
     ("On scene", "Unified Command", "Agencies set one set of objectives. Each keeps its authority.", "Co-captains, one game plan"),
     ("Off site", "Emergency Operations Center (EOC)", "Supplies the scene: resources, information, policy.", "Support staff: they supply, not play"),
     ("Policy level", "Multiagency Coordination (MAC) Group", "Senior officials decide who gets scarce resources.", "League officials assigning the only bus"),
     ("Region and nation", "RRCC and NOC", "Regional Response Coordination Center (FEMA). National Operations Center (DHS).", "Regional office and national headquarters"),
    ])) + '<div class="zbar"><span>Closer to the scene</span><span>Wider view</span></div></div>')

# Lifelines wheel with a short example under each lifeline (deck only).
LIFE_EX = {
 "Safety and Security": "Police, fire, search and rescue",
 "Food, Water, Shelter": "Groceries, drinking water, shelters",
 "Health and Medical": "Hospitals, pharmacies, ambulances",
 "Energy": "Power grid, fuel",
 "Communications": "Cell towers, 911, alerts",
 "Transportation": "Roads, bridges, airports",
 "Hazardous Materials": "Chemical spills, fuel leaks",
}
WHEEL_EX = G.WHEEL.replace('<div class="wheel">', '<div class="wheel dk-wheel">')
for name, ex in LIFE_EX.items():
    old = f'>{name}</div>'
    assert old in WHEEL_EX, name
    WHEEL_EX = WHEEL_EX.replace(old, f'>{name}<span class="dk-ex">{ex}</span></div>')

CLOSE = """
<div class="dk-close">
 <div class="dk-ct"><span class="sn">1</span><b>FEMA Independent Study</b><span>training.fema.gov/is &middot; enter your SID at the exam &middot; 75% passes &middot; save each certificate</span></div>
 <div class="dk-ct"><span class="sn">2</span><b>eServices</b><span>CAPT 116, then CAPT 117 (all three parts)</span></div>
 <div class="dk-ct"><span class="sn">3</span><b>Study companion</b><span>The same diagrams, plus a practice test for every exam. Keep it open while you test.</span></div>
</div>"""

# ---------------------------------------------------------------- slides
# kind: "title" | "div" | "slide". Visual width w is the natural width before it is scaled to fit.
S = []
def slide(kick, title, vis, take, notes, w=968, wmin=600):
    S.append(dict(kind="slide", kick=kick, title=title, vis=vis, take=take, notes=notes, w=w, wmin=wmin))
def divider(part, title, chips, notes):
    S.append(dict(kind="div", kick=part, title=title, chips=chips, notes=notes))

S.append(dict(kind="title", kick="Classroom deck", title="Emergency Services and FEMA Test Prep",
  sub="Four Federal Emergency Management Agency (FEMA) tests first, then two eServices tests",
  notes=["Goal for today: understand the few ideas each test keeps coming back to, then pass the tests.",
         "Passing a test shows you were exposed to the material. Hands-on skills come next, with a mentor and a skills evaluator.",
         "Everyone gets the study companion link. It has every diagram you see here, plus practice questions."]))
slide("Today", "The road through six tests", ROADMAP,
  "Get your FEMA Student ID (SID) first. Every FEMA exam asks for it.",
  ["Order matters: IS-100 before IS-200; the SID before any FEMA exam.",
   "The FEMA tests build on each other: ICS on scene, NIMS around it, the NRF across the nation.",
   "The two eServices tests cover our own regulation and continuing education."])
slide("Before any FEMA test", "FEMA Student ID: register once, use it everywhere", SIDFLOW,
  "Already have a SID? Recover it. Never make a second one.",
  ["Register at cdp.dhs.gov/femasid. The courses are on a different site: training.fema.gov/is.",
   "One email address per SID, so siblings cannot share a parent's email.",
   "Password: 14+ characters, with a number, upper and lower case, and a special character.",
   "Multifactor authentication is required. An authenticator app is the easiest second factor.",
   "Stuck: FEMA SID Help Desk 866-291-0696. Exam or certificate: Independent Study 301-447-1200."])

divider("Part 1", "FEMA Independent Study", ["IS-100", "IS-200", "IS-700", "IS-800"],
  ["Four online exams. 75% passes. Take them in order.",
   "Test tip: when two answers look right, pick the one that matches the standard term."])

K = "IS-100 &middot; Introduction to the Incident Command System (ICS)"
slide(K, "Who does what", G.ORG,
  "The incident commander (IC) is always staffed. Everything else opens only when needed.",
  ["The IC sets the objectives and does every job not yet assigned.",
   "Command Staff advise the IC: Public Information Officer (only voice to the media), Safety Officer (can stop unsafe work at once), Liaison Officer (contact for other agencies).",
   "General Staff are the four section chiefs: Operations does the work; Planning tracks and writes the IAP; Logistics supports; Finance/Admin pays.",
   "Modular: the organization grows and shrinks with the incident.",
   "Unified Command: agencies share objectives and each keeps its own authority."])
slide(K, "Four rules that keep it orderly", RULES,
  "3 to 7 per supervisor, one supervisor each, plain words, no self-dispatch.",
  ["Span of control: 3 to 7, and 5 is best. Too many? Add a supervisor and reorganize.",
   "Unity of command: one supervisor each. Chain of command governs orders, not information.",
   "Common terminology: standard names for positions, facilities and resources.",
   "Accountability: check-in, action planning, personal responsibility, resource tracking.",
   "Coordination is not command. Directing, ordering or controlling is command."])

K = "IS-200 &middot; Basic ICS for Initial Response"
slide(K, "Incident types: complexity sets the structure", G.TYPEBARS,
  "Type 5 is smallest, Type 1 largest. A written Incident Action Plan (IAP) starts at Type 3.",
  ["Complexity rises with jurisdictions involved, threat to life and property, and size of area.",
   "Type 5: 1 to 2 resources, up to 6 people, hours. Type 4: one operational period.",
   "Type 1: national resources, 500+ people per period, possible disaster declaration.",
   "Predicting resource needs to choose the structure is complexity analysis."])
slide(K, "Leader titles, level by level", G.TITLES,
  "Deputies only at IC, Section and Branch, and fully qualified for the job.",
  ["Know the pairs: Section Chief, Branch Director, Division or Group Supervisor, Strike Team or Task Force Leader.",
   "Division is a place; Group is a function.",
   "Strike Team: same kind and type. Task Force: a mix.",
   "A deputy holds the same box as the boss: shares the load, ready to take over. The next title down owns a smaller box."], wmin=880)
slide(K, "Transfer of command", G.TOC,
  "Always a face-to-face briefing. Command passes at the announced effective time.",
  ["The briefing uses ICS Form 201.",
   "Until the effective time, the outgoing IC is still in charge. No gap, never two people in charge.",
   "A more qualified person arriving may take command, leave it as it is, or ask for a more qualified IC.",
   "IC authority comes from law, agency policy and delegation of authority."])
slide(K, "How a plan reaches the field", G.FUNNEL,
  "Every assignment traces back to the incident objectives.",
  ["Management by objectives runs the whole chain.",
   "The IC or Unified Command sets objectives; Planning writes the IAP; the IC approves it.",
   "The Operational Period Briefing is run by the Planning Section Chief.",
   "Leaders show commitment to duty: step up when needed, develop subordinates."], w=900)
slide(K, "Objectives: specific and measurable", G.OBJ,
  "Where, by when, and what done looks like.",
  ["Have the class rewrite a broad objective into a measurable one.",
   "Test trap: broad, inspiring objectives are wrong. The test wants specific and measurable."], w=900)

K = "IS-700 &middot; National Incident Management System (NIMS)"
slide(K, "NIMS in one view", G.HOUSE,
  "Three components, held up by three principles.",
  ["NIMS applies to every stakeholder with incident duties, at every level.",
   "Components: Resource Management; Command and Coordination (which includes ICS); Communications and Information Management.",
   "Principles: Flexibility, Standardization, Unity of Effort.",
   "Standardization is what makes interoperability possible."])
slide(K, "Three levels, one response", G.LAYERS,
  "The scene acts, the Emergency Operations Center supports, the MAC Group sets priorities, one public voice.",
  ["MAC Group: senior officials set policy and priorities and settle resource conflicts. They do not run the incident.",
   "EOC: off-site information sharing, resource coordination, policy direction. Activates when the response grows.",
   "An ICS-like EOC starts fast because field staff already know the structure.",
   "JIS: one coordinated message. PIOs work together in the Joint Information Center."])
slide(K, "Resource management cycle", G.RING,
  "Inventory and type resources before the incident. Order local first.",
  ["Six steps: identify, order and acquire, mobilize, track and report, demobilize, reimburse and restock.",
   "Typing describes a resource by capability.",
   "Emergency Management Assistance Compact (EMAC): state-to-state sharing."], w=900)

K = "IS-800 &middot; National Response Framework (NRF)"
slide(K, "Tiered response: begin and end locally", G.TIERS,
  "Incidents are handled at the lowest level possible. Each ring steps in when the one inside needs more.",
  ["Local: first to arrive, last to leave.",
   "State: governor and state EOC; other states help through EMAC.",
   "Federal: Stafford Act incidents are led by FEMA; the Unified Coordination Group works at the Joint Field Office.",
   "Tribal governments may deal directly with the federal government."])
slide(K, "Coordinating structures: zoom out from the scene", ZOOM_LEAN,
  "Each step out supports the one closer to the scene.",
  ["Use the sports analogies on the slide; they land with cadets.",
   "MAC Group decides who gets scarce resources.",
   "RRCC is FEMA's regional center; NOC is the DHS national center."])
slide(K, "Five mission areas", G.MISSIONS,
  "The NRF focuses on Response. Three core capabilities span all five.",
  ["Prevention is specifically imminent terrorism.",
   "Mitigation reduces loss of life and property by lessening impact.",
   "Planning; Public Information and Warning; Operational Coordination run across every mission area.",
   "The National Preparedness Goal sets the vision and names the core capabilities."])
slide(K, "Seven community lifelines", WHEEL_EX,
  "Lifelines keep critical government and business functions running.",
  ["The course teaches seven. FEMA added an eighth, Water Systems, in 2023; answer the test with seven.",
   "Ask the class which lifeline a flooded hospital hits (Health and Medical)."], w=820)
slide(K, "The NRF is always on", G.DIMMER,
  "It never switches off. More of it engages as the incident grows.",
  ["Guiding principles include engaged partnership and scalable, flexible, adaptable capabilities.",
   "It aligns with NIMS and ties Response to the other four mission areas."], w=900)
ESF_A, ESF_B = G.ESFS.split('<p class="lab esub">', 1)
ESF_B = '<p class="lab esub">' + ESF_B
slide(K, "Emergency Support Functions", ESF_A,
  "Each need has an Emergency Support Function (ESF) that answers it.",
  ["Walk the flood example top to bottom: need, then the ESF that answers it.",
   "ESF #6 Mass Care also reunites children with families, working with the National Center for Missing &amp; Exploited Children.",
   "ESFs include government and private-sector partners, not only federal agencies."], wmin=968)
slide(K, "ESFs: activated only as needed", ESF_B,
  "More ESFs engage as the incident grows. The rest stay on standby.",
  ["ESF #5 Information and Planning and ESF #7 Logistics support the whole response.",
   "Standby functions activate only if this incident needs them."], w=900)

divider("Part 2", "eServices", ["CAPT 116", "CAPT 117"],
  ["Two online tests in eServices.",
   "These test our own regulation and habits. Cite-level detail matters: who, how many, how long."])

K = "CAPT 116 &middot; General Emergency Services &middot; CAPR 60-3"
slide(K, "Support priority when resources are short", G.PODIUM,
  "Air Force first, local last.",
  ["Order: Air Force, other Department of Defense, federal civil (such as FEMA), state, local.",
   "Source: CAPR 60-3, paragraph 1-4."], w=860)
slide(K, "Minimum team makeup", G.TEAMS,
  "A team operates within the limits of its lowest qualified member.",
  ["Aircrew: mission pilot (left seat), mission observer (right seat), mission scanner (back).",
   "Ground team: a qualified ground team leader plus at least three qualified members or supervised trainees, before release.",
   "Sources: paragraphs 1-16d(2), 1-17b(2)(a) and 1-17b(3)."])
slide(K, "Who can launch, who is covered", G.AUTH,
  "C911: wing commander or designee. FECA injury benefits: members 18 and older.",
  ["C911 is for imminently serious situations: life may be at stake (paragraph 1-9a).",
   "FTCA, the Federal Tort Claims Act, protects all members from liability.",
   "FECA, the Federal Employees' Compensation Act, does not cover cadets under 18 (paragraph 1-24)."])
slide(K, "In the field: yes, only if, never", G.FIELD,
  "Safety first, always. Night vision devices never while driving.",
  ["Private property: only to save life, after trying for agency approval and owner consent.",
   "Patient transport: only in an emergency with no other suitable transport.",
   "Never alter, separate or misuse communications or advanced technology equipment."])
slide(K, "Staying mission-ready", G.READY,
  "Specialty ratings last 36 months, to the last day of the month.",
  ["31 July: wing annual operations training plan due, in WMIRS.",
   "Alert rosters: update at least annually and after major changes.",
   "CAPF 101 shows what you may perform, as trainee or qualified.",
   "The IC makes sure WMIRS entries and approvals are complete before any sortie."])
slide(K, "The gate to emergency services", G.GATE,
  "Every member completes both, to qualify and to stay qualified.",
  ["Operations security (OPSEC) training plus a signed nondisclosure agreement (paragraph 1-35).",
   "Not only for sensitive missions. Every emergency services member."], w=900)
slide(K, "Who may add local rules", G.SUPP,
  "Wing is the lowest level that may supplement. All three approvals needed.",
  ["Region or wing may issue. Group and squadron may not (Congressional Squadron is the exception).",
   "Approvals: region commander, national operations, Air Force liaison operations.",
   "Test trap: the group commander is not on the approval list (paragraph 1-2)."])

K = "CAPT 117 &middot; Emergency Services continuing education"
slide(K, "Part 1 &middot; Critical Incident Stress Management (CISM)", G.CISMT,
  "Sooner is better. CISM is a set of tools, not one procedure.",
  ["Pre-incident education reduces the harmful effects of trauma.",
   "Defusing within hours. Debriefing (CISD) at 24 to 72 hours.",
   "Crisis intervention is emotional first aid, not therapy.",
   "Source: CAPR 60-5."])
slide(K, "Part 1 &middot; Four places stress shows up", G.QUAD,
  "Thinking, feeling, body, actions.",
  ["Ask the class for one example of each.",
   "Not new: shell shock, combat fatigue, post-traumatic stress disorder (PTSD).",
   "Long-term stress accelerates aging and harms health."], w=820)
slide(K, "Part 2 &middot; Crew Resource Management (CRM)", G.CRMCHAIN,
  "Accidents are a chain. Anyone who speaks up breaks a link.",
  ["CRM is every crew member's job, not just the pilot in command's.",
   "It is teamwork, communication, attitudes and behavior, not stick skills.",
   "Split the workload to limit fatigue."], w=900)
slide(K, "Part 2 &middot; Cockpit habits", G.CRMHAB,
  "Aviate, navigate, communicate. Close every loop.",
  ["Announce what you are about to do before you do it.",
   "Sterile cockpit: no distractions for the crew.",
   "Give decision makers correct, relevant information, not everything."], wmin=860)
slide(K, "Part 3 &middot; Mission base", MBASE_LEAN,
  "Know where to report, check in, keep the log, check out.",
  ["Check in at any designated location: command post, base, camp, staging area, helibase.",
   "Sent straight to a tactical assignment? Report to the division or group supervisor.",
   "Unit log is ICS form 214, every operational period. 24-hour time. Clear text on the radio.",
   "Demobilize: finish assignments, return radios and gear, check out."])

S.append(dict(kind="slide", kick="Wrap-up", title="Now take the tests", vis=CLOSE, take="Keep the study companion open while you test.",
  notes=["Save every certificate PDF and turn in copies as your unit requires.",
         "Next: hands-on training with a mentor, then sign-off by a skills evaluator."], w=900))

# ---------------------------------------------------------------- render
def notes_html(n):
    return '<aside class="notes"><ul>' + "".join(f"<li>{x}</li>" for x in n) + "</ul></aside>"

def render(i, s):
    n = i + 1
    if s["kind"] == "title":
        return (f'<section class="slide dk-title" data-title="{e(s["title"])}"><div class="dk-tin">'
                f'<p class="dk-kick">{s["kick"]}</p><h1>{s["title"]}</h1><div class="dk-rule"></div>'
                f'<p class="dk-sub">{s["sub"]}</p></div>'
                '<p class="dk-keys">Right arrow or click: next &middot; Left: back &middot; N: notes &middot; P: presenter view &middot; F: full screen</p>'
                f'{notes_html(s["notes"])}</section>')
    if s["kind"] == "div":
        chips = "".join(f"<span>{c}</span>" for c in s["chips"])
        return (f'<section class="slide dk-div" data-title="{e(s["title"])}"><p class="dk-kick">{s["kick"]}</p>'
                f'<h1>{s["title"]}</h1><div class="dk-rule"></div><div class="dk-chips">{chips}</div>'
                f'<span class="dk-n">{n}</span>{notes_html(s["notes"])}</section>')
    plain = re.sub(r"<[^>]+>", "", s["title"]).replace("&middot;", "·")
    return (f'<section class="slide" data-title="{e(plain)}"><header><p class="dk-kick">{s["kick"]}</p>'
            f'<span class="dk-n">{n}</span></header><h1>{s["title"]}</h1>'
            f'<div class="vis"><div class="fit" data-w="{s["w"]}" data-min="{s.get("wmin", 600)}" style="width:{s["w"]}px">{s["vis"]}</div></div>'
            f'<p class="take">{s["take"]}</p>{notes_html(s["notes"])}</section>')

if __name__ == "__main__":
    body = "\n".join(render(i, s) for i, s in enumerate(S))
    out = ((HERE / "template.html").read_text()
           .replace("{{GUIDECSS}}", GCSS).replace("{{VERSION}}", VERSION).replace("{{SLIDES}}", body))
    (HERE.parent / "index.html").write_text(out)
    print("wrote index.html", len(out), "slides:", len(S))
