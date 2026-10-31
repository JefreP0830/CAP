// Practice guides: ceremonies and formations cadets perform most often.
// NOT promotion tests: no CAPIDs, no scores, no PDF.
// Every step and caution is transcribed from the cited paragraph of the
// current publication; figures are cut from the official PDFs, not redrawn.
//   CAPP 60-33, Drill & Ceremonies Guide, November 2025
//   CAPP 60-34, Drill & Ceremonies Practical Tests, September 2024 (cross-references)
// Where two parts of a source differ, the step says so instead of picking silently.
import cocFigure from './assets/guides/coc-figure-6-5.png';
import cocP1 from './assets/guides/coc-panel-1.png';
import cocP2 from './assets/guides/coc-panel-2.png';
import cocP3 from './assets/guides/coc-panel-3.png';
import cocP4 from './assets/guides/coc-panel-4.png';
import sqFig51 from './assets/guides/sq-figure-5-1.png';
import sqFig52 from './assets/guides/sq-figure-5-2.png';
import symbols from './assets/guides/symbols-figure-1-1.png';

// panel: a figure panel shown just above this step, so positions appear where they are needed.
export interface GuideStep { text: string; who?: string; say?: string; ref: string; panel?: { src: string; caption: string } }
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
      { panel: { src: cocP1, caption: 'Figure 6.5, panel 1 of 4: form up, Officers CENTER (audience at the top)' }, text: 'Form up abreast, left to right as seen from the audience: presiding officer (senior commander), outgoing commander, incoming commander. The flag/guidon bearer stands behind and between the presiding officer and the outgoing commander.', who: 'All four', ref: 'CAPP 60-33 ¶6.16.2.1' },
      { text: 'Quiet command. The senior commander executes a left face; the incoming and outgoing commanders execute a right face.', who: 'Flag/guidon bearer', say: 'Officers, CENTER', ref: 'CAPP 60-33 ¶6.16.2.2' },
      { panel: { src: cocP2, caption: 'Figure 6.5, panel 2 of 4: relinquish command, flag to senior, change places (audience at the top)' }, text: 'Outgoing commander salutes the senior commander. The senior commander returns the salute.', who: 'Outgoing commander', say: 'Sir/Ma\'am, I relinquish command.', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Outgoing commander takes the flag/guidon from the bearer, top angled toward the bearer\'s head, left hand below the right, and presents it to the senior commander, whose hands go above the outgoing commander\'s hands.', who: 'Outgoing commander', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Outgoing commander takes one step to the right, two steps back and one step to the left. At the same time the incoming commander takes two steps forward into the outgoing commander\'s place.', who: 'Outgoing and incoming commanders', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { panel: { src: cocP3, caption: 'Figure 6.5, panel 3 of 4: flag to incoming, assume command (audience at the top)' }, text: 'Senior commander presents the flag/guidon to the incoming commander, who receives it firmly (left hand below the right) and passes it to the flag/guidon bearer.', who: 'Senior and incoming commanders', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Incoming commander salutes the senior commander. The senior commander returns the salute.', who: 'Incoming commander', say: 'Sir/Ma\'am, I assume command.', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { panel: { src: cocP4, caption: 'Figure 6.5, panel 4 of 4: Officers POST (audience at the top)' }, text: 'Quiet command. All three officers face toward the audience.', who: 'Flag/guidon bearer', say: 'Officers, POST', ref: 'CAPP 60-33 ¶6.16.2.3' },
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
