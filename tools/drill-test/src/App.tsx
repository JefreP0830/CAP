import React, { useState, useRef } from 'react';
import { Achievement, FALLBACK_ACHIEVEMENTS, DrillTestSubmission, achLabel, achTitle, pointsFor, retrainList, wordCount, MIN_FEEDBACK_WORDS } from './constants';
import { generateDrillTestPDF } from './utils/pdfGenerator';
import { GUIDES, type Guide } from './guides';
import { clsx, type ClassValue } from 'clsx';

// Bump on every release; shown top right so a printout can be traced to a build.
const APP_VERSION = '2026.10.31';

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export default function App() {
  const [step, setStep] = useState<'select' | 'form' | 'success' | 'guide'>('select');
  const [guide, setGuide] = useState<Guide | null>(null);
  const [doneSteps, setDoneSteps] = useState<Record<number, boolean>>({});
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [cadetCAPID, setCadetCAPID] = useState('');
  const [proctorCAPID, setProctorCAPID] = useState('');
  const [sustain, setSustain] = useState('');
  const [improve, setImprove] = useState('');
  const lastPdf = useRef<{ blob: Blob; name: string; title: string; text: string } | null>(null);
  const [scores, setScores] = useState<Record<number, 'Pass' | 'Partial' | 'Fail'>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'Promotion' | 'Advanced'>('Promotion');
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [formError, setFormError] = useState('');
  const [shareNote, setShareNote] = useState('');
  const [zoomKey, setZoomKey] = useState<{ src: string; caption: string } | null>(null);
  

  const handleSelectAchievement = (ach: Achievement) => {
    setSelectedAchievement(ach);
    setScores({});
    setSustain(''); setImprove('');
    setShowValidationErrors(false);
    setFormError('');
    setStep('form');
    window.scrollTo(0, 0);
  };

  const handleScoreChange = (index: number, score: 'Pass' | 'Partial' | 'Fail') => {
    setScores(prev => ({ ...prev, [index]: score }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidationErrors(true);

    if (!cadetCAPID.trim() || !proctorCAPID.trim()) {
      setFormError('Enter the cadet CAPID and the proctor CAPID.');
      return;
    }

    if (!selectedAchievement) return;
    
    const allScored = selectedAchievement.movements.every((move, i) => move.isNonGraded || scores[i]);
    if (!allScored) {
      setFormError('Score every graded command before submitting.');
      return;
    }

    if (wordCount(sustain) < MIN_FEEDBACK_WORDS || wordCount(improve) < MIN_FEEDBACK_WORDS) {
      setFormError(`Write at least ${MIN_FEEDBACK_WORDS} words for Sustain and for Improve. Name the specific command or movement.`);
      return;
    }
    setFormError('');

    setIsSubmitting(true);
    
    const submission: DrillTestSubmission = {
      achievementNumber: selectedAchievement.number,
      cadetCAPID,
      proctorCAPID,
      date: new Date().toLocaleDateString(),
      scores,
      sustain: sustain.trim(),
      improve: improve.trim(),
      category: selectedAchievement.category
    };

    try {
      const doc = generateDrillTestPDF(submission, selectedAchievement);
      const fileName = `${selectedAchievement.category}_${selectedAchievement.name || selectedAchievement.number}_${cadetCAPID}.pdf`;
      
      // Generate the PDF as a Blob
      const pdfBlob = doc.output('blob');
      const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
      lastPdf.current = { blob: pdfBlob, name: fileName,
        title: `${selectedAchievement.category}: ${selectedAchievement.name || selectedAchievement.number} - ${cadetCAPID}`,
        text: `Completed ${selectedAchievement.category} Drill for Candidate ${cadetCAPID}. Proctored by ${proctorCAPID}.` };

      // Check if the browser supports the Share API (most modern mobile browsers do)
      if (navigator.share && navigator.canShare({ files: [file] })) {
        let shareText = `Completed ${selectedAchievement.category} Drill for Candidate ${cadetCAPID}. Proctored by ${proctorCAPID}.`;

        await navigator.share({
          files: [file],
          title: `${selectedAchievement.category}: ${selectedAchievement.name || selectedAchievement.number} - ${cadetCAPID}`,
          text: shareText,
        });
        setShareNote('The PDF was handed to your share menu. Confirm the email went out in your mail app.');
      } else {
        // Fallback for desktop or older browsers
        doc.save(fileName);
        setShareNote('This device has no share menu, so the PDF was downloaded. Email it from your downloads.');
      }

      setStep('success');
    } catch (error) {
      console.error("Sharing failed", error);
      // If sharing is cancelled or fails, we still allow them to download
      const doc = generateDrillTestPDF(submission, selectedAchievement);
      doc.save(`${selectedAchievement.category}_${selectedAchievement.name || selectedAchievement.number}_${cadetCAPID}.pdf`);
      setShareNote('Sharing was cancelled or failed, so the PDF was downloaded instead. Email it from your downloads.');
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
    setSustain(''); setImprove('');
    lastPdf.current = null;
    setScores({});
    setShowValidationErrors(false);
    setFormError('');
    setShareNote('');
  };

  const gradedMovementsCount = selectedAchievement 
    ? selectedAchievement.movements.filter(m => !m.isNonGraded).length 
    : 0;

  const passCount = selectedAchievement 
    ? selectedAchievement.movements.reduce((acc, mov, idx) => acc + pointsFor(mov, scores[idx]), 0)
    : 0;
  const isPassing = selectedAchievement ? passCount >= selectedAchievement.passingScore : false;

  const filteredAchievements = FALLBACK_ACHIEVEMENTS.filter(a => a.category === activeTab);

  const canShare = typeof navigator !== 'undefined' && !!navigator.share;
  const savePdf = () => {
    const p = lastPdf.current; if (!p) return;
    const a = document.createElement('a'); a.href = URL.createObjectURL(p.blob); a.download = p.name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    setShareNote('PDF saved to this device\'s downloads.');
  };
  const shareAgain = async () => {
    const p = lastPdf.current; if (!p) return;
    try {
      await navigator.share({ files: [new File([p.blob], p.name, { type: 'application/pdf' })], title: p.title, text: p.text });
      setShareNote('The PDF was handed to your share menu. Confirm the email went out in your mail app.');
    } catch { setShareNote('Share closed. Use Save PDF if no mail app works.'); }
  };

  const totalPossible = selectedAchievement
    ? selectedAchievement.movements.filter(m => !m.isNonGraded).reduce((t, m) => t + (m.points || 1), 0)
    : 0;
  const usesPoints = !!selectedAchievement?.movements.some(m => m.points);
  const ratedCount = selectedAchievement
    ? selectedAchievement.movements.filter((m, i) => !m.isNonGraded && scores[i]).length
    : 0;

  return (
    <div className="app">
      <header className="bar">
        <div className="wrap head">
          <div>
            <h1>Drill Evaluator</h1>
            <p className="byline">Civil Air Patrol &middot; Drill tests (CAPP 60-34) and practice guides (CAPP 60-33)</p>
          </div>
          <span className="ver">v{APP_VERSION}</span>
        </div>
      </header>

      {step === 'select' && (
        <main className="wrap">
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={activeTab === 'Promotion'} onClick={() => setActiveTab('Promotion')}>Drill Test</button>
            <button role="tab" aria-selected={activeTab === 'Advanced'} onClick={() => setActiveTab('Advanced')}>Practice Guides</button>
          </div>
          {activeTab === 'Promotion' ? (
          <ol className="tests">
            {filteredAchievements.map((ach) => (
              <li key={String(ach.number)}>
                <button className="test" onClick={() => handleSelectAchievement(ach)}>
                  <span className="code">{achLabel(ach)}</span>
                  <span className="topic">{ach.name && !achLabel(ach).includes(ach.name) ? `${ach.name}: ${ach.topic || ''}` : ach.topic}</span>
                  <span className="pass">Pass: {ach.passingScore} of {ach.movements.filter(m => !m.isNonGraded).reduce((t, m) => t + (m.points || 1), 0)}{ach.movements.some(m => m.points) && ach.number === 7 ? ' points' : ''}</span>
                </button>
              </li>
            ))}
          </ol>
          ) : (
          <>
            <p className="hint">Ceremonies and formations to rehearse. Not promotion tests: no CAPIDs, no scores.</p>
            <ol className="tests">
              {GUIDES.map((g) => (
                <li key={g.id}>
                  <button className="test" onClick={() => { setGuide(g); setDoneSteps({}); setStep('guide'); window.scrollTo(0, 0); }}>
                    <span className="code">{g.title}</span>
                    <span className="topic">{g.summary}</span>
                    <span className="pass">{g.steps.length} steps</span>
                  </button>
                </li>
              ))}
            </ol>
          </>
          )}
          <p className="foot">
            Reference: <a href="https://www.gocivilairpatrol.com/programs/cadets/library/drill" target="_blank" rel="noreferrer">CAP Drill &amp; Ceremonies library</a>.
          </p>
        </main>
      )}

      {step === 'form' && selectedAchievement && (
        <>
          <div className="tally">
            <div className="wrap tally-in">
              <div className="kpi"><span className="num s">{passCount}</span><span className="lbl">{usesPoints ? 'Points' : 'Satisfactory'}</span></div>
              <div className="kpi"><span className="num">{selectedAchievement.passingScore}</span><span className="lbl">Need</span></div>
              <div className="kpi"><span className="num">{ratedCount}/{gradedMovementsCount}</span><span className="lbl">Scored</span></div>
              <span className={cn('status', isPassing ? 'pass' : ratedCount === gradedMovementsCount ? 'fail' : '')}>
                {isPassing ? 'Passing' : ratedCount === gradedMovementsCount ? 'Not yet' : 'In progress'}
              </span>
            </div>
          </div>
          <main className="wrap">
            <button className="link" onClick={() => setStep('select')}>Back to tests</button>
            <h2>{achTitle(selectedAchievement)}</h2>
            <p className="sub">Pass: {selectedAchievement.passingScore} of {totalPossible} {usesPoints && selectedAchievement.number === 7 ? 'points' : 'commands rated Satisfactory'}</p>

            <section className="ref">
              {selectedAchievement.topic && <p><b>Topic.</b> {selectedAchievement.topic}</p>}
              {selectedAchievement.conditions && <p className="pre"><b>Conditions.</b> {selectedAchievement.conditions}</p>}
              {selectedAchievement.note && <p><b>Note.</b> {selectedAchievement.note}</p>}
              {selectedAchievement.longDescription && <p>{selectedAchievement.longDescription}</p>}
              {selectedAchievement.commandSequence && (
                <>
                  <p><b>Command sequence given to the cadet</b></p>
                  <ol className="seq">{selectedAchievement.commandSequence.map((c, i) => <li key={i}>{c.replace(/^\d+\.\s*/, '')}</li>)}</ol>
                </>
              )}
              {selectedAchievement.rubric && (
                <>
                  <p><b>{selectedAchievement.rubric.title}.</b> {selectedAchievement.rubric.subtitle}</p>
                  {selectedAchievement.rubric.items.map((item, i) => (
                    <div key={i}>
                      <p>{item.text}</p>
                      {item.subItems && <ul>{item.subItems.map((sub, j) => <li key={j}>{sub}</li>)}</ul>}
                    </div>
                  ))}
                </>
              )}
            </section>

            {selectedAchievement.answerKeys && (
              <details className="keys">
                <summary>Show answer key</summary>
                <p className="hint">From CAPP 60-34. Tap a diagram to enlarge it.</p>
                {selectedAchievement.answerKeys.map((k, i) => (
                  <figure key={i}>
                    <button className="keyimg" onClick={() => setZoomKey(k)} aria-label={`Enlarge: ${k.caption}`}>
                      <img src={k.src} alt={k.caption} />
                    </button>
                    <figcaption>{k.caption}</figcaption>
                  </figure>
                ))}
              </details>
            )}

            <h3 className="sec">Who is testing</h3>
            <div className="fields">
              <label>Cadet CAPID
                <input inputMode="numeric" autoComplete="off" value={cadetCAPID}
                  onChange={(e) => setCadetCAPID(e.target.value.replace(/\D/g, ''))}
                  className={showValidationErrors && !cadetCAPID.trim() ? 'bad' : ''} />
              </label>
              <label>Proctor CAPID
                <input inputMode="numeric" autoComplete="off" value={proctorCAPID}
                  onChange={(e) => setProctorCAPID(e.target.value.replace(/\D/g, ''))}
                  className={showValidationErrors && !proctorCAPID.trim() ? 'bad' : ''} />
              </label>
            </div>

            <h3 className="sec">Scorecard</h3>
            <p className="hint">Rate a command Satisfactory only when the cadet meets every standard listed under it.</p>
            <ol className="card">
              {(() => {
                let gradedCount = 0;
                return selectedAchievement.movements.map((move, idx) => {
                  if (!move.isNonGraded) gradedCount++;
                  const missing = showValidationErrors && !move.isNonGraded && !scores[idx];
                  if (move.isNonGraded) {
                    return (
                      <li key={idx} className="item ng">
                        <span className="n">--</span>
                        <div><span className="cmd">{move.command}</span><span className="ngtxt">{move.standards || move.description || 'Not graded.'}</span></div>
                      </li>
                    );
                  }
                  const label = selectedAchievement.number === 7 ? '' : String(gradedCount);
                  return (
                    <li key={idx} className={cn('item', missing && 'missing')}>
                      <span className="n">{label}</span>
                      <div>
                        <span className="cmd">{move.command}{move.points ? ` (${move.points} ${move.points === 1 ? 'point' : 'points'})` : ''}</span>
                        {(move.standards || move.description) && <p className="std">{move.standards || move.description}</p>}
                        <div className="ctl">
                          <button className={cn('seg s', scores[idx] === 'Pass' && 'on')} aria-pressed={scores[idx] === 'Pass'} onClick={() => handleScoreChange(idx, 'Pass')}>
                            {usesPoints ? `${move.points || 1}` : 'S'}<span>{usesPoints ? ((move.points || 1) === 1 ? 'point' : 'points') : 'Satisfactory'}</span>
                          </button>
                          {move.points === 2 && (
                            <button className={cn('seg p', scores[idx] === 'Partial' && 'on')} aria-pressed={scores[idx] === 'Partial'} onClick={() => handleScoreChange(idx, 'Partial')}>
                              1<span>point</span>
                            </button>
                          )}
                          <button className={cn('seg u', scores[idx] === 'Fail' && 'on')} aria-pressed={scores[idx] === 'Fail'} onClick={() => handleScoreChange(idx, 'Fail')}>
                            {usesPoints ? '0' : 'U'}<span>{usesPoints ? 'points' : 'Unsatisfactory'}</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                });
              })()}
            </ol>

            <h3 className="sec">Hotwash (AAR)</h3>
            <p className="label">Commands to retrain</p>
            {(() => {
              const r = retrainList(selectedAchievement, scores);
              return r.length
                ? <ul className="retrain">{r.map((x, i) => <li key={i}><b>{x.command}</b>{x.partial ? ' (1 of 2 points)' : ''}</li>)}</ul>
                : <p className="hint">None yet. Commands you rate U appear here and in the PDF, with their standards.</p>;
            })()}
            <label className="full fb">Sustain: what went well
              <textarea rows={3} value={sustain} onChange={(e) => { setSustain(e.target.value); setFormError(''); }}
                placeholder="Name a command the cadet did well and why."
                className={showValidationErrors && wordCount(sustain) < MIN_FEEDBACK_WORDS ? 'bad' : ''} />
              <span className="count">{wordCount(sustain) >= MIN_FEEDBACK_WORDS ? `${wordCount(sustain)} words` : `${wordCount(sustain)} of ${MIN_FEEDBACK_WORDS} words minimum`}</span>
            </label>
            <label className="full fb">Improve: one coaching point
              <textarea rows={3} value={improve} onChange={(e) => { setImprove(e.target.value); setFormError(''); }}
                placeholder="Name one command to fix and how to practice it."
                className={showValidationErrors && wordCount(improve) < MIN_FEEDBACK_WORDS ? 'bad' : ''} />
              <span className="count">{wordCount(improve) >= MIN_FEEDBACK_WORDS ? `${wordCount(improve)} words` : `${wordCount(improve)} of ${MIN_FEEDBACK_WORDS} words minimum`}</span>
            </label>
            <p className="hint">All three go in the PDF.</p>

            {formError && <p className="err">{formError}</p>}
            <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Preparing PDF' : 'Submit and share PDF'}
            </button>
          </main>
        </>
      )}

      {step === 'success' && selectedAchievement && (
        <main className="wrap">
          <div className="result">
            <p className="small">{achTitle(selectedAchievement)} &middot; Cadet CAPID {cadetCAPID}</p>
            <p className={cn('big', isPassing ? 'pass' : 'fail')}>{isPassing ? 'Pass' : 'Not yet'}</p>
            <p>{passCount} of {totalPossible} {usesPoints && selectedAchievement.number === 7 ? 'points' : 'Satisfactory'}. Pass needs {selectedAchievement.passingScore}.</p>
          </div>
          <p className="hint">{shareNote}</p>
          <div className="btnrow two">
            <button className="btn-secondary" onClick={savePdf}>Save PDF</button>
            {canShare && <button className="btn-secondary" onClick={shareAgain}>Share again</button>}
          </div>
          <p className="hint">If no mail app opened, save the PDF and email it as an attachment.</p>
          <div className="btnrow">
            <button className="btn-primary" onClick={reset}>Start a new test</button>
          </div>
        </main>
      )}
      {step === 'guide' && guide && (
        <main className="wrap guide">
          <button className="link" onClick={() => { setStep('select'); setGuide(null); }}>Back to guides</button>
          <h2>{guide.title}</h2>
          <p className="sub">Practice guide. Not a promotion test.</p>

          <h3 className="sec">Purpose</h3>
          {guide.purpose.map((p, i) => <p key={i} className="para">{p.text} <span className="cite">{p.ref}</span></p>)}

          <h3 className="sec">Who and where</h3>
          <ul className="roles">{guide.roles.map((r, i) => <li key={i}>{r}</li>)}</ul>
          {guide.figures.map((f, i) => (
            <figure key={i}>
              <button className="keyimg" onClick={() => setZoomKey({ src: f.src, caption: f.caption })} aria-label={`Enlarge: ${f.caption}`}>
                <img src={f.src} alt={f.caption} />
              </button>
              <figcaption>{f.caption}. Tap to enlarge.</figcaption>
              {f.note && <p className="hint">{f.note}</p>}
            </figure>
          ))}

          <h3 className="sec">Sequence and rehearsal checklist</h3>
          <p className="hint">Tap each step as it is done correctly in rehearsal. Nothing is saved or scored.</p>
          <ol className="steps">
            {guide.steps.map((st, i) => (
              <React.Fragment key={i}>
              {st.panel && (
                <li className="panelfig">
                  <figure>
                    <button className="keyimg" onClick={() => setZoomKey(st.panel!)} aria-label={`Enlarge: ${st.panel.caption}`}>
                      <img src={st.panel.src} alt={st.panel.caption} />
                    </button>
                    <figcaption>{st.panel.caption}. Tap to enlarge.</figcaption>
                  </figure>
                </li>
              )}
              <li>
                <button className={cn('step', doneSteps[i] && 'on')} aria-pressed={!!doneSteps[i]} onClick={() => setDoneSteps(d => ({ ...d, [i]: !d[i] }))}>
                  <span className="n">{i + 1}</span>
                  <span className="body">
                    {st.who && <span className="who">{st.who}</span>}
                    {st.say && <span className="say">&ldquo;{st.say}&rdquo;</span>}
                    <span className="txt">{st.text}</span>
                    <span className="cite">{st.ref}</span>
                  </span>
                  <span className="tick">{doneSteps[i] ? 'Done' : ''}</span>
                </button>
              </li>
              </React.Fragment>
            ))}
          </ol>
          <p className="hint">{Object.values(doneSteps).filter(Boolean).length} of {guide.steps.length} steps done.</p>
          <button className="btn-secondary wide" onClick={() => { setDoneSteps({}); window.scrollTo(0, 0); }}>Start over</button>

          <h3 className="sec">Watch for</h3>
          <ul className="watch">{guide.watch.map((w, i) => <li key={i}>{w.text} <span className="cite">{w.ref}</span></li>)}</ul>

          <p className="foot">Source: {guide.source}.</p>
        </main>
      )}

      {zoomKey && (
        <div className="zoom" role="dialog" aria-label={zoomKey.caption}>
          <div className="zoombar">
            <span>{zoomKey.caption}</span>
            <button className="btn-secondary" onClick={() => setZoomKey(null)}>Close</button>
          </div>
          <div className="zoomarea"><img src={zoomKey.src} alt={zoomKey.caption} /></div>
        </div>
      )}
    </div>
  );
}
