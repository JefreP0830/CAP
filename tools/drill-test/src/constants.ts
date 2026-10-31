import keySquadronInLine from './assets/ach7/ach7-squadron-in-line.png';
import keyDrillSymbols from './assets/ach7/ach7-drill-symbols.png';
import keyChangeOfCommand from './assets/ach7/ach7-change-of-command.png';

export interface DrillMovement {
  command: string;
  description?: string;
  standards?: string;
  score: 'Pass' | 'Partial' | 'Fail' | null;
  points?: number;
  isNonGraded?: boolean;
}

export interface Achievement {
  number: number | string;
  name: string;
  movements: DrillMovement[];
  passingScore: number;
  category: 'Promotion' | 'Advanced';
  longDescription?: string;
  topic?: string;
  conditions?: string;
  note?: string;
  rubric?: {
    title: string;
    subtitle: string;
    items: {
      text: string;
      subItems?: string[];
    }[];
  };
  commandSequence?: string[];
  images?: { url: string; caption: string }[];
  // Answer-key images cut from the official CAPP 60-34 PDF (not redrawn), shown to the grader on request.
  answerKeys?: { src: string; caption: string }[];
}

export interface DrillTestSubmission {
  achievementNumber: number | string;
  cadetCAPID: string;
  proctorCAPID: string;
  date: string;
  scores: Record<number, 'Pass' | 'Partial' | 'Fail'>;
  sustain: string;  // hotwash: what went well (proctor's words)
  improve: string;  // hotwash: one coaching point (proctor's words)
  category: 'Promotion' | 'Advanced';
}

// Display helpers. Drill tests follow CAPP 60-34 numbering: Achievements 1-8,
// plus the Wright Brothers Award (milestone) between Achievements 3 and 4.
// Achievement 5 currently carries no honoree name (CAPipedia, Cadet achievements).
export const achLabel = (a: Achievement) =>
  a.category !== 'Promotion' ? 'Advanced Training'
  : a.number === 'WB' ? 'Wright Brothers Award' : `Achievement ${a.number}`;
export const achTitle = (a: Achievement) =>
  a.category !== 'Promotion' ? a.name
  : a.number === 'WB' ? 'Wright Brothers Award'
  : a.name ? `Ach ${a.number}: ${a.name}` : `Achievement ${a.number}`;

// Points a scored movement earns. 'Partial' = 1 point on a 2-point step
// (Ach 7 Problem #2: "grade each step and put the number of points").
export const pointsFor = (m: DrillMovement, s?: 'Pass' | 'Partial' | 'Fail') =>
  m.isNonGraded ? 0 : s === 'Pass' ? (m.points || 1) : s === 'Partial' ? 1 : 0;

// Official CAP palette (CAP Brand Portal / CAPR 900-2); mirrors shared/brand/cap-brand.css.
// Hotwash quality floor: each line needs a real sentence, not "good job".
export const MIN_FEEDBACK_WORDS = 5;
export const wordCount = (t: string) => (t.trim().match(/\S+/g) || []).length;

// Commands to retrain = graded commands not fully earned (U, or 1 of 2 points),
// with their CAPP 60-34 standards. Built from the scores, so it cannot be skipped.
export const retrainList = (a: Achievement, scores: Record<number, 'Pass' | 'Partial' | 'Fail'>) =>
  a.movements
    .map((m, i) => ({ m, s: scores[i] }))
    .filter(({ m, s }) => !m.isNonGraded && (s === 'Fail' || s === 'Partial'))
    .map(({ m, s }) => ({ command: m.command, standards: m.standards || m.description || '', partial: s === 'Partial' }));

export const CAP_COLORS = {
  blue: '#001489',   // Ultramarine Blue
  red: '#BA0C2F',    // Scarlet Red
  white: '#FFFFFF',
  silver: '#9EA2A2', // Silver Gray
  gold: '#FFCD00',   // Air Force Yellow
  body: '#4D4D4D',   // 70% black
};

// Fallback data in case Gemini fails or for immediate use
export const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  // ... Promotion Tests (Curry to Goddard) ...
  {
    number: 1,
    name: "Curry",
    category: 'Promotion',
    passingScore: 11,
    topic: "Basic Drill as an Element Member",
    conditions: "Form at least 3 cadets as a single element. Test no more than 2 cadets at a time per testing officer. Tested cadets should not be on the flanks of the element.",
    movements: [
      { command: "FALL IN", standards: "1. Automatically executes Dress Right, DRESS. 2. Adjusts position to achieve proper dress. 3. Automatically executes Ready, FRONT. 4. Stands at position of attention.", score: null },
      { command: "Parade, REST", standards: "1. Moves left foot such that heels are about 12 inches apart. 2. Extends arms behind body and places right hand in palm of the left hand. 3. Keeps head and eyes straight ahead; is immobile and silent.", score: null },
      { command: "Flight, ATTENTION", standards: "Used to return to position of attention; not graded.", score: null, isNonGraded: true },
      { command: "Present, ARMS", standards: "1. Smartly raises right hand directly to head or headdress. 2. Right hand is flat, with fingers fully extended, canted slightly down.", score: null },
      { command: "Order, ARMS", standards: "1. Smoothly and smartly retraces path of arm. 2. Ends at the position of attention.", score: null },
      { command: "About, FACE", standards: "1. Pivots 180 degrees clockwise on the ball of the right foot and heel of the left foot. 2. Maintains upper body in position of attention.", score: null },
      { command: "About, FACE", standards: "Used to return to line formation; not graded, or use as a second chance to perform #5 correctly.", score: null, isNonGraded: true },
      { command: "Dress Right, DRESS", standards: "1. Raises and extends left arm laterally from the shoulder with snap so arm is parallel with the ground, palm down, hand flat. 2. At the same time as left arm is raised, tested cadet turns head 45 degrees to the right. 3. Establishes exact shoulder-to-fingertip contact with the individual to the immediate right.", score: null },
      { command: "Ready, FRONT", standards: "1. Arms are lowered with snap to their sides and hand is cupped when their arm is at approximately waist level. 2. As the arm is lowered, returns head to the front with snap.", score: null },
      { command: "Right, FACE", standards: "1. Pivots 90 degrees to the right on the ball of the left foot and the heel of the right foot. 2. Maintains upper body in position of attention.", score: null },
      { command: "COVER", standards: "Adjusts by taking small choppy steps if needed to establish cover and distance.", score: null },
      { command: "Left, FACE", standards: "Used to return to line formation; not graded, or use as a second chance to perform the simple facing of #8 correctly.", score: null, isNonGraded: true },
      { command: "AT EASE", standards: "1. Relaxes in standing position. 2. Keeps right foot in place. 3. Silent.", score: null },
      { command: "Flight, ATTENTION", standards: "1. Assumes Parade Rest on preparatory command. 2. Remains immobile and silent, hands cupped.", score: null },
      { command: "Hand, SALUTE", standards: "1. Count one: arm raised smartly. 2. Count one: fingers, palm, and forearm form a straight line. 3. Count one: upper arm parallel to ground. 4. Count one: tip of middle finger touches the front right corner of headdress (if no headdress, outside corner of eyebrow or front right edge of glasses). 5. Count one: rest of body remains at attention. 6. Count two: arm comes smoothly and smartly down. 7. Count two: retraces path used to raise the arm. 8. Count two: hand is cupped as it passes the waist. 9. Count two: ends with entire body at attention.", score: null },
      { command: "Eyes, RIGHT", standards: "Turns their head and eyes smartly 45 degrees to the right.", score: null },
      { command: "Ready, FRONT", standards: "On FRONT, heads and eyes are turned smartly to the front.", score: null },
      { command: "FALL OUT", standards: "Simply breaks ranks but remains in vicinity.", score: null },
    ]
  },
  {
    number: 2,
    name: "Arnold",
    category: 'Promotion',
    passingScore: 11,
    topic: "Basic Drill as a Flight Member",
    conditions: "Form at least 6 cadets into a flight of 2 elements. If you lack cadets for proper elements, elements of 2 may be used for training purposes.",
    movements: [
      { command: "FALL IN", standards: "Not graded.", score: null, isNonGraded: true },
      { command: "Right, FACE", standards: "Not graded; used to put cadets into column formation.", score: null, isNonGraded: true },
      { command: "Forward, MARCH", standards: "1. Steps off on left foot. 2. Does not anticipate the command of execution.", score: null },
      { command: "Double Time, MARCH", standards: "Takes one more step in quick time and then steps off in double time.", score: null },
      { command: "Quick Time, MARCH", standards: "1. Cadet advances two more steps in double time. 2. Resumes quick time. 3. Lowers the arms to the sides and resumes armswing.", score: null },
      { command: "Flight, HALT", standards: "1. After the command HALT, takes one more 24-inch step. 2. Trailing foot is brought smartly alongside front foot. 3. Heels finish together, on line, with cadet at attention.", score: null },
      { command: "Left, FACE", standards: "Not graded; used to put cadets into line formation.", score: null, isNonGraded: true },
      { command: "Open Ranks, MARCH", standards: "1. Marches forward the correct number of steps for the element (1st = 3, 2nd = 2). 2. Automatically executes Dress Right, DRESS once halted.", score: null },
      { command: "Ready, FRONT", standards: "1. Lowers arm with snap but without slapping leg. 2. Turns head to front with snap.", score: null },
      { command: "Close Ranks, MARCH", standards: "1st Element stands fast. 2nd Element takes 1 step forward.", score: null },
      { command: "Right Step, MARCH", standards: "1. The leg is kept straight, but not stiff. 2. The right foot moves 12 inches to the right. 3. The left foot (without scraping the ground) is brought smartly to a position alongside the right foot in the position of attention.", score: null },
      { command: "Flight, HALT", standards: "On the command HALT, one more step is taken and the trailing foot is placed smartly alongside the halted foot at the position of attention.", score: null },
      { command: "Right, FACE", standards: "Not graded; used to put cadets into column formation.", score: null, isNonGraded: true },
      { command: "Forward, MARCH", standards: "1. Steps off on left foot. 2. Does not anticipate the command of execution.", score: null },
      { command: "Right Flank, MARCH", standards: "1. In marching, turns 90 degrees to the right. 2. Maintains proper dress, cover, interval, and distance. 3. Maintains posture as if at attention; suspends armswing during pivot.", score: null },
      { command: "Left Flank, MARCH", standards: "1. In marching, turns 90 degrees to the left. 2. Maintains proper dress, cover, interval, and distance. 3. Maintains posture as if at attention; suspends armswing during pivot.", score: null },
      { command: "Count Cadence, COUNT", standards: "1. Gives the count sharply and clearly without shouting, and separates each number distinctly. 2. Counts ONE-TWO-THREE-FOUR-ONE-TWO-THREE-FOUR.", score: null },
      { command: "To the Rear, MARCH", standards: "1. Takes a half step, pivots, another half step, then steps off with a 24-inch step. 2. Maintains posture as if at attention; suspends armswing during pivot.", score: null },
      { command: "Flight, HALT", standards: "1. After the command HALT, takes one more 24-inch step. 2. Trailing foot is brought smartly alongside front foot. 3. Heels finish together, on line, with cadet at attention.", score: null },
      { command: "FALL OUT", standards: "Not graded.", score: null, isNonGraded: true },
    ]
  },
  {
    number: 3,
    name: "Feik",
    category: 'Promotion',
    passingScore: 9,
    topic: "Advanced Drill as a Flight Member",
    conditions: "Form at least 6 cadets into a flight of 2 elements. Graded cadet will be 1st element leader.",
    movements: [
      { command: "At Close Interval, FALL IN", standards: "1. Automatically executes At Close Interval, Dress Right, DRESS. 2. Automatically executes Ready, FRONT. 3. Stands at the position of attention.", score: null },
      { command: "At Close Interval, Dress Right, DRESS & Ready, FRONT", standards: "1. On DRESS, the left hand is placed so the heel of the hand rests on the left hip, fingertips point toward the ground, and the elbow is in line with the body. Adjusts as necessary. 2. On FRONT, returns to the position of attention.", score: null },
      { command: "FALL OUT", standards: "Not graded.", score: null, isNonGraded: true },
      { command: "FALL IN", standards: "Not graded; cadets in line formation at normal interval.", score: null, isNonGraded: true },
      { command: "Right, FACE", standards: "Not graded; used to put cadets in column formation.", score: null, isNonGraded: true },
      { command: "Close, MARCH (while halted)", standards: "The second element stands fast; the first element takes two 12-inch steps to the right.", score: null },
      { command: "Extend, MARCH (while halted)", standards: "The second element stands fast; the first element takes two 12-inch steps to the left.", score: null },
      { command: "Column of Files from the Right, Column Right, MARCH", standards: "1. On the preparatory command the element leaders turn their heads 45 degrees to the right. The 2nd element leader commands Column Right, and the 1st element leader commands STAND FAST. 2. On the command MARCH, the 2nd element leader executes a face in marching to the right, then continues marching in the new direction. 3. The remaining individuals in the 2nd element march forward on the command of execution, pivot in approximately the same location as their element leader, and maintain a 40-inch distance. 4. When the last cadet of the 2nd element passes, the 1st element leader commands Column Right, MARCH on the right foot, at which time all cadets perform the movement in the same manner as the base element.", score: null },
      { command: "Flight, HALT", standards: "Not graded.", score: null, isNonGraded: true },
      { command: "FALL OUT & FALL IN", standards: "Not graded; used to take the cadets out of a single file formation and return them to line formation.", score: null, isNonGraded: true },
      { command: "Right, FACE", standards: "Not graded; places the cadets in column formation.", score: null, isNonGraded: true },
      { command: "Forward, MARCH", standards: "1. Steps off on left foot. 2. Does not anticipate the command of execution.", score: null },
      { command: "Close, MARCH & Forward, MARCH (while marching)", standards: "1. The 2nd element takes up the half step following the command of execution. 2. The 1st element obtains close interval by pivoting 45 degrees to the right on the ball of the left foot, taking one 24-inch step (with coordinated armswing) toward the 2nd element, and then pivoting 45 degrees back to the left on the ball of the right foot. 1st element takes up the half step. 3. On the command Forward, MARCH, both elements resume a 24-inch step.", score: null },
      { command: "Extend, MARCH & Forward, MARCH (while marching)", standards: "The same procedures and steps used to obtain close interval are used, except the command is given on the left foot and the pivots are made on the right foot.", score: null },
      { command: "Change Step, MARCH", standards: "1. On MARCH, cadets take one 24-inch step with left foot. 2. In one count, cadets place ball of right foot alongside the heel of the left foot, pin their arms, and shift the weight of the body to the right foot. 3. Cadets then step off with the left foot in a full, 24-inch step, resuming coordinated armswing.", score: null },
      { command: "Column Left, MARCH & Forward, MARCH", standards: "1. In marching, turns 90 degrees to the left. 2. Takes up half step. 3. Resumes full 24-inch steps after Forward, MARCH.", score: null },
      { command: "Eyes, RIGHT & Ready, FRONT (while marching)", standards: "1. On RIGHT, all cadets except those on right flank smartly turn heads 45 degrees right. 2. On FRONT, heads are turned smartly back to front.", score: null },
      { command: "Flight, HALT", standards: "1. After the command HALT, takes one more 24-inch step. 2. Trailing foot is brought smartly alongside front foot. 3. Heels finish together, on line, with cadet at attention.", score: null },
      { command: "FALL OUT", standards: "Not graded.", score: null, isNonGraded: true },
    ]
  },
  {
    number: "WB",
    name: "Wright Brothers",
    category: 'Promotion',
    passingScore: 16,
    topic: "Part 2: Advanced Drill as an Element Leader. Given after the cadet passes Part 1, the Comprehensive Leadership Test.",
    conditions: "Form at least 6 cadets into a flight of 2 elements. Graded cadet will be 1st element leader.",
    movements: [
      { command: "FALL IN", standards: "1. Assumes the position of attention. 2. Raises left arm to establish interval for the flight.", score: null },
      { command: "Present, ARMS & Order, ARMS", standards: "1. Smartly raises right hand to right eyebrow, glasses, or bill of cap. Holds salute, slightly canted down. 2. Smoothly and smartly retraces path of arm down to position of attention.", score: null },
      { command: "Parade, REST", standards: "1. Moves left foot such that heels are about 12 inches apart. 2. Extends arms behind body and places right hand in palm of left hand. 3. Keeps head and eyes straight ahead; is immobile and silent.", score: null },
      { command: "Flight, ATTENTION", standards: "1. Stands and shows good posture; hands cupped on pant or skirt seam. 2. Remains immobile and silent.", score: null },
      { command: "Left Step, MARCH & Flight, HALT", standards: "1. Steps sideways to left via a series of 12-inch steps without dragging right foot. 2. After being commanded to halt, takes another step to the left and brings feet together.", score: null },
      { command: "Left, FACE", standards: "1. Pivots 90 degrees to the left on ball and heel. 2. Maintains upper body in position of attention.", score: null },
      { command: "About, FACE", standards: "1. Pivots 180 degrees to the right on ball and heel in 2 counts. 2. Maintains upper body in position of attention.", score: null },
      { command: "Forward, MARCH", standards: "1. Steps off with left foot. 2. Does not anticipate the command of execution.", score: null },
      { command: "Right Flank, MARCH", standards: "1. While marching, turns 90 degrees to the right. 2. Maintains proper dress, cover, interval, and distance. 3. Suspends armswing during pivot.", score: null },
      { command: "Left Flank, MARCH", standards: "1. While marching, turns 90 degrees to the left. 2. Maintains proper dress, cover, interval, and distance. 3. Suspends armswing during pivot.", score: null },
      { command: "Column Right, MARCH & Forward, MARCH", standards: "1. While marching, turns 90 degrees to the right via two 45-degree pivots. 2. Takes up half step at correct time and maintains until Forward, MARCH is called. 3. Maintains proper dress and interval.", score: null },
      { command: "To the Rear, MARCH", standards: "1. While marching, reverses direction smartly by pivoting 180 degrees to the right. 2. Takes half step, pivot, half step, full step; suspends armswing during pivot. 3. Maintains proper dress, cover, interval, and distance.", score: null },
      { command: "To the Rear, MARCH", standards: "Not graded; places the cadets in column formation.", score: null, isNonGraded: true },
      { command: "Column Left, MARCH & Forward, MARCH", standards: "1. In marching, turns 90 degrees to the left via one 90-degree pivot. 2. Takes up half step at correct time and maintains until Forward, MARCH is called. 3. Maintains proper dress and interval.", score: null },
      { command: "Change Step, MARCH", standards: "1. In one count, places the ball of the right foot alongside the heel of the left foot, then steps off with the left foot. 2. Maintains posture as if at attention; suspends armswing during maneuver.", score: null },
      { command: "Count Cadence, COUNT", standards: "1. Counts cadence for eight steps. 2. Does not shout; makes counts sharp and clear as heel strikes the ground.", score: null },
      { command: "Flight, HALT", standards: "1. Comes to a full stop in two counts. 2. Maintains position of attention.", score: null },
      { command: "Right, FACE", standards: "1. Pivots 90 degrees to the right on ball and heel. 2. Maintains upper body in position of attention. Note: CAPP 60-34 prints \"left\" here; Right, FACE pivots right, as in Achievement 1 #8.", score: null },
      { command: "Open Ranks, MARCH", standards: "1. 1st Element takes 3 steps forward. 2. Automatically executes Dress Right, DRESS once halted.", score: null },
      { command: "Ready, FRONT", standards: "1. Lowers arm with snap but without slapping the leg. 2. Turns head to front with snap.", score: null },
      { command: "Close Ranks, MARCH & FALL OUT", standards: "1. 1st Element stands fast at attention. 2. Breaks ranks to fall out; no specific method of dispersal is required.", score: null },
    ]
  },
  {
    number: 4,
    name: "Rickenbacker",
    category: 'Promotion',
    passingScore: 4,
    topic: "Drill of the Element as an Element Leader (not in ranks)",
    conditions: "Provide the cadet with a list of the commands shown below and allow the cadet to refer to them during the course of the test. Instruct the cadet to lead the element in drill, completing all commands in sequence. The element should consist of at least 3 cadets. Assign to the element cadets who are proficient in basic drill.",
    note: "The element's ability to perform the commands is NOT relevant to this test, only the cadet's ability to call commands properly is being evaluated.",
    commandSequence: [
      "1. FALL IN",
      "2. Dress Right, DRESS (check alignment)",
      "3. Ready, FRONT",
      "4. Right, FACE",
      "5. Left, FACE",
      "6. About, FACE",
      "7. Left, FACE",
      "8. Forward, MARCH",
      "9. Left Flank, MARCH",
      "10. Right Flank, MARCH",
      "11. To the Rear, MARCH",
      "12. Element, HALT",
      "13. FALL OUT"
    ],
    movements: [
      { 
        command: "Knowledge", 
        standards: "Calls commands on the correct foot (when the foot corresponding to the direction of movement strikes the ground)",
        score: null 
      },
      { 
        command: "Timing", 
        standards: "Calls commands of execution two steps after calling the preparatory commands",
        score: null 
      },
      { 
        command: "Voice", 
        standards: "1. Calls commands loud enough for the element to hear them. 2. Calls commands clear enough for the element to understand them. 3. Proper inflection (raising) used.",
        score: null 
      },
      { 
        command: "Bearing", 
        standards: "1. Calls commands decisively, with snap and a sense of \"Go!\". 2. Maintains good military bearing.",
        score: null 
      },
      { 
        command: "Overall Leadership", 
        standards: "1. Calls cadence or halts and restarts the element, if the cadets fall out of step or lose alignment. 2. Completes all assigned commands.",
        score: null 
      },
    ]
  },
  {
    number: 5,
    name: "",
    category: 'Promotion',
    passingScore: 16,
    topic: "Drill of the Flight as a Flight Sergeant",
    conditions: "Form at least 6 cadets into a flight of 2 elements. Assign to the flight cadets who are proficient in basic drill. Provide the cadet with a list of the commands shown below without the standards and allow the cadet to refer to them during the test. Instruct the cadet to lead the flight in drill, completing all commands in sequence.",
    note: "The cadet may add commands as necessary to navigate around obstacles or keep flight in drill area. Do not grade any additional commands. The flight's ability to perform the commands is NOT relevant to this test – only the cadet's ability to call commands properly is being evaluated.",
    movements: [
      { 
        command: "FALL IN", 
        standards: "1. Gives command from the position of attention. 2. Combined command given with steady inflection without a pause between words.",
        score: null 
      },
      { 
        command: "Dress Right, DRESS (check alignment)", 
        standards: "1. Proceeds to the right flank and directs individual cadets to move as needed. 2. Proceeds from element to element by facing in marching. 3. After checking 2nd element, faces in marching to the right, moves 3 paces forward of the front rank, halts, Faces left.",
        score: null 
      },
      { 
        command: "Ready, FRONT", 
        standards: "1. After giving command, resumes position 3 paces from and centered on the flight. 2. Command is clear and snaps.",
        score: null 
      },
      { 
        command: "Right, FACE", 
        standards: "Command is clear and snaps.",
        score: null 
      },
      { 
        command: "Forward, MARCH", 
        standards: "Command is clear and snaps.",
        score: null 
      },
      { 
        command: "Column Right, MARCH", 
        standards: "Preparatory: right foot. Execution: right foot.",
        score: null 
      },
      { 
        command: "Forward, MARCH", 
        standards: "Command is clear and snaps. Given on left foot.",
        score: null 
      },
      { 
        command: "Close, MARCH & Forward, MARCH", 
        standards: "1. Preparatory: right foot. Execution: right foot. 2. Preparatory: left foot. Execution: left foot.",
        score: null 
      },
      { 
        command: "Extend, MARCH & Forward, MARCH", 
        standards: "1. Preparatory: left foot. Execution: left foot. 2. Preparatory: left foot. Execution: left foot.",
        score: null 
      },
      { 
        command: "Change Step, MARCH", 
        standards: "Preparatory: right foot. Execution: right foot.",
        score: null 
      },
      { 
        command: "Count Cadence, COUNT", 
        standards: "1. Preparatory: left foot. Execution: left foot. 2. Preparatory command is given in one count, not spread out or sung.",
        score: null 
      },
      { 
        command: "Flight, HALT", 
        standards: "Command is clear and snaps.",
        score: null 
      },
      { 
        command: "Left Step, MARCH", 
        standards: "Command is clear and snaps.",
        score: null 
      },
      { 
        command: "Flight, HALT", 
        standards: "Preparatory: when heels are together. Execution: when heels are together.",
        score: null 
      },
      { 
        command: "Left, FACE", 
        standards: "Command is clear and snaps.",
        score: null 
      },
      { 
        command: "Open Ranks, MARCH (check alignment)", 
        standards: "1. At command of execution, take six steps backward and halt. Execute a face in marching 45 degrees to the left, halts next to 1st element leader facing the rear of the flight, and faces right. 2. Takes short side steps to check alignment without bending body. 3. Directs individual cadets to move as needed. 4. After checking 2nd element, faces in marching to the right, moves 3 paces forward of the front rank, halts, faces left.",
        score: null 
      },
      { 
        command: "Ready, FRONT", 
        standards: "1. After giving command, resumes position 3 paces from and centered on the flight. 2. Command is clear and snaps.",
        score: null 
      },
      { 
        command: "Close Ranks, MARCH", 
        standards: "Command is clear and snaps.",
        score: null 
      },
      { 
        command: "Right, FACE", 
        standards: "Not graded; used to position flight in column.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "Column of Files from the Right, Forward, MARCH", 
        standards: "1. Preparatory command is given without \"singing\", in one count. 2. Pauses between the preparatory command and command of execution to allow element leaders to give supplementary commands. 3. Command of execution is clear and snaps.",
        score: null 
      },
      { 
        command: "Flight, HALT", 
        standards: "Command is clear and snaps.",
        score: null 
      },
      { 
        command: "FALL OUT", 
        standards: "Combined command given in steady inflection without a pause between words.",
        score: null 
      },
    ]
  },
  {
    number: 6,
    name: "Doolittle",
    category: 'Promotion',
    passingScore: 4,
    topic: "Squadron Formations",
    conditions: "At least 3 additional cadets are needed to role play for this formation. Graded cadet will be the Squadron First Sergeant (Sq/CCF).\n• Alpha Flight Sergeant (plus additional cadets to constitute the flight, if available)\n• Bravo Flight Sergeant (plus additional cadets to constitute the flight, if available)\n• Squadron Commander (Sq/CC)\nInstruct the cadet to assume the role of first sergeant and assemble the \"squadron.\"",
    note: "The \"squadron's\" ability to perform the commands is NOT relevant to this test – only the cadet's ability to assemble the squadron is being evaluated. For flight reports, all cadets are present.",
    movements: [
      { 
        command: "Sq/CCF: FALL IN", 
        standards: "Positions self 9 paces away and centered from where flights are to be formed.",
        score: null 
      },
      { 
        command: "Sq/CCF: REPORT*", 
        standards: "1. After the flights are assembled, commands REPORT. 2. Receives report from Alpha's flight sergeant. 3. Turns head toward A Flight and returns salute. 4. Receives report from Bravo's flight sergeant. 5. Turns head toward B Flight and returns salute.",
        description: "For the purpose of this test, there's no need for the elements to report; the test evaluates the First Sergeant only.",
        score: null 
      },
      { 
        command: "Sq/CCF: POST", 
        standards: "1. Commands flight sergeants to post. 2. Faces about in anticipation of Sq/CC's arrival.",
        score: null 
      },
      { 
        command: "Sq/CC takes position", 
        standards: "1. Salutes. 2. Immediately reports attendance to Sq/CC: \"Sir/Ma'am, All Present or Accounted For\"",
        score: null 
      },
      { 
        command: "Sq/CC returns salute", 
        standards: "1. Drops salute. 2. Faces about. 3. Marches without pivots to a position behind the last cadet (not flight sergeant) in Bravo Flight's last element (simulate if necessary & verbally quiz on exact position).",
        score: null 
      },
    ]
  },
  {
    number: 7,
    name: "Goddard",
    answerKeys: [
      { src: keySquadronInLine, caption: "Problem #1 answer key: squadron in line, three flights in line (CAPP 60-34 p.18)" },
      { src: keyDrillSymbols, caption: "Drill symbols legend (CAPP 60-34 p.18)" },
      { src: keyChangeOfCommand, caption: "Problem #2 answer key: Change of Command, with points per step (CAPP 60-34 p.19)" },
    ],
    category: 'Promotion',
    passingScore: 16,
    topic: "Squadron Formations",
    conditions: "Problem #1 is completed on paper. No reference materials are permitted. 3 cadets in addition to the cadet being tested are needed to role play for Problem #2: Capt Curry (outgoing commander), Capt Arnold (incoming commander), Col Mitchell (wing commander). The tested cadet is the flag bearer, with the unit flag or a prop. Bring blank paper and a pen for the cadet.",
    note: "Passing Score: 80%. Must earn at least 16 of 20 possible points (Problem #1: 10, Problem #2: 10). If Arnold, Curry or Mitchell do a step incorrectly but the cadet immediately corrects them, the cadet receives the point for the step. CAPP 60-34 p.19: \"Grade each step and put the number of points where indicated.\" This app reads that as allowing 1 of 2 points on a 2-point step.",
    rubric: {
      title: "Problems #1 and #2",
      subtitle: "Diagram the Squadron in Line; Change of Command Ceremony",
      items: [
        {
          text: "Problem #1. Diagram how the Squadron should be formed in Line with three Flights in Line (5 points).",
          subItems: [
            "a. Your flights each have three elements with a total of 16 cadets plus Flight Commanders and Flight Sergeants.",
            "b. Include Guides and a Guidon Bearer.",
            "c. Officers are part of your formation."
          ]
        },
        { text: "Label the number of paces between each unit and their leaders. (3 points)" },
        { text: "Use proper drill symbols in your diagram. (2 points)" },
        {
          text: "Problem #2. Your Squadron Commander, Capt Curry, is relinquishing command to Capt Arnold. The Wing Commander, Col Mitchell, will preside over a formal Change of Command Ceremony. As the squadron's Cadet First Sergeant, instruct them on how the ceremony should proceed.",
          subItems: [
            "Position the four participants for the start of the ceremony. (2 points)",
            "Instruct the participants what maneuvers they'll execute: what each says and when, how the unit's flag comes into play, when salutes are rendered, and what drill movements are required. (8 points)"
          ]
        }
      ]
    },
    movements: [
      { 
        command: "1.a Correct locations for unit commanders", 
        standards: "Unit commanders (squadron and flight) are correctly positioned.",
        score: null,
        points: 1 
      },
      { 
        command: "1.b Correct locations for flight sergeants", 
        standards: "Flight sergeants are correctly positioned.",
        score: null,
        points: 1 
      },
      { 
        command: "1.c Correct locations for flight guides", 
        standards: "Flight guides are correctly positioned.",
        score: null,
        points: 1 
      },
      { 
        command: "1.d Correct location for squadron guidon bearer", 
        standards: "Squadron guidon bearer is correctly positioned.",
        score: null,
        points: 1 
      },
      { 
        command: "1.e Units arrayed in Line", 
        standards: "Units are next to one another, not behind one another as in Column.",
        score: null,
        points: 1 
      },
      { 
        command: "2.a Three paces between flights", 
        standards: "Correct interval (3 paces) between flights.",
        score: null,
        points: 1 
      },
      { 
        command: "2.b Flight commanders 6 paces in front", 
        standards: "Flight commanders are 6 paces in front of their flights.",
        score: null,
        points: 1 
      },
      { 
        command: "2.c Squadron commander 12 paces in front", 
        standards: "Squadron commander is 12 paces in front of the squadron.",
        score: null,
        points: 1 
      },
      { 
        command: "3.a At least half of the symbols are correct", 
        standards: "At least 50% of drill symbols used are correct.",
        score: null,
        points: 1 
      },
      { 
        command: "3.b At least 80% of the symbols are correct", 
        standards: "At least 80% of drill symbols used are correct.",
        score: null,
        points: 1 
      },
      { command: "2.1 Position participants", standards: "Participants form as shown, facing the audience: Arnold, Curry, Mitchell in a row; flag bearer behind them (CAPP 60-34 p.19).", score: null, points: 2 },
      { command: "2.2 Officers, CENTER", standards: "Flag bearer commands 'Officers, CENTER'. Arnold and Curry face right; Mitchell faces left.", score: null, points: 2 },
      { command: "2.3 Curry relinquishes command", standards: "Curry salutes Mitchell. Curry states 'Sir/Ma'am, I relinquish command.' Mitchell returns salute.", score: null, points: 1 },
      { command: "2.4 Flag to Mitchell", standards: "Curry takes flag from flag bearer and presents it to Mitchell.", score: null, points: 1 },
      { command: "2.5 Change places", standards: "Curry takes 1 step to right, 2 steps back, and 1 step to left. Simultaneously, Arnold takes 2 steps forward.", score: null, points: 1 },
      { command: "2.6 Flag to Arnold", standards: "Mitchell presents flag to Arnold, who passes it to flag bearer.", score: null, points: 1 },
      { command: "2.7 Arnold assumes command", standards: "Arnold salutes Mitchell. Arnold states 'Sir/Ma'am, I assume command.' Mitchell returns salute.", score: null, points: 1 },
      { command: "2.8 Officers, POST", standards: "Flag bearer commands 'Officers, POST'. All 3 officers face forward.", score: null, points: 1 },
    ]
  },
  {
    number: 8,
    name: "Armstrong",
    category: 'Promotion',
    passingScore: 13,
    topic: "Squadron Drill",
    conditions: "At least two cadets who can competently command a flight in a squadron formation are needed to role play this scenario. A better option is to also include at least two element leaders plus the flight sergeant for each flight. Provide the cadet with a list of the commands shown below without the standards, (see Attachment 1) and allow the cadet to refer to them during the course of the test. Instruct the cadet to form the squadron in line and lead the squadron in drill, completing all commands in sequence. The squadron should consist of 2 flights. If possible, assign to the flight cadets who are proficient in basic drill who can serve as element leaders, or even use two full flights. First sergeant and flight sergeants may drill their units from the side (not a simulated Pass in Review).",
    note: "Passing Score: 76%. Must perform at least 13 out of the 17 commands satisfactorily. The flights' ability to perform the commands is NOT relevant to this test, but the first sergeant cannot successfully march the squadron if the flight sergeants don't know how to give supplementary commands. You may have to teach or review basic squadron drill with them prior to conducting this test. If the cadet being tested gives the command correctly, mark them satisfactory even if the flight sergeants don't correctly give supplementary commands; or stop, review, and try again.",
    movements: [
      { 
        command: "FALL IN", 
        standards: "Not graded; used to form the squadron. Reporting is not necessary.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "AT EASE", 
        standards: "Gives combined command properly (no pause, no supplementary command)",
        score: null,
      },
      { 
        command: "Squadron, ATTENTION", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
      },
      { 
        command: "Right, FACE", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
      },
      { 
        command: "Forward, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
      },
      { 
        command: "Column Left, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary commands. 3. Preparatory: left foot Execution: left foot. 4. Not graded: 2nd Flight Sergeant gives subsequent command of Column Left, MARCH",
        score: null,
      },
      { 
        command: "Forward, MARCH", 
        standards: "1. Waits for 2nd flight to complete column movement. 2. Given on left foot. 3. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
      },
      { 
        command: "Column Right, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary commands. 3. Preparatory: right foot Execution: right foot. 4. Not graded: 2nd Flight Sergeant gives subsequent command of Column Right, MARCH",
        score: null,
      },
      { 
        command: "Forward, MARCH", 
        standards: "1. Waits for 2nd flight to complete column movement. 2. Given on left foot. 3. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
      },
      { 
        command: "Right Flank, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: right foot Execution: right foot",
        score: null,
      },
      { 
        command: "Left Flank, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: left foot Execution: left foot",
        score: null,
      },
      { 
        command: "To the Rear, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: right foot Execution: right foot",
        score: null,
      },
      { 
        command: "To the Rear, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: right foot Execution: right foot",
        score: null,
      },
      { 
        command: "Eyes, RIGHT", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: right foot Execution: right foot",
        score: null,
      },
      { 
        command: "Ready, FRONT", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: left foot Execution: left foot",
        score: null,
      },
      { 
        command: "Squadron, HALT", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
      },
      { 
        command: "Left, FACE", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
      },
      { 
        command: "DISMISSED", 
        standards: "Gives combined command properly (no pause, no supplementary command)",
        score: null,
      },
    ]
  },
];
