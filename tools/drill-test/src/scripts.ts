// Promotion scripts read by cadet staff at pinning ceremonies.
// Source: VT-014 cadet staff scripts (Oct 2026), edited for grammar and checked against
// CAP "Stripes to Diamonds" (gocivilairpatrol.com/programs/cadets/stripes-to-diamonds).
// Read-only reference. No cadet names or data.

export interface PromotionScript {
  id: string;
  phase: string;
  award: string;      // what is earned
  honoree?: string;   // as CAP lists it; omitted where CAP lists none
  grade: string;      // abbreviation
  gradeName: string;  // spelled out
  lines: string[];    // paragraphs, read in order
}

export const SCRIPT_PHASES = [
  'Phase I: The Learning Phase',
  'Phase II: The Leadership Phase',
  'Phase III: The Command Phase',
  'Phase IV: The Executive Phase',
  'Pinnacle',
];

const P1 = SCRIPT_PHASES[0], P2 = SCRIPT_PHASES[1], P3 = SCRIPT_PHASES[2], P4 = SCRIPT_PHASES[3], P5 = SCRIPT_PHASES[4];

export const PROMOTION_SCRIPTS: PromotionScript[] = [
  { id: 'a1', phase: P1, award: 'Achievement 1', honoree: 'John F. Curry', grade: 'C/Amn', gradeName: 'Cadet Airman', lines: [
    'Tonight, we recognize a cadet who has completed their first achievement in Civil Air Patrol. This marks the beginning of their journey in the cadet program. They have started learning the foundations of leadership, aerospace, physical fitness, and character development.',
    'Congratulations on earning Achievement 1 and becoming a Cadet Airman.' ] },
  { id: 'a2', phase: P1, award: 'Achievement 2', honoree: 'Hap Arnold', grade: 'C/A1C', gradeName: 'Cadet Airman First Class', lines: [
    'This achievement recognizes a cadet who has continued building their knowledge and understanding of the Civil Air Patrol cadet program. Through continued effort and participation, they have taken another step toward becoming a capable and responsible cadet.',
    'Congratulations on earning Achievement 2 and becoming a Cadet Airman First Class.' ] },
  { id: 'a3', phase: P1, award: 'Achievement 3', honoree: 'Mary Feik', grade: 'C/SrA', gradeName: 'Cadet Senior Airman', lines: [
    'This achievement recognizes a cadet who has continued to develop their leadership skills and knowledge. Their progress shows dedication to the program and a willingness to take on new challenges.',
    'Congratulations on earning Achievement 3 and becoming a Cadet Senior Airman.' ] },
  { id: 'wb', phase: P1, award: 'Wright Brothers Award', grade: 'C/SSgt', gradeName: 'Cadet Staff Sergeant', lines: [
    'The Wright Brothers Award is the first major milestone in the Civil Air Patrol cadet program. It marks the completion of Phase I, the Learning Phase.',
    'This award recognizes the hard work and dedication required to complete the first stage of the program. The cadet has built a foundation in leadership, aerospace education, physical fitness, and character development.',
    'Congratulations on earning the Wright Brothers Award and becoming a Cadet Staff Sergeant.' ] },

  { id: 'a4', phase: P2, award: 'Achievement 4', honoree: 'Eddie Rickenbacker', grade: 'C/TSgt', gradeName: 'Cadet Technical Sergeant', lines: [
    'This achievement marks the beginning of Phase II, the Leadership Phase. Cadets begin taking on greater responsibility and learning how to lead and support others.',
    'Congratulations on earning Achievement 4 and becoming a Cadet Technical Sergeant.' ] },
  { id: 'a5', phase: P2, award: 'Achievement 5', grade: 'C/MSgt', gradeName: 'Cadet Master Sergeant', lines: [
    'This achievement recognizes a cadet who has continued to strengthen their leadership abilities and knowledge of aerospace. They are building the skills needed to become a dependable leader and role model within the squadron.',
    'Congratulations on earning Achievement 5 and becoming a Cadet Master Sergeant.' ] },
  { id: 'a6', phase: P2, award: 'Achievement 6', honoree: 'Jimmy Doolittle', grade: 'C/SMSgt', gradeName: 'Cadet Senior Master Sergeant', lines: [
    'This achievement represents continued progress in leadership and personal development. The cadet has shown dedication to learning and is preparing to take on greater responsibilities within the squadron.',
    'Congratulations on earning Achievement 6 and becoming a Cadet Senior Master Sergeant.' ] },
  { id: 'a7', phase: P2, award: 'Achievement 7', honoree: 'Robert Goddard', grade: 'C/CMSgt', gradeName: 'Cadet Chief Master Sergeant', lines: [
    'This achievement recognizes a cadet who has continued to advance through the Leadership Phase. Their progress reflects commitment, discipline, and the ability to lead by example.',
    'Congratulations on earning Achievement 7 and becoming a Cadet Chief Master Sergeant.' ] },
  { id: 'a8', phase: P2, award: 'Achievement 8', honoree: 'Neil Armstrong', grade: 'C/CMSgt', gradeName: 'Cadet Chief Master Sergeant', lines: [
    'This achievement is the final step before the Mitchell Award. The cadet has continued to develop their leadership skills and demonstrate the dedication needed to complete Phase II.',
    'Congratulations on earning Achievement 8.' ] },
  { id: 'mitchell', phase: P2, award: 'General Billy Mitchell Award', grade: 'C/2d Lt', gradeName: 'Cadet Second Lieutenant', lines: [
    'The General Billy Mitchell Award is a major milestone in a cadet’s Civil Air Patrol career. It marks the completion of Phase II, the Leadership Phase.',
    'Earning this award requires dedication to leadership, aerospace education, physical fitness, and character development. It recognizes a cadet’s hard work and growth throughout the first two phases of the program.',
    'Congratulations on earning the General Billy Mitchell Award and becoming a Cadet Second Lieutenant.' ] },

  { id: 'a9', phase: P3, award: 'Achievement 9', grade: 'C/2d Lt', gradeName: 'Cadet Second Lieutenant', lines: [
    'This achievement marks the beginning of Phase III, the Command Phase. Cadets begin learning how to manage responsibilities and lead others through teamwork and effective communication.',
    'Congratulations on earning Achievement 9.' ] },
  { id: 'a10', phase: P3, award: 'Achievement 10', honoree: 'Willa Brown', grade: 'C/1st Lt', gradeName: 'Cadet First Lieutenant', lines: [
    'This achievement recognizes continued growth in leadership and command responsibilities. The cadet has shown dedication to developing the skills needed to guide and support others.',
    'Congratulations on earning Achievement 10 and becoming a Cadet First Lieutenant.' ] },
  { id: 'a11', phase: P3, award: 'Achievement 11', grade: 'C/1st Lt', gradeName: 'Cadet First Lieutenant', lines: [
    'This achievement is the final step before the Amelia Earhart Award. It represents continued commitment to leadership, aerospace education, and personal growth.',
    'Congratulations on earning Achievement 11.' ] },
  { id: 'earhart', phase: P3, award: 'Amelia Earhart Award', grade: 'C/Capt', gradeName: 'Cadet Captain', lines: [
    'The Amelia Earhart Award is a major milestone in the Civil Air Patrol cadet program. It marks the completion of Phase III, the Command Phase.',
    'Named after the pioneering aviator Amelia Earhart, this award recognizes cadets who have demonstrated strong leadership skills, dedication, and a commitment to the cadet program.',
    'Congratulations on earning the Amelia Earhart Award and becoming a Cadet Captain.' ] },

  { id: 'a12', phase: P4, award: 'Achievement 12', grade: 'C/Capt', gradeName: 'Cadet Captain', lines: [
    'This achievement marks the beginning of Phase IV, the Executive Phase. Cadets begin focusing on the larger responsibilities involved in managing and supporting squadron operations.',
    'Congratulations on earning Achievement 12.' ] },
  { id: 'a13', phase: P4, award: 'Achievement 13', grade: 'C/Capt', gradeName: 'Cadet Captain', lines: [
    'This achievement recognizes continued development as a leader. Cadets at this level are expected to use their experience to support the squadron and help develop other cadets.',
    'Congratulations on earning Achievement 13.' ] },
  { id: 'a14', phase: P4, award: 'Achievement 14', honoree: 'George Boyd', grade: 'C/Maj', gradeName: 'Cadet Major', lines: [
    'This achievement represents another important step in the Executive Phase. The cadet has continued to demonstrate leadership, responsibility, and dedication to the Civil Air Patrol mission.',
    'Congratulations on earning Achievement 14 and becoming a Cadet Major.' ] },
  { id: 'a15', phase: P4, award: 'Achievement 15', honoree: 'Sally Ride', grade: 'C/Maj', gradeName: 'Cadet Major', lines: [
    'This achievement recognizes a cadet who has continued to advance through the final phase of the cadet program. Their experience and commitment have helped prepare them for greater leadership responsibilities.',
    'Congratulations on earning Achievement 15.' ] },
  { id: 'a16', phase: P4, award: 'Achievement 16', grade: 'C/Maj', gradeName: 'Cadet Major', lines: [
    'This is the final achievement in the Civil Air Patrol cadet program. It represents the completion of all 16 achievements and the dedication required to reach this level.',
    'Congratulations on earning Achievement 16.' ] },
  { id: 'eaker', phase: P4, award: 'General Ira C. Eaker Award', grade: 'C/Lt Col', gradeName: 'Cadet Lieutenant Colonel', lines: [
    'The General Ira C. Eaker Award marks the completion of Phase IV, the Executive Phase, and all 16 achievements in the cadet program.',
    'This award represents years of dedication, hard work, and leadership development. Cadets who reach this milestone have demonstrated a strong commitment to the Civil Air Patrol mission and have gained experience in leading and supporting others.',
    'Congratulations on earning the General Ira C. Eaker Award and becoming a Cadet Lieutenant Colonel.' ] },

  { id: 'spaatz', phase: P5, award: 'General Carl A. Spaatz Award', grade: 'C/Col', gradeName: 'Cadet Colonel', lines: [
    'The General Carl A. Spaatz Award is the highest achievement a cadet can earn in Civil Air Patrol.',
    'Named after General Carl A. Spaatz, the first Chief of Staff of the United States Air Force, this award recognizes cadets who have completed all four phases of the cadet program and passed the required Spaatz examinations.',
    'Earning this award takes exceptional dedication, discipline, and perseverance. It represents the highest level of achievement in the Civil Air Patrol cadet program.',
    'Congratulations on earning the General Carl A. Spaatz Award and becoming a Cadet Colonel.' ] },
];

// Label shown under the title. Named achievements show the honoree. Unnamed ones go by their
// grade, or "Ghost" when the grade does not change from the previous promotion (squadron usage).
export const scriptLabel = (sc: PromotionScript): string => {
  const grade = `${sc.gradeName} (${sc.grade})`;
  if (sc.honoree) return `${sc.honoree} \u00b7 ${grade}`;
  const i = PROMOTION_SCRIPTS.indexOf(sc);
  const ghost = i > 0 && PROMOTION_SCRIPTS[i - 1].grade === sc.grade;
  return ghost ? `Ghost \u00b7 grade held: ${grade}` : grade;
};
