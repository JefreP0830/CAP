export interface DrillMovement {
  command: string;
  description?: string;
  standards?: string;
  score: 'Pass' | 'Fail' | null;
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
}

export interface DrillTestSubmission {
  achievementNumber: number | string;
  cadetCAPID: string;
  proctorCAPID: string;
  date: string;
  scores: Record<number, 'Pass' | 'Fail'>;
  squadron: string;
  alternateEmail?: string;
  hotwash: string;
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

export const CAP_COLORS = {
  blue: '#003366',
  red: '#CC0000',
  white: '#FFFFFF',
  silver: '#C0C0C0',
  gold: '#FFD700',
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
      { 
        command: "FALL IN", 
        standards: "1. Automatically executes Dress Right, DRESS. 2. Adjusts position to achieve proper dress. 3. Automatically executes Ready, FRONT. 4. Stands at position of attention.",
        score: null 
      },
      { 
        command: "Parade, REST", 
        standards: "1. Moves left foot such that heels are about 12-inches apart. 2. Legs straight but not locked. 3. Hands joined behind back, right over left, palms out.",
        score: null 
      },
      { 
        command: "Flight, ATTENTION", 
        standards: "Restorative action to return to attention.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "Present, ARMS", 
        standards: "1. Execute salute. 2. Hold until further command.",
        score: null 
      },
      { 
        command: "Order, ARMS", 
        standards: "1. Return hand smartly to side.",
        score: null 
      },
      { 
        command: "About, FACE", 
        standards: "1. 2 counts. 2. Right toe behind left heel. 3. 180° pivot on both feet.",
        score: null 
      },
      { 
        command: "About, FACE", 
        standards: "Restorative action to return to original front.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "Dress Right, DRESS", 
        standards: "1. Left arm horizontal, fingers extended and joined, palm down. 2. Head and eyes turned 45° to the right (except right flank). 3. Proper interval established.",
        score: null 
      },
      { 
        command: "Ready, FRONT", 
        standards: "1. Head and eyes snapped to the front. 2. Left arm snapped to the side. 3. Position of attention maintained.",
        score: null 
      },
      { 
        command: "Right, FACE", 
        standards: "1. 2 counts. 2. Pivot on right heel and ball of left foot. 3. 90° turn to the right.",
        score: null 
      },
      { 
        command: "COVER", 
        standards: "1. Align in column. 2. Each member (except first) aligns on the person in front. 3. 40-inch distance maintained.",
        score: null 
      },
      { 
        command: "Left, FACE", 
        standards: "Restorative action to return to original front.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "AT EASE", 
        standards: "1. Right foot stays in place. 2. Silent. 3. Relaxed but no talking.",
        score: null 
      },
      { 
        command: "Flight, ATTENTION", 
        standards: "1. Snaps to attention. 2. Heels together, feet at 45°. 3. Arms at sides, eyes front.",
        score: null 
      },
      { 
        command: "Hand, SALUTE", 
        standards: "1. Right hand to brow. 2. Fingers straight, palm slightly inward. 3. Upper arm horizontal.",
        score: null 
      },
      { 
        command: "Eyes, RIGHT", 
        standards: "1. Head and eyes turned 45° to the right (except right flank). 2. Alignment maintained.",
        score: null 
      },
      { 
        command: "Ready, FRONT", 
        standards: "1. Head and eyes snapped to the front. 2. Position of attention maintained.",
        score: null 
      },
      { 
        command: "FALL OUT", 
        standards: "1. Leave ranks. 2. Stay in immediate area.",
        score: null 
      },
    ]
  },
  {
    number: 2,
    name: "Arnold",
    category: 'Promotion',
    passingScore: 11,
    topic: "Basic Drill as a Flight Member",
    conditions: "Form at least 8 cadets as a flight (two squads of four). Test no more than 4 cadets at a time. Testing should occur on a flat, level surface.",
    movements: [
      { 
        command: "FALL IN", 
        standards: "Instruction to form the flight. Not graded.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "Right, FACE", 
        standards: "Instruction to face into column. Not graded.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "Forward, MARCH", 
        standards: "1. Step off with left foot. 2. 24-inch steps. 3. 100-120 bpm cadence. 4. Proper arm swing (6\" front, 3\" rear).",
        score: null 
      },
      { 
        command: "Double Time, MARCH", 
        standards: "1. Command given on either foot. 2. Step off with left foot. 3. 30-inch steps. 4. 180 bpm cadence. 5. Arms at 90-degree angle.",
        score: null 
      },
      { 
        command: "Quick Time, MARCH", 
        standards: "1. Command given as either foot strikes ground. 2. One more step in double time. 3. Resume 24-inch steps at 100-120 bpm. 4. Proper arm swing resumed.",
        score: null 
      },
      { 
        command: "Flight, HALT", 
        standards: "1. Command given on either foot. 2. One more step taken. 3. Heels brought together smartly. 4. Position of attention maintained.",
        score: null 
      },
      { 
        command: "Left, FACE", 
        standards: "Instruction to face into line. Not graded.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "Open Ranks, MARCH", 
        standards: "1. 1st rank takes 2 paces forward. 2. 2nd rank takes 1 pace forward. 3. 3rd rank stands fast. 4. 4th rank takes 2 paces backward. 5. All automatically execute Dress Right, DRESS.",
        score: null 
      },
      { 
        command: "Ready, FRONT", 
        standards: "1. Head and eyes snapped to the front. 2. Position of attention maintained.",
        score: null 
      },
      { 
        command: "Close Ranks, MARCH", 
        standards: "1. 1st rank stands fast. 2. 2nd rank takes 1 pace forward. 3. 3rd rank takes 2 paces forward. 4. 4th rank takes 4 paces forward.",
        score: null 
      },
      { 
        command: "Right Step, MARCH", 
        standards: "1. 12-inch steps. 2. Heels together between steps. 3. Upper body at attention. 4. Silent.",
        score: null 
      },
      { 
        command: "Flight, HALT", 
        standards: "1. Command given as heels come together. 2. One more step taken. 3. Position of attention maintained.",
        score: null 
      },
      { 
        command: "Right, FACE", 
        standards: "Instruction to face into column. Not graded.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "Forward, MARCH", 
        standards: "1. Step off with left foot. 2. 24-inch steps. 3. 100-120 bpm cadence.",
        score: null 
      },
      { 
        command: "Right Flank, MARCH", 
        standards: "1. Command given on right foot. 2. One more step taken. 3. Pivot 90 degrees to the right on ball of left foot. 4. Step off in new direction with right foot.",
        score: null 
      },
      { 
        command: "Left Flank, MARCH", 
        standards: "1. Command given on left foot. 2. One more step taken. 3. Pivot 90 degrees to the left on ball of right foot. 4. Step off in new direction with left foot.",
        score: null 
      },
      { 
        command: "Count Cadence, COUNT", 
        standards: "1. Command given as left foot strikes ground. 2. Cadence called for 8 steps (1, 2, 3, 4; 1, 2, 3, 4). 3. Cadence is sharp and loud.",
        score: null 
      },
      { 
        command: "To the Rear, MARCH", 
        standards: "1. Command given on right foot. 2. One more step taken. 3. Pivot 180 degrees to the right on balls of both feet. 4. Step off in new direction with left foot.",
        score: null 
      },
      { 
        command: "Flight, HALT", 
        standards: "1. Command given on either foot. 2. One more step taken. 3. Heels brought together smartly. 4. Position of attention maintained.",
        score: null 
      },
      { 
        command: "FALL OUT", 
        standards: "Instruction to dismiss the flight. Not graded.",
        score: null,
        isNonGraded: true
      },
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
      { 
        command: "At Close Interval, FALL IN", 
        standards: "1. Executes Dress Right, DRESS at close interval (left hand on hip). 2. Automatically executes Ready, FRONT. 3. Proper interval established (4 inches).",
        score: null 
      },
      { 
        command: "At Close Interval, Dress Right, DRESS & Ready, FRONT", 
        standards: "1. Left hand on hip, fingers joined and pointing down. 2. Head and eyes turned 45° to the right. 3. Snaps to front on Ready, FRONT.",
        score: null 
      },
      { 
        command: "FALL OUT", 
        standards: "Instruction to clear the area. Not graded.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "FALL IN", 
        standards: "Instruction to reform the flight. Not graded.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "Right, FACE", 
        standards: "Instruction to face into column. Not graded.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "Close, MARCH (while halted)", 
        standards: "1. Right squad stands fast. 2. Left squad takes 2 paces to the right. 3. Alignment and 4-inch interval maintained.",
        score: null 
      },
      { 
        command: "Extend, MARCH (while halted)", 
        standards: "1. Right squad stands fast. 2. Left squad takes 2 paces to the left. 3. Alignment and normal interval maintained.",
        score: null 
      },
      { 
        command: "Column of Files from the right, Column Right, MARCH", 
        standards: "1. Right squad leader commands Forward. 2. Left squad leader commands Stand Fast. 3. On MARCH, right squad moves out. 4. Left squad follows in trace.",
        score: null 
      },
      { 
        command: "Flight, HALT", 
        standards: "Instruction to stop the column. Not graded.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "FALL OUT & FALL IN", 
        standards: "Instruction to reform into standard flight formation. Not graded.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "Right, FACE", 
        standards: "Instruction to face into column. Not graded.",
        score: null,
        isNonGraded: true
      },
      { 
        command: "Forward, MARCH", 
        standards: "1. Step off with left foot. 2. 24-inch steps. 3. 100-120 bpm cadence.",
        score: null 
      },
      { 
        command: "Close, MARCH & Forward, MARCH (while marching)", 
        standards: "1. Command given on right foot. 2. Right squad takes half steps. 3. Left squad takes 45° turn to right, then 45° turn to left to close interval.",
        score: null 
      },
      { 
        command: "Extend, MARCH & Forward, MARCH (while marching)", 
        standards: "1. Command given on left foot. 2. Right squad takes half steps. 3. Left squad takes 45° turn to left, then 45° turn to right to open interval.",
        score: null 
      },
      { 
        command: "Change Step, MARCH", 
        standards: "1. Command given on right foot. 2. Take one more step with left foot. 3. Place ball of right foot near heel of left. 4. Step off again with left foot.",
        score: null 
      },
      { 
        command: "Column Left, MARCH & Forward, MARCH", 
        standards: "1. Command given on left foot. 2. Pivot on ball of right foot. 3. Leading rank pivots 90°. 4. Following ranks pivot at same point.",
        score: null 
      },
      { 
        command: "Eyes, RIGHT & Ready, FRONT (while marching)", 
        standards: "1. Command given on right foot. 2. Head/eyes turned 45° right (except right flank). 3. Ready, FRONT given on left foot.",
        score: null 
      },
      { 
        command: "Flight, HALT", 
        standards: "1. Command given on either foot. 2. One more step taken. 3. Heels brought together smartly.",
        score: null 
      },
      { 
        command: "FALL OUT", 
        standards: "Instruction to dismiss the flight. Not graded.",
        score: null,
        isNonGraded: true
      },
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
      { 
        command: "FALL IN", 
        standards: "1. Cadets form at normal interval. 2. Automatically execute Dress Right, DRESS and Ready, FRONT. 3. Position of attention maintained.",
        score: null 
      },
      { 
        command: "Present, ARMS & Order, ARMS", 
        standards: "1. Smart execution of salute. 2. Hand dropped smartly to side. 3. No slapping the leg.",
        score: null 
      },
      { 
        command: "Parade, REST", 
        standards: "1. Left foot moved 10 inches to left. 2. Hands placed behind back, right palm in left. 3. Silent and immobile.",
        score: null 
      },
      { 
        command: "Flight, ATTENTION", 
        standards: "1. Left foot moved smartly back to right. 2. Heels together at 45°. 3. Position of attention resumed.",
        score: null 
      },
      { 
        command: "Left Step, MARCH & Flight, HALT", 
        standards: "1. 12-inch steps to the left. 2. Heels together between steps. 3. Halt given as heels come together.",
        score: null 
      },
      { 
        command: "Left, FACE", 
        standards: "1. Pivot 90° to the left on left heel and ball of right foot. 2. Right foot brought smartly to the left.",
        score: null 
      },
      { 
        command: "About, FACE", 
        standards: "1. Ball of right foot placed half a foot-length behind and slightly left of left heel. 2. Pivot 180° to the right.",
        score: null 
      },
      { 
        command: "Forward, MARCH", 
        standards: "1. Step off with left foot. 2. 24-inch steps. 3. 100-120 bpm cadence.",
        score: null 
      },
      { 
        command: "Right Flank, MARCH", 
        standards: "1. Command given on right foot. 2. Pivot 90° right on ball of left foot. 3. Step off in new direction with right foot.",
        score: null 
      },
      { 
        command: "Left Flank, MARCH", 
        standards: "1. Command given on left foot. 2. Pivot 90° left on ball of right foot. 3. Step off in new direction with left foot.",
        score: null 
      },
      { 
        command: "Column Right, MARCH & Forward, MARCH", 
        standards: "1. Command given on right foot. 2. Leading rank pivots 90°. 3. Resume 24-inch steps on Forward, MARCH.",
        score: null 
      },
      { 
        command: "To the Rear, MARCH; To the Rear, MARCH", 
        standards: "1. Command given on right foot. 2. Pivot 180° right on balls of both feet. 3. Repeat for second turn.",
        score: null 
      },
      { 
        command: "Column Left, MARCH & Forward, MARCH", 
        standards: "1. Command given on left foot. 2. Leading rank pivots 90°. 3. Resume 24-inch steps on Forward, MARCH.",
        score: null 
      },
      { 
        command: "Change Step, MARCH", 
        standards: "1. Command given on right foot. 2. Ball of right foot placed near heel of left. 3. Step off again with left foot.",
        score: null 
      },
      { 
        command: "Count Cadence, COUNT", 
        standards: "1. Command given on left foot. 2. Cadence called for 8 steps. 3. Sharp and loud.",
        score: null 
      },
      { 
        command: "Flight, HALT", 
        standards: "1. Command given on either foot. 2. One more step taken. 3. Heels brought together smartly.",
        score: null 
      },
      { 
        command: "Right, FACE", 
        standards: "1. Pivot 90° to the right on right heel and ball of left foot. 2. Left foot brought smartly to the right.",
        score: null 
      },
      { 
        command: "Open Ranks, MARCH", 
        standards: "1. Ranks spread to required distance. 2. Automatic Dress Right, DRESS executed.",
        score: null 
      },
      { 
        command: "Ready, FRONT", 
        standards: "1. Head and eyes snapped to the front. 2. Position of attention maintained.",
        score: null 
      },
      { 
        command: "Close Ranks, MARCH & FALL OUT", 
        standards: "1. Ranks close to normal interval. 2. Flight dismissed smartly on FALL OUT.",
        score: null 
      },
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
    number: "7.1",
    name: "Goddard (Part 1)",
    category: 'Promotion',
    passingScore: 8,
    topic: "Squadron Formations",
    conditions: "Problem #1 is completed on paper. No reference materials are permitted. 3 cadets in addition to the cadet being tested are needed to role play for Problem #2",
    note: "Passing Score: 80%. Must perform at 21 out of 26 possible points (Combined with Part 2).",
    rubric: {
      title: "Problem #1",
      subtitle: "Diagram the Squadron in Line",
      items: [
        {
          text: "1. Diagram how the Squadron should be formed in Line with three Flights in Line (5 points).",
          subItems: [
            "a. Your flights each have three elements with a total of 16 cadets plus Flight Commanders and Flight Sergeants.",
            "b. Include Guides and a Guidon Bearer.",
            "c. Officers are part of your formation."
          ]
        },
        {
          text: "2. Label the number of paces between each unit and their leaders. (3 points)"
        },
        {
          text: "3. Use proper drill symbols in your diagram. (2 points)"
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
    ]
  },
  {
    number: "7.2",
    name: "Goddard (Part 2)",
    category: 'Promotion',
    passingScore: 13,
    topic: "Squadron Formations",
    conditions: "Problem #1 is completed on paper. No reference materials are permitted. 3 cadets in addition to the cadet being tested are needed to role play for Problem #2",
    note: "Passing Score: 80%. Must perform at 21 out of 26 possible points (Combined with Part 1).",
    rubric: {
      title: "Problem #2",
      subtitle: "Change of Command Ceremony",
      items: [
        {
          text: "Your Squadron Commander, Capt Curry, is relinquishing command to Capt Arnold. The Wing Commander, Col Mitchell, will preside over a formal Change of Command Ceremony. As the squadron's Cadet First Sergeant, they've asked you to instruct them on how the ceremony should proceed. For the purposes of this test, you'll need your unit flag (or some kind of prop you can pretend is a flag), plus three people to assist you by playing the following roles:",
          subItems: [
            "Capt Curry - Outgoing Commander",
            "Capt Arnold - Incoming Commander",
            "Col Mitchell - Wing Commander",
            "Yourself - Flag Bearer"
          ]
        },
        {
          text: "For this exercise, your tasks are as follows:"
        },
        {
          text: "1. Position the four participants listed above for the start of the Change of Command Ceremony. (2 points)"
        },
        {
          text: "2. Instruct the participants what maneuvers they'll execute. What does each say and when? How does the unit's flag come into play? When are salutes rendered and what drill movements are required? (8 points)"
        }
      ]
    },
    movements: [
      { command: "1.a", standards: "Participants form as shown facing audience", score: null, points: 1 },
      { command: "1.b", standards: "Flag Bearer commands 'Officers, CENTER'", score: null, points: 1 },
      { command: "1.c", standards: "Arnold & Curry face right", score: null, points: 1 },
      { command: "1.d", standards: "Mitchell faces left", score: null, points: 1 },
      { command: "2.a", standards: "Curry salutes Mitchell", score: null, points: 1 },
      { command: "2.b", standards: "Curry states 'Sir/Ma'am, I relinquish command'", score: null, points: 1 },
      { command: "2.c", standards: "Mitchell returns salute", score: null, points: 1 },
      { command: "2.d", standards: "Curry takes flag from Flag Bearer and presents it to Mitchell", score: null, points: 1 },
      { command: "2.e", standards: "Curry takes 1 step to right, 2 steps back, and 1 step to left", score: null, points: 1 },
      { command: "2.f", standards: "Simultaneously, Arnold takes 2 steps forward", score: null, points: 1 },
      { command: "3.a", standards: "Mitchell presents flag to Arnold, who passes it to Flag Bearer", score: null, points: 1 },
      { command: "3.b", standards: "Arnold salutes Mitchell", score: null, points: 1 },
      { command: "3.c", standards: "Arnold states 'Sir/Ma'am, I assume command'", score: null, points: 1 },
      { command: "3.d", standards: "Mitchell returns salute", score: null, points: 1 },
      { command: "4.a", standards: "Flag Bearer commands 'Officers, POST'", score: null, points: 1 },
      { command: "4.b", standards: "All 3 officers face forward", score: null, points: 1 },
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
        points: 1 
      },
      { 
        command: "Squadron, ATTENTION", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
        points: 1 
      },
      { 
        command: "Right, FACE", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
        points: 1 
      },
      { 
        command: "Forward, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
        points: 1 
      },
      { 
        command: "Column Left, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary commands. 3. Preparatory: left foot Execution: left foot. 4. Not graded: 2nd Flight Sergeant gives subsequent command of Column Left, MARCH",
        score: null,
        points: 1 
      },
      { 
        command: "Forward, MARCH", 
        standards: "1. Waits for 2nd flight to complete column movement. 2. Given on left foot. 3. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
        points: 1 
      },
      { 
        command: "Column Right, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary commands. 3. Preparatory: right foot Execution: right foot. 4. Not graded: 2nd Flight Sergeant gives subsequent command of Column Right, MARCH",
        score: null,
        points: 1 
      },
      { 
        command: "Forward, MARCH", 
        standards: "1. Waits for 2nd flight to complete column movement. 2. Given on left foot. 3. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
        points: 1 
      },
      { 
        command: "Right Flank, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: right foot Execution: right foot",
        score: null,
        points: 1 
      },
      { 
        command: "Left Flank, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: left foot Execution: left foot",
        score: null,
        points: 1 
      },
      { 
        command: "To the Rear, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: right foot Execution: right foot",
        score: null,
        points: 1 
      },
      { 
        command: "To the Rear, MARCH", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: right foot Execution: right foot",
        score: null,
        points: 1 
      },
      { 
        command: "Eyes, RIGHT", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: right foot Execution: right foot",
        score: null,
        points: 1 
      },
      { 
        command: "Ready, FRONT", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command. 3. Preparatory: left foot Execution: left foot",
        score: null,
        points: 1 
      },
      { 
        command: "Squadron, HALT", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
        points: 1 
      },
      { 
        command: "Left, FACE", 
        standards: "1. Command is clear and snaps. 2. Pauses after preparatory command for flight sergeants to give supplementary command",
        score: null,
        points: 1 
      },
      { 
        command: "DISMISSED", 
        standards: "Gives combined command properly (no pause, no supplementary command)",
        score: null,
        points: 1 
      },
    ]
  },

  // --- Advanced Training Library (CAPP 60-33) ---
  // Chapter 6 - Group Formations and Ceremonies
  {
    number: "6.1",
    name: "The Group in Formation",
    category: 'Advanced',
    passingScore: 4,
    longDescription: "CAPP 60-33 Section 6.1: Understanding the composition and positioning of a group in formation.",
    movements: [
      { command: "Commander's Post", description: "Group commander takes post 12 paces in front of the center of the group.", score: null },
      { command: "Staff's Post", description: "Staff forms in line 2 paces behind the commander.", score: null },
      { command: "Squadron Posts", description: "Squadron commanders take post 6 paces in front of their squadrons.", score: null },
      { command: "Alignment", description: "Squadrons are aligned with 6-pace intervals between them.", score: null },
    ]
  },
  {
    number: "6.2",
    name: "Composition of the Staff",
    category: 'Advanced',
    passingScore: 4,
    longDescription: "CAPP 60-33 Section 6.2: Proper positioning and roles of the group staff officers.",
    movements: [
      { command: "Adjutant's Position", description: "Adjutant is on the far right of the staff line.", score: null },
      { command: "Staff Alignment", description: "Staff members are 1 pace apart in a single rank.", score: null },
      { command: "Staff at Attention", description: "Staff maintains position of attention during the ceremony.", score: null },
      { command: "Staff Movements", description: "Staff moves in unison with the commander.", score: null },
    ]
  },
  {
    number: "6.3",
    name: "Definition and Purpose of Ceremonies",
    category: 'Advanced',
    passingScore: 3,
    longDescription: "CAPP 60-33 Section 6.3: Knowledge of ceremonial definitions and their underlying purposes.",
    movements: [
      { command: "Ceremony Definition", description: "Explains the difference between a review and a parade.", score: null },
      { command: "Purpose of Reviews", description: "States that reviews are for inspection or honoring individuals.", score: null },
      { command: "Purpose of Parades", description: "States that parades include a pass in review and publication of orders.", score: null },
    ]
  },
  {
    number: "6.4",
    name: "Forming the Group (Squadrons in Line)",
    category: 'Advanced',
    passingScore: 4,
    longDescription: "CAPP 60-33 Section 6.4: Procedures for forming the group with squadrons in line formation.",
    movements: [
      { command: "Adjutant's Call", description: "Adjutant takes post and signals the formation to begin.", score: null },
      { command: "Squadron Formation", description: "Squadrons form in line at the designated intervals.", score: null },
      { command: "Report of Commanders", description: "Squadron commanders report 'All Present or Accounted For'.", score: null },
      { command: "Adjutant's Post", description: "Adjutant moves to their post after receiving reports.", score: null },
    ]
  },
  {
    number: "6.5",
    name: "Forming the Group (Squadrons in Mass)",
    category: 'Advanced',
    passingScore: 4,
    longDescription: "CAPP 60-33 Section 6.5: Procedures for forming the group with squadrons in mass formation.",
    movements: [
      { command: "Adjutant's Call", description: "Adjutant takes post for mass formation setup.", score: null },
      { command: "Mass Formation", description: "Squadrons form in mass with 6-pace intervals.", score: null },
      { command: "Commander's Report", description: "Commanders report status to the adjutant.", score: null },
      { command: "Final Alignment", description: "Adjutant ensures the group is properly dressed and covered.", score: null },
    ]
  },
  {
    number: "6.6",
    name: "Dismissing the Group",
    category: 'Advanced',
    passingScore: 2,
    longDescription: "CAPP 60-33 Section 6.6: The formal procedure for dismissing the group.",
    movements: [
      { command: "Dismiss the Group", description: "Group commander directs squadron commanders to dismiss units.", score: null },
      { command: "Squadron Dismissal", description: "Squadron commanders salute and return to their units to dismiss.", score: null },
    ]
  },
  {
    number: "6.7",
    name: "Sequence of Parade (Squadrons in Line)",
    category: 'Advanced',
    passingScore: 8,
    longDescription: "CAPP 60-33 Section 6.7: Full sequence of a parade ceremony with squadrons in line.",
    movements: [
      { command: "Formation", description: "Group is formed and adjutant takes post.", score: null },
      { command: "Sound Off", description: "Band or drum corps marches across the front of the unit.", score: null },
      { command: "Presentation", description: "Unit is presented to the commander (Present Arms).", score: null },
      { command: "Manual of Arms", description: "Commander executes manual of arms with the unit.", score: null },
      { command: "Report", description: "Adjutant reports the unit to the commander.", score: null },
      { command: "Publication of Orders", description: "Adjutant reads official orders to the formation.", score: null },
      { command: "Officers Center", description: "Officers and guidon bearers march to the center.", score: null },
      { command: "Pass in Review", description: "Unit marches past the commander for review.", score: null },
    ]
  },
  {
    number: "6.8",
    name: "Sequence of Parade (Mass Formation)",
    category: 'Advanced',
    passingScore: 6,
    longDescription: "CAPP 60-33 Section 6.8: Full sequence of a parade ceremony with squadrons in mass formation.",
    movements: [
      { command: "Mass Formation", description: "Group is formed in mass formation.", score: null },
      { command: "Sound Off", description: "Ceremonial music is played.", score: null },
      { command: "Presentation", description: "Unit is presented to the commander.", score: null },
      { command: "Report", description: "Adjutant reports the unit status.", score: null },
      { command: "Publication of Orders", description: "Official orders are read to the massed unit.", score: null },
      { command: "Pass in Review", description: "Unit executes pass in review from mass formation.", score: null },
    ]
  },
  {
    number: "6.9",
    name: "Parade Ceremony (Squadron in Line)",
    category: 'Advanced',
    passingScore: 6,
    longDescription: "CAPP 60-33 Section 6.9: Sequence for a parade ceremony conducted at the squadron level.",
    movements: [
      { command: "Squadron Formation", description: "Squadron is formed in line.", score: null },
      { command: "Sound Off", description: "Ceremonial music or drum beats.", score: null },
      { command: "Presentation", description: "Squadron is presented to the commander.", score: null },
      { command: "Manual of Arms", description: "Manual of arms is executed.", score: null },
      { command: "Report", description: "First sergeant or adjutant reports.", score: null },
      { command: "Pass in Review", description: "Squadron marches past the commander.", score: null },
    ]
  },
  {
    number: "6.10",
    name: "Reveille",
    category: 'Advanced',
    passingScore: 4,
    longDescription: "CAPP 60-33 Section 6.10: The morning ceremony for raising the flag.",
    movements: [
      { command: "Unit Formation", description: "Unit is formed at the position of attention.", score: null },
      { command: "Adjutant's Call", description: "Signals the start of the ceremony.", score: null },
      { command: "Sounding Reveille", description: "Bugle call is played.", score: null },
      { command: "Present Arms", description: "Unit salutes as the flag is raised.", score: null },
    ]
  },
  {
    number: "6.11",
    name: "Events Accompanying Flag Raising",
    category: 'Advanced',
    passingScore: 3,
    longDescription: "CAPP 60-33 Section 6.11: Specific actions during the raising of the flag.",
    movements: [
      { command: "To the Colors", description: "Music played during flag raising.", score: null },
      { command: "Raising the Flag", description: "Flag is hoisted briskly to the peak.", score: null },
      { command: "Order Arms", description: "Unit returns to attention after flag is at peak.", score: null },
    ]
  },
  {
    number: "6.12",
    name: "Raising the Flag",
    category: 'Advanced',
    passingScore: 3,
    longDescription: "CAPP 60-33 Section 6.12: Detailed procedures for the flag detail.",
    movements: [
      { command: "Detail Post", description: "Flag detail moves to the flagstaff.", score: null },
      { command: "Hoisting", description: "Flag is attached and hoisted briskly.", score: null },
      { command: "Securing Halyard", description: "Halyard is secured to the cleat.", score: null },
    ]
  },
  {
    number: "6.13",
    name: "Retreat Ceremony",
    category: 'Advanced',
    passingScore: 3,
    longDescription: "CAPP 60-33 Section 6.13: The evening ceremony for lowering the flag.",
    movements: [
      { command: "Unit Formation", description: "Unit is formed at parade rest.", score: null },
      { command: "Sounding Retreat", description: "Bugle call is played.", score: null },
      { command: "Present Arms", description: "Unit salutes during the National Anthem.", score: null },
    ]
  },
  {
    number: "6.14",
    name: "Events Accompanying Retreat",
    category: 'Advanced',
    passingScore: 3,
    longDescription: "CAPP 60-33 Section 6.14: Specific actions during the lowering of the flag.",
    movements: [
      { command: "National Anthem", description: "Music played during flag lowering.", score: null },
      { command: "Lowering the Flag", description: "Flag is lowered slowly and ceremoniously.", score: null },
      { command: "Order Arms", description: "Unit returns to attention after flag is lowered.", score: null },
    ]
  },
  {
    number: "6.15",
    name: "Lowering the Flag",
    category: 'Advanced',
    passingScore: 3,
    longDescription: "CAPP 60-33 Section 6.15: Detailed procedures for the flag detail during lowering.",
    movements: [
      { command: "Detail Post", description: "Detail moves to flagstaff and unfastens halyard.", score: null },
      { command: "Lowering", description: "Flag is lowered slowly; detail ensures it doesn't touch ground.", score: null },
      { command: "Folding", description: "Flag is folded into a triangular shape.", score: null },
    ]
  },
  {
    number: "6.16",
    name: "Change of Command",
    category: 'Advanced',
    passingScore: 5,
    longDescription: "CAPP 60-33 Section 6.16: The formal transfer of authority between commanders.",
    movements: [
      { command: "Formation", description: "Unit is formed with official party in place.", score: null },
      { command: "Presentation", description: "Unit is presented to the official party.", score: null },
      { command: "Publication of Orders", description: "Official orders are read.", score: null },
      { command: "Transfer of Colors", description: "Outgoing commander passes colors to incoming commander.", score: null },
      { command: "Assumption of Command", description: "Incoming commander accepts colors and command.", score: null },
    ]
  },

  // Chapter 7 - Color Guard
  {
    number: "7.1",
    name: "The Color Guard",
    category: 'Advanced',
    passingScore: 3,
    longDescription: "CAPP 60-33 Section 7.1: Composition and basic requirements of the color guard.",
    movements: [
      { command: "Composition", description: "Guard consists of 4 members: 2 guards, 2 color bearers.", score: null },
      { command: "Equipment", description: "Guards carry rifles; bearers carry flags.", score: null },
      { command: "Positions", description: "National colors on the right; organizational on the left.", score: null },
    ]
  },
  {
    number: "7.2",
    name: "Manual of the Colors",
    category: 'Advanced',
    passingScore: 4,
    longDescription: "CAPP 60-33 Section 7.2: Graded movements for the color bearers.",
    movements: [
      { command: "Order Colors", description: "Ferrule of the staff on the ground near right toe.", score: null },
      { command: "Carry Colors", description: "Staff in the socket of the sling; held with right hand.", score: null },
      { command: "Present Colors", description: "Organizational colors lowered; national colors remain upright.", score: null },
      { command: "Eyes Right", description: "Bearers turn head/eyes (except National bearer).", score: null },
    ]
  },
  {
    number: "7.3",
    name: "Manual of Arms (Color Guard)",
    category: 'Advanced',
    passingScore: 4,
    longDescription: "CAPP 60-33 Section 7.3: Graded rifle movements for the color guards.",
    movements: [
      { command: "Order Arms", description: "Rifle butt on the ground near right toe.", score: null },
      { command: "Right/Left Shoulder Arms", description: "Rifle carried on the shoulder away from the colors.", score: null },
      { command: "Present Arms", description: "Rifle held vertically in front of the center of the body.", score: null },
      { command: "Port Arms", description: "Rifle held diagonally across the body.", score: null },
    ]
  },
  {
    number: "7.4",
    name: "Stationary Movements (Color Guard)",
    category: 'Advanced',
    passingScore: 4,
    longDescription: "CAPP 60-33 Section 7.4: Graded stationary movements for the entire guard.",
    movements: [
      { command: "Attention", description: "Standard position of attention for all members.", score: null },
      { command: "Parade Rest", description: "Standard parade rest; bearers maintain staff position.", score: null },
      { command: "About Face", description: "Guards execute about face; bearers remain at attention.", score: null },
      { command: "Right/Left Face", description: "Guards execute face; bearers remain at attention.", score: null },
    ]
  },
  {
    number: "7.5",
    name: "Marching (Color Guard)",
    category: 'Advanced',
    passingScore: 4,
    longDescription: "CAPP 60-33 Section 7.5: Graded marching movements for the color guard.",
    movements: [
      { command: "Forward March", description: "Step off with left foot; maintain alignment.", score: null },
      { command: "Halt", description: "Standard halt in two counts.", score: null },
      { command: "Right/Left Wheel", description: "Guard pivots as a unit around the inner member.", score: null },
      { command: "Colors Reverse", description: "Guard executes a 180-degree turn as a unit.", score: null },
    ]
  },
  {
    number: "7.6",
    name: "Innovative Drill",
    category: 'Advanced',
    passingScore: 2,
    longDescription: "CAPP 60-33 Section 7.6: Understanding the limits and safety of innovative drill.",
    movements: [
      { command: "Safety Check", description: "Ensures no dangerous movements or equipment handling.", score: null },
      { command: "Professionalism", description: "Ensures movements maintain the dignity of the colors.", score: null },
    ]
  },
  {
    number: "7.7",
    name: "Presenting the Colors",
    category: 'Advanced',
    passingScore: 4,
    longDescription: "CAPP 60-33 Section 7.7: Sequence for presenting colors at an event.",
    movements: [
      { command: "Approach", description: "Guard marches to the designated position.", score: null },
      { command: "Present Colors", description: "Execution of the present colors command.", score: null },
      { command: "Order Colors", description: "Return to the carry or order position.", score: null },
      { command: "Departure", description: "Guard marches away from the presentation area.", score: null },
    ]
  },
  {
    number: "7.8",
    name: "Posting and Retrieving the Colors",
    category: 'Advanced',
    passingScore: 4,
    longDescription: "CAPP 60-33 Section 7.8: Sequence for posting and retrieving colors in stands.",
    movements: [
      { command: "Approach to Stands", description: "Guard marches to the flag stands.", score: null },
      { command: "Posting", description: "Bearers place flags in stands simultaneously.", score: null },
      { command: "Salute", description: "Guards present arms; bearers salute.", score: null },
      { command: "Retrieval", description: "Bearers remove flags from stands simultaneously.", score: null },
    ]
  }
];
