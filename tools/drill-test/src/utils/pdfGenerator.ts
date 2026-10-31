import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DrillTestSubmission, Achievement, CAP_COLORS, achTitle, pointsFor, retrainList } from '../constants';

export const generateDrillTestPDF = (submission: DrillTestSubmission, achievement: Achievement) => {
  const doc = new jsPDF();

  // Header: white page, title first, CAP subtitle, Ultramarine rule (matches the app and the Promotion Tracker)
  const BODY: [number, number, number] = [77, 77, 77];   // 70% black
  const title = achievement.number === 'WB' ? 'Wright Brothers Award'
    : achievement.name ? `Achievement ${achievement.number}: ${achievement.name}` : `Achievement ${achievement.number}`;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(CAP_COLORS.blue);
  doc.setFontSize(20);
  doc.text(title.toUpperCase(), 20, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...BODY);
  doc.text('Civil Air Patrol  |  CAPP 60-34, Drill & Ceremonies Practical Test (Sep 2024)', 20, 27);
  doc.setDrawColor(CAP_COLORS.blue);
  doc.setLineWidth(0.8);
  doc.line(20, 31, 190, 31);

  // Info Section
  const kv = (k: string, v: string, x: number, y: number) => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(...BODY); doc.text(k.toUpperCase(), x, y);
    doc.setFontSize(12); doc.setTextColor(0, 0, 0); doc.text(v, x, y + 5.5); doc.setFont('helvetica', 'normal');
  };
  kv('Cadet CAPID', submission.cadetCAPID, 20, 40);
  kv('Proctor CAPID', submission.proctorCAPID, 80, 40);
  kv('Date', submission.date, 140, 40);
  doc.setFontSize(10);
  doc.setTextColor(...BODY);

  // Topic & Conditions
  let currentY = 58;
  if (achievement.topic) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0); doc.text('Topic:', 20, currentY); doc.setTextColor(...BODY);
    doc.setFont('helvetica', 'normal');
    doc.text(achievement.topic, 35, currentY);
    currentY += 7;
  }
  if (achievement.conditions) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0); doc.text('Conditions:', 20, currentY); doc.setTextColor(...BODY);
    doc.setFont('helvetica', 'normal');
    const splitConditions = doc.splitTextToSize(achievement.conditions, 160);
    doc.text(splitConditions, 45, currentY);
    currentY += (splitConditions.length * 5) + 2;
  }

  const gradedMovements = achievement.movements.filter(m => !m.isNonGraded);
  const totalPossible = achievement.movements.some(m => m.points) 
    ? achievement.movements.reduce((acc, m) => acc + (m.points || 0), 0)
    : gradedMovements.length;

  const passCount = achievement.movements.reduce((acc, mov, idx) => acc + pointsFor(mov, submission.scores[idx]), 0);

  const isPassed = passCount >= achievement.passingScore;

  doc.setFontSize(14);
  doc.setTextColor(isPassed ? CAP_COLORS.blue : CAP_COLORS.red); // Ultramarine if pass, Scarlet if not
  doc.setFont('helvetica', 'bold');
  doc.text(`RESULT: ${isPassed ? 'PASS' : 'NOT YET'} (${passCount} of ${totalPossible})`, 105, currentY + 10, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...BODY);
  doc.text(`Required to pass: ${achievement.passingScore} of ${totalPossible} ${achievement.movements.some(m => m.points) ? 'points' : 'commands rated Satisfactory'}`, 105, currentY + 15, { align: 'center' });

  // Table
  let gradedCount = 0;
  const tableData = achievement.movements.map((m, index) => {
    if (!m.isNonGraded) gradedCount++;
    const displayNum = m.isNonGraded ? "" : gradedCount;
    
    return [
      displayNum,
      m.isNonGraded ? `${m.command} (not graded)` : m.command,
      { 
        content: m.standards || m.description || 'N/A',
        styles: { 
          fontSize: 7,
          fontStyle: (m.isNonGraded ? 'italic' : 'normal') as 'italic' | 'normal',
          textColor: (m.isNonGraded ? [107, 110, 110] : [77, 77, 77]) as [number, number, number]
        }
      },
      m.isNonGraded ? '-'
        : m.points ? `${pointsFor(m, submission.scores[index])} of ${m.points}`
        : submission.scores[index] === 'Pass' ? 'S' : submission.scores[index] === 'Fail' ? 'U' : '-'
    ];
  });

  autoTable(doc, {
    startY: currentY + 20,
    head: [['#', 'Command', 'Acceptable Standards', 'Score']],
    body: tableData,
    headStyles: { fillColor: [0, 20, 137], textColor: [255, 255, 255] }, // CAP Ultramarine
    bodyStyles: { textColor: [0, 0, 0] },
    alternateRowStyles: { fillColor: [245, 246, 252] }, // light Ultramarine tint
    tableLineColor: [158, 162, 162],
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 40 },
      2: { cellWidth: 102 },
      3: { cellWidth: 18 },
    },
    margin: { left: 20, right: 20 },
    styles: { overflow: 'linebreak', cellPadding: 2 },
    didParseCell: (data) => {
      // If it's a non-graded row, we can apply some styling
      const rowIndex = data.row.index;
      if (achievement.movements[rowIndex]?.isNonGraded) {
        data.cell.styles.fontStyle = 'italic';
        data.cell.styles.textColor = [107, 110, 110];
      }
    }
  });

  // Hotwash (AAR): commands to retrain (from the scores), then Sustain / Improve (proctor's words)
  let y = (doc as any).lastAutoTable.finalY + 10;
  const room = (h: number) => { if (y + h > 275) { doc.addPage(); y = 20; } };
  const heading = (t: string) => {
    room(12); doc.setTextColor(CAP_COLORS.blue); doc.setFont('helvetica', 'bold'); doc.setFontSize(12);
    doc.text(t, 20, y); y += 6; doc.setTextColor(0, 0, 0); doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  };
  const para = (t: string, x = 20, w = 170) => {
    const lines = doc.splitTextToSize(t, w); room(lines.length * 5 + 2); doc.text(lines, x, y); y += lines.length * 5 + 2;
  };
  heading('Hotwash (AAR)');
  const retrain = retrainList(achievement, submission.scores);
  doc.setFont('helvetica', 'bold'); para('Commands to retrain'); doc.setFont('helvetica', 'normal');
  if (!retrain.length) para('None. Every graded command was rated Satisfactory.', 25, 165);
  retrain.forEach(r => {
    doc.setFont('helvetica', 'bold'); para(`${r.command}${r.partial ? ' (1 of 2 points)' : ''}`, 25, 165);
    doc.setFont('helvetica', 'normal'); if (r.standards) para(r.standards, 30, 160);
  });
  y += 2;
  doc.setFont('helvetica', 'bold'); para('Sustain (what went well)'); doc.setFont('helvetica', 'normal'); para(submission.sustain, 25, 165);
  doc.setFont('helvetica', 'bold'); para('Improve (coaching point)'); doc.setFont('helvetica', 'normal'); para(submission.improve, 25, 165);

  // Footer
  room(20); y += 8;
  doc.setFontSize(10);
  doc.text('__________________________', 20, y);
  doc.text(`Proctor CAPID ${submission.proctorCAPID}`, 20, y + 5);
  
  doc.text('Civil Air Patrol | NCO Drill Evaluation', 105, 285, { align: 'center' });

  return doc;
};
