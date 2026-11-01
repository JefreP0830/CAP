// Practice guides: ceremonies and formations cadets perform most often.
// NOT promotion tests: no CAPIDs, no scores, no PDF.
// Every step and caution is transcribed from the cited paragraph of the
// current publication; figures are cut from the official PDFs, not redrawn.
//   CAPP 60-33, Drill & Ceremonies Guide, November 2025
//   CAPP 60-34, Drill & Ceremonies Practical Tests, September 2024 (cross-references)
//   CAPP 60-75, National Cadet Competition Program Guide, October 2021 (competition guides)
// Where two parts of a source differ, the step says so instead of picking silently.
import cocFigure from './assets/guides/coc-figure-6-5.png';
import cocP1 from './assets/guides/coc-panel-1.png';
import cocP2 from './assets/guides/coc-panel-2.png';
import cocP3 from './assets/guides/coc-panel-3.png';
import cocP4 from './assets/guides/coc-panel-4.png';
import sqFig51 from './assets/guides/sq-figure-5-1.png';
import sqFig52 from './assets/guides/sq-figure-5-2.png';
import symbols from './assets/guides/symbols-figure-1-1.png';
import compArea from './assets/guides/competition-cg-area.png';

// panel: a figure panel shown just above this step, so positions appear where they are needed.
export interface GuideStep { text: string; who?: string; say?: string; ref: string; panel?: { src: string; caption: string; small?: boolean } }
export interface Guide {
  id: string;
  title: string;
  summary: string;
  purpose: { text: string; ref: string }[];
  roles: string[];
  figures: { src: string; caption: string; note?: string }[];
  steps: GuideStep[];
  watch: { text: string; ref: string }[];
  source: string;
}

export const GUIDES: Guide[] = [
  {
    id: 'squadron-formation',
    title: 'Squadron Formation',
    summary: 'Form the squadron in line, take reports, and dismiss it. The weekly meeting formation.',
    purpose: [
      { text: 'A squadron is two or more flights. It forms in line with flights in line.', ref: 'CAPP 60-33 ¶5.1.1' },
      { text: 'For scheduled formations, flights assemble at the set place and time and the squadron forms in line at normal interval (close interval if space is tight). Alpha Flight is the base flight.', ref: 'CAPP 60-33 Attachment 3' },
      { text: 'The first sergeant part of this sequence is the Achievement 6 drill test.', ref: 'CAPP 60-34 p.16' },
    ],
    roles: [
      'First sergeant',
      'Flight sergeants (one per flight)',
      'Element leaders',
      'Cadet squadron commander',
      'Guidon bearer',
      'Flight commanders',
    ],
    figures: [
      { src: symbols, caption: 'Figure 1.1, Symbols (CAPP 60-33, Nov 2025, p.9)', note: 'Key for the figures below.' },
    ],
    steps: [
      { text: 'Flight sergeants place their flights so the squadron will be at proper interval and in alignment, size the flight, and face forward.', who: 'Flight sergeants', ref: 'CAPP 60-33 Attachment 3' },
      { panel: { src: sqFig51, caption: 'Figure 5.1, Forming the Squadron in Line (CAPP 60-33 p.58)' }, text: 'First sergeant takes a post nine paces in front of where the center of the squadron will be, faces that point, and commands FALL IN. The squadron forms in two or more flights at normal interval (unless close interval is directed), three paces between flights. Flight sergeants face about.', who: 'First sergeant', say: 'FALL IN', ref: 'CAPP 60-33 ¶5.3.1; Attachment 3' },
      { text: 'Each flight sergeant takes a post three paces in front of and centered on the flight; the flights form under the flight sergeants\' supervision.', who: 'Flight sergeants', ref: 'CAPP 60-33 ¶5.3.3' },
      { text: 'Flight sergeants, in sequence from right to left, command REPORT. Element leaders, front to rear, salute and report without turning their heads. The flight sergeant returns each salute, then faces about.', who: 'Flight sergeants, then element leaders', say: '___ Element, all present  /  ___ Element, (number) persons absent', ref: 'CAPP 60-33 ¶5.3.4; Attachment 3' },
      { text: 'First sergeant commands REPORT. Beginning with the right flight, each flight sergeant turns head and eyes toward the first sergeant, salutes and reports. The first sergeant turns head and eyes and returns each salute.', who: 'First sergeant, then flight sergeants', say: '___ Flight, all present or accounted for  /  ___ Flight, (number) persons absent', ref: 'CAPP 60-33 ¶5.3.5; Attachment 3' },
      { text: 'First sergeant commands POST. Flight sergeants face about and move by the most direct route to their positions in the ranks, at the end of the last element (Figure 5.2). The first sergeant faces about.', who: 'First sergeant', say: 'POST', ref: 'CAPP 60-33 ¶5.3.5; Attachment 3' },
      { panel: { src: sqFig52, caption: 'Figure 5.2, Squadron in Line (CAPP 60-33 p.59)' }, text: 'Squadron commander marches to a position 12 paces in front of, centered on and facing the squadron, with the guidon bearer. The guidon bearer faces forward.', who: 'Squadron commander and guidon bearer', ref: 'CAPP 60-33 ¶5.3.5; Attachment 3' },
      { text: 'First sergeant faces the commander, salutes and reports. Once the commander returns the salute, the first sergeant drops the salute, faces about and moves by the most direct route to post behind the last cadet in the last flight.', who: 'First sergeant', say: 'Sir (Ma\'am), all present or accounted for  /  Sir (Ma\'am), (number) persons absent', ref: 'CAPP 60-33 ¶5.3.5; Attachment 3' },
      { text: 'As soon as the first sergeant drops the salute, flight commanders march forward by the most direct route to their posts, six paces in front of and centered on their flights, and dress off the right flight commander.', who: 'Flight commanders', ref: 'CAPP 60-33 ¶5.3.6; Attachment 3' },
      { text: 'The commander can now make announcements, present awards, and so on.', who: 'Squadron commander', ref: 'CAPP 60-33 Attachment 3' },
      { text: 'To dismiss: with the squadron at attention, the commander calls the first sergeant, who moves by the most direct route to three paces from the commander, halts and salutes. The commander returns the salute.', who: 'Squadron commander, then first sergeant', say: 'FIRST SERGEANT', ref: 'CAPP 60-33 ¶5.11; Attachment 3' },
      { text: 'Commander commands DISMISS THE SQUADRON. The first sergeant salutes again; the commander returns it and falls out. Per ¶5.11, the flight commanders and guidon bearer fall out at the same time; Attachment 3 has the flight commanders face about and march to the rear of their flights once the commander has departed. Either way, flight commanders are no longer part of the formation.', who: 'Squadron commander', say: 'DISMISS THE SQUADRON', ref: 'CAPP 60-33 ¶5.11; Attachment 3' },
      { text: 'First sergeant executes an about face; flight sergeants take their posts three paces in front of and centered on their flights. First sergeant commands DISMISS YOUR FLIGHTS, then falls out or marches off.', who: 'First sergeant', say: 'DISMISS YOUR FLIGHTS', ref: 'CAPP 60-33 ¶5.11; Attachment 3' },
      { text: 'Flight sergeants face about and command DISMISSED. Individuals break ranks and leave the formation.', who: 'Flight sergeants', say: 'DISMISSED', ref: 'CAPP 60-33 ¶5.11; Attachment 3' },
    ],
    watch: [
      { text: 'Whoever reports salutes while reporting and holds it until it is returned. The person receiving the report does not return the salute until the report is complete.', ref: 'CAPP 60-33 ¶5.3.7' },
      { text: 'If the two people are not standing in front of each other, turn head and eyes toward the person being saluted.', ref: 'CAPP 60-33 ¶5.3.7' },
      { text: 'Element leaders do not turn their heads when reporting to the flight sergeant.', ref: 'CAPP 60-33 ¶5.3.4' },
      { text: 'Flights report in order from right to left.', ref: 'CAPP 60-33 ¶5.3.4–5.3.5' },
      { text: 'Anyone changing post goes by the most direct route, as soon as possible after the command.', ref: 'CAPP 60-33 ¶5.1.3' },
      { text: 'Option: the commander and guidon bearer may march off the field to the right or left at the commander\'s commands. If so, everyone holds position until the commander is off the field; only then do the flight commanders fall out, the first sergeant face about, and the flight sergeants take post.', ref: 'CAPP 60-33 ¶5.11' },
      { text: 'To split up without dismissing, the commander can command "Flight Commanders, Take Charge of Your Flights" (flight commanders salute). The first sergeant can give "Flight Sergeants, Take Charge of Your Flights"; no salutes are exchanged in the NCO formation.', ref: 'CAPP 60-33 ¶5.11.1; Attachment 3' },
    ],
    source: 'CAPP 60-33, Drill & Ceremonies Guide, November 2025, ¶5.1, ¶5.3, ¶5.11 and Attachment 3 (Forming & Dismissing the Squadron); Figures 1.1, 5.1, 5.2',
  },
  {
    id: 'guidon-bearer',
    title: 'Guidon Bearer',
    summary: 'Where the guidon bearer stands and how to hold, move and salute with the guidon.',
    purpose: [
      { text: 'The squadron guidon is carried at ceremonies and when the commander prescribes, and should be present at squadron formations. The guidon bearer is a specially selected cadet designated by the squadron commander.', ref: 'CAPP 60-33 ¶5.13' },
      { text: 'The guidon bearer is the squadron commander\'s flag bearer and leaves the formation when the commander does.', ref: 'CAPP 60-33 ¶5.14' },
      { text: 'The manual illustrates these positions with photographs (Figures 5.9 to 5.15, pp.66-69). They are not copied here; see the manual.', ref: 'CAPP 60-33 Section 5C' },
    ],
    roles: [
      'Guidon bearer',
      'Squadron commander (gives the preparatory commands the guidon bearer moves on)',
    ],
    figures: [],
    steps: [
      { text: 'Position when marching with the commander: one step behind and two 12-inch steps to the left of the squadron commander. For short distances (marching onto or off the field) the guidon bearer may be at the commander\'s right rear.', who: 'Guidon bearer', ref: 'CAPP 60-33 ¶5.14' },
      { text: 'In formation: face the same direction as the squadron, whatever direction the commander faces. Never face the squadron, and do not change position when the commander posts. Execute the manual of the guidon on the squadron commander\'s preparatory command.', who: 'Guidon bearer', ref: 'CAPP 60-33 ¶5.14.1' },
      { text: 'Order guidon (the position of attention): guidon vertical, ferrule on the ground beside the right shoe. Staff held in the right hand in the "V" of thumb and joined fingers, right hand and arm behind the staff, arm bent naturally, staff resting in the hollow of the shoulder.', who: 'Guidon bearer', ref: 'CAPP 60-33 ¶5.15, Fig 5.9' },
      { text: 'Order to carry: grasp the staff with the left hand while loosening the right; raise the guidon vertically, letting the staff slide up through the right hand until the ferrule is about 6 inches off the ground; re-grasp with the right hand and cut the left hand away smartly. Facings, alignments and formal marching require carry guidon; come to the carry on the movement\'s preparatory command.', who: 'Guidon bearer', ref: 'CAPP 60-33 ¶5.18, ¶5.16.1, Fig 5.10' },
      { text: 'Carry to order: let the staff slide through the right hand until the ferrule touches the ground in line with the toe of the right shoe, and re-grasp as at order guidon. The left hand may steady the guidon, then returns sharply to attention.', who: 'Guidon bearer', ref: 'CAPP 60-33 ¶5.17' },
      { text: 'Parade rest from order guidon: slide the right hand up the staff and incline the guidon forward at arm\'s length, hand at waist level.', who: 'Guidon bearer', ref: 'CAPP 60-33 ¶5.19, Fig 5.12' },
      { text: 'Present guidon. On the preparatory command (Present or Eyes) raise the guidon vertically until the right arm is fully extended, left hand brought across the chest to guide the staff. On the command of execution (ARMS or RIGHT) lower the guidon straight to the front, right arm extended, staff in the pit of the arm, and cut the left hand away. On Eyes, RIGHT also turn head and eyes like the rest of the formation.', who: 'Guidon bearer', say: 'Present, ARMS  /  Eyes, RIGHT', ref: 'CAPP 60-33 ¶5.21, Fig 5.14' },
      { text: 'From present back to carry or order: raise the staff to vertical while bringing the left arm across the chest to grasp and guide it. On the command of execution, lower the guidon with the right hand, steadying with the left until the ferrule is about 6 inches off the ground, then cut the left hand away. For order guidon, let the staff slide on down to the ground. Do not bang the pole on the ground.', who: 'Guidon bearer', ref: 'CAPP 60-33 ¶5.22' },
      { text: 'Double time: hold the guidon diagonally across the body, right hand where it is at the carry with the forearm horizontal and elbow near the body, left hand on the staff opposite the left shoulder.', who: 'Guidon bearer', ref: 'CAPP 60-33 ¶5.20, Fig 5.13' },
      { text: 'Column movements and turns: execute the movement on the command of execution, then move at 45-degree angles to a position in front of the squadron. When marching with the commander, re-center together on the squadron.', who: 'Guidon bearer', ref: 'CAPP 60-33 ¶5.14.2' },
      { text: 'Squadron in column with the commander on the flank: post five paces in front of and centered on the front rank of the leading flight.', who: 'Guidon bearer', ref: 'CAPP 60-33 ¶5.14.3, ¶5.6' },
      { text: 'Salute when not in formation (at order or carry guidon), two counts with the LEFT hand. Count one: left arm horizontally across the body, forearm and wrist straight, fingers and thumb extended and joined, palm down, first joint of the forefinger touching the staff. Count two: cut the left hand smartly to the side.', who: 'Guidon bearer', ref: 'CAPP 60-33 ¶5.23, Fig 5.15' },
    ],
    watch: [
      { text: 'Modified carry (whole hand around the pole, back of the hand out) is allowed at carry guidon only, for long marches or wind. Avoid holding it at order guidon or when present arms or eyes right is coming; reposition the hand first.', ref: 'CAPP 60-33 ¶5.16.3, ¶5.21' },
      { text: 'At route step or at ease, the guidon may be carried in either hand at the carry.', ref: 'CAPP 60-33 ¶5.16.2' },
      { text: 'If the guidon is too heavy to hold level at present, move the pole backward so its center of gravity is closer to the body.', ref: 'CAPP 60-33 ¶5.21.1' },
      { text: 'Keep the staff vertical through facings and alignments.', ref: 'CAPP 60-33 ¶5.16.1' },
      { text: 'The guidon bearer moves on the squadron commander\'s preparatory command; flight guides move on their flight commander\'s.', ref: 'CAPP 60-33 ¶5.14.1' },
    ],
    source: 'CAPP 60-33, Drill & Ceremonies Guide, November 2025, Section 5C (¶5.13-5.23). Figures 5.9-5.15 are photographs (pp.66-69), not copied here',
  },
  {
    id: 'color-guard-positions',
    title: 'Color Guard: Flag & Rifle Positions',
    summary: 'How flagbearers and guards hold and move the colors and rifles. The manual calls this the Manual of the Colors.',
    purpose: [
      { text: 'Standard positions and movements for flagbearers (the Manual of the Colors) and for guards with rifles. Color guard instructions are based on DAFPAM 34-1203.', ref: 'CAPP 60-33 ¶7.1.1, ¶7.2, ¶7.3' },
      { text: 'CAP flagbearers grasp the flag with the RIGHT hand. The Air Force manual now designates the left hand; CAP will not change unless the Air Force clearly does.', ref: 'CAPP 60-33 ¶7.2.2' },
      { text: 'The manual shows these positions in photographs (Figures 7.1 to 7.12, pp.98-105). They are not copied here; see the manual.', ref: 'CAPP 60-33 Chapter 7' },
    ],
    roles: [
      'US flagbearer: color guard commander, gives all commands (¶7.1.2.1)',
      'Other flagbearers (CAP, state or organizational flags)',
      'Guards, with or without replica rifles',
    ],
    figures: [],
    steps: [
      { text: 'Form in line at close interval, flags at the order, guards at order arms. Color guards normally carry the colors in slings.', who: 'Color guard', ref: 'CAPP 60-33 ¶7.2.1' },
      { text: 'Flags at the order: ferrule on the ground in line with and touching the toe of the right shoe; right arm straight but not stiff, back of the hand to the right, staff vertical in the "V" of thumb and joined fingers. Guards at order arms: rifle butt on the ground, toe of the butt in line with the front of the right foot, sights to the rear, right hand in a "U", thumb along the trouser seam.', who: 'Flagbearers and guards', ref: 'CAPP 60-33 ¶7.2.4, ¶7.3.6, Figs 7.1, 7.5' },
      { text: 'Carry in slings: flagbearers use both hands to lift the flags smartly and together into the sling sockets, then cut the left hand away. Right hand at shoulder height, arm parallel to the ground, staff inclined slightly forward. Guards go to right shoulder arms (or right and left for symmetry).', who: 'Color guard commander', say: 'Carry, COLORS', ref: 'CAPP 60-33 ¶7.2.5, ¶7.3.3, Fig 7.2' },
      { text: 'Back to the order: flagbearers lift the flags out of the slings with both hands and bring them smartly and together to the order, then cut the left hand away. Guards execute order arms.', who: 'Color guard commander', say: 'Order, COLORS', ref: 'CAPP 60-33 ¶7.2.5.1' },
      { text: 'Carry without slings (only when slings cannot be used): left hand grasps the staff, raise the flag vertically letting it slide through the right hand until the ferrule is about 6 inches off the ground, re-grasp with the right and cut the left away. Staff stays vertical. When commanded, guards go to right (or right and left) shoulder arms. When flagbearers take the carry without command, just for a facing, alignment or formal march, guards stay at order arms and flagbearers return to the order without command when the movement is done.', who: 'Color guard commander', say: 'Carry, COLORS', ref: 'CAPP 60-33 ¶7.2.6, ¶7.2.6.1' },
      { text: 'Parade rest: flagbearers as for an individual cadet but keep the staff vertical. Guards: on REST thrust the muzzle forward, shift the right hand to the barrel, toe of the butt in line with the right foot, right arm straight, left arm fully extended behind the back. Return on ATTENTION.', who: 'Color guard commander', say: 'Parade, REST  /  ATTENTION', ref: 'CAPP 60-33 ¶7.2.7, ¶7.3.7.1, Figs 7.3, 7.6' },
      { text: 'Salute with flags in slings: every flagbearer except the US flagbearer extends the right arm to dip the flag to 45 degrees; guards present arms. To return to the carry: flagbearers retract the arm, guards go back to shoulder arms.', who: 'Color guard commander', say: 'Present, ARMS  /  Order, ARMS', ref: 'CAPP 60-33 ¶7.2.8, Fig 7.4' },
      { text: 'Salute with flags at the order or carry: left hand grasps the staff just under the flag, left arm extended parallel to the ground, right hand (still on the staff) to the right hip. Guards present arms. Reverse to recover; guards order arms.', who: 'Color guard commander', say: 'Present, ARMS  /  Order, ARMS', ref: 'CAPP 60-33 ¶7.2.9' },
      { text: 'Eyes right: done as in ¶3.10, halted or marching. All flagbearers except the US flagbearer execute present arms. On Ready, FRONT everyone returns to the position held before.', who: 'Color guard commander', say: 'Eyes, RIGHT  /  Ready, FRONT', ref: 'CAPP 60-33 ¶7.4.3, Fig 7.12' },
      { text: 'Facings: in line, only Right, FACE; in column, only Left, FACE. Never About, FACE.', who: 'Color guard commander', say: 'Right, FACE', ref: 'CAPP 60-33 ¶7.4.2' },
      { text: 'March in line (the preferred formation): step off with the left foot, 24-inch steps, quick time, normal arm swing. Mark time lifts the feet 4 inches.', who: 'Color guard commander', say: 'Forward, MARCH', ref: 'CAPP 60-33 ¶7.5.1' },
      { text: 'Change direction with abouts. Half right about: the right guard stays in place and pivots, the others arc around keeping alignment; after 90 degrees mark time until Color Guard, HALT or Forward, MARCH. A right (left) about is the same but 180 degrees. On a half left about, dress goes to the left flank until mark time, then back to the right.', who: 'Color guard commander', say: 'Half Right About, MARCH', ref: 'CAPP 60-33 ¶7.5.2' },
      { text: 'Rifle, port arms from order arms (2 counts). ARMS: grasp the barrel with the right hand and raise the rifle diagonally across the body, left hand on the hand guard just forward of the action, rifle about 4 inches from the chest. Count 2: right hand re-grasps at the small of the stock, right forearm horizontal, elbows in, rifle at 45 degrees between shoulder and head. Order arms from port is 3 counts.', who: 'Guards', say: 'Port, ARMS', ref: 'CAPP 60-33 ¶7.3.8, Figs 7.7, 7.8' },
      { text: 'Rifle, present arms from order arms (3 counts): port arms in two counts, then twist the rifle so the trigger guard faces front, rifle vertical with the rear sight about 4 inches (a fist) in front of and centered on the body, left forearm horizontal, left thumb along the hand guard. Order arms from present is 4 counts (back to port, then as order from port).', who: 'Guards', say: 'Present, ARMS  /  Order, ARMS', ref: 'CAPP 60-33 ¶7.3.9, Fig 7.9' },
      { text: 'Rifle, right shoulder arms from order arms (4 counts): count 1 as port; count 2 right hand to the heel of the butt; count 3 twist sights up onto the right shoulder, left hand guiding at the small of the stock; count 4 left hand to the side. Order arms from right shoulder is 4 counts. From port it is 3 counts; when marching give the command as the right foot strikes.', who: 'Guards', say: 'Right Shoulder, ARMS', ref: 'CAPP 60-33 ¶7.3.10, Fig 7.10' },
      { text: 'Rifle, left shoulder arms from order arms (4 counts): port in two counts; count 3 rifle onto the left shoulder sights up, left hand takes the heel of the butt; count 4 right hand to the side. Order arms from left shoulder is 5 counts. From port it is 2 counts; when marching give the command as the left foot strikes.', who: 'Guards', say: 'Left Shoulder, ARMS', ref: 'CAPP 60-33 ¶7.3.11, Fig 7.11' },
    ],
    watch: [
      { text: 'Never To the Rear, MARCH or About, FACE: the US flag stays to the right of or in front of all other flags. In single file the right guard leads.', ref: 'CAPP 60-33 ¶7.2.3' },
      { text: 'Rifles move with arms and hands only, at quick time cadence; head, eyes and body stay at attention.', ref: 'CAPP 60-33 ¶7.3.2' },
      { text: 'Carry the rifle to and from formation at port arms (unless at sling arms).', ref: 'CAPP 60-33 ¶7.3.1' },
      { text: 'Guards may face right or left at port or shoulder arms to post the colors.', ref: 'CAPP 60-33 ¶7.3.4' },
      { text: 'Column of march is mainly for crowds and narrow spaces; armed guards may be at order, port, right or left shoulder arms.', ref: 'CAPP 60-33 ¶7.5.3' },
      { text: 'Honor guards use different manual-of-arms rules; see their manuals.', ref: 'CAPP 60-33 ¶7.3.5' },
    ],
    source: 'CAPP 60-33, Drill & Ceremonies Guide, November 2025, Chapter 7 (¶7.1-7.5); rifle manual based on Army TC 3-21.5. Figures 7.1-7.12 are photographs (pp.98-105), not copied here',
  },
  {
    id: 'posting-colors',
    title: 'Color Guard: Posting & Retrieving the Colors',
    summary: 'Present, post and retrieve the colors at meetings and events.',
    purpose: [
      { text: 'Ceremonies and indoor posting should be done by an honor guard when one is available. If not, a color guard may do it using color guard rules, and should not try honor guard procedures it is not trained in.', ref: 'CAPP 60-33 ¶7.6' },
      { text: 'The manual does not fix one posting pattern. Any pattern is acceptable as long as the team uses the movements in ¶7.1–7.5 and follows the key points below. These steps are those key points in the order they come up.', ref: 'CAPP 60-33 ¶7.6.1' },
    ],
    roles: [
      'US flagbearer: the color guard commander, gives all commands (¶7.1.2.1)',
      'CAP (organizational) flagbearer, and any other flagbearers',
      'Two guards; may carry replica service rifles. Should not carry side arms (replica pistols); will not carry bayonets, swords or sabers (¶7.1.2.2)',
      'Three or more cadets (¶7.1.2); with only three, the US flagbearer and two guards (¶7.1.2.3)',
    ],
    figures: [],
    steps: [
      { text: 'Form in line at close interval, flags at the order (ferrule on the ground touching the toe of the right shoe, staff vertical in the right hand), guards at order arms. See Figure 7.1.', who: 'Color guard', ref: 'CAPP 60-33 ¶7.2.1, ¶7.2.4' },
      { text: 'Flagbearers use both hands to lift the flags smartly and together into the sling sockets, then cut the left hand away to the side. Right hand at shoulder height, staff inclined slightly forward. Guards go to right (or right and left) shoulder arms. See Figure 7.2.', who: 'Color guard commander', say: 'Carry, COLORS', ref: 'CAPP 60-33 ¶7.2.5' },
      { text: 'March by as direct a route as possible to the presentation area, a central spot facing the crowd. Marching in line is preferred: step off with the left foot, 24-inch steps, quick time, normal arm swing.', who: 'Color guard commander', say: 'Forward, MARCH', ref: 'CAPP 60-33 ¶7.7.1, ¶7.7.3, ¶7.5.1' },
      { text: 'For the Pledge of Allegiance and/or the National Anthem the color guard must be at present arms. All flagbearers except the US flagbearer extend the right arm to dip the flag to 45 degrees; guards present arms. The US flag does not dip. See Figure 7.4.', who: 'Color guard commander', say: 'Present, ARMS', ref: 'CAPP 60-33 ¶7.7.2, ¶7.2.8, ¶7.1.4' },
      { text: 'To return to the carry: flagbearers retract the right arm; guards go back to shoulder arms.', who: 'Color guard commander', say: 'Order, ARMS', ref: 'CAPP 60-33 ¶7.2.8' },
      { text: 'Move to the flag stands keeping the US flag to the right of, or in front of, the organizational flag.', who: 'Color guard', ref: 'CAPP 60-33 ¶7.8.2' },
      { text: 'Post the colors. Guards are at present arms while the colors are posted. All flags should be posted at the same moment: one sound of the ferrules. Keep the US flag higher than the others throughout, and align all spades. The US flag ends on its own right (the audience\'s left).', who: 'Flagbearers and guards', ref: 'CAPP 60-33 ¶7.8.3, ¶7.8.4, ¶7.8.6' },
      { text: 'Directly after posting, the flagbearers all face and salute the US flag.', who: 'Flagbearers', ref: 'CAPP 60-33 ¶7.8.5' },
      { text: 'Retrieving: the event organizer decides whether the colors are retrieved before attendees are dismissed or after the event ends.', who: 'Event organizer', ref: 'CAPP 60-33 ¶7.8.7' },
      { text: 'Directly before retrieving, the flagbearers all face and salute the US flag.', who: 'Flagbearers', ref: 'CAPP 60-33 ¶7.8.5' },
      { text: 'Retrieve the colors. Guards are at present arms while the colors are retrieved. Keep the US flag higher than the others throughout.', who: 'Flagbearers and guards', ref: 'CAPP 60-33 ¶7.8.4, ¶7.8.6' },
    ],
    watch: [
      { text: 'A presentation usually comes first, but the guard may also march in, be directed to post the colors, and post without honors to the nation.', ref: 'CAPP 60-33 ¶7.8.1' },
      { text: 'Never About, FACE or To the Rear, MARCH, so the US flag stays right of or in front of all others. In line, only Right, FACE; in column, only Left, FACE. In single file the right guard leads.', ref: 'CAPP 60-33 ¶7.2.3, ¶7.4.2' },
      { text: 'Command voice: loud enough for the guard to hear, not projected beyond it. Do not shout in a small room.', ref: 'CAPP 60-33 ¶7.4.1, ¶7.6.3' },
      { text: 'No rifle spinning or exhibition drill of any kind. The focus is the US flag.', ref: 'CAPP 60-33 ¶7.6.2' },
      { text: 'The CAP flag dips for the National Anthem, "To the Color" or a foreign anthem. Organizational or state flags are never carried without the US flag.', ref: 'CAPP 60-33 ¶7.1.4, ¶7.1.2.3' },
      { text: 'Preferred flag size is 3 ft by 4 ft on a 7-foot pole (8-foot optional) with a silver-colored spade.', ref: 'CAPP 60-33 ¶7.1.3' },
    ],
    source: 'CAPP 60-33, Drill & Ceremonies Guide, November 2025, Chapter 7 (¶7.1–7.2, 7.4–7.8). Figures 7.1, 7.2 and 7.4 are photographs on pp.98-99 of the manual',
  },
  {
    id: 'competition-color-guard',
    title: 'Competition: Color Guard Standard Drill',
    summary: 'The National Cadet Competition color guard routine: report in, 24 commands in order, march off.',
    purpose: [
      { text: 'Tests the team\'s proficiency marching as a color guard. Scored together with Element Standard Drill for the Standard Drill event, on a 50 ft by 90 ft drill pad.', ref: 'CAPP 60-75 ¶2-3a' },
      { text: 'The 24 commands are given in sequence with no added commands. Tap each one as the team executes it, like the judges\' sequence table.', ref: 'CAPP 60-75 ¶2-3b(3); Attachment 1' },
      { text: 'Region and wing competitions operate under Part 2, Core Team Events, at a minimum, and are encouraged to use the rest of the guide. Confirm the details with your event director.', ref: 'CAPP 60-75 Preface' },
    ],
    roles: [
      'Team of four cadets (CAPP 60-75 ¶1-5)',
      'Color guard commander (US flagbearer; gives all commands, makes the report)',
      'Second flagbearer',
      'Two guards with rifles at right shoulder arms',
      'Chief Judge and timekeeper (event staff)',
    ],
    figures: [],
    steps: [
      { text: "Pre-marshal at the ready line. When the event manager calls you, form up in one rank at the start point with all color guard accessories. Flagbearers may steady the flags with one or both hands, as long as both do it the same way. Guards march at right shoulder arms.", who: "Color guard", ref: "CAPP 60-75 \u00b62-3b(1)" },
      { text: "When directed, march into the presentation area. Execute a half left about and a halt so the team ends 12 paces from the Chief Judge with the US flagbearer centered on the Chief Judge.", who: "Color guard commander", ref: "CAPP 60-75 \u00b62-3b(2)" },
      { text: "Command present arms and report. The Chief Judge returns the salute and the clock starts (2 minutes 30 seconds minimum).", who: "Color guard commander", say: "Present, ARMS  /  Sir (Ma'am), the [team name or number] Color Guard reports for Standard Drill", ref: "CAPP 60-75 \u00b62-3b(2), (4)" },
      { panel: { src: compArea, caption: 'Color Guard presentation area for Standard Drill; arrows show routine steps 1-24 (CAPP 60-75 p.12)' }, text: "Routine command 1 of 24. Guards come down from right shoulder arms to order arms.", who: "Color guard commander", say: "Order, ARMS", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.3.10.2" },
      { text: "Routine command 2 of 24. Flags from the carry to the order.", who: "Color guard commander", say: "Order, COLORS", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.2.5.1" },
      { text: "Routine command 3 of 24. Flags at parade rest; guards at parade rest with rifles.", who: "Color guard commander", say: "Parade, REST", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.2.7, \u00b67.3.7.1" },
      { text: "Routine command 4 of 24. Back to the order and order arms.", who: "Color guard commander", say: "Color Guard, ATTENTION", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.2.7, \u00b67.3.6.1" },
      { text: "Routine command 5 of 24. Flags into the slings; guards to right shoulder arms.", who: "Color guard commander", say: "Carry, COLORS", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.2.5" },
      { text: "Routine command 6 of 24. Flags at the carry: all but the US flag dip to 45 degrees; guards present arms.", who: "Color guard commander", say: "Present, ARMS", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.2.8" },
      { text: "Routine command 7 of 24. Flags at the carry: flagbearers retract the arm; guards back to shoulder arms.", who: "Color guard commander", say: "Order, ARMS", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.2.8" },
      { text: "Routine command 8 of 24. Step off with the left foot, quick time.", who: "Color guard commander", say: "Forward, MARCH", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.5.1" },
      { text: "Routine command 9 of 24. Rotate 90 degrees left; mark time after the turn.", who: "Color guard commander", say: "Half Left About, MARCH", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.5.2.1" },
      { text: "Routine command 10 of 24.", who: "Color guard commander", say: "Forward, MARCH", ref: "CAPP 60-75 \u00b62-3b(3)" },
      { text: "Routine command 11 of 24.", who: "Color guard commander", say: "Half Left About, MARCH", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.5.2.1" },
      { text: "Routine command 12 of 24.", who: "Color guard commander", say: "Forward, MARCH", ref: "CAPP 60-75 \u00b62-3b(3)" },
      { text: "Routine command 13 of 24. Rotate 180 degrees right.", who: "Color guard commander", say: "Right About, MARCH", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.5.2.2" },
      { text: "Routine command 14 of 24.", who: "Color guard commander", say: "Forward, MARCH", ref: "CAPP 60-75 \u00b62-3b(3)" },
      { text: "Routine command 15 of 24.", who: "Color guard commander", say: "Half Right About, MARCH", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.5.2.1" },
      { text: "Routine command 16 of 24.", who: "Color guard commander", say: "Forward, MARCH", ref: "CAPP 60-75 \u00b62-3b(3)" },
      { text: "Routine command 17 of 24.", who: "Color guard commander", say: "Half Right About, MARCH", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.5.2.1" },
      { text: "Routine command 18 of 24.", who: "Color guard commander", say: "Forward, MARCH", ref: "CAPP 60-75 \u00b62-3b(3)" },
      { text: "Routine command 19 of 24. Rotate 180 degrees left.", who: "Color guard commander", say: "Left About, MARCH", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.5.2.2" },
      { text: "Routine command 20 of 24.", who: "Color guard commander", say: "Forward, MARCH", ref: "CAPP 60-75 \u00b62-3b(3)" },
      { text: "Routine command 21 of 24.", who: "Color guard commander", say: "Half Left About, MARCH", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.5.2.1" },
      { text: "Routine command 22 of 24.", who: "Color guard commander", say: "Forward, MARCH", ref: "CAPP 60-75 \u00b62-3b(3)" },
      { text: "Routine command 23 of 24. For the Chief Judge: all flagbearers except the US flagbearer present arms.", who: "Color guard commander", say: "Eyes, RIGHT", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.4.3" },
      { text: "Routine command 24 of 24. Everyone returns to the position held before eyes right.", who: "Color guard commander", say: "Ready, FRONT", ref: "CAPP 60-75 \u00b62-3b(3); CAPP 60-33 \u00b67.4.3" },
      { text: "March off the presentation area to the end point. Do not report out to the Chief Judge. The clock stops when the team steps out of the presentation area.", who: "Color guard", ref: "CAPP 60-75 \u00b62-3b(4), (5)" },
    ],
    watch: [
      { text: 'Judged: in-place commands and posture, marching and cadence, turning movements, alignment and uniformity (marked 0, 5, 8 or 15 each); voice commands, flag procedures, poise (marked 0, 3, 6 or 10 each).', ref: 'CAPP 60-75 Attachment 1, Color Guard Standard Drill scorecard' },
      { text: 'Penalties, 3 points each, given only by the Chief Judge: a movement out of sequence or omitted, a boundary violation, finishing in under 2 minutes 30 seconds. There is no maximum time.', ref: 'CAPP 60-75 ¶2-3b(4); Attachment 1' },
      { text: 'Use the entire presentation area, as the diagram shows.', ref: 'CAPP 60-75 ¶2-3b(5)' },
      { text: 'CAPP 60-75 (2021) still cites AFMAN 36-2203. Current CAP drill guidance, CAPP 60-33 (Nov 2025), is based on DAFPAM 34-1203.', ref: 'CAPP 60-75 ¶2-3; CAPP 60-33 ¶7.1.1' },
    ],
    source: 'CAPP 60-75, National Cadet Competition Program Guide, October 2021, ¶2-3 and Attachment 1; movements per CAPP 60-33 (Nov 2025) Chapter 7',
  },
  {
    id: 'competition-element',
    title: 'Competition: Element Standard Drill',
    summary: 'The competition element drill: report in, draw the command card, drill it in order, report out.',
    purpose: [
      { text: 'Tests the team\'s proficiency marching as a standard element. Scored together with Color Guard Standard Drill, on a 50 ft by 90 ft drill pad.', ref: 'CAPP 60-75 ¶2-3a' },
      { text: 'The required commands are on a card handed out at the event. Only movements in the CAP drill and ceremonies manual are used, so practice the reporting procedure here and drill movements from CAPP 60-33.', ref: 'CAPP 60-75 ¶2-3b Element (1)' },
    ],
    roles: [
      'Team of six cadets (CAPP 60-75 ¶1-5)',
      'Team commander',
      'Element (the rest of the team)',
      'Chief Judge and timekeeper (event staff)',
    ],
    figures: [],
    steps: [
      { text: 'Form as an element in line at the start point, team commander three paces in front facing the team. Once aligned, the team commander faces about and waits to be directed in.', who: 'Team commander', ref: 'CAPP 60-75 ¶2-3b Element (2)' },
      { text: 'When directed, face the team and command Right, FACE, executing a left face at the same time.', who: 'Team commander', say: 'Right, FACE', ref: 'CAPP 60-75 ¶2-3b Element (3)' },
      { text: 'March the element in with whatever commands are needed and halt it 12 paces from and centered on the Chief Judge.', who: 'Team commander', ref: 'CAPP 60-75 ¶2-3b Element (3)' },
      { text: 'Command Left, FACE, executing a right face at the same time. Then about face, step forward three paces, and halt.', who: 'Team commander', say: 'Left, FACE', ref: 'CAPP 60-75 ¶2-3b Element (3)' },
      { text: 'Salute and report. The Chief Judge returns the salute and produces the command card.', who: 'Team commander', say: "Sir (Ma'am), the [team name or number] Team reports for Element Standard Drill", ref: 'CAPP 60-75 ¶2-3b Element (4)' },
      { text: 'Get the card, return to your position three paces in front of the element and face the judges. Review the card for up to 30 seconds.', who: 'Team commander', ref: 'CAPP 60-75 ¶2-3b Element (4), (8)(a)' },
      { text: 'About face, command present arms, face about again and salute the Chief Judge. When the Chief Judge returns the salute, the clock starts (2 minutes 30 seconds minimum).', who: 'Team commander', say: 'Present, ARMS', ref: 'CAPP 60-75 ¶2-3b Element (4), (8)(b)' },
      { text: 'Face about, command order arms, and drill every movement on the card in the order shown. Transitional commands are allowed to use the area and set up each movement. 24-inch steps, 100 to 120 steps per minute.', who: 'Team commander', say: 'Order, ARMS', ref: 'CAPP 60-75 ¶2-3b Element (1), (5)' },
      { text: 'After the last movement, halt the element 12 paces in front of and centered on the Chief Judge, taking your place three paces from the element facing forward. About face, step forward three paces, halt.', who: 'Team commander', ref: 'CAPP 60-75 ¶2-3b Element (6)' },
      { text: 'Salute and report out. The clock stops at this salute.', who: 'Team commander', say: "Sir (Ma'am), the [team name or number] Team has concluded Element Standard Drill", ref: 'CAPP 60-75 ¶2-3b Element (6), (8)(b)' },
      { text: 'When the Chief Judge returns the salute the team is dismissed. Face about, return to your position in front of the element, and march it off the presentation area.', who: 'Team commander', ref: 'CAPP 60-75 ¶2-3b Element (6)' },
    ],
    watch: [
      { text: 'Judging criteria: precision of execution (dress, cover, alignment, sequence); accuracy of movements; cadence (timing and snap); command voice (timing, snap, clarity); professionalism (bearing, esprit de corps, poise); proper report and dismissal.', ref: 'CAPP 60-75 ¶2-3b Element (7)' },
      { text: 'Penalties, 3 points each, given only by the Chief Judge: a movement out of sequence or omitted, a boundary violation, finishing in under 2 minutes 30 seconds. There is no maximum time.', ref: 'CAPP 60-75 ¶2-3b Element (8)(b); Attachment 1, Element Standard Drill scorecard' },
      { text: 'Do not try to memorize the card. Reading it is expected; there is no penalty for the hand and head movements needed to read it.', ref: 'CAPP 60-75 ¶2-3b Element (1)' },
      { text: 'If the space means marching in from another direction, reach the same position and continue as written.', ref: 'CAPP 60-75 ¶2-3b Element (3)' },
    ],
    source: 'CAPP 60-75, National Cadet Competition Program Guide, October 2021, ¶2-3 (Element Standard Drill) and Attachment 1',
  },
  {
    id: 'change-of-command',
    title: 'Change of Command',
    summary: 'Formal indoor ceremony: the flag passes from the outgoing to the incoming commander.',
    purpose: [
      { text: 'Lets subordinates witness the formality of command passing from one officer to another, so it should be official, formal, brief and conducted with great dignity.', ref: 'CAPP 60-33 ¶6.16.1.1' },
      { text: 'The flag or guidon is exchanged after the order is read: a symbolic, tangible view of command authority passing from one commander to the next.', ref: 'CAPP 60-33 ¶6.16.1.2' },
      { text: 'CAP rarely holds a change of command with a review; it is usually an indoor ceremony. For a parade, follow DAFPAM 34-1203 ¶7.31.', ref: 'CAPP 60-33 ¶6.16' },
    ],
    roles: [
      'Presiding officer (senior commander)',
      'Outgoing commander',
      'Incoming commander',
      'Flag or guidon bearer',
    ],
    figures: [
      {
        src: cocFigure,
        caption: 'Figure 6.5, Change of Command Ceremony, all four panels (CAPP 60-33, Nov 2025, p.96)',
        note: 'The figure is drawn with the audience at the top, so left and right look reversed from the audience\'s view. Seen from the audience: senior commander on the left, outgoing in the middle, incoming on the right.',
      },
    ],
    steps: [
      { panel: { src: cocP1, caption: 'Figure 6.5, panel 1 of 4: form up, Officers CENTER (audience at the top)', small: true }, text: 'Form up abreast, left to right as seen from the audience: presiding officer (senior commander), outgoing commander, incoming commander. The flag/guidon bearer stands behind and between the presiding officer and the outgoing commander.', who: 'All four', ref: 'CAPP 60-33 ¶6.16.2.1' },
      { text: 'Quiet command. The senior commander executes a left face; the incoming and outgoing commanders execute a right face.', who: 'Flag/guidon bearer', say: 'Officers, CENTER', ref: 'CAPP 60-33 ¶6.16.2.2' },
      { panel: { src: cocP2, caption: 'Figure 6.5, panel 2 of 4: relinquish command, flag to senior, change places (audience at the top)', small: true }, text: 'Outgoing commander salutes the senior commander. The senior commander returns the salute.', who: 'Outgoing commander', say: 'Sir/Ma\'am, I relinquish command.', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Outgoing commander takes the flag/guidon from the bearer, top angled toward the bearer\'s head, left hand below the right, and presents it to the senior commander, whose hands go above the outgoing commander\'s hands.', who: 'Outgoing commander', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Outgoing commander takes one step to the right, two steps back and one step to the left. At the same time the incoming commander takes two steps forward into the outgoing commander\'s place.', who: 'Outgoing and incoming commanders', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { panel: { src: cocP3, caption: 'Figure 6.5, panel 3 of 4: flag to incoming, assume command (audience at the top)', small: true }, text: 'Senior commander presents the flag/guidon to the incoming commander, who receives it firmly (left hand below the right) and passes it to the flag/guidon bearer.', who: 'Senior and incoming commanders', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Incoming commander salutes the senior commander. The senior commander returns the salute.', who: 'Incoming commander', say: 'Sir/Ma\'am, I assume command.', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { panel: { src: cocP4, caption: 'Figure 6.5, panel 4 of 4: Officers POST (audience at the top)', small: true }, text: 'Quiet command. All three officers face toward the audience.', who: 'Flag/guidon bearer', say: 'Officers, POST', ref: 'CAPP 60-33 ¶6.16.2.3' },
    ],
    watch: [
      { text: 'Both "Officers, CENTER" and "Officers, POST" are quiet commands from the bearer, not loud drill commands.', ref: 'CAPP 60-33 ¶6.16.2.2–6.16.2.3' },
      { text: 'Hand position on the flag: left hand below the right, for both the outgoing and incoming commander; the senior commander\'s hands go above.', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Keep it brief and dignified.', ref: 'CAPP 60-33 ¶6.16.1.1' },
      { text: 'The flag is exchanged after the order (of command) is read. The manual does not say who reads it or exactly when; plan that with your commander.', ref: 'CAPP 60-33 ¶6.16.1.2' },
      { text: 'Same ceremony is Problem #2 of the Achievement 7 drill test.', ref: 'CAPP 60-34 pp.17, 19' },
    ],
    source: 'CAPP 60-33, Drill & Ceremonies Guide, November 2025, ¶6.16 and Figure 6.5',
  },
];
