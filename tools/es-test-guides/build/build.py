"""Builds ../index.html from practice.py plus the essentials below.
Run: python3 build.py   (no dependencies)"""
import re
from html import escape as e
from pathlib import Path
import practice as P

VERSION = "2.5.2"

LET = "ABCD"

def pq(items, start=1):
    out = []
    for i, (q, opts, ok) in enumerate(items, start):
        o = "".join(f'<li{" class=\"ok\"" if LET[j]==ok else ""}><span class="l">{LET[j]}</span>{e(t)}</li>' for j, t in enumerate(opts))
        out.append(f'<li><span class="n">{i}</span><p class="q">{e(q)}</p><ol class="opts">{o}</ol></li>')
    return "\n".join(out)

def ak(items, start=1):
    return "".join(f'<li><span class="n">{i}</span><b>{ok}</b> {e(opts[LET.index(ok)])}</li>'
                   for i, (q, opts, ok) in enumerate(items, start))

def practice(items):
    return practice_parts([("", items)])

def practice_parts(parts):
    total = sum(len(p[1]) for p in parts)
    qs, ks, i = [], [], 1
    for title, items in parts:
        h = f'<h3>{e(title)}</h3>' if title else ""
        qs.append(f'{h}<ol class="pq">{pq(items, i)}</ol>')
        ks.append(f'<ol class="ak">{ak(items, i)}</ol>')
        i += len(items)
    return (f'<h2>Practice test <span class="ct">{total} questions</span></h2>'
            '<p class="note">Original questions on the same ideas the test checks. Try each one, then check the answers on the last page.</p>'
            + "".join(qs)
            + '<div class="pb"></div><div class="akey"><h2>Practice answers</h2>' + "".join(ks) + '</div>')

def flow(steps, cls=""):
    s = "".join(f'<div class="step"><span class="sn">{i}</span><b>{t}</b><span>{d}</span></div>'
                for i, (t, d) in enumerate(steps, 1))
    return f'<div class="flow {cls}">{s}</div>'

def tiles(items, cols=4):
    s = "".join(f'<div class="tile"><b>{t}</b><span>{d}</span></div>' for t, d in items)
    return f'<div class="tiles c{cols}">{s}</div>'

def fig(caption, inner):
    return f'<figure><figcaption>{caption}</figcaption>{inner}</figure>'

def keyterm(x):
    # Key concept in full-strength black: a short "Term: explanation" lead-in,
    # plus any term marked [[like this]].
    i = x.find(": ")
    if 0 < i <= 70 and "<" not in x[:i] and "[[" not in x[:i] and len(x[:i].split()) <= 6:
        x = f'<span class="kt">{x[:i]}</span>{x[i:]}'
    x = re.sub(r"\(§[^)]*\)", lambda m: f'<span class="nw">{m.group(0)}</span>', x)
    return re.sub(r"\[\[(.+?)\]\]", r'<span class="kt">\1</span>', x)

def bullets(items, cls=""):
    return f'<ul class="ess {cls}">' + "".join(f"<li>{keyterm(x)}</li>" for x in items) + "</ul>"

def block(caption, inner="", items=None, two=False):
    # One concept: bold name (text before ":"), quiet subtitle, its diagram, then its supporting bullets.
    name, _, sub = caption.partition(": ")
    h = f'<div class="chead"><span class="cname">{name}</span>' + (f'<span class="csub">{sub}</span>' if sub else "") + '</div>'
    return f'<section class="concept">{h}{inner}{bullets(items, "two" if two else "") if items else ""}</section>'

def head(kicker, title, byline, where):
    return (f'<header class="ghead"><p class="kick">{kicker}</p><h1>{title}</h1>'
            f'<p class="by">{byline}</p><p class="where">{where}</p></header>')

FOOT = ('<footer class="gfoot">Independent study aid. Practice questions are original, not exam questions. '
        'Real-world rules come from the current publications, not this sheet.'
        '<span class="ver">ES &amp; FEMA Study Companion v' + VERSION + '</span></footer>')

def fema_link(code):
    return (f'Take it at <a href="https://training.fema.gov/is/courseoverview.aspx?code={code}">'
            f'training.fema.gov/is</a> ({code}). You need a FEMA SID to submit the exam. 75% passes.')

# ---------------------------------------------------------------- FEMA SID
SID = f"""
<section class="guide sid" id="sid" data-title="FEMA SID">
{head("Do this first, before any FEMA test", "FEMA Student ID (SID)", "Register once. Use the same SID for IS-100, IS-200, IS-700 and IS-800.",
 'Register at <a href="https://cdp.dhs.gov/FEMASID/">cdp.dhs.gov/femasid</a>. The FEMA courses are <i>not</i> on that site; they are at <a href="https://training.fema.gov/is/">training.fema.gov/is</a>.')}
<h2>Have ready</h2>
<ul class="ess two">
<li>Your full legal name (no nicknames)</li>
<li>An email only you use. One email can hold one SID, so siblings cannot share a parent&rsquo;s address</li>
<li>A phone number</li>
<li>Date, city and state of birth</li>
<li>Three short security answers (one word is best)</li>
<li>A password: 14+ characters, with a number, an upper and lower case letter, and one of <span class="mono">$ % ^ , ! # - _ + = ; : ~</span></li>
<li>Age 10 or older to receive FEMA exam credit</li>
</ul>
<hr class="div">
<div class="stepboxes">
<div class="sbox"><p class="sl">Step 1</p><h2 class="st">Register</h2>
<ol class="steps">
<li>Already have one? Use <a href="https://cdp.dhs.gov/FEMASID/account/find">Forgot your FEMA SID?</a> first. It emails it to you. Do not make a second one.</li>
<li>Go to <a href="https://cdp.dhs.gov/FEMASID/register">Register for a FEMA SID</a>.</li>
<li>Fill in name, email, phone, birth details and the three security questions. An alternate email is optional; password resets go there too.</li>
<li>Create the password.</li>
<li>Check <i>I agree to the Privacy Statement</i>, then select <i>Register</i>.</li>
<li>Write your SID number down. It is also emailed to you.</li>
</ol></div>
<div class="sbox"><p class="sl">Step 2</p><h2 class="st">First login</h2>
<ol class="steps">
<li>At cdp.dhs.gov/femasid select <i>Log in to FEMA SID</i>. Enter your SID number and password.</li>
<li>Pick a second factor: <i>Authenticator App</i> (recommended), <i>Mobile Phone</i> (text or call), or <i>Email</i>. Then <i>Continue</i>.</li>
<li>Enter the 6-digit code and select <i>Verify</i>.</li>
<li>That device is remembered for 21 days unless you clear its cookies.</li>
<li>Check your profile details. Fix anything wrong now.</li>
</ol></div>
<div class="sbox"><p class="sl">Step 3</p><h2 class="st">Take the exam</h2>
<ol class="steps">
<li>Open the course page from the guide for that test, or search the code (for example IS-100.c) at <a href="https://training.fema.gov/is/">training.fema.gov/is</a>.</li>
<li>Select <i>Take Final Exam</i>. Enter your SID when asked.</li>
<li>Answer every question. 75% passes.</li>
<li>Your certificate appears in the NDEMU Student Portal right away and is emailed to you. Save the PDF; you will need it as proof of completion.</li>
</ol></div>
</div>
<h2>Stuck?</h2>
<div class="tiles c2">
<div class="tile"><b>SID, password or MFA problems</b><span>FEMA SID Help Desk, 866-291-0696, weekdays 7:30 to 4:30 Central. Contact form on cdp.dhs.gov/femasid.</span></div>
<div class="tile"><b>Exam or certificate problems</b><span>FEMA Independent Study Program, 301-447-1200, weekdays 8:00 to 6:00 Eastern.</span></div>
</div>
<footer class="gfoot">Steps checked against cdp.dhs.gov/femasid and training.fema.gov on 10 Nov 2026. FEMA changes these screens; follow the screen if it differs.<span class="ver">ES &amp; FEMA Study Companion v{VERSION}</span></footer>
</section>"""

# ---------------------------------------------------------------- CAPT 116
C116 = f"""
<section class="guide" id="capt116" data-title="CAPT 116">
{head("Online test &middot; eServices", "CAPT 116 &middot; General Emergency Services", "CAPR 60-3(I), Emergency Services Training and Operational Missions (26 Dec 12)",
 "Take it in eServices. It is the starting point for every emergency services qualification.")}
<h2>Core essentials</h2>
{block("Support priority: when resources are short (§1-4)", flow([
 ("Air Force", "Highest"), ("Other DoD", ""), ("Federal civil", "FEMA, FAA"), ("State", ""), ("Local", "Lowest")], "rank"))}
{block("Minimum team makeup: before release", tiles([
 ("Aircrew of 3", "Mission Pilot flies. Mission Observer helps with navigation, radios and the search. Mission Scanner watches outside for the search objective."),
 ("Ground team of 4+", "Qualified Ground Team Leader plus at least 3 qualified members or supervised trainees. Works at the level of its <i>lowest</i> qualified member.")], 2))}
{block("On a mission: rules in the field", "", [
 "[[Safety]] must always be a primary concern (§1-1b).",
 "[[CAPR 60-3]] gives direction for mission training, qualification and actual missions. Where it is silent, use common sense and prudent judgment.",
 "[[C911]] missions are imminently serious, where life may be at stake. Only the wing commander or the commander&rsquo;s designee may authorize one (§1-9a).",
 "Air Force-assigned missions: Federal Tort Claims Act (FTCA) liability protection for members; FECA injury benefits for members 18 and older, so a cadet under 18 is not covered by FECA (§1-24a, b).",
 "Private property: entry may be justified to save life, but make every effort to get the controlling agency&rsquo;s approval and the owner&rsquo;s consent (§1-24c).",
 "Night vision devices: on foot or as a passenger, never by a driver (§1-30a). [[Patient transport]]: only in an emergency when other suitable transport is not readily available (§1-22).",
 "[[Never alter]], separate or misuse communications or advanced technology equipment (§1-36a).",
], True)}
{block("Qualifications and records: paperwork that keeps you mission-ready", "", [
 "[[CAPF 101]] shows what you may do, as trainee or qualified. [[Ratings]] stay valid through the last day of the 36th month (§2-2d).",
 "Every emergency services member completes [[OPSEC training]] and signs the [[nondisclosure agreement]] (§1-35).",
 "Alert rosters: update at least annually, and reissue after major changes (§1-5c(6)).",
 'Each wing sends its [[annual operations training plan]] to the liaison region in WMIRS by <span class="red">31 July</span> for the next fiscal year (§1-7).',
 "The IC makes sure [[WMIRS]] entries and approvals are complete before any sortie (§1-15a). [[Electronic records]] are fine if backed up (§1-5b(3)(b)).",
 "Supplements to CAPR 60-3: wing level or higher only (Congressional Squadron excepted), with region commander, national operations and Air Force liaison approval (§1-2).",
], True)}
<div class="pb soft"></div>
{practice(P.CAPT116)}
{FOOT}
</section>"""

# ---------------------------------------------------------------- CAPT 117
C117 = f"""
<section class="guide" id="capt117" data-title="CAPT 117">
{head("Online test &middot; eServices", "CAPT 117 &middot; ES Continuing Education", "Part 1 Critical Incident Stress (CAPR 60-5) &middot; Part 2 Crew Resource Management &middot; Part 3 Mission Base",
 "Take it in eServices. Three parts.")}
<h2>Core essentials</h2>
{block("CISM timeline: Part 1, sooner beats later", flow([
 ("Before", "Pre-incident education. Reduces the harmful effects of trauma."),
 ("Within hours", "Defusing"),
 ("24 to 72 hours", "Debriefing (CISD)"),
 ("After", "Peer support and referral")]), [
 "[[CAPR 60-5]] (3 Nov 06) covers critical incident stress management.",
 "[[CISM]] is many tools, not one procedure. Sooner is better.",
 "[[Crisis intervention]] is short-term emotional first aid, a &ldquo;psychological Band-Aid&rdquo;, not therapy.",
])}
{block("Stress reactions: Part 1, four places stress shows up", tiles([
 ("Cognitive", "Confusion, poor memory"), ("Emotional", "Anxiety, grief, guilt"),
 ("Physical", "Fatigue, rapid pulse"), ("Behavioral", "Withdrawal, pacing")], 4), [
 "[[Critical incident stress]] is not new: shell shock (World War I), combat fatigue, PTSD.",
 "[[Long-term stress]] accelerates aging and harms health.",
])}
{block("Crew resource management: Part 2, the whole crew flies the mission", "", [
 "[[CRM]] is every crew member&rsquo;s job, not just the pilot in command&rsquo;s. It is about teamwork, communication, attitudes and behavior, not stick skills.",
 "Accidents come from a [[chain of factors]], not one bad decision.",
 "[[Split the workload]] to limit fatigue and keep the crew effective longer. Announce what you are doing. Acknowledge, do it, report it done.",
 "Prioritize: aviate (fly the aircraft first), navigate, communicate. Sterile cockpit applies to everyone aboard.",
 "Decision makers need [[correct, relevant information]] they can control, not everything.",
 "[[Standard terms and signals]] exist for aircrew and flightline so everyone hears the same message.",
], True)}
{block("Mission base: Part 3, arriving, working and leaving", "", [
 "Before you leave: know where and when to report, and to whom. Check in at any designated location (command post, base, camp, staging area, helibase).",
 "Sent straight to a [[tactical assignment]]? Report to the division or group supervisor, or the operations chief or IC.",
 "[[Unit log (ICS 214)]]: kept by supervisors, updated every operational period. Use 24-hour time. Radio: clear text, short messages.",
 "[[Pack for an extended stay]]; supplies at the incident may be limited. Finish your assignments, return gear as directed and check out before you leave.",
], True)}
<div class="pb soft"></div>
{practice_parts(P.CAPT117)}
{FOOT}
</section>"""

# ---------------------------------------------------------------- IS-100
ORG = """
<div class="org">
 <div class="orgtop">
  <div class="spacer"></div>
  <div class="iccol"><div class="node ic"><b>Incident Commander</b><span>Always staffed. Does every job not yet assigned.</span></div><div class="spine"></div></div>
  <div class="cstaff"><p class="lab">Command Staff &middot; advise the IC</p>
   <div class="node"><b>Public Information Officer</b><span>Only voice to the media</span></div>
   <div class="node"><b>Safety Officer</b><span>Can stop unsafe work at once</span></div>
   <div class="node"><b>Liaison Officer</b><span>Contact for other agencies</span></div>
  </div>
 </div>
 <div class="gstaff">
  <div class="node"><b>Operations</b><span>Does the tactical work</span></div>
  <div class="node"><b>Planning</b><span>Tracks resources, information, documents. Writes the IAP.</span></div>
  <div class="node"><b>Logistics</b><span>Food, comms, medical, transport, facilities</span></div>
  <div class="node"><b>Finance / Admin</b><span>Costs, time, claims, mutual aid paperwork</span></div>
 </div>
 <p class="lab gsl">General Staff &middot; section chiefs, who run the work</p>
</div>"""

I100 = f"""
<section class="guide" id="is100" data-title="IS-100">
{head("FEMA Independent Study", "IS-100 &middot; Introduction to the Incident Command System", "ICS-100 &middot; who does what, and the rules that keep it orderly",
 fema_link("IS-100.c"))}
<h2>Core essentials</h2>
{block("The ICS organization: who does what", ORG, [
 "The [[IC sets objectives]] (or Unified Command), and establishes and expands the organization only as needed (modular).",
 "Unified Command: agencies set shared incident objectives and keep their own authority.",
 "[[Transfer of command]] always includes a briefing.",
 "Incident Command sets up [[support facilities]] as the incident needs them.",
], True)}
{block("Rules that keep it orderly: NIMS management characteristics", "", [
 "[[ICS]] works for any incident or planned event, of any size. It sits in the NIMS Command and Coordination component.",
 "Span of control: one supervisor manages 3 to 7 people; 5 is best. Too many? Add a supervisor and reorganize.",
 "Unity of command: each person reports to one supervisor.",
 "Common terminology: standard names for positions, facilities and resources. Plain language on the radio; no 10-codes or agency jargon.",
 "Dispatch/deployment: resources go only when requested through established systems. No self-dispatching.",
 "[[Integrated communications]] supports shared situational awareness. [[Information and intelligence management]] covers gathering data, such as weather from technical specialists.",
 "[[Accountability]] = check-in, incident action planning, personal responsibility, resource tracking.",
 "Coordination is not command: directing, ordering or controlling is command.",
], True)}
<div class="pb soft"></div>
{practice(P.IS100)}
{FOOT}
</section>"""

# ---------------------------------------------------------------- IS-200
TYPES = [
 ("5", 20, "1 to 2 single resources, up to 6 people", "IC only", "Hours", False),
 ("4", 38, "Several single resources; the IC covers the staff jobs", "IC covers the staff jobs", "One operational period", False),
 ("3", 58, "Some or all Command and General Staff; division or group supervisors", "Some or all", "Multiple periods", True),
 ("2", 78, "Regional or national resources, up to 200 people per period", "Most positions", "Multiple periods", True),
 ("1", 100, "National resources, all positions and branches, 500+ per period. Disaster declaration possible.", "All, plus branches", "Multiple periods", True),
]
TYPEBARS = ('<div class="types"><div class="trow th"><span>Type</span><span>Complexity</span><span>Who responds</span>'
    '<span>How long</span><span class="iap">Written IAP</span></div>'
    + "".join(
    f'<div class="trow"><span class="tl">Type {t}</span><span class="tbw"><span class="tbar" style="width:{w}%"></span></span>'
    f'<span class="td">{who}</span><span class="td">{dur}</span>'
    f'<span class="iap {"yes" if iap else "no"}"><span class="mob">Written IAP: </span>{"Required" if iap else "Not required"}</span></div>'
    for t, w, who, staff, dur, iap in TYPES) + '</div>')

LEVELS = [
 ("Incident Command", "Commander", ["Runs the whole incident"], True),
 ("Section", "Chief", ["Operations, Planning, Logistics, Finance/Admin"], True),
 ("Branch", "Director", ["Added when span of control is exceeded"], True),
 ("Division or Group", "Supervisor", ["Division: a geographic area", "Group: a function"], False),
 ("Strike Team or Task Force", "Leader", ["Strike Team: same kind and type", "Task Force: mixed resources"], False),
]
TITLES = ('<div class="ladder">' + "".join(
    f'<div class="rung" style="--i:{n};--k:{len(LEVELS)-n}"><span class="rl">{lvl}</span><span class="rt">{title}</span>'
    f'<span class="rd">{"".join(f"<span>{x}</span>" for x in d)}</span>'
    f'<span class="iap {"yes" if dep else "no"}">{"Deputy allowed" if dep else "No deputy"}</span></div>'
    for n, (lvl, title, d, dep) in enumerate(LEVELS)) + '</div>')

TOC = """
<div class="toc">
 <div class="th0"></div>
 <div class="tsh"><span class="sn">1</span>Assess</div><div class="tsh"><span class="sn">2</span>Brief</div>
 <div class="tsh"><span class="sn">3</span>Decide</div><div class="tsh"><span class="sn">4</span>Announce</div>

 <div class="lane l1">Outgoing IC</div>
 <div class="tcell quiet r1 c1">Keeps running the incident</div>
 <div class="tcell both c2"><span class="who">Both, face to face</span>Outgoing IC briefs the incoming IC using ICS Form 201</div>
 <div class="tcell both c3"><span class="who">Both</span>Who takes command, and when. A more qualified arrival may:<span class="opt">assume command</span><span class="opt">keep it as is</span><span class="opt">request a more qualified IC</span></div>
 <div class="tcell both c4"><span class="who">Both</span>Tell everyone the effective time and date of the transfer</div>

 <div class="lane l2">Incoming IC</div>
 <div class="tcell r2 c1"><span class="who">Incoming IC</span>Checks the situation</div>

 <div class="lane l3">In command</div>
 <div class="cmdbar"><span class="out">Outgoing IC</span><span class="eff">Effective time</span><span class="in">Incoming IC</span></div>
</div>"""

FUNNEL_TIERS = [
 ("Before any incident", "Emergency Operations Plan", "Uniform response to all hazards"),
 ("IC or Unified Command sets", "Incident objectives", "Specific and measurable, not broad"),
 ("Planning writes, IC approves", "Incident Action Plan (IAP)", "The plan for one operational period"),
 ("Planning Chief runs it", "Operational Period Briefing", "IAP to supervisors"),
 ("Supervisor to crew", "Field-level briefing", "Crew assignments"),
]
FUNNEL = ('<div class="funnel">' + "".join(
    f'<div class="tier" style="--i:{n}"><span class="tw">{who}</span><span class="tt">{what}</span><span class="td2">{d}</span></div>'
    for n, (who, what, d) in enumerate(FUNNEL_TIERS)) + '<p class="fcap">Broad at the top, specific at the bottom</p></div>')
OBJ = """
<p class="lab objl">Writing an objective</p>
<div class="vs">
 <div class="vcard no"><span class="vt">Too broad</span><span class="vq">&ldquo;Find the missing hiker.&rdquo;</span><span class="vn">No place, no time, no way to know when it&rsquo;s done.</span></div>
 <div class="vcard yes"><span class="vt">Specific and measurable</span><span class="vq">&ldquo;Search segments 3 and 4 by 1800 hours and report to the Division Supervisor.&rdquo;</span><span class="vn">Where, by when, and what done looks like.</span></div>
</div>"""

I200 = f"""
<section class="guide" id="is200" data-title="IS-200">
{head("FEMA Independent Study", "IS-200 &middot; Basic ICS for Initial Response", "ICS-200 &middot; growing the organization, briefings and transfer of command",
 fema_link("IS-200.c"))}
<h2>Core essentials</h2>
{block("Incident types: complexity sets the structure", TYPEBARS, [
 "[[Complexity]] rises with factors such as the number of jurisdictions, threat to life and property, and size of the area.",
 "Predicting resource needs to choose the structure is [[complexity analysis]].",
], True)}
{block("Leader titles: each bar is the span of the level to its left", TITLES, [
 "Only the [[functions and positions needed]] are filled. Span of control is kept by organizing resources into teams, divisions, groups, branches or sections.",
 "[[Chain of command]] governs orders, not information. People still share information across the organization.",
 "[[Deputies]] (one or more): only at IC, Section and Branch, and fully qualified for that position. A deputy is a second holder of the same box; the next title down owns a smaller box.",
 "[[Why a deputy]]: share the command workload while the IC stays responsible, have a briefed successor ready, relieve the IC without a full transfer of command, give an assisting agency a seat, or develop the next IC.",
], True)}
{block("Transfer of command: a handoff between two people", TOC, [
 "[[Effective time]]: the exact time and date command passes, agreed by both ICs and announced to everyone. Until then the outgoing IC is still in charge, so there is never a gap or two people giving orders.",
 "[[IC authority]] comes from law, agency policy, and delegation of authority. The IC approves the IAP and resource orders and releases.",
], True)}
{block("Planning and leading: how a plan reaches the field", FUNNEL + OBJ, [
 "[[Management by objectives]]: every assignment, plan and procedure traces back to the incident objectives.",
 "Leaders show [[commitment to duty]] by stepping into leadership when needed and developing subordinates.",
], True)}
<div class="pb soft"></div>
{practice(P.IS200)}
{FOOT}
</section>"""

# ---------------------------------------------------------------- IS-700
CC = """
<div class="cc">
 <div class="ccstack">
  <div class="node"><b>MAC Group</b><span>Senior officials. Set policy and priorities, settle resource conflicts. Do not replace EOCs or dispatch.</span></div>
  <div class="node"><b>Emergency Operations Center</b><span>Off-site. Information sharing, resource coordination, policy direction. Activates when local response grows large or complex. ICS-like layout.</span></div>
  <div class="node"><b>Incident Command (ICS)</b><span>On scene. IC or Unified Command. Planning Section writes the IAP.</span></div>
 </div>
 <div class="node jis"><b>Joint Information System</b><span>One coordinated public message across all levels. The JIC is where PIOs work together.</span></div>
</div>"""

HOUSE = """
<div class="house">
 <div class="roof"><b>NIMS</b><span>A systematic approach for everyone with incident duties</span></div>
 <div class="pillars">
  <div class="pillar"><b>Resource Management</b><span class="q">&ldquo;Do we have what we need?&rdquo;</span></div>
  <div class="pillar"><b>Command and Coordination</b><span class="q">&ldquo;Who leads, and how do we work together?&rdquo;</span><span>Includes ICS</span></div>
  <div class="pillar"><b>Communications and Information Management</b><span class="q">&ldquo;Does everyone know what they need to?&rdquo;</span></div>
 </div>
 <div class="found">
  <div class="course"><b>Flexibility</b><span>Any incident, any size, any hazard</span></div>
  <div class="course"><b>Standardization</b><span>Same terms and structures, so groups can work together (interoperability)</span></div>
  <div class="course"><b>Unity of Effort</b><span>Shared objectives; each group keeps its own authority</span></div>
  <p class="flab">Foundation &middot; each guiding principle supports all three components</p>
 </div>
</div>"""

LAYERS = """
<div class="layers">
 <div class="flowcol"><div class="fup"><span>Needs and information flow up</span></div><div class="fdn"><span>Priorities and support flow down</span></div></div>
 <div class="layer lp"><span class="where">Policy</span><div class="lbox"><b>MAC Group</b><span>Senior officials. Set priorities and settle resource conflicts. Do not replace EOCs or dispatch.</span></div><span class="ask">&ldquo;What matters most?&rdquo;</span></div>
 <div class="layer ls"><span class="where">Off site</span><div class="lbox"><b>Emergency Operations Center (EOC)</b><span>Information sharing, resource coordination, policy direction. Activates when local response grows large or complex.</span></div><span class="ask">&ldquo;What do they need?&rdquo;</span></div>
 <div class="layer lt"><span class="where">On scene</span><div class="lbox"><b>Incident Command (ICS)</b><span>IC or Unified Command directs the tactics. The Planning Section writes the IAP.</span></div><span class="ask">&ldquo;What do we do now?&rdquo;</span></div>
 <div class="jisrail"><b>Joint Information System</b><span>One coordinated public message for all three levels. PIOs work together in the Joint Information Center (JIC).</span></div>
</div>"""

RING = """<div class="ring"><div class="rcircle"></div><span class="rarr" style="left:65.5%;top:23.2%;--r:22deg"></span><span class="rarr" style="left:81.0%;top:50.0%;--r:90deg"></span><span class="rarr" style="left:65.5%;top:76.8%;--r:158deg"></span><span class="rarr" style="left:34.5%;top:76.8%;--r:-158deg"></span><span class="rarr" style="left:19.0%;top:50.0%;--r:-90deg"></span><span class="rarr" style="left:34.5%;top:23.2%;--r:-22deg"></span><div class="rcenter"><b>Before any incident</b><span>Inventory resources and type them by capability (preparedness)</span></div><div class="rnode" style="left:50.0%;top:11.0%"><span class="sn">1</span><b>Identify requirements</b><span>Type, quantity, location, users</span></div><div class="rnode" style="left:83.8%;top:30.5%"><span class="sn">2</span><b>Order and acquire</b><span>Local first, if available</span></div><div class="rnode" style="left:83.8%;top:69.5%"><span class="sn">3</span><b>Mobilize</b><span>Deploy or activate</span></div><div class="rnode" style="left:50.0%;top:89.0%"><span class="sn">4</span><b>Track and report</b><span>Coordinate throughout</span></div><div class="rnode" style="left:16.2%;top:69.5%"><span class="sn">5</span><b>Demobilize</b><span>Orderly release</span></div><div class="rnode" style="left:16.2%;top:30.5%"><span class="sn">6</span><b>Reimburse and restock</b><span>Ready for next time</span></div></div>"""

I700 = f"""
<section class="guide" id="is700" data-title="IS-700">
{head("FEMA Independent Study", "IS-700 &middot; Introduction to NIMS", "National Incident Management System &middot; a systematic approach for everyone with incident duties",
 fema_link("IS-700.b"))}
<h2>Core essentials</h2>
{block("NIMS in one view: principles hold up the components", HOUSE, [
 "[[NIMS]] applies to every stakeholder with incident duties, at every level. [[Unity of effort]]: organizations work toward shared objectives and keep their own authority.",
])}
{block("Command and coordination: three levels, one response", LAYERS, [
 "An [[ICS-like EOC]] starts fast because field staff already know the structure.",
])}
{block("Resource management: a cycle that returns to ready", RING, [
 "[[Inventorying]] happens outside incident response. Resources are typed by capability.",
 "EMAC: state-to-state resource sharing.",
], True)}
{block("Management characteristics and communications: terms the test uses", "", [
 "[[Chain of Command and Unity of Command]]: ends conflicting instructions.",
 "Common Terminology: standard names for functions and units.",
 "Comprehensive Resource Management: up-to-date inventories.",
 "Information and Intelligence Management: gather, analyze, share data.",
 "Interoperability: people and systems working well together.",
 "Resilience and Redundancy: uninterrupted flow of information.",
 "Technology Use: social media, maps, visualizations.",
], True)}
<div class="pb soft"></div>
{practice(P.IS700)}
{FOOT}
</section>"""

# ---------------------------------------------------------------- IS-800
I800 = f"""
<section class="guide" id="is800" data-title="IS-800">
{head("FEMA Independent Study", "IS-800 &middot; National Response Framework", "NRF &middot; always in effect, a guide for how the nation responds",
 fema_link("IS-800.d"))}
<h2>Core essentials</h2>
{block("Tiered response: begin and end locally", flow([
 ("Local and tribal", "First to arrive, last to leave. Police, fire, EMS. IC relays needs to the local EOC."),
 ("State", "Governor and state EOC. Other states help through EMAC (interstate mutual aid)."),
 ("Federal", "Stafford Act: FEMA leads; the Unified Coordination Group leads at the Joint Field Office (JFO). Non-Stafford: agency with primary legal authority.")]), [
 "[[Tiered response]]: incidents are handled at the lowest jurisdictional level possible.",
 "[[Tribal governments]] may deal directly with the federal government.",
 "NOC: DHS principal operations center. RRCC: FEMA regional center. Many EOCs use the ICS structure.",
 "MAC Group: senior officials who can commit agency resources and funds.",
 "Unified Command benefit: joint priorities.",
], True)}
{block("Five mission areas: what the nation does", tiles([
 ("Prevention","Stop imminent terrorism"),("Protection","Secure people and assets"),
 ("Mitigation","Reduce loss of life and property by lessening disaster impact"),
 ("Response","Save lives, protect property and environment, meet basic needs"),("Recovery","Restore and rebuild")],5), [
 "[[Three core capabilities]] cross all mission areas and lifelines: Planning; Public Information and Warning; Operational Coordination.",
 "The [[National Preparedness Goal]] sets the vision and names the core capabilities. [[Operational Communications]] means timely communications among responders and affected communities.",
], True)}
{block("Seven community lifelines: the basics a community runs on", tiles([
 ("Safety and Security",""),("Food, Water, Shelter",""),("Health and Medical",""),("Energy",""),
 ("Communications",""),("Transportation",""),("Hazardous Materials","")],4), [
 "[[Community lifelines]]: services that keep critical government and business functions running.",
 "The course teaches seven lifelines. FEMA added an eighth, Water Systems, in 2023.",
])}
{block("The NRF itself: how the framework works", "", [
 "The [[NRF]] is always in effect and scales to the incident. It covers the Response mission area and how it ties to the others, and aligns with NIMS.",
 "[[NRF guiding principles]] include engaged partnership (whole community, information sharing) and scalable, flexible, adaptable capabilities.",
 "[[Engaging communities]] shares information and builds readiness.",
 "ESFs: government and private-sector groups, not only federal. ESF #6 works with the National Center for Missing &amp; Exploited Children (NCMEC) to identify children and reunite them with families.",
], True)}
<div class="pb soft"></div>
{practice(P.IS800)}
{FOOT}
</section>"""

GUIDES = [("sid","FEMA SID"),("capt116","CAPT 116"),("capt117","CAPT 117"),("is100","IS-100"),("is200","IS-200"),("is700","IS-700"),("is800","IS-800")]
HOMEROWS = [
 ("sid","FEMA Student ID","Do first. Needed for every FEMA exam.",""),
 ("capt116","CAPT 116 &middot; General Emergency Services","eServices",f"{len(P.CAPT116)} practice questions"),
 ("capt117","CAPT 117 &middot; ES Continuing Education","eServices, Parts 1 to 3",f"{sum(len(p[1]) for p in P.CAPT117)} practice questions"),
 ("is100","IS-100 &middot; Introduction to ICS","FEMA",f"{len(P.IS100)} practice questions"),
 ("is200","IS-200 &middot; Basic ICS for Initial Response","FEMA",f"{len(P.IS200)} practice questions"),
 ("is700","IS-700 &middot; Introduction to NIMS","FEMA",f"{len(P.IS700)} practice questions"),
 ("is800","IS-800 &middot; National Response Framework","FEMA",f"{len(P.IS800)} practice questions"),
]
HOME = ('<section class="guide home" id="home" data-title="Home"><h2>Pick your test</h2><div class="pickgrid">'
  + "".join(f'<a class="card" href="#{i}"><b>{t}</b><span>{w}</span><em>{c}</em></a>' for i,t,w,c in HOMEROWS)
  + '</div><p class="note">Each sheet: core essentials with diagrams, then a practice test with answers on the last page. '
    'Practice questions are original; they cover the same ideas as the real test. Open a sheet and use Print this sheet for paper.</p></section>')

NAV = "".join(f'<a href="#{i}" data-id="{i}">{t}</a>' for i, t in GUIDES)

tpl = Path(__file__).with_name("template.html").read_text()
out = (tpl.replace("{{NAV}}", NAV).replace("{{VERSION}}", VERSION)
          .replace("{{BODY}}", HOME + SID + C116 + C117 + I100 + I200 + I700 + I800))
Path(__file__).resolve().parent.parent.joinpath("index.html").write_text(out)
print("wrote index.html", len(out))
