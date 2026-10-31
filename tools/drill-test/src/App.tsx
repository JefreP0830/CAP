import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardCheck, 
  User, 
  Shield, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Download,
  AlertCircle,
  Menu,
  LogOut
} from 'lucide-react';
import { Achievement, FALLBACK_ACHIEVEMENTS, CAP_COLORS, DrillTestSubmission, achLabel, achTitle } from './constants';
import { generateDrillTestPDF } from './utils/pdfGenerator';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [step, setStep] = useState<'select' | 'form' | 'success'>('select');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [cadetCAPID, setCadetCAPID] = useState('');
  const [proctorCAPID, setProctorCAPID] = useState('');
  const [squadronID, setSquadronID] = useState(() => localStorage.getItem('cap_squadron_id') || '');
  const [alternateEmail, setAlternateEmail] = useState(() => localStorage.getItem('cap_alternate_email') || '');
  const [hotwash, setHotwash] = useState('');
  const [scores, setScores] = useState<Record<number, 'Pass' | 'Fail'>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'Promotion' | 'Advanced'>('Promotion');
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Persist squadron and email
  useEffect(() => {
    localStorage.setItem('cap_squadron_id', squadronID);
  }, [squadronID]);

  useEffect(() => {
    localStorage.setItem('cap_alternate_email', alternateEmail);
  }, [alternateEmail]);

  const handleSelectAchievement = (ach: Achievement) => {
    setSelectedAchievement(ach);
    setScores({});
    setHotwash('');
    setShowValidationErrors(false);
    setStep('form');
  };

  const handleScoreChange = (index: number, score: 'Pass' | 'Fail') => {
    setScores(prev => ({ ...prev, [index]: score }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidationErrors(true);

    if (!cadetCAPID.trim() || !proctorCAPID.trim()) {
      alert("Missing required information: Cadet and Proctor CAPIDs are mandatory.");
      return;
    }

    if (!selectedAchievement) return;
    
    const allScored = selectedAchievement.movements.every((move, i) => move.isNonGraded || scores[i]);
    if (!allScored) {
      alert("Please score all graded movements before submitting.");
      return;
    }

    if (!hotwash.trim()) {
      alert("Hotwash (AAR) feedback is mandatory.");
      return;
    }

    setIsSubmitting(true);
    
    const submission: DrillTestSubmission = {
      achievementNumber: selectedAchievement.number,
      cadetCAPID,
      proctorCAPID,
      date: new Date().toLocaleDateString(),
      scores,
      squadron: squadronID,
      alternateEmail: alternateEmail.trim() || undefined,
      hotwash,
      category: selectedAchievement.category
    };

    try {
      const doc = generateDrillTestPDF(submission, selectedAchievement);
      const fileName = `${selectedAchievement.category}_${selectedAchievement.name || selectedAchievement.number}_${cadetCAPID}.pdf`;
      
      // Generate the PDF as a Blob
      const pdfBlob = doc.output('blob');
      const file = new File([pdfBlob], fileName, { type: 'application/pdf' });

      // Check if the browser supports the Share API (most modern mobile browsers do)
      if (navigator.share && navigator.canShare({ files: [file] })) {
        let shareText = `Completed ${selectedAchievement.category} Drill for Candidate ${cadetCAPID}. Proctored by ${proctorCAPID}.`;
        if (submission.alternateEmail) {
          shareText += `\n\nIntended for: ${submission.alternateEmail}`;
        }

        await navigator.share({
          files: [file],
          title: `${selectedAchievement.category}: ${selectedAchievement.name || selectedAchievement.number} - ${cadetCAPID}`,
          text: shareText,
        });
      } else {
        // Fallback for desktop or older browsers
        doc.save(fileName);
        alert("PDF downloaded. Please manually email or upload it to the unit folder.");
      }

      setStep('success');
    } catch (error) {
      console.error("Sharing failed", error);
      // If sharing is cancelled or fails, we still allow them to download
      const doc = generateDrillTestPDF(submission, selectedAchievement);
      doc.save(`${selectedAchievement.category}_${selectedAchievement.name || selectedAchievement.number}_${cadetCAPID}.pdf`);
      setStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep('select');
    setSelectedAchievement(null);
    setCadetCAPID('');
    setProctorCAPID('');
    // Squadron and Email are retained as per user preference
    setHotwash('');
    setScores({});
    setShowValidationErrors(false);
  };

  const gradedMovementsCount = selectedAchievement 
    ? selectedAchievement.movements.filter(m => !m.isNonGraded).length 
    : 0;

  const passCount = selectedAchievement 
    ? selectedAchievement.movements.reduce((acc, mov, idx) => {
        if (!mov.isNonGraded && scores[idx] === 'Pass') {
          return acc + (mov.points || 1);
        }
        return acc;
      }, 0)
    : 0;
  const isPassing = selectedAchievement ? passCount >= selectedAchievement.passingScore : false;

  const filteredAchievements = FALLBACK_ACHIEVEMENTS.filter(a => a.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-cap-blue/10">
      {/* Header */}
      <header className="bg-cap-blue text-white p-6 shadow-2xl sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-2xl mx-auto flex items-center gap-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cap-gold to-white/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src="https://www.gocivilairpatrol.com/static/cms/images/cap_logo_v.png" 
              alt="CAP V Logo" 
              className="relative h-16 w-auto object-contain brightness-0 invert drop-shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Civil_Air_Patrol_logo.svg/1200px-Civil_Air_Patrol_logo.svg.png";
              }}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <h1 className="font-title font-bold text-3xl sm:text-4xl leading-none tracking-tight mb-1 drop-shadow-sm">CAP DRILL EVALUATOR</h1>
            <div className="space-y-0.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] leading-tight text-white/80">CIVIL AIR PATROL</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.1em] leading-tight text-white/50 pt-0.5">v2026.07.12</p>
            </div>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-95 self-center bg-white/5 border border-white/10"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto overflow-hidden bg-[#002244] rounded-b-xl mt-2"
            >
              <div className="p-4 space-y-2">
                <button 
                  onClick={() => { reset(); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg flex items-center gap-3 text-sm font-bold uppercase tracking-wider"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  Main Menu / Home
                </button>
                <button 
                  onClick={() => { 
                    window.open('https://www.gocivilairpatrol.com/programs/cadets/stripes-to-diamonds/drill-and-ceremonies-resources', '_blank');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg flex items-center gap-3 text-sm font-bold uppercase tracking-wider"
                >
                  <FileText className="w-4 h-4" />
                  CAP Drill Resources
                </button>
                <div className="h-px bg-white/10 my-2" />
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-rose-400"
                >
                  <LogOut className="w-4 h-4" />
                  Close Menu
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-2xl mx-auto p-4 pb-24">
        <AnimatePresence mode="wait">
          {step === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="card p-6">
                <h2 className="font-title font-bold text-xl mb-4 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-cap-blue" />
                  Drill Evaluation
                </h2>
                
                {/* Tab Switcher */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
                  <button
                    onClick={() => setActiveTab('Promotion')}
                    className={cn(
                      "flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all",
                      activeTab === 'Promotion' 
                        ? "bg-white text-cap-blue shadow-md scale-[1.02]" 
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Promotion Tests
                  </button>
                  <button
                    onClick={() => setActiveTab('Advanced')}
                    className={cn(
                      "flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all",
                      activeTab === 'Advanced' 
                        ? "bg-white text-cap-blue shadow-md scale-[1.02]" 
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Advanced Training
                  </button>
                </div>
              </div>

              <div className="grid gap-3">
                {filteredAchievements.map((ach) => (
                  <button
                    key={ach.number}
                    onClick={() => handleSelectAchievement(ach)}
                    className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between hover:border-cap-blue hover:shadow-xl hover:scale-[1.01] transition-all text-left active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-cap-blue group-hover:bg-cap-blue group-hover:text-white transition-all text-sm shadow-inner">
                        {ach.number}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 group-hover:text-cap-blue transition-colors">{ach.name || ach.topic}</h3>
                        <p className="text-xs font-medium text-slate-400">
                          {achLabel(ach)} • Pass: {ach.passingScore}/{ach.movements.filter(m => !m.isNonGraded).length}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-cap-blue group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'form' && selectedAchievement && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button 
                onClick={() => setStep('select')}
                className="text-sm text-cap-blue font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform group"
              >
                <span className="bg-cap-blue/5 p-2 rounded-lg group-hover:bg-cap-blue/10 transition-colors">←</span>
                Back to Achievements
              </button>

              <div className="card p-6 space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="font-title font-bold text-3xl tracking-tight text-slate-900 leading-tight">
                      {achTitle(selectedAchievement)}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">{selectedAchievement.category === 'Promotion' ? 'Drill Performance Test' : 'Advanced Training Evaluation'}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="h-1 w-12 bg-cap-blue rounded-full" />
                      <p className="text-xs font-black text-cap-blue uppercase tracking-widest">
                        Passing Requirement: {selectedAchievement.passingScore} of {selectedAchievement.movements.some(m => m.points) ? Number(selectedAchievement.movements.reduce((acc, m) => acc + (m.points || 0), 0).toFixed(2)) + ' points' : gradedMovementsCount + ' movements'}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] shadow-sm whitespace-nowrap",
                    isPassing ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                  )}>
                    {isPassing ? 'PASSING' : 'FAILING'} ({Number(passCount.toFixed(2))}/{selectedAchievement.movements.some(m => m.points) ? Number(selectedAchievement.movements.reduce((acc, m) => acc + (m.points || 0), 0).toFixed(2)) : gradedMovementsCount})
                  </div>
                </div>

                {/* Topic, Conditions, Note & Sequence at the top */}
                {(selectedAchievement.topic || selectedAchievement.conditions || selectedAchievement.note || selectedAchievement.commandSequence) && (
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    {selectedAchievement.topic && (
                      <p className="text-xs text-slate-700">
                        <span className="font-black uppercase tracking-wider text-cap-blue mr-2 text-[10px]">Topic:</span>
                        {selectedAchievement.topic}
                      </p>
                    )}
                    {selectedAchievement.conditions && (
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <span className="font-black uppercase tracking-wider text-cap-blue mr-2 text-[10px]">Conditions:</span>
                        {selectedAchievement.conditions}
                      </p>
                    )}
                    {selectedAchievement.note && (
                      <p className="text-xs text-rose-600 font-medium leading-relaxed italic">
                        <span className="font-black uppercase tracking-wider text-rose-700 not-italic mr-2 text-[10px]">Note:</span>
                        {selectedAchievement.note}
                      </p>
                    )}
                    {selectedAchievement.commandSequence && (
                      <div className="pt-3 border-t border-slate-200">
                        <p className="text-[10px] font-black uppercase tracking-widest text-cap-blue mb-3">Command Sequence (Reference List)</p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                          {selectedAchievement.commandSequence.map((cmd, i) => (
                            <p key={i} className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
                              <span className="w-4 h-4 rounded bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-600">{i + 1}</span>
                              {cmd}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedAchievement.images && (
                      <div className="pt-3 border-t border-slate-200 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-cap-blue mb-3">Reference Diagrams</p>
                        <div className="grid gap-4">
                          {selectedAchievement.images.map((img, i) => (
                            <div key={i} className="space-y-2">
                              <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <img 
                                  src={img.url} 
                                  alt={img.caption} 
                                  className="w-full h-auto rounded-xl object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <p className="text-[10px] text-slate-400 font-medium text-center italic">{img.caption}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedAchievement.longDescription && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-600 italic leading-relaxed">{selectedAchievement.longDescription}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Candidate CAPID</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="123456"
                        value={cadetCAPID}
                        onChange={(e) => setCadetCAPID(e.target.value.replace(/\D/g, ''))}
                        className={cn(
                          "w-full bg-slate-50 border-2 py-3 pl-11 pr-4 rounded-xl font-bold text-slate-900 focus:bg-white transition-all outline-none",
                          showValidationErrors && !cadetCAPID.trim() ? "border-rose-200 focus:border-rose-400" : "border-slate-100 focus:border-cap-blue"
                        )}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Proctor CAPID</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="654321"
                        value={proctorCAPID}
                        onChange={(e) => setProctorCAPID(e.target.value.replace(/\D/g, ''))}
                        className={cn(
                          "w-full bg-slate-50 border-2 py-3 pl-11 pr-4 rounded-xl font-bold text-slate-900 focus:bg-white transition-all outline-none",
                          showValidationErrors && !proctorCAPID.trim() ? "border-rose-200 focus:border-rose-400" : "border-slate-100 focus:border-cap-blue"
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unit ID</label>
                    <div className="relative">
                      <Menu className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. PCR-CA-116"
                        value={squadronID}
                        onChange={(e) => setSquadronID(e.target.value.toUpperCase())}
                        className={cn(
                          "w-full bg-slate-50 border-2 py-3 pl-11 pr-4 rounded-xl font-bold text-slate-900 focus:bg-white transition-all outline-none",
                          showValidationErrors && !squadronID.trim() ? "border-rose-200 focus:border-rose-400" : "border-slate-100 focus:border-cap-blue"
                        )}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Alternate Results Email (Optional)</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="e.g. commander@cap.gov"
                        value={alternateEmail}
                        onChange={(e) => setAlternateEmail(e.target.value)}
                        className="w-full bg-slate-50 border-2 py-3 pl-11 pr-4 rounded-xl font-bold text-slate-900 border-slate-100 focus:border-cap-blue focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {selectedAchievement.rubric && (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 mb-6">
                    <div className="space-y-1">
                      <h3 className="text-[#003366] font-bold text-lg">{selectedAchievement.rubric.title}</h3>
                      <p className="text-slate-700 font-semibold">{selectedAchievement.rubric.subtitle}</p>
                    </div>
                    <div className="space-y-4">
                      {selectedAchievement.rubric.items.map((item, i) => (
                        <div key={i} className="space-y-2">
                          <p className="text-sm text-slate-800">{item.text}</p>
                          {item.subItems && (
                            <div className="pl-6 space-y-1">
                              {item.subItems.map((sub, j) => (
                                <p key={j} className="text-sm text-slate-600">{sub}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Drill Sequences</h3>
                {(() => {
                  let gradedCount = 0;
                  return selectedAchievement.movements.map((move, idx) => {
                    if (!move.isNonGraded) gradedCount++;
                    const displayNum = (move.isNonGraded || selectedAchievement.number === "7.1" || selectedAchievement.number === "7.2") ? "" : `${gradedCount}. `;
                    
                    return (
                      <div 
                        key={idx} 
                        className={cn(
                          "p-4 rounded-xl shadow-sm border transition-all flex items-center justify-between gap-4",
                          move.isNonGraded 
                            ? "bg-slate-50/50 border-slate-100 opacity-80" 
                            : "bg-white border-slate-200"
                        )}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className={cn(
                              "font-bold text-sm",
                              move.isNonGraded ? "text-slate-400" : "text-[#003366]"
                            )}>
                              {displayNum}{move.command}
                              {move.points && (
                                <span className="ml-2 text-[10px] text-slate-400 font-normal italic">
                                  ({move.points} pt{move.points > 1 ? 's' : ''})
                                </span>
                              )}
                            </p>
                            {move.isNonGraded && (
                              <span className="text-[8px] font-black uppercase tracking-tighter bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">Reset Action</span>
                            )}
                          </div>
                          <div className="mt-2 space-y-1">
                            {move.standards && (
                              <div className={cn(
                                "p-2 rounded-lg border mt-1",
                                move.isNonGraded ? "bg-white/50 border-slate-100" : "bg-slate-50 border-slate-100"
                              )}>
                                <p className="text-[10px] leading-relaxed text-slate-600">
                                  <span className="font-bold uppercase tracking-tighter text-slate-400 block mb-0.5">
                                    {move.isNonGraded ? "Instruction:" : "Acceptable Standards:"}
                                  </span>
                                  {move.standards}
                                </p>
                              </div>
                            )}
                            {move.description && !move.standards && <p className="text-xs text-slate-400 mt-0.5">{move.description}</p>}
                          </div>
                        </div>
                        
                        {!move.isNonGraded && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleScoreChange(idx, 'Pass')}
                              className={cn(
                                "p-2 rounded-lg border transition-all",
                                scores[idx] === 'Pass' 
                                  ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                                  : "bg-white border-slate-200 text-slate-400 hover:border-emerald-200 hover:text-emerald-500"
                              )}
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleScoreChange(idx, 'Fail')}
                              className={cn(
                                "p-2 rounded-lg border transition-all",
                                scores[idx] === 'Fail' 
                                  ? "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20" 
                                  : "bg-white border-slate-200 text-slate-400 hover:border-rose-200 hover:text-rose-500"
                              )}
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}

                {selectedAchievement && selectedAchievement.movements.some(m => m.points) && selectedAchievement.number !== 8 && (
                  <div className="mt-6 p-6 rounded-2xl bg-[#003366] text-white shadow-xl shadow-[#003366]/20 flex items-center justify-between border-4 border-white/10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Formation Subtotal Points</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black tabular-nums">{Number(passCount.toFixed(2))}</span>
                        <span className="text-xl font-bold text-white/40">/ {Number(selectedAchievement.movements.reduce((acc, m) => acc + (m.points || 0), 0).toFixed(2))}</span>
                      </div>
                    </div>
                    <div className={cn(
                      "px-4 py-2 rounded-full font-black uppercase tracking-widest text-xs border-2",
                      isPassing 
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-400" 
                        : "bg-rose-500/20 border-rose-400 text-rose-400"
                    )}>
                      {isPassing ? 'Passing' : 'Below Standard'}
                    </div>
                  </div>
                )}

                {selectedAchievement.images && selectedAchievement.images.length > 0 && (
                  <div className="mt-8 space-y-4">
                    {selectedAchievement.images.map((img, i) => (
                      <div key={i} className="space-y-2">
                        <p className="text-sm font-bold text-[#003366] px-2">{img.caption}</p>
                        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                          <img 
                            src={img.url} 
                            alt={img.caption} 
                            className="w-full h-auto rounded-xl"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // Fallback if image fails to load
                              (e.target as HTMLImageElement).src = "https://picsum.photos/seed/drill-diagram/800/400";
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Hotwash Section */}
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" />
                  Hotwash (AAR) Feedback
                </label>
                <textarea
                  placeholder="Provide specific feedback on performance, areas for improvement, and strengths..."
                  value={hotwash}
                  onChange={(e) => setHotwash(e.target.value)}
                  rows={4}
                  className={cn(
                    "w-full bg-slate-50 border-2 p-4 rounded-2xl text-sm focus:bg-white transition-all outline-none resize-none",
                    showValidationErrors && !hotwash.trim() ? "border-rose-200 focus:border-rose-400" : "border-slate-100 focus:border-cap-blue"
                  )}
                />
                <p className="text-[10px] text-slate-400 italic">This feedback will be included in the final PDF report.</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-primary w-full py-5 text-lg"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <ClipboardCheck className="w-6 h-6" />
                      SUBMIT DRILL TEST
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 space-y-8"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-4 bg-emerald-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
              </div>
              
              <div>
                <h2 className="font-title font-bold text-3xl tracking-tight text-slate-900">Test Submitted!</h2>
                <p className="text-slate-500 mt-3 max-w-sm mx-auto leading-relaxed">
                  The PDF has been generated and shared. Senior members can now review the results in the unit records.
                </p>
              </div>

              <div className="card p-6 text-left space-y-4 max-w-sm mx-auto bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-cap-blue/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-cap-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Generated Report</p>
                    <p className="text-xs font-bold text-slate-700 truncate">DrillTest_Ach{selectedAchievement?.number}_{cadetCAPID}.pdf</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Download className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</p>
                    <p className="text-xs font-bold text-emerald-600">Saved & Shared Successfully</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-w-sm mx-auto">
                <button onClick={reset} className="btn-primary w-full">
                  <ClipboardCheck className="w-5 h-5" />
                  START NEW TEST
                </button>
                <button onClick={reset} className="btn-secondary w-full">
                  RETURN TO HOME
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav Hint */}
      {step !== 'success' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden">
          <div className="max-w-2xl mx-auto flex justify-around text-slate-400">
            <div className={cn("flex flex-col items-center gap-1", step === 'select' && "text-[#003366]")}>
              <ClipboardCheck className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Tests</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FileText className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">History</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <LogOut className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Exit</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
