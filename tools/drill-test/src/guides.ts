// Practice guides: ceremonies and formations cadets perform most often.
// NOT promotion tests: no CAPIDs, no scores, no PDF.
// Every step and caution is transcribed from the cited paragraph of the
// current publication; figures are cut from the official PDFs, not redrawn.
//   CAPP 60-33, Drill & Ceremonies Guide, November 2025
//   CAPP 60-75, National Cadet Competition Program Guide, October 2021
import cocFigure from './assets/guides/coc-figure-6-5.png';

export interface GuideStep { text: string; who?: string; say?: string; ref: string }
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
        caption: 'Figure 6.5, Change of Command Ceremony (CAPP 60-33, Nov 2025, p.96)',
        note: 'The figure is drawn with the audience at the top, so left and right look reversed from the audience\'s view. Seen from the audience: senior commander on the left, outgoing in the middle, incoming on the right.',
      },
    ],
    steps: [
      { text: 'Form up abreast, left to right as seen from the audience: presiding officer (senior commander), outgoing commander, incoming commander. The flag/guidon bearer stands behind and between the presiding officer and the outgoing commander.', who: 'All four', ref: 'CAPP 60-33 ¶6.16.2.1' },
      { text: 'The order is read.', ref: 'CAPP 60-33 ¶6.16.1.2' },
      { text: 'Quiet command. The senior commander executes a left face; the incoming and outgoing commanders execute a right face.', who: 'Flag/guidon bearer', say: 'Officers, CENTER', ref: 'CAPP 60-33 ¶6.16.2.2' },
      { text: 'Outgoing commander salutes the senior commander. The senior commander returns the salute.', who: 'Outgoing commander', say: 'Sir/Ma\'am, I relinquish command.', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Outgoing commander takes the flag/guidon from the bearer, top angled toward the bearer\'s head, left hand below the right, and presents it to the senior commander, whose hands go above the outgoing commander\'s hands.', who: 'Outgoing commander', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Outgoing commander takes one step to the right, two steps back and one step to the left. At the same time the incoming commander takes two steps forward into the outgoing commander\'s place.', who: 'Outgoing and incoming commanders', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Senior commander presents the flag/guidon to the incoming commander, who receives it firmly (left hand below the right) and passes it to the flag/guidon bearer.', who: 'Senior and incoming commanders', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Incoming commander salutes the senior commander. The senior commander returns the salute.', who: 'Incoming commander', say: 'Sir/Ma\'am, I assume command.', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Quiet command. All three officers face toward the audience.', who: 'Flag/guidon bearer', say: 'Officers, POST', ref: 'CAPP 60-33 ¶6.16.2.3' },
    ],
    watch: [
      { text: 'Both "Officers, CENTER" and "Officers, POST" are quiet commands from the bearer, not loud drill commands.', ref: 'CAPP 60-33 ¶6.16.2.2–6.16.2.3' },
      { text: 'Hand position on the flag: left hand below the right, for both the outgoing and incoming commander; the senior commander\'s hands go above.', ref: 'CAPP 60-33 ¶6.16.2.3' },
      { text: 'Keep it brief and dignified.', ref: 'CAPP 60-33 ¶6.16.1.1' },
      { text: 'Same ceremony is Problem #2 of the Achievement 7 drill test (CAPP 60-34 p.19).', ref: 'CAPP 60-34 p.19' },
    ],
    source: 'CAPP 60-33, Drill & Ceremonies Guide, November 2025, ¶6.16 and Figure 6.5',
  },
];
