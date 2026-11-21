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

VERSION = "2.5.0"

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

# ---------------------------------------------------------------- deck-only visuals
# The deck is a plain-language review for ages 12 to 17. Visuals here may differ from the study companion.
def sub(html, pairs):
    """Swap wording inside a guide diagram; fail loudly if the guide text changed."""
    for a, b in pairs:
        assert a in html, a
        html = html.replace(a, b)
    return html

def cards(items, cols=None, cls=""):
    # items: (where, name, plain meaning, "like ..." analogy or "")
    cols = cols or len(items)
    out = "".join(f'<div class="dk-card"><span class="dk-w">{w}</span><b>{n}</b><span class="dk-p">{p}</span>'
                  + (f'<em class="dk-like">{l}</em>' if l else "") + '</div>' for w, n, p, l in items)
    return f'<div class="dk-cards {cls}" style="grid-template-columns:repeat({cols},minmax(0,1fr))">{out}</div>'

ROADMAP = """
<div class="dk-lanes">
 <p class="lab">Part 1 &middot; FEMA Independent Study, online at training.fema.gov</p>
""" + G.flow([("FEMA SID", "Your test login. Do this first"), ("IS-100", "Who is in charge at an emergency"),
              ("IS-200", "Growing the team as it gets bigger"), ("IS-700", "How every team works together"),
              ("IS-800", "How the whole nation helps")]) + """
 <p class="lab">Part 2 &middot; eServices</p>
""" + G.flow([("CAPT 116", "Our emergency services rules"), ("CAPT 117", "Stress, teamwork and mission base")], "dk-half") + """
</div>"""

SIDFLOW = G.flow([
 ("Register", "Use your own email: one email, one SID. Password of 14+ characters. You must be 10 or older."),
 ("First login", "A 6-digit code comes to your phone, app or email. That second check is multifactor authentication (MFA)."),
 ("Take the exam", "At training.fema.gov/is. Type in your SID. 75% passes."),
 ("Certificate", "It is emailed to you and saved online. Download the PDF and keep it."),
])

ORG_KID = sub(G.ORG, [
 ("Always staffed. Does every job not yet assigned.", "The boss of the whole emergency. There is always one."),
 ("Command Staff &middot; advise the IC", "Command Staff &middot; the IC&rsquo;s helpers"),
 ("Only voice to the media", "Talks to the news and the public"),
 ("Can stop unsafe work at once", "Can stop anything unsafe, right away"),
 ("Contact for other agencies", "Talks to the other agencies"),
 ("Does the tactical work", "The doers: do the hands-on work"),
 ("Tracks resources, information, documents. Writes the Incident Action Plan (IAP).", "The planners: write the Incident Action Plan (IAP)"),
 ("Food, comms, medical, transport, facilities", "The getters: food, radios, vehicles, supplies"),
 ("Costs, time, claims, mutual aid paperwork", "The payers: track costs and time"),
 ("General Staff &middot; section chiefs, who run the work", "General Staff &middot; four section chiefs"),
])

RULES = """
<div class="dk-rules">
 <div class="dk-rc"><b>Span of control</b>
  <div class="dk-scale">""" + "".join(
    f'<span class="{"best" if n == 5 else "in" if 3 <= n <= 7 else ""}">{n}</span>' for n in range(1, 10)) + """</div>
  <div class="dk-scl"><span>Too few</span><span>3 to 7 people &middot; 5 is best</span><span>Too many: add a leader</span></div>
 </div>
 <div class="dk-rc"><b>Unity of command</b>
  <div class="dk-uc"><span class="dk-box">One boss</span><span class="dk-vl"></span><span class="dk-box me">You</span></div>
  <p>Orders come only from your boss. Anyone can share information.</p>
 </div>
 <div class="dk-rc"><b>Common terminology</b>
  <div class="dk-say"><span class="yes">&ldquo;Engine 2, return to staging&rdquo;</span><span class="no">&ldquo;E2, 10-8, back to the barn&rdquo;</span></div>
  <p>Say it in plain English. No codes or slang.</p>
 </div>
 <div class="dk-rc"><b>Dispatch</b>""" + G.flow([("Asked for", ""), ("Sent", ""), ("Check in", "")], "dk-mini") + """
  <p><span class="dk-never">Never</span> just show up. Wait to be asked.</p>
 </div>
</div>"""

TYPES_KID = '<div class="dk-types">' + "".join(
    f'<div class="dk-trow"><span class="dk-tl">Type {t}</span><span class="dk-tb"><span style="width:{w}%"></span></span>'
    f'<span class="dk-te"><b>{ex}</b>{d}</span><span class="dk-chip {"on" if plan else ""}">{"Written plan" if plan else "No written plan"}</span></div>'
    for t, w, ex, d, plan in [
     ("5", 18, "Car crash", "A few responders. Over in hours.", False),
     ("4", 36, "House fire", "Several crews. One shift.", False),
     ("3", 56, "Large wildfire", "Section chiefs added. Lasts days.", True),
     ("2", 78, "Regional flood", "Help from the region. Up to 200 people a shift.", True),
     ("1", 100, "Major hurricane", "National help. 500+ people a shift.", True),
    ]) + '<p class="dk-tnote">Examples are typical, not fixed. Size and complexity set the type.</p></div>'

LADDER = '<div class="dk-ladder">' + "".join(
    f'<div class="dk-step" style="margin-left:{n * 26}px"><span class="dk-lv">{lvl}</span><b>{t}</b>'
    f'<span class="dk-lx">{x}</span><span class="dk-chip {"on" if dep else ""}">{"Deputy allowed" if dep else "No deputy"}</span></div>'
    for n, (lvl, t, x, dep) in enumerate([
     ("Incident", "Commander", "Runs the whole thing", True),
     ("Section", "Chief", "Operations, Planning, Logistics, Finance", True),
     ("Branch", "Director", "Added when a section gets too big", True),
     ("Division or Group", "Supervisor", "Division = a place. Group = a job.", False),
     ("Strike Team or Task Force", "Leader", "Strike Team = all the same. Task Force = a mix.", False),
    ])) + '</div>'

HANDOFF = G.flow([
 ("Arrive", "The new incident commander (IC) looks over the scene."),
 ("Brief face to face", "The old IC explains everything, using ICS Form 201."),
 ("Pick the time", "Both agree on the exact handoff time."),
 ("Tell everyone", "Everyone hears who is in charge, and from when."),
]) + """
<div class="dk-hand"><span>Old IC in charge</span><b>Handoff time</b><span class="in">New IC in charge</span></div>"""

LEVELS_KID = cards([
 ("On scene", "Incident Command", "Does the work right now.", "Players on the field"),
 ("Off site", "Emergency Operations Center (EOC)", "Gets the scene what it needs.", "Coaches and equipment staff"),
 ("Policy", "Multiagency Coordination (MAC) Group", "Decides what matters most when there isn&rsquo;t enough.", "League officials"),
 ("Everyone", "Joint Information System (JIS)", "One clear message to the public.", "One team spokesperson"),
])

TIERS_KID = sub(G.TIERS, [
 ("Stafford Act: FEMA leads; the Unified Coordination Group leads at the Joint Field Office (JFO). Non-Stafford: the agency with primary legal authority.",
  "FEMA leads a declared disaster. Other federal agencies lead what the law gives them."),
 ("Governor and state EOC. Other states help through the Emergency Management Assistance Compact (EMAC), interstate mutual aid.",
  "The governor and the state&rsquo;s emergency center. Other states can send help too."),
 ("First to arrive, last to leave. Police, fire, emergency medical services (EMS). The incident commander (IC) relays needs to the local emergency operations center (EOC).",
  "Police, fire and ambulance. First to arrive, last to leave."),
])

ZOOM_KID = cards([
 ("On scene", "Unified Command", "Leaders from each agency agree on one plan. Each keeps its own authority.", "Co-captains, one game plan"),
 ("Off site", "Emergency Operations Center", "Sends the scene what it needs.", "Support staff: they supply, not play"),
 ("Policy", "MAC Group", "Senior officials decide who gets scarce resources.", "League officials with only one bus"),
 ("Region and nation", "FEMA and Homeland Security centers", "Regional Response Coordination Center (RRCC) and National Operations Center (NOC) watch the big picture.", "The league&rsquo;s head office"),
]) + '<div class="zbar"><span>Closer to the scene</span><span>Wider view</span></div>'

MISSIONS_KID = sub(G.MISSIONS, [
 ("Stop imminent terrorism", "Stop a terror attack before it happens"),
 ("Secure people and assets", "Keep people and places safe"),
 ("Reduce loss of life and property by lessening disaster impact", "Make disasters hurt less, like building a levee"),
 ("Save lives, protect property and environment, meet basic needs", "Save lives and meet basic needs right now"),
 ("Restore and rebuild", "Rebuild afterward"),
])

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
    WHEEL_EX = sub(WHEEL_EX, [(f'>{name}</div>', f'>{name}<span class="dk-ex">{ex}</span></div>')])

DIMMER_KID = sub(G.DIMMER, [
 ("The NRF never switches off. More of it engages as the incident grows. It covers the Response mission area, ties it to the other four, and aligns with NIMS.",
  "Like a dimmer switch, not an on/off switch: always on, turned up as the emergency grows."),
])

ESF_A, ESF_B = G.ESFS.split('<p class="lab esub">', 1)
ESF_B = '<p class="lab esub">' + ESF_B

AUTH_KID = sub(G.AUTH, [
 ("Imminently serious: life may be at stake", "A life may be at stake right now"),
 ("Only the wing commander, or the commander&rsquo;s designee <span class=\"nw\">(§1-9a)</span>", "Only the wing commander, or someone the commander picks"),
 ("Who is covered on Air Force-assigned missions <span class=\"cite\">§1-24a, b</span>", "On Air Force-assigned missions, you are covered by"),
 ("protects members from liability", "protects you if someone sues"),
 ("pays injury benefits", "pays if you are hurt"),
])

FIELD_KID = """
<div class="yon">
 <div class="ycol y"><span class="yh">Yes</span>
  <p><b>Safety first</b>, always</p>
  <p><b>Night vision goggles</b> while walking or riding as a passenger</p>
  <p><b>Common sense</b> when the rules don&rsquo;t say</p></div>
 <div class="ycol o"><span class="yh">Only if</span>
  <p><b>Go onto private land</b>: only to save a life, after trying to get permission</p>
  <p><b>Carry a patient</b>: only in an emergency with no other ride</p></div>
 <div class="ycol yn"><span class="yh">Never</span>
  <p><b>Night vision goggles while driving</b></p>
  <p><b>Take apart or misuse</b> radios and tech gear</p></div>
</div>"""

READY_KID = sub(G.READY, [
 ("each wing&rsquo;s annual operations training plan is due to the liaison region in WMIRS (Web Mission Information Reporting System), for the next fiscal year (§1-7). Alert rosters: update at least annually, and reissue them after major changes (§1-5c(6)).",
  "the wing&rsquo;s training plan for next year is due. Alert rosters (who to call): update at least once a year, and after big changes."),
])

GATE_KID = sub(G.GATE, [
 ("Operations security: what not to share about missions", "Operations security: what not to post or share about missions"),
 ("Signed, promising to protect mission information", "A signed promise to keep mission information private"),
 ("Required to become qualified, and to stay qualified. Every member, not only those on sensitive missions (§1-35).", "Needed to join, and to stay in. Every member."),
])

SUPP_KID = sub(G.SUPP, [("<p class=\"snot\">Not on the list: the group commander (§1-2)</p>", "<p class=\"snot\">Not on the list: the group commander</p>")])

CISM_KID = sub(G.CISMT, [
 ("Pre-incident education. Reduces the harmful effects of trauma.", "Learn what stress does, so it hits less hard"),
 ("<span>Defusing</span>", "<span>Defusing: a short talk</span>"),
 ("<span>Critical Incident Stress Debriefing (CISD)</span>", "<span>Debriefing (CISD): a group talk</span>"),
 ("Peer support and referral", "Friends, support and more help if needed"),
])

MBASE_KID = G.flow([
 ("Before you go", "Know where and when to report, and to whom. Pack for a long stay."),
 ("Check in", "At the base, camp or staging area. Sent straight to a job? Report to that leader."),
 ("Work", "Leaders keep a unit log (ICS form 214). Use 24-hour time. Plain words on the radio."),
 ("Check out", "Finish the job. Return radios and gear. Then leave."),
])

HOUSE_KID = cards([
 ("Pillar 1", "Resource Management", "&ldquo;Do we have what we need?&rdquo;", "Checking the gear bag"),
 ("Pillar 2", "Command and Coordination", "&ldquo;Who leads, and how do we work together?&rdquo; Includes ICS.", "The coach and the captains"),
 ("Pillar 3", "Communications and Information Management", "&ldquo;Does everyone know what they need to?&rdquo;", "Everyone hears the play call"),
]) + '<p class="lab">Held up by three principles</p>' + G.tiles([
 ("Flexibility", "Works for any emergency, any size"),
 ("Standardization", "Same words and setup, so teams fit together"),
 ("Unity of Effort", "Shared goals; each group keeps its own authority"),
], 3)

CRM_KID = '<p class="lab">When it gets busy, in this order</p>' + G.flow([
 ("Aviate", "Fly the aircraft"), ("Navigate", "Know where you are going"), ("Communicate", "Talk on the radio")]) + \
 '<p class="lab" style="margin-top:56px">Closed loop: every request, every time</p>' + G.flow([
 ("Say you heard it", "&ldquo;Setting 122.9&rdquo;"), ("Do it", "Make the change"), ("Say it&rsquo;s done", "&ldquo;122.9 set&rdquo;")])

CLOSE = """
<div class="dk-close">
 <div class="dk-ct"><span class="sn">1</span><b>FEMA Independent Study</b><span>training.fema.gov/is &middot; enter your SID &middot; 75% passes &middot; save each certificate</span></div>
 <div class="dk-ct"><span class="sn">2</span><b>eServices</b><span>CAPT 116, then CAPT 117 (all three parts)</span></div>
 <div class="dk-ct"><span class="sn">3</span><b>Study companion</b><span>Diagrams, plus a practice test for every exam. Keep it open while you test.</span></div>
</div>"""

# ---------------------------------------------------------------- slides
S = []
def slide(kick, title, vis, take, notes, w=968, wmin=600):
    S.append(dict(kind="slide", kick=kick, title=title, vis=vis, take=take, notes=notes, w=w, wmin=wmin))
def divider(part, title, chips, notes):
    S.append(dict(kind="div", kick=part, title=title, chips=chips, notes=notes))

S.append(dict(kind="title", kick="Classroom review", title="Emergency Services and FEMA Test Prep",
  sub="Test day: the plan, then each operational period&rsquo;s review. Federal Emergency Management Agency (FEMA) and eServices tests.",
  notes=["Today: the few big ideas each test keeps asking about. Then you take the tests.",
         "Passing shows you learned the basics. Real skills come next, with a mentor and a skills evaluator.",
         "Every slide has a question to ask the class in these notes. Get answers out loud before moving on."]))
slide("Today", "Six tests, in this order", ROADMAP,
  "Get your FEMA Student ID (SID) first. Every FEMA test asks for it.",
  ["Ask: why do we take IS-100 before IS-200? (200 builds on 100.)",
   "The FEMA tests zoom out: one scene (IS-100, IS-200), every team (IS-700), the whole nation (IS-800).",
   "The two eServices tests cover our own rules and habits."])
slide("Before any FEMA test", "FEMA Student ID: your test login", SIDFLOW,
  "One SID for life. Lost it? Recover it. Never make a second one.",
  ["Register at cdp.dhs.gov/femasid. The tests are on a different site: training.fema.gov/is.",
   "One email per SID, so brothers and sisters can&rsquo;t share a parent&rsquo;s email.",
   "Ask: what is the second check called? (Multifactor authentication.)",
   "Stuck: FEMA SID Help Desk 866-291-0696."])

divider("Part 1", "FEMA Independent Study", ["IS-100", "IS-200", "IS-700", "IS-800"],
  ["Four online tests. 75% passes.",
   "Test tip: when two answers look right, pick the one that uses the official term."])

K = "IS-100 &middot; Introduction to the Incident Command System (ICS)"
slide(K, "Who does what", ORG_KID,
  "One boss, three helpers, four sections: doers, planners, getters, payers.",
  ["Like a school play: the director is the incident commander (IC); the actors are Operations; the script writer is Planning; the props crew is Logistics; the ticket booth is Finance.",
   "Only fill the boxes you need. A small emergency may be the IC alone, doing every job.",
   "Ask: who talks to the news? (Public Information Officer.) Who can stop unsafe work? (Safety Officer.)",
   "Unified Command: when several agencies share the lead, they agree on one plan and each keeps its own authority."])
slide(K, "Four rules that keep it orderly", RULES,
  "Small teams, one boss each, plain words, and wait to be asked.",
  ["Span of control: like a teacher with a small group. 3 to 7 people per leader; 5 is best.",
   "Unity of command: one boss each, so you never get two different orders.",
   "Ask: what is wrong with &ldquo;10-8, back to the barn&rdquo;? (Codes and slang; not everyone knows them.)",
   "Showing up without being asked (self-dispatching) clogs the scene and nobody knows you are there.",
   "Accountability: check in, follow the plan, and leaders keep track of everyone."])

K = "IS-200 &middot; Basic ICS for Initial Response"
slide(K, "Incident types: Type 1 is the biggest", TYPES_KID,
  "Lower number, bigger incident. A written plan starts at Type 3.",
  ["Backwards on purpose: Type 5 is smallest, Type 1 is largest.",
   "The written plan is the Incident Action Plan (IAP).",
   "Ask: a tornado wipes out a whole county for weeks. What type? (Type 1 or 2.)",
   "Deciding the type by predicting what you will need is complexity analysis."])
slide(K, "Leader titles, top to bottom", LADDER,
  "Commander, Chief, Director, Supervisor, Leader.",
  ["Memory trick: Can Chiefs Direct Super Leaders? Commander, Chief, Director, Supervisor, Leader.",
   "Deputies only in the top three. A deputy is a backup boss who can take over, and must be fully qualified.",
   "Ask: is &ldquo;north side of the fire&rdquo; a Division or a Group? (Division: a place.) &ldquo;Medical&rdquo;? (Group: a job.)",
   "Strike Team: five ambulances. Task Force: an ambulance, an engine and a rescue truck."])
slide(K, "Changing who is in charge", HANDOFF,
  "Like passing a relay baton: face to face, at a set time, and everyone is told.",
  ["Until the handoff time, the old incident commander is still in charge. Never zero bosses, never two.",
   "A more qualified person who arrives may take over, leave it as it is, or ask for someone even more qualified.",
   "Ask: why not just hand off by text? (Things get missed; the briefing must be face to face.)"])
slide(K, "How a plan reaches the field", '<div class="dk-down"><div class="dk-arrow"><span>The plan flows down</span></div><div>'+G.FUNNEL+'</div></div>',
  "Big plan, then goals, then today&rsquo;s plan, then briefings, then your job.",
  ["Every job you get traces back to the goals at the top. That is management by objectives.",
   "The incident commander or Unified Command sets the goals. Planning writes the plan; the IC approves it.",
   "Ask: who runs the operational period briefing? (Planning Section Chief.)"], w=1000, wmin=1000)
slide(K, "A good goal is specific", G.OBJ,
  "Say where, by when, and what &ldquo;done&rdquo; looks like.",
  ["Game: turn &ldquo;Clean your room&rdquo; into a specific, measurable goal. (&ldquo;Clothes in the hamper and bed made by 7 pm.&rdquo;)",
   "Test trap: big, inspiring goals are wrong answers. The test wants specific and measurable."], w=900)

K = "IS-700 &middot; National Incident Management System (NIMS)"
slide(K, "NIMS: the shared playbook", '<div class="dk-t19">'+HOUSE_KID+'</div>',
  "Every team uses the same playbook, so any team can work with any other.",
  ["Like every school using the same rules for a sport: teams that never met can still play together.",
   "Three components (the pillars), held up by three principles (the foundation).",
   "Ask: which pillar answers &ldquo;do we have what we need?&rdquo; (Resource Management.)"])
slide(K, "Three levels, one response", '<div class="dk-t20">'+LEVELS_KID+'</div>',
  "The field does, the center supplies, the officials decide, one voice talks.",
  ["Emergency Operations Centers (EOCs) are off site. They support the scene; they do not run it.",
   "The MAC Group only steps in when there isn&rsquo;t enough to go around.",
   "Public Information Officers work together in the Joint Information Center so the public gets one message.",
   "Ask: two news crews hear different stories. Which part failed? (Joint Information System.)"])
slide(K, "Resource management cycle", '<div class="dk-ring">'+G.RING+'</div>',
  "Know what you have before you need it. Ask nearby first. Return and restock after.",
  ["Like a school sports closet: count and label the gear, hand it out, track it, get it back, replace what broke.",
   "Typing means describing a resource by what it can do.",
   "Ask: which step happens before any emergency? (Inventory and typing.)"], w=1000, wmin=1000)

K = "IS-800 &middot; National Response Framework (NRF)"
slide(K, "Help starts local and grows outward", TIERS_KID,
  "Town first, then state, then nation. Each ring helps when the inside one needs more.",
  ["Handle it at the lowest level that can. Tribal governments may go straight to the federal government.",
   "States help each other through the Emergency Management Assistance Compact (EMAC).",
   "Ask: who is first to arrive and last to leave? (Local responders.)"])
slide(K, "Who coordinates: zoom out from the scene", '<div class="dk-t20">'+ZOOM_KID+'</div>',
  "Each step out supports the one closer to the scene.",
  ["Same sports picture as IS-700: players, support staff, league officials, head office.",
   "Ask: who decides which town gets the only rescue helicopter? (Multiagency Coordination Group.)"])
slide(K, "Five mission areas", '<div class="dk-s39">'+sub(MISSIONS_KID,[("<span>Planning</span>","<span>Planning<small>Decide what to do, and how</small></span>"),("<span>Public Information and Warning</span>","<span>Public Information and Warning<small>Tell people what is happening and what to do</small></span>"),("<span>Operational Coordination</span>","<span>Operational Coordination<small>Get every team working together</small></span>")])+'</div>',
  "Before, during, after. The NRF covers the &ldquo;during&rdquo;: Response.",
  ["Prevention is only about stopping terrorism.",
   "Planning, Public Information and Warning, and Operational Coordination show up in all five.",
   "Ask: a town raises a riverbank wall before flood season. Which mission area? (Mitigation.)"])
slide(K, "Seven community lifelines", WHEEL_EX,
  "Ask the class: which lifeline goes down first in a flood?",
  ["Lifelines are what a community needs to keep running.",
   "The course teaches seven. FEMA added an eighth, Water Systems, in 2023. Answer the test with seven.",
   "Ask: a flooded hospital hits which lifeline? (Health and Medical.)"], w=820)
slide(K, "The NRF is always on", '<div class="dk-miles">'+"".join(f'<div style="left:{x}%"><i style="width:{d}px;height:{d}px"></i><span>{t}</span></div>' for x,d,t in [(10,16,"Car crash"),(37,26,"House fire"),(63,38,"Town flood"),(90,54,"Hurricane")])+'</div>'+DIMMER_KID,
  "A dimmer switch, not an on/off switch.",
  ["It never turns off. More of it is used as an emergency grows.",
   "It works hand in hand with NIMS.",
   "Ask: is the NRF only used for huge disasters? (No. It is always in effect.)"], w=900)
slide(K, "Emergency Support Functions", ESF_A,
  "Each need has an Emergency Support Function (ESF) that answers it.",
  ["Walk the flood top to bottom: the need, then the function that handles it.",
   "Mass Care (ESF #6) also reunites children with their families.",
   "Ask: power is out across town. Which ESF? (#12 Energy.)"], wmin=968)
slide(K, "ESFs turn on only when needed", '<div class="dk-s43">'+ESF_B+'</div>',
  "More ESFs switch on as the emergency grows. The rest wait on standby.",
  ["ESFs include government and private companies, not only federal agencies.",
   "Ask: does a small flood turn on Firefighting (ESF #4)? (Only if the incident needs it.)"], w=900)

divider("Part 2", "eServices", ["CAPT 116", "CAPT 117"],
  ["Two online tests in eServices.",
   "These test our own rules: who, how many, how long. Details matter."])

K = "CAPT 116 &middot; General Emergency Services &middot; CAPR 60-3"
slide(K, "Who gets help first", G.PODIUM,
  "When there isn&rsquo;t enough to go around: Air Force first, local last.",
  ["Order: Air Force, other Department of Defense, federal agencies like FEMA, state, local.",
   "Ask: the state and the Air Force both ask for the same airplane. Who gets it? (The Air Force.)"], w=860)
slide(K, "Smallest team allowed", G.TEAMS,
  "A team is only as strong as its least trained member.",
  ["Aircrew of three: pilot, observer, scanner.",
   "Ground team: a qualified leader plus at least three members or supervised trainees.",
   "Ask: the team has one trainee. Who sets the pace? (The trainee: the team works at its weakest link.)"])
slide(K, "Who can say &ldquo;go&rdquo;, and who protects you", '<div class="dk-s10">'+AUTH_KID+'</div>',
  "Emergency (C911) missions: the wing commander decides. Injury pay: 18 and older.",
  ["FTCA is the Federal Tort Claims Act. FECA is the Federal Employees&rsquo; Compensation Act.",
   "Cadets under 18 are not covered by FECA.",
   "Ask: a 16-year-old is hurt on a mission. Does FECA pay? (No.)"])
slide(K, "In the field: yes, only if, never", FIELD_KID+'<p class="dk-light">Yes, only if, never: stay aware of what is around you and use good judgment.</p>',
  "Safety first. Night vision goggles never while driving.",
  ["Private land: only to save a life, and only after trying to get permission.",
   "Ask: can you drive with night vision goggles if it&rsquo;s really dark? (Never.)"])
slide(K, "Staying ready", '<div class="dk-s12">'+READY_KID+'<p class="dk-light">Specialty rating: a mission job you are qualified to do, like ground team member.</p></div>',
  "Your ratings last 36 months, to the last day of the month.",
  ["Your qualification card (CAPF 101) shows what you are allowed to do.",
   "Ask: rated on 10 March 2027. When does it expire? (31 March 2030.)"])
slide(K, "Two things before any mission", GATE_KID,
  "OPSEC training and a signed promise, for every member.",
  ["OPSEC means operations security: not posting or sharing mission details.",
   "Ask: can you post a photo of the search area on social media during a mission? (No.)"], w=900)
slide(K, "Who can add local rules", SUPP_KID+'<p class="dk-light">Local rules: extra rules a wing or region adds to the national rules. They are called a supplement.</p>',
  "Wing or region only, with all three approvals. Not groups or squadrons.",
  ["A local rule added to the regulation is a supplement.",
   "Ask: can a group commander approve one? (No.)"])

K = "CAPT 117 &middot; Emergency Services continuing education"
slide(K, "Part 1 &middot; Stress care: sooner is better", CISM_KID+'<p class="dk-light">CISD means Critical Incident Stress Debriefing: a group talk with trained helpers, 1 to 3 days after a hard event.</p>',
  "Talk about it early. Help works best soon after.",
  ["This is Critical Incident Stress Management (CISM): a set of tools, not one meeting.",
   "It is like first aid for feelings, not therapy.",
   "Ask: when does the group debriefing happen? (24 to 72 hours after.)"])
slide(K, "Part 1 &middot; Four places stress shows up", G.QUAD,
  "Thinking, feelings, body and actions.",
  ["Ask for one example of each from the class.",
   "Older names for it: shell shock, combat fatigue, post-traumatic stress disorder (PTSD)."], w=820)
slide(K, "Part 2 &middot; Teamwork in the aircraft", G.CRMCHAIN,
  "Anyone, even the newest crew member, can speak up and break the chain.",
  ["This is Crew Resource Management (CRM): teamwork and talking, not flying skill.",
   "Ask: the scanner notices fuel looks low. What should she do? (Say so, right away.)"], w=900)
slide(K, "Part 2 &middot; Cockpit habits", '<div class="dk-bold">'+CRM_KID+'</div>',
  "Fly first, then find the way, then talk. Close every loop.",
  ["Closed loop: say you heard it, do it, say it&rsquo;s done.",
   "Sterile cockpit: no distractions when the crew is busy.",
   "Ask: the pilot says &ldquo;set 122.9&rdquo;. What do you say back? (&ldquo;Setting 122.9&rdquo;, then &ldquo;122.9 set.&rdquo;)"])
slide(K, "Part 3 &middot; Mission base", '<div class="dk-bold">'+MBASE_KID+'</div>',
  "Know where to go, check in, keep the log, check out.",
  ["Ask: you are sent straight to a search team. Who do you report to? (That team&rsquo;s leader or supervisor.)",
   "Use 24-hour time: 1:30 pm is 1330."])

slide("Wrap-up", "Now take the tests", CLOSE, "Keep the study companion open while you test.",
  ["Save every certificate PDF.",
   "Next: hands-on training with a mentor, then sign-off by a skills evaluator."], w=900)


# ---------------------------------------------------------------- test-day plan slides (v2.0)
_SL=S
B="#001489";T="#E6E8F3";S="#9EA2A2";K="#000";H="#63666A"
def room(x,y,w,h,t,sub="",kind="st"):
    fill={"st":T,"off":"url(#hx)","free":"#fff","test":"#C9CEEA"}[kind]; stroke=B if kind in("st","test") else S
    tc=B if kind in("st","test") else H
    o=f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke}" stroke-width="1.2"/>'
    cx=x+w/2; cy=y+h/2
    if kind=="off": o+=f'<rect x="{cx-52}" y="{cy-11}" width="104" height="22" fill="#fff"/>'
    o+=f'<text x="{cx}" y="{cy-(8 if sub else 0)}" text-anchor="middle" dominant-baseline="central" font-size="{15 if kind!="off" else 12}" font-weight="700" fill="{tc}">{t}</text>'
    if sub: o+=f'<text x="{cx}" y="{cy+12}" text-anchor="middle" dominant-baseline="central" font-size="12" fill="{K}">{sub}</text>'
    return o
MAPSVG=f'''<svg class="map" style="width:100%;height:auto" viewBox="0 0 680 540" xmlns="http://www.w3.org/2000/svg">
<defs><pattern id="hx" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="{S}" stroke-width="1.2"/></pattern>
<marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="{B}" stroke-width="1.8"/></marker></defs>
{room(40,20,206,93,"Supply","","off")}
{room(246,20,160,93,"Check-in / Status","","st")}
{room(406,20,217,93,"Login Help","","st")}
{room(40,113,131,93,"Conf","","off")}
{room(40,206,131,192,"Comm","","off")}
<rect x="171" y="113" width="320" height="285" fill="#fff" stroke="{S}" stroke-width="1.5"/>
{room(203,118,265,58,"Staging","","st")}
<rect x="178" y="185" width="18" height="190" fill="{K}"/>
<text x="187" y="280" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" fill="#fff" transform="rotate(-90 187 280)">Big screen / Status</text>
{room(203,185,159,190,"Briefing","","st")}
{room(370,185,98,190,"Testing","","test")}
{room(491,160,132,96,"Restroom","","free")}
{room(491,256,132,142,"Kitchen","","free")}
{room(40,398,131,93,"Office","","free")}
{room(222,398,188,93,"Overflow testing","","test")}
{room(410,398,213,93,"Office","","off")}
<text x="560" y="126" text-anchor="middle" font-size="12" font-weight="700" fill="{K}">In / Out</text>
<line x1="620" y1="144" x2="491" y2="144" stroke="{B}" stroke-width="2" marker-end="url(#ah)"/>
<line x1="196" y1="520" x2="196" y2="402" stroke="{B}" stroke-width="2" marker-end="url(#ah)"/>
<text x="196" y="534" text-anchor="middle" font-size="12" font-weight="700" fill="{K}">In / Out</text>
</svg>'''

DAY=[("0830–0900","Setup","","Set up facility"),("0900–0920","Class Start","Assignments","Assign stations, explain cycle"),
("0920–1100","OP 1","Access + GES","Validate login, complete CAPT116"),("1100–1245","OP 2","GTM3","Complete IS100, IS700"),
("1245–1600","OP 3","GTM1 + Stretch","Complete CAPT117 p1, IS200, IS800"),("1600–1615","Debrief","","Conduct AAR, assign open actions"),
("1615–1645","Reset","","Log out computers, reset facility")]
DAYV='<table class="dk-day">'+"".join(f'<tr><td class="t">{t}</td><td class="p">{p_}</td><td class="f">{f}</td><td>{o}</td></tr>' for t,p_,f,o in DAY)+'</table>'
STATV=cards([("1 adult","Floor Ops","Keep the line moving.","Staging full, seats filled fast"),
 ("2 adults","Test Ops","Keep every test seat testing.","Pull stuck cadets fast"),
 ("2 adults","Check-in / Status","Know where every cadet stands.","Attendance, logins, the board"),
 ("2 adults","Login Help","Get every cadet logged in.","Find the code, get them in")],4)
CYC=[("Plan","Check Status (board). Review objective."),("Assign","Sequence cadets."),("Brief","Review test content."),
 ("Do","Complete testing and report results."),("Check","Review Status (board)."),("Adjust","After-action review (AAR). Capture retakes.")]
def cycv(times=None):
    return '<div class="dk-cyc">'+"".join(f'<div><span class="n">{i+1}</span><b>{st}</b>'+(f'<span class="tm">{times[i]}</span>' if times else '')+f'<span class="a">{a}</span></div>' for i,(st,a) in enumerate(CYC))+'</div>'
def opv(obj, flow, times):
    return (f'<p class="dk-obj"><span>Objective:</span> {obj}</p><p class="lab">Cadet flow</p>'
      +G.flow([(x,"") for x in flow],"dk-cflow")+'<p class="lab">Cycle</p>'+cycv(times))
def pslide(title, vis, take, notes, w=968, kick="Test day plan"):
    return dict(kind="slide", kick=kick, title=title, vis=vis, take=take, notes=notes, w=w, wmin=w)
DEB='<div class="dk-cyc dk-deb">'+"".join(f'<div><b>{t}</b><span class="a">{a}</span></div>' for t,a in [("1600","Review final Status Board."),("1602","AAR: one thing to keep, one to change."),("1612","Each unit leader hears which tests are outstanding.")])+'</div><div class="aar3"><div>What did we plan?</div><div>What happened?</div><div>What do we change?</div></div>'

CREW = dict(kind="slide", kick="CAPT 117 &middot; Emergency Services continuing education", title="Part 2 &middot; Keep the crew sharp",
 vis='<div class="dk-bold">'+G.tiles([
  ("Share the work", "Split the jobs so nobody gets worn out"),
  ("Say it first", "Tell the crew what you are about to do, then do it"),
  ("Quiet when busy", "Sterile cockpit: no chatter or distractions during busy moments"),
  ("Only what helps", "Give the pilot the facts that matter, not everything"),
  ("Same words", "Everyone uses the standard terms and hand signals"),
  ("Everyone's job", "CRM is the whole crew, not just the pilot"),
 ], 3)+'</div>',
 take="A sharp crew shares the work, talks first, and keeps it calm.",
 notes=["Ask: the crew is landing and you want to point out a cool barn. Now or later? (Later. Sterile cockpit.)",
        "Ask: why split the work? (Tired crews make mistakes. That starts the chain.)"], w=968, wmin=600)

def themes(code, name, items, kick):
    vis=f'<div class="dk-themes" style="grid-template-rows:repeat({(len(items)+1)//2},auto);grid-auto-flow:column">'+"".join(f'<div><span>{i+1}</span>{t}</div>' for i,t in enumerate(items))+'</div>'
    return dict(kind="slide", kick=kick, title=f"{code}: the big themes", vis=vis, take="Listen for these. The test asks about each one.",
                notes=[f"{name}: walk the themes, then the slides."], w=760, wmin=760)
TH116=themes("CAPT 116","General Emergency Services",["Who gets help first","Smallest team allowed","Who can say &ldquo;go&rdquo;, and who protects you","In the field: yes, only if, never","Staying ready","Two things before any mission","Who can add local rules"],"CAPT 116 &middot; General Emergency Services")
TH100=themes("IS-100","Introduction to ICS",["Who does what","Span of control","Unity of command","Common terminology","Dispatch and check-in"],"IS-100 &middot; Introduction to the Incident Command System (ICS)")
TH700=themes("IS-700","NIMS",["The shared playbook","Three levels, one response","Resource management"],"IS-700 &middot; National Incident Management System (NIMS)")
TH117=themes("CAPT 117 Part 1","Stress care",["Stress care: sooner is better","Four places stress shows up"],"CAPT 117 &middot; Emergency Services continuing education")
K5="IS-5.A &middot; An Introduction to Hazardous Materials"
TH200=themes("IS-200","Basic ICS",["Incident types","Leader titles","Changing who is in charge","How a plan reaches the field","Specific goals"],"IS-200 &middot; Basic ICS for Initial Response")
TH800=themes("IS-800","NRF",["Help starts local","Who coordinates","Five mission areas","Community lifelines","Always on","Emergency Support Functions"],"IS-800 &middot; National Response Framework (NRF)")
o=_SL
NEW=[o[0],
 pslide("The day at a glance",DAYV,"Lunch: 5-Guys pickup order at 1300.",["Walk the day top to bottom.","Each operational period has one objective."]),
 pslide("Stations",STATV,"Problems go to the Incident Commander.",["Name each adult to a station."],w=760),
 pslide("Station map",MAPSVG,"Staging is a holding area. Testing and overflow are where cadets test.",["Walk the room: Check-in / Status, Login Help, Staging, Briefing, Testing, Overflow."],w=680),
 pslide("Every period runs the same cycle",cycv()+'<svg viewBox="0 0 800 56" style="width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg"><defs><marker id="lp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1L9 5L1 9z" fill="#001489"/></marker></defs><path d="M737.5 2 V34 H62.5 V8" fill="none" stroke="#001489" stroke-width="3" marker-end="url(#lp)"/><rect x="330" y="24" width="140" height="22" fill="#fff"/><text x="400" y="40" text-anchor="middle" font-size="15" font-weight="700" fill="#001489" font-family="Arial">Repeat</text></svg>',"Plan, Do, Check, Adjust.",["Cadets see the Incident Command System working, period by period."],w=800),
 dict(kind="div", kick="0920–1100", title="Operational Period 1", chips=["Login","CAPT 116"], notes=["Announce: Operational Period 1 begins now."]),
 pslide("Operational Period 1",opv("Validate login, complete CAPT116",["Briefing","Check in","Log in","Test","Report"],["0920","0923","0925","0945","1050","1055"]),
   "Ready now? Skip the brief and go to Staging.",["Next: the CAPT 116 review."],kick="0920–1100"),
TH116]+o[22:29]+[
 dict(kind="div", kick="1100–1245", title="Operational Period 2", chips=["IS-100","IS-700"], notes=["Announce: Operational Period 2 begins now."]),
 pslide("Operational Period 2",opv("Complete IS100, IS700",["Briefing","Test","Report"],["1100","1105","1110","1130","1235","1240"]),
   "Ready now? Skip the brief and go to Staging.",["Review IS-100, then IS-700."],kick="1100–1245"),TH100]+o[4:6]+[TH700]+o[11:14]+[
 dict(kind="div", kick="1245–1600", title="Operational Period 3", chips=["CAPT 117 Part 1","IS-200","IS-800"], notes=["Announce: Operational Period 3 begins now."]),
 pslide("Operational Period 3",opv("Complete CAPT117 p1, IS200, IS800",["Briefing","Test","Report"],["1245","1250","1255","1325","1550","1555"]),
   "Ready now? Skip the brief and go to Staging.",["Review CAPT 117 Part 1, then IS-200, then IS-800.","Test order: CAPT 117 Part 1, retakes, IS-200, IS-800."],kick="1245–1600"),TH117]+o[29:31]+[TH200]+o[6:11]+[TH800]+o[14:21]+[
 dict(kind="div", kick="1600", title="Wrap Up", chips=[], notes=["Final board, then the after-action review."]),
 pslide("Debrief",DEB,"Nobody leaves without knowing what they still owe.",["Ten minutes of AAR."],kick="1600–1615"),
 dict(kind="div", kick="Optional", title="Stretch", chips=["CAPT 117 Part 2","CAPT 117 Part 3"], notes=["Take-home tests. Use if time allows."]),
 themes("CAPT 117 Part 2","Crew Resource Management",["Teamwork in the aircraft","Speak up and break the chain","Fly, then find the way, then talk","Close every loop","Keep the crew sharp"],"CAPT 117 &middot; Emergency Services continuing education")]+o[31:33]+[CREW,
 themes("CAPT 117 Part 3","Mission base",["Before you go","Check in","Keep the log","Check out"],"CAPT 117 &middot; Emergency Services continuing education")]+o[33:34]+[
 dict(kind="div", kick="FEMA Independent Study", title="IS-5.A Hazardous Materials", chips=["Laws","Warning signs","Finding hazmat","Health","Protect yourself"], notes=["An Introduction to Hazardous Materials. Five units, one big idea: know it, avoid it, report it."]),
 themes("IS-5.A","Hazardous materials",["Who plans for a spill","Read the warning signs","Find the hazard","How it hurts you","Protect yourself"],K5)]+[
 dict(kind="slide", kick=K5, title=t, vis=v, take=tk, notes=n, w=w, wmin=600) for t,v,tk,n,w in [
 ("Unit 1 &middot; Who plans for a spill", G.T3, "Your town&rsquo;s LEPC writes the plan, and anyone can read it.",
  ["LEPC: Local Emergency Planning Committee. SERC: State Emergency Response Commission.",
   "Why the law exists: a gas leak in Bhopal, India killed at least 1,700 people.",
   "Big spill? Report it to the National Response Center, which the Coast Guard staffs 24 hours a day."], 968),
 ("Unit 2 &middot; The diamond on buildings", G.NFPA, "Blue is health, red is fire, yellow is reactivity, white is special. 4 is the worst.",
  ["You see this on tanks and buildings, not on trucks.",
   "Ask: a diamond shows a crossed-out W. What does that mean? (It reacts with water. Don&rsquo;t spray it.)"], 900),
 ("Unit 2 &middot; Reading a truck", G.DOTFIND, "Placard, then ID number, then shipping papers, then the guidebook.",
  ["The Emergency Response Guidebook (ERG) is for the first few minutes on scene.",
   "Ask: where are the shipping papers? (Within the driver&rsquo;s reach, or in the driver&rsquo;s door.)"], 800),
 ("Unit 2 &middot; The nine hazard classes", G.DOTC, "Class 3 liquids like gasoline cause the most accidents. Class 8 corrosives come next.",
  ["The lower the flash point, the more dangerous the liquid.",
   "Ask: which class is radioactive? (7.)"], 968),
 ("Unit 3 &middot; Finding hazmat", G.LIFE + '<p class="lab">Clues that something is wrong</p>' + G.CLUES, "Your nose is the worst detector. If something seems wrong, leave and call.",
  ["Hazmat can show up at any stage of its life, from the factory to the dump.",
   "Never pick up or touch a suspicious substance."], 968),
 ("Unit 3 &middot; The Safety Data Sheet", G.SDS, "Every chemical at work has a sheet that says what it does and what to do.",
  ["SDS used to be called MSDS (Material Safety Data Sheet).",
   "OSHA requires employers to keep them where workers can see them."], 800),
 ("Unit 4 &middot; How it gets in", G.ROUTES, "Breathe it, touch it, swallow it, or get cut by it.",
  ["Injection is the fastest: straight into the blood.",
   "Ask: a worker eats lunch at a dusty workbench. Which route? (Ingestion.)"], 720),
 ("Unit 4 &middot; Dose makes the poison", G.DOSE, "More dose, more harm. Even table salt can kill in a big enough dose.",
  ["Acute: a big dose all at once. Chronic: a little at a time for years.",
   "LD50: the dose that kills half of a test group."], 720),
 ("Unit 4 &middot; How hazmat moves", G.MEDIA, "Chemicals travel through air, water and soil, and can jump from one to another.",
  ["Groundwater is the hardest to clean, and half the country drinks it.",
   "Biomagnification: poison builds up as it moves up the food chain."], 720),
 ("Unit 5 &middot; Protect yourself", G.PROTECT, "Upstream, uphill, upwind, then get far away.",
  ["Caught in the cloud? Move crosswind, not straight away from it.",
   "Ask: told to shelter in place. Windows open or closed? (Closed, and turn off the fans.)"], 900),
 ("Unit 5 &middot; Decontamination", G.DECON, "Wash, strip from the top down, wash, change, bag it.",
  ["Skip the water if the chemical reacts with water.",
   "Never get into your car while contaminated. You&rsquo;ll spread it (cross-contamination)."], 720),
 ]]
S=_SL
S[:]=NEW

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
