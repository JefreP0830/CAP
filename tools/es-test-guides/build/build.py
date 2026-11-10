"""Builds ../index.html from questions.py plus the essentials below.
Run: python3 build.py   (no dependencies)"""
from html import escape as e
from pathlib import Path
import questions as Q

VERSION = "1.0.1"

def key(items, start=1):
    out = []
    for i, (q, a) in enumerate(items, start):
        out.append(f'<li><span class="n">{i}</span><p class="q">{e(q)}</p><p class="a">{e(a)}</p></li>')
    return "\n".join(out)

def keyblock(items, note=""):
    n = f'<p class="note">{e(note)}</p>' if note else ""
    return f'<h2>Answer key <span class="ct">{len(items)} questions</span></h2>{n}<ol class="key">{key(items)}</ol>'

def keyparts(parts, note=""):
    n = f'<p class="note">{e(note)}</p>' if note else ""
    total = sum(len(p[1]) for p in parts)
    body, i = [], 1
    for title, items in parts:
        body.append(f'<h3>{e(title)}</h3><ol class="key">{key(items, i)}</ol>')
        i += len(items)
    return f'<h2>Answer key <span class="ct">{total} questions</span></h2>{n}' + "".join(body)

def flow(steps, cls=""):
    s = "".join(f'<div class="step"><span class="sn">{i}</span><b>{t}</b><span>{d}</span></div>'
                for i, (t, d) in enumerate(steps, 1))
    return f'<div class="flow {cls}">{s}</div>'

def tiles(items, cols=4):
    s = "".join(f'<div class="tile"><b>{t}</b><span>{d}</span></div>' for t, d in items)
    return f'<div class="tiles c{cols}">{s}</div>'

def fig(caption, inner):
    return f'<figure>{inner}<figcaption>{caption}</figcaption></figure>'

def bullets(items):
    return '<ul class="ess">' + "".join(f"<li>{x}</li>" for x in items) + "</ul>"

def head(kicker, title, byline, where):
    return (f'<header class="ghead"><p class="kick">{kicker}</p><h1>{title}</h1>'
            f'<p class="by">{byline}</p><p class="where">{where}</p></header>')

FOOT = ('<footer class="gfoot">Answers match the test banks captured November 2026. If a question on screen '
        'reads differently, the screen governs. Real-world rules come from the current publications, not this sheet.'
        '<span class="ver">NER-VT014 &middot; ES &amp; FEMA Test Guides v' + VERSION + '</span></footer>')

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
{fig("The whole path, start to certificate", flow([
  ("Register", "Get your SID at cdp.dhs.gov/femasid"),
  ("First login", "SID + password, then set up a second factor"),
  ("Take the exam", "training.fema.gov/is, enter your SID"),
  ("Get the certificate", "Student Portal right away, plus an email"),
]))}
<div class="cols3">
<div><h2><span class="lead">Step 1</span> Register</h2>
<ol class="steps">
<li>Already have one? Use <a href="https://cdp.dhs.gov/FEMASID/account/find">Forgot your FEMA SID?</a> first. It emails it to you. Do not make a second one.</li>
<li>Go to <a href="https://cdp.dhs.gov/FEMASID/register">Register for a FEMA SID</a>.</li>
<li>Fill in name, email, phone, birth details and the three security questions. An alternate email is optional; password resets go there too.</li>
<li>Create the password.</li>
<li>Check <i>I agree to the Privacy Statement</i>, then select <i>Register</i>.</li>
<li>Write your SID number down. It is also emailed to you.</li>
</ol></div>
<div><h2><span class="lead">Step 2</span> First login</h2>
<ol class="steps">
<li>At cdp.dhs.gov/femasid select <i>Log in to FEMA SID</i>. Enter your SID number and password.</li>
<li>Pick a second factor: <i>Authenticator App</i> (recommended), <i>Mobile Phone</i> (text or call), or <i>Email</i>. Then <i>Continue</i>.</li>
<li>Enter the 6-digit code and select <i>Verify</i>.</li>
<li>That device is remembered for 21 days unless you clear its cookies.</li>
<li>Check your profile details. Fix anything wrong now.</li>
</ol></div>
<div><h2><span class="lead">Step 3</span> Take the exam</h2>
<ol class="steps">
<li>Open the course page from the guide for that test, or search the code (for example IS-100.c) at <a href="https://training.fema.gov/is/">training.fema.gov/is</a>.</li>
<li>Select <i>Take Final Exam</i>. Enter your SID when asked.</li>
<li>Answer every question. 75% passes.</li>
<li>Step 4: your certificate appears in the NDEMU Student Portal right away and is emailed to you. Save the PDF; your unit will tell you where CAP records it.</li>
</ol></div>
</div>
<h2>Stuck?</h2>
<div class="tiles c2">
<div class="tile"><b>SID, password or MFA problems</b><span>FEMA SID Help Desk, 866-291-0696, weekdays 7:30 to 4:30 Central. Contact form on cdp.dhs.gov/femasid.</span></div>
<div class="tile"><b>Exam or certificate problems</b><span>FEMA Independent Study Program, 301-447-1200, weekdays 8:00 to 6:00 Eastern.</span></div>
</div>
<footer class="gfoot">Steps checked against cdp.dhs.gov/femasid and training.fema.gov on 10 Nov 2026. FEMA changes these screens; follow the screen if it differs.<span class="ver">NER-VT014 &middot; ES &amp; FEMA Test Guides v{VERSION}</span></footer>
</section>"""

# ---------------------------------------------------------------- CAPT 116
C116 = f"""
<section class="guide" id="capt116" data-title="CAPT 116">
{head("CAP online test &middot; eServices", "CAPT 116 &middot; General Emergency Services", "CAPR 60-3, Emergency Services Training and Operational Missions",
 "Take it in CAP eServices. This test opens every ES qualification.")}
<h2>Core essentials</h2>
<div class="figrow">
{fig("Who gets CAP first when resources are short", flow([
 ("Air Force", "Highest"), ("Other DoD", ""), ("Federal civil", "FEMA, FAA"), ("State", ""), ("Local", "Lowest")], "rank"))}
{fig("Minimum team makeup", tiles([
 ("Aircrew of 3", "Mission Pilot, Mission Observer, Mission Scanner"),
 ("Ground team of 4+", "Qualified Ground Team Leader plus at least 3 qualified members or supervised trainees. Works at the level of its <i>lowest</i> qualified member.")], 2))}
</div>
{bullets([
 "Safety is never secondary to the mission.",
 "C911 (imminent lifesaving) missions: the wing commander approves. If absent: vice commander, director of operations, or director of emergency services.",
 "Air Force assigned missions: FTCA liability protection for members. FECA injury coverage only for members 18 and older.",
 "Private property: training entry is arranged in advance. On missions, make every effort to get agency approval and owner consent.",
 "CAPF 101 shows what you may do, as trainee or qualified. Specialty ratings expire 3 years from the date earned.",
 "Alert rosters and resource lists: update at least annually.",
 'Each wing sends its annual operations training plan to the CAP-USAF liaison region by <span class="red">31 July</span> for the next fiscal year.',
 "Everyone in ES completes OPSEC training and signs the nondisclosure agreement.",
 "Never alter communications or advanced technology equipment.",
 "The IC owns WMIRS accuracy but may delegate data entry. Electronic records in WMIRS are enough; no paper copies required.",
 "Night vision devices: allowed on foot. Patient transport: only when other suitable transport is not readily available.",
 "CAPR 60-3 supplements: wing level or higher only (Congressional Squadron excepted), with region commander, NHQ CAP/DO and CAP-USAF/XO approval.",
])}
<div class="pb"></div>
{keyblock(Q.CAPT116, Q.CAPT116_NOTE)}
{FOOT}
</section>"""

# ---------------------------------------------------------------- CAPT 117
C117 = f"""
<section class="guide" id="capt117" data-title="CAPT 117">
{head("CAP online test &middot; eServices", "CAPT 117 &middot; ES Continuing Education", "Part 1 Critical Incident Stress (CAPR 60-5) &middot; Part 2 Crew Resource Management &middot; Part 3 Mission Base",
 "Take it in CAP eServices. Three parts, ten questions each.")}
<h2>Core essentials</h2>
{fig("Critical incident stress care is a continuum, and sooner beats later", flow([
 ("Before", "Pre-incident education. Proven to reduce trauma."),
 ("Within hours", "Defusing"),
 ("24 to 72 hours", "Debriefing (CISD)"),
 ("After", "Peer support and referral")]))}
{fig("Four places stress shows up", tiles([
 ("Cognitive", "Confusion, poor memory"), ("Emotional", "Anxiety, grief, guilt"),
 ("Physical", "Fatigue, rapid pulse"), ("Behavioral", "Withdrawal, pacing")], 4))}
<div class="cols2">
{bullets([
 "CAPR 60-5 is CAP&rsquo;s CISM regulation.",
 "CISM is many tools, not one procedure. Waiting 30 days is wrong.",
 "Crisis intervention is called a psychological Band-Aid.",
 "Critical incident stress is old: shell shock, combat fatigue, PTSD. &ldquo;Cumulative stress&rdquo; is not a term for it.",
 "Stress accelerates aging.",
])}
{bullets([
 "CRM is every crew member&rsquo;s job, not just the pilot in command&rsquo;s.",
 "Accidents come from a chain of factors, not one bad decision.",
 "Split the workload. Announce what you are doing. Acknowledge, do it, report it done.",
 "Prioritize: aviate, navigate, communicate. Sterile cockpit applies to everyone aboard.",
 "Unit log (ICS 214): kept by supervisors, updated every operational period. Use 24-hour time.",
 "Pack for an extended stay. Finish your work and return gear before you leave.",
])}
</div>
<div class="pb"></div>
{keyparts(Q.CAPT117, Q.CAPT117_NOTE)}
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
 "Span of control: one supervisor manages 3 to 7 people; 5 is best.",
 "Unity of command: each person reports to one supervisor.",
 "Plain language on the radio. No 10-codes or agency jargon.",
 "The IC sets objectives (or Unified Command), and establishes and expands the organization.",
 "Unified Command: agencies set shared incident objectives and keep their own authority.",
 "Transfer of command always includes a briefing.",
 "No self-dispatching. Come only when requested through proper channels.",
 "Accountability = check-in, incident action planning, personal responsibility, resource tracking.",
 "Coordination is not command: directing, ordering or controlling is command.",
])}
<div class="pb"></div>
{keyblock(Q.IS100, Q.IS100_NOTE)}
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
 "Only the functions and positions needed are filled.",
 "Objectives are specific and measurable, not broad.",
 "A more qualified arrival has options: assume command, keep it as is, or request a more qualified IC.",
 "Operational Period Briefing presents the IAP to supervisors; the Planning Section Chief runs it. Field-level briefings go to crews.",
 "IC authority comes from law, agency policy, and delegation of authority. The IC approves the IAP and resource orders and releases.",
 "Predicting resource needs to choose the structure is complexity analysis.",
])}
<div class="pb"></div>
{keyblock(Q.IS200)}
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
 "Chain of Command and Unity of Command: ends conflicting instructions.",
 "Common Terminology: standard names for functions and units.",
 "Comprehensive Resource Management: up-to-date inventories.",
 "Information and Intelligence Management: gather, analyze, share data.",
 "NIMS lists 14 management characteristics; the test asks about these four.",
])}
{bullets([
 "Interoperability: people and systems working well together.",
 "Resilience and Redundancy: uninterrupted flow of information.",
 "Technology Use: social media, maps, visualizations.",
 "Inventorying happens outside incident response. Resources are typed by capability.",
 "EMAC: state-to-state resource sharing.",
])}
</div>
<div class="pb"></div>
{keyblock(Q.IS700)}
{FOOT}
</section>"""

# ---------------------------------------------------------------- IS-800
I800 = f"""
<section class="guide" id="is800" data-title="IS-800">
{head("FEMA Independent Study", "IS-800 &middot; National Response Framework", "NRF &middot; always in effect, a guide for how the nation responds",
 fema_link("IS-800.d"))}
<h2>Core essentials</h2>
{fig("Tiered response: incidents begin and end locally", flow([
 ("Local and tribal", "First to arrive, last to leave. Police, fire, EMS. IC relays needs to the local EOC."),
 ("State", "Governor and state EOC. Other states help through EMAC."),
 ("Federal", "Stafford Act: FEMA leads, JFO with Unified Coordination Group. Non-Stafford: agency with primary legal authority.")]))}
{fig("Five mission areas", tiles([
 ("Prevention","Stop imminent terrorism"),("Protection","Secure people and assets"),
 ("Mitigation","Reduce loss of life and property by lessening disaster impact"),
 ("Response","Save lives, protect property and environment, meet basic needs"),("Recovery","Restore and rebuild")],5))}
{fig("Seven community lifelines: keep critical government and business functions running", tiles([
 ("Safety and Security",""),("Food, Water, Shelter",""),("Health and Medical",""),("Energy",""),
 ("Communications",""),("Transportation",""),("Hazardous Materials","")],7))}
<div class="cols2">
{bullets([
 "Three core capabilities cross all mission areas and lifelines: Planning; Public Information and Warning; Operational Coordination.",
 "NRF guiding principles include engaged partnership (whole community, information sharing) and scalable, flexible, adaptable capabilities.",
 "NRF aligns with NIMS. National Preparedness Goal sets the vision and core capabilities.",
 "Unified Command benefit: joint priorities.",
])}
{bullets([
 "NOC: DHS principal operations center. RRCC: FEMA regional center.",
 "MAC Group: senior officials who can commit agency resources and funds.",
 "ESFs: government and private-sector groups, not only federal. ESF #6 works with NCMEC to reunify children.",
 "Tribal governments may deal directly with the federal government.",
 "CAP supports ESF #9, Search and Rescue. Not on the test.",
])}
</div>
<p class="note">The test says seven lifelines. FEMA added an eighth, Water Systems, in 2023; answer the test as written.</p>
<div class="pb"></div>
{keyblock(Q.IS800)}
{FOOT}
</section>"""

GUIDES = [("sid","FEMA SID"),("capt116","CAPT 116"),("capt117","CAPT 117"),("is100","IS-100"),("is200","IS-200"),("is700","IS-700"),("is800","IS-800")]
HOMEROWS = [
 ("sid","FEMA Student ID","Do first. Needed for every FEMA exam.",""),
 ("capt116","CAPT 116 &middot; General Emergency Services","CAP eServices",f"{len(Q.CAPT116)} questions"),
 ("capt117","CAPT 117 &middot; ES Continuing Education","CAP eServices, Parts 1 to 3",f"{sum(len(p[1]) for p in Q.CAPT117)} questions"),
 ("is100","IS-100 &middot; Introduction to ICS","FEMA",f"{len(Q.IS100)} questions"),
 ("is200","IS-200 &middot; Basic ICS for Initial Response","FEMA",f"{len(Q.IS200)} questions"),
 ("is700","IS-700 &middot; Introduction to NIMS","FEMA",f"{len(Q.IS700)} questions"),
 ("is800","IS-800 &middot; National Response Framework","FEMA",f"{len(Q.IS800)} questions"),
]
HOME = ('<section class="guide home" id="home" data-title="Home"><h2>Pick your test</h2><div class="pickgrid">'
  + "".join(f'<a class="card" href="#{i}"><b>{t}</b><span>{w}</span><em>{c}</em></a>' for i,t,w,c in HOMEROWS)
  + '</div><p class="note">Each sheet: a few core essentials, then every test question with only its correct answer. '
    'Open a sheet and use Print this sheet for paper. Questions are copied word for word from the tests.</p></section>')

NAV = "".join(f'<a href="#{i}" data-id="{i}">{t}</a>' for i, t in GUIDES)

tpl = Path(__file__).with_name("template.html").read_text()
out = (tpl.replace("{{NAV}}", NAV).replace("{{VERSION}}", VERSION)
          .replace("{{BODY}}", HOME + SID + C116 + C117 + I100 + I200 + I700 + I800))
Path(__file__).resolve().parent.parent.joinpath("index.html").write_text(out)
print("wrote index.html", len(out))
