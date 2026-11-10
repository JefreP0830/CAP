"""Builds ../index.html from practice.py plus the essentials below.
Run: python3 build.py   (no dependencies)"""
from html import escape as e
from pathlib import Path
import practice as P

VERSION = "2.1.1"

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

def bullets(items, cls=""):
    return f'<ul class="ess {cls}">' + "".join(f"<li>{x}</li>" for x in items) + "</ul>"

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
<div class="figrow">
{fig("Support priority when resources are short (§1-4)", flow([
 ("Air Force", "Highest"), ("Other DoD", ""), ("Federal civil", "FEMA, FAA"), ("State", ""), ("Local", "Lowest")], "rank"))}
{fig("Minimum team makeup", tiles([
 ("Aircrew of 3", "Mission Pilot flies. Mission Observer helps with navigation, radios and the search. Mission Scanner watches outside for the search objective."),
 ("Ground team of 4+", "Qualified Ground Team Leader plus at least 3 qualified members or supervised trainees. Works at the level of its <i>lowest</i> qualified member.")], 2))}
</div>
{bullets([
 "Safety must always be a primary concern (§1-1b).",
 "CAPR 60-3 gives direction for mission training, qualification and actual missions. Where it is silent, use common sense and prudent judgment.",
 "C911 missions are imminently serious, where life may be at stake. Only the wing commander or the commander&rsquo;s designee may authorize one (§1-9a).",
 "Air Force-assigned missions: Federal Tort Claims Act (FTCA) liability protection for members; FECA injury benefits for members 18 and older, so a cadet under 18 is not covered by FECA (§1-24a, b).",
 "Private property: entry may be justified to save life, but make every effort to get the controlling agency&rsquo;s approval and the owner&rsquo;s consent (§1-24c).",
 "CAPF 101 shows what you may do, as trainee or qualified. Ratings stay valid through the last day of the 36th month (§2-2d).",
 "Alert rosters: update at least annually, and reissue after major changes (§1-5c(6)).",
 'Each wing sends its annual operations training plan to the liaison region in WMIRS by <span class="red">31 July</span> for the next fiscal year (§1-7).',
 "Every emergency services member completes OPSEC training and signs the nondisclosure agreement (§1-35).",
 "Never alter, separate or misuse communications or advanced technology equipment (§1-36a).",
 "The IC makes sure WMIRS entries and approvals are complete before any sortie (§1-15a). Electronic records are fine if backed up (§1-5b(3)(b)).",
 "Night vision devices: on foot or as a passenger, never by a driver (§1-30a). Patient transport: only in an emergency when other suitable transport is not readily available (§1-22).",
 "Supplements to CAPR 60-3: wing level or higher only (Congressional Squadron excepted), with region commander, national operations and Air Force liaison approval (§1-2).",
])}
<div class="pb"></div>
{practice(P.CAPT116)}
{FOOT}
</section>"""

# ---------------------------------------------------------------- CAPT 117
C117 = f"""
<section class="guide" id="capt117" data-title="CAPT 117">
{head("Online test &middot; eServices", "CAPT 117 &middot; ES Continuing Education", "Part 1 Critical Incident Stress (CAPR 60-5) &middot; Part 2 Crew Resource Management &middot; Part 3 Mission Base",
 "Take it in eServices. Three parts.")}
<h2>Core essentials</h2>
{fig("Critical incident stress care is a continuum, and sooner beats later", flow([
 ("Before", "Pre-incident education. Reduces the harmful effects of trauma."),
 ("Within hours", "Defusing"),
 ("24 to 72 hours", "Debriefing (CISD)"),
 ("After", "Peer support and referral")]))}
{fig("Four places stress shows up", tiles([
 ("Cognitive", "Confusion, poor memory"), ("Emotional", "Anxiety, grief, guilt"),
 ("Physical", "Fatigue, rapid pulse"), ("Behavioral", "Withdrawal, pacing")], 4))}
<div class="cols3">
<div><p class="lab">Part 1 &middot; Critical incident stress</p>
{bullets([
 "CAPR 60-5 (3 Nov 06) covers critical incident stress management.",
 "CISM is many tools, not one procedure. Sooner is better.",
 "Crisis intervention is short-term emotional first aid, a &ldquo;psychological Band-Aid&rdquo;, not therapy.",
 "Critical incident stress is not new: shell shock (World War I), combat fatigue, PTSD.",
 "Long-term stress accelerates aging and harms health.",
])}</div>
<div><p class="lab">Part 2 &middot; Crew resource management</p>
{bullets([
 "CRM is every crew member&rsquo;s job, not just the pilot in command&rsquo;s. It is about teamwork, communication, attitudes and behavior, not stick skills.",
 "Accidents come from a chain of factors, not one bad decision.",
 "Split the workload to limit fatigue and keep the crew effective longer. Announce what you are doing. Acknowledge, do it, report it done.",
 "Prioritize: aviate (fly the aircraft first), navigate, communicate. Sterile cockpit applies to everyone aboard.",
 "Decision makers need correct, relevant information they can control, not everything.",
 "Standard terms and signals exist for aircrew and flightline so everyone hears the same message."
])}</div>
<div><p class="lab">Part 3 &middot; Mission base</p>
{bullets([
 "Before you leave: know where and when to report, and to whom. Check in at any designated location (command post, base, camp, staging area, helibase).",
 "Sent straight to a tactical assignment? Report to the division or group supervisor, or the operations chief or IC.",
 "Unit log (ICS 214): kept by supervisors, updated every operational period. Use 24-hour time. Radio: clear text, short messages.",
 "Pack for an extended stay; supplies at the incident may be limited. Finish your assignments, return gear as directed and check out before you leave.",
])}</div>
</div>
<div class="pb"></div>
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
{fig("The ICS organization", ORG)}
{bullets([
 "ICS works for any incident or planned event, of any size. It sits in the NIMS Command and Coordination component.",
 "Span of control: one supervisor manages 3 to 7 people; 5 is best. Too many? Add a supervisor and reorganize.",
 "Unity of command: each person reports to one supervisor.",
 "Common terminology: standard names for positions, facilities and resources. Plain language on the radio; no 10-codes or agency jargon.",
 "The IC sets objectives (or Unified Command), and establishes and expands the organization only as needed (modular).",
 "Unified Command: agencies set shared incident objectives and keep their own authority.",
 "Transfer of command always includes a briefing.",
 "Dispatch/deployment: resources go only when requested through established systems. No self-dispatching.",
 "Integrated communications supports shared situational awareness. Information and intelligence management covers gathering data, such as weather from technical specialists.",
 "Incident Command sets up support facilities as the incident needs them.",
 "Accountability = check-in, incident action planning, personal responsibility, resource tracking.",
 "Coordination is not command: directing, ordering or controlling is command.",
])}
<div class="pb"></div>
{practice(P.IS100)}
{FOOT}
</section>"""

# ---------------------------------------------------------------- IS-200
TYPES = [
 ("5", 20, "1 to 2 single resources, up to 6 people. Hours. No written IAP."),
 ("4", 38, "Several resources, one operational period. IC covers the staff jobs. No written IAP."),
 ("3", 58, "Some or all Command and General Staff, division/group supervisors. Multiple periods. Written IAP."),
 ("2", 78, "Regional or national resources, up to 200 people per operational period. Written IAP."),
 ("1", 100, "National resources, all positions and branches, 500+ per period. Disaster declaration possible."),
]
TYPEBARS = '<div class="types">' + "".join(
    f'<div class="trow"><span class="tl">Type {t}</span><div class="tbar" style="width:{w}%"></div><span class="td">{d}</span></div>'
    for t, w, d in TYPES) + '<p class="tscale"><span>Least complex</span><span>Most complex</span></p></div>'

TITLES = """
<div class="stair">
 <div class="lvl" style="--i:0"><b>Incident Command</b><span>Incident Commander</span><em>Deputy allowed</em></div>
 <div class="lvl" style="--i:1"><b>Section</b><span>Chief</span><em>Deputy allowed</em></div>
 <div class="lvl" style="--i:2"><b>Branch</b><span>Director</span><em>Deputy allowed. Added when span of control is exceeded.</em></div>
 <div class="lvl" style="--i:3"><b>Division (area) or Group (function)</b><span>Supervisor</span><em>No deputy</em></div>
 <div class="lvl" style="--i:4"><b>Strike Team (same kind and type) or Task Force (mixed)</b><span>Leader</span><em>No deputy</em></div>
</div>"""

I200 = f"""
<section class="guide" id="is200" data-title="IS-200">
{head("FEMA Independent Study", "IS-200 &middot; Basic ICS for Initial Response", "ICS-200 &middot; growing the organization, briefings and transfer of command",
 fema_link("IS-200.c"))}
<h2>Core essentials</h2>
{fig("Incident types: complexity sets the structure", TYPEBARS)}
<div class="figrow">
{fig("Titles by level", TITLES)}
{fig("Transfer of command", flow([
 ("Assess", "Incoming IC checks the situation"),
 ("Brief", "Outgoing IC briefs face to face, using ICS Form 201"),
 ("Decide", "Who takes command, and when"),
 ("Announce", "Tell everyone the effective time and date")], "vert"))}
</div>
{bullets([
 "Only the functions and positions needed are filled. Span of control is kept by organizing resources into teams, divisions, groups, branches or sections.",
 "Complexity rises with factors such as the number of jurisdictions, threat to life and property, and size of the area.",
 "Objectives are specific and measurable, not broad.",
 "A more qualified arrival has options: assume command, keep it as is, or request a more qualified IC.",
 "Operational Period Briefing presents the IAP to supervisors; the Planning Section Chief runs it. Field-level briefings go to crews.",
 "IC authority comes from law, agency policy, and delegation of authority. The IC approves the IAP and resource orders and releases.",
 "Predicting resource needs to choose the structure is complexity analysis.",
 "Chain of command governs orders, not information. People still share information across the organization.",
 "Leaders show commitment to duty by stepping into leadership when needed and developing subordinates.",
 "Emergency Operations Plans give a community a uniform response to all hazards.",
], "two")}
<div class="pb"></div>
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

I700 = f"""
<section class="guide" id="is700" data-title="IS-700">
{head("FEMA Independent Study", "IS-700 &middot; Introduction to NIMS", "National Incident Management System &middot; a systematic approach for everyone with incident duties",
 fema_link("IS-700.b"))}
<h2>Core essentials</h2>
<div class="figrow">
{fig("NIMS in one view", '<p class="lab">Guiding principles</p>' + tiles([("Flexibility",""),("Standardization","Supports interoperability"),("Unity of Effort","")],3)
 + '<p class="lab">Components</p>' + tiles([("Resource Management",""),("Command and Coordination","Includes ICS"),("Communications and Information Management","")],3))}
{fig("Command and coordination structures", CC)}
</div>
{fig("Resource management during an incident", flow([
 ("Identify requirements","Type, quantity, location, users"),("Order and acquire","Local first, if available"),
 ("Mobilize","Deploy or activate"),("Track and report","Coordinate throughout"),
 ("Demobilize","Orderly release"),("Reimburse and restock","")]))}
<div class="cols2">
{bullets([
 "NIMS applies to every stakeholder with incident duties, at every level. Unity of effort: organizations work toward shared objectives and keep their own authority.",
 "Chain of Command and Unity of Command: ends conflicting instructions.",
 "Common Terminology: standard names for functions and units.",
 "Comprehensive Resource Management: up-to-date inventories.",
 "Information and Intelligence Management: gather, analyze, share data.",
])}
{bullets([
 "Interoperability: people and systems working well together.",
 "Resilience and Redundancy: uninterrupted flow of information.",
 "Technology Use: social media, maps, visualizations.",
 "Inventorying happens outside incident response. Resources are typed by capability.",
 "An ICS-like EOC starts fast because field staff already know the structure.",
 "EMAC: state-to-state resource sharing.",
])}
</div>
<div class="pb"></div>
{practice(P.IS700)}
{FOOT}
</section>"""

# ---------------------------------------------------------------- IS-800
I800 = f"""
<section class="guide" id="is800" data-title="IS-800">
{head("FEMA Independent Study", "IS-800 &middot; National Response Framework", "NRF &middot; always in effect, a guide for how the nation responds",
 fema_link("IS-800.d"))}
<h2>Core essentials</h2>
{fig("Tiered response: incidents begin and end locally, handled at the lowest jurisdictional level possible", flow([
 ("Local and tribal", "First to arrive, last to leave. Police, fire, EMS. IC relays needs to the local EOC."),
 ("State", "Governor and state EOC. Other states help through EMAC (interstate mutual aid)."),
 ("Federal", "Stafford Act: FEMA leads; the Unified Coordination Group leads at the Joint Field Office (JFO). Non-Stafford: agency with primary legal authority.")]))}
{fig("Five mission areas", tiles([
 ("Prevention","Stop imminent terrorism"),("Protection","Secure people and assets"),
 ("Mitigation","Reduce loss of life and property by lessening disaster impact"),
 ("Response","Save lives, protect property and environment, meet basic needs"),("Recovery","Restore and rebuild")],5))}
{fig("Seven community lifelines: keep critical government and business functions running", tiles([
 ("Safety and Security",""),("Food, Water, Shelter",""),("Health and Medical",""),("Energy",""),
 ("Communications",""),("Transportation",""),("Hazardous Materials","")],4))}
<div class="cols2">
{bullets([
 "Three core capabilities cross all mission areas and lifelines: Planning; Public Information and Warning; Operational Coordination.",
 "NRF guiding principles include engaged partnership (whole community, information sharing) and scalable, flexible, adaptable capabilities.",
 "The NRF is always in effect and scales to the incident. It covers the Response mission area and how it ties to the others, and aligns with NIMS.",
 "The National Preparedness Goal sets the vision and names the core capabilities. Operational Communications means timely communications among responders and affected communities.",
 "Engaging communities shares information and builds readiness.",
 "Unified Command benefit: joint priorities.",
])}
{bullets([
 "NOC: DHS principal operations center. RRCC: FEMA regional center. Many EOCs use the ICS structure.",
 "MAC Group: senior officials who can commit agency resources and funds.",
 "ESFs: government and private-sector groups, not only federal. ESF #6 works with the National Center for Missing &amp; Exploited Children (NCMEC) to identify children and reunite them with families.",
 "Tribal governments may deal directly with the federal government.",
])}
</div>
<p class="note">The course teaches seven lifelines. FEMA added an eighth, Water Systems, in 2023.</p>
<div class="pb"></div>
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
