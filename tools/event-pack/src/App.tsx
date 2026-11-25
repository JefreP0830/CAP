import React, { useState, useRef } from 'react';
import { clsx } from 'clsx';
import {
  LEVELS, MODES, PACK, GROUPS, SOURCE, REFIT_STEPS, MIN_FEEDBACK_WORDS,
  isRequired, inPacks, levelTitle, levelSource, tally, refitList, wordCount,
  type InspectionLevel, type Mode, type Rating,
} from './pack';
import { generatePackPDF } from './utils/pdfGenerator';

// Bump on every release; shown top right so a printout can be traced to a build.
const APP_VERSION = '2026.11.25m';

const RATINGS: { r: Rating; key: string; label: string; aria: string }[] = [
  { r: 'Pass', key: 's', label: 'P', aria: 'Pass' },
  { r: 'Fail', key: 'u', label: 'F', aria: 'Fail' },
];
const SHORT: Record<string, string> = { MT: 'Trainee', GTM: 'Member', MGTM: 'Member', GTL: 'Leader', MGTL: 'Leader' };
const today = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const showDate = (iso: string) => { const [y, m, d] = iso.split('-'); return `${Number(m)}/${Number(d)}/${y}`; };
const levelsOf = (m: Mode) => LEVELS.filter(l => l.mode === m);
const countFor = (l: InspectionLevel) => PACK.filter(p => isRequired(p, l)).length;

export default function App() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [tab, setTab] = useState<'Inspect' | 'Refit' | 'List'>('Inspect');
  const [mode, setMode] = useState<Mode>('Event');
  // Remember the chosen standard within each pack type (24-Hr: Member/Leader; Multi-Day: Trainee/Member/Leader).
  const [pick, setPick] = useState<Record<Mode, string>>({ Event: 'EV', '24': 'GTM', Multi: 'MT' });
  const level = LEVELS.find(l => l.id === pick[mode])!;
  const [memberCAPID, setMemberCAPID] = useState('');
  const [inspectorCAPID, setInspectorCAPID] = useState('');
  const [activity, setActivity] = useState('');
  const [inspDate, setInspDate] = useState(today());
  const [ratings, setRatings] = useState<Record<number, Rating>>({});
  const [sustain, setSustain] = useState('');
  const [improve, setImprove] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);
  const [shareNote, setShareNote] = useState('');
  const [doneR, setDoneR] = useState<Record<number, boolean>>({});
  const lastPdf = useRef<{ blob: Blob; name: string; title: string; text: string } | null>(null);

  const rate = (i: number, r: Rating) => { setRatings(p => ({ ...p, [i]: r })); setFormError(''); };

  // Ratings are keyed by item, so switching pack type or standard keeps what is already rated.
  const t = tally(level, ratings);
  const allRated = t.rated === t.total;
  const passing = allRated && t.ready === t.need;
  const refit = refitList(level, ratings);

  const handleSubmit = async () => {
    setShowErrors(true);
    if (!memberCAPID.trim() || !inspectorCAPID.trim() || !inspDate) { setFormError('Enter the member CAPID, the inspector CAPID and the inspection date.'); return; }
    if (!allRated) { setFormError('Rate every item before submitting.'); return; }
    if (wordCount(sustain) < MIN_FEEDBACK_WORDS || wordCount(improve) < MIN_FEEDBACK_WORDS) {
      setFormError(`Write at least ${MIN_FEEDBACK_WORDS} words for Sustain and for Improve. Name the specific item.`); return;
    }
    setFormError(''); setBusy(true);
    const sub = { memberCAPID, inspectorCAPID, activity: activity.trim(), date: showDate(inspDate), ratings, sustain: sustain.trim(), improve: improve.trim() };
    const doc = generatePackPDF(sub, level);
    const name = `Pack_${level.mode}_${level.id}_${memberCAPID}.pdf`;
    const blob = doc.output('blob');
    const title = `Pack inspection, ${levelTitle(level)} - ${memberCAPID}`;
    const text = `Pack inspection (${levelTitle(level)}) for ${memberCAPID}: ${passing ? 'Pass' : 'Fail'}. Inspected by ${inspectorCAPID}.`;
    lastPdf.current = { blob, name, title, text };
    try {
      const file = new File([blob], name, { type: 'application/pdf' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title, text });
        setShareNote('The PDF was handed to your share menu. Confirm the email went out in your mail app.');
      } else {
        doc.save(name);
        setShareNote('This device has no share menu, so the PDF was downloaded. Email it from your downloads.');
      }
    } catch {
      doc.save(name);
      setShareNote('Sharing was cancelled or failed, so the PDF was downloaded instead. Email it from your downloads.');
    } finally {
      setBusy(false); setStep('success'); window.scrollTo(0, 0);
    }
  };

  const reset = () => {
    setStep('form'); setTab('Inspect'); setMemberCAPID(''); setInspectorCAPID(''); setActivity('');
    setRatings({}); setSustain(''); setImprove(''); setShowErrors(false); setFormError(''); setShareNote('');
    setInspDate(today()); lastPdf.current = null; window.scrollTo(0, 0);
  };

  const canShare = typeof navigator !== 'undefined' && !!navigator.share;
  const savePdf = () => {
    const p = lastPdf.current; if (!p) return;
    const a = document.createElement('a'); a.href = URL.createObjectURL(p.blob); a.download = p.name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    setShareNote('PDF saved to this device’s downloads.');
  };
  const shareAgain = async () => {
    const p = lastPdf.current; if (!p) return;
    try {
      await navigator.share({ files: [new File([p.blob], p.name, { type: 'application/pdf' })], title: p.title, text: p.text });
      setShareNote('The PDF was handed to your share menu. Confirm the email went out in your mail app.');
    } catch { setShareNote('Share closed. Use Save PDF if no mail app works.'); }
  };

  const fb = (label: string, v: string, set: (s: string) => void, ph: string) => (
    <label className="full fb">{label}
      <textarea rows={3} value={v} placeholder={ph}
        onChange={(e) => { set(e.target.value); setFormError(''); }}
        className={showErrors && wordCount(v) < MIN_FEEDBACK_WORDS ? 'bad' : ''} />
      <span className="count">{wordCount(v) >= MIN_FEEDBACK_WORDS ? `${wordCount(v)} words` : `${wordCount(v)} of ${MIN_FEEDBACK_WORDS} words minimum`}</span>
    </label>
  );

  // Required items for the current selection, grouped. Groups with nothing required are left out.
  const groups = GROUPS
    .map(g => ({ g, rows: PACK.map((p, i) => ({ p, i })).filter(({ p }) => p.group === g && isRequired(p, level)) }))
    .filter(x => x.rows.length);
  const numberOf = (i: number) => PACK.slice(0, i + 1).filter(q => isRequired(q, level)).length;

  const selector = (
    <div className="picker">
      <div className="modes" role="radiogroup" aria-label="Pack type">
        {MODES.map((m) => {
          const n = countFor(LEVELS.find(l => l.id === pick[m.id])!);
          return (
            <button key={m.id} role="radio" aria-checked={mode === m.id} onClick={() => setMode(m.id)}>
              <span className="ml">{m.label}</span>
              <span className="mh">{m.hint ? <>( {m.hint} )&nbsp;&nbsp;|&nbsp;&nbsp;</> : null}{n}&nbsp;&nbsp;ITEMS</span>
            </button>
          );
        })}
      </div>
      {levelsOf(mode).length > 1 && (
        <div className="levels" role="radiogroup" aria-label="Standard">
          {levelsOf(mode).map((l) => (
            <button key={l.id} role="radio" aria-checked={level.id === l.id} onClick={() => setPick(p => ({ ...p, [mode]: l.id }))}>{SHORT[l.id]}</button>
          ))}
        </div>
      )}
      {mode === 'Event' && <p className="aug">Base standard. Augment for weather and event conditions.</p>}
    </div>
  );

  return (
    <div className="app">
      <header className="bar">
        <div className="wrap head">
          <div>
            <h1>Event Pack Inspection</h1>
            <p className="byline">Civil Air Patrol &middot; Pack inspection and refit</p>
          </div>
          <span className="ver">v{APP_VERSION}</span>
        </div>
      </header>

      <div className="tally">
        <div className="wrap tally-in">
          {tab === 'Inspect' && step === 'form' ? (
            <div className="kpis">
              <div className="kpi"><span className="num s">{t.ready}</span><span className="lbl">Pass</span></div>
              <div className="kpi"><span className="num">{t.need}</span><span className="lbl">Need</span></div>
              <div className="kpi"><span className="num">{t.rated}/{t.total}</span><span className="lbl">Rated</span></div>
            </div>
          ) : <span />}
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'Inspect'} onClick={() => setTab('Inspect')}>Inspection</button>
            <button role="tab" aria-selected={tab === 'Refit'} onClick={() => setTab('Refit')}>Refit Guide</button>
            <button role="tab" aria-selected={tab === 'List'} onClick={() => setTab('List')}>Pack List</button>
          </div>
        </div>
      </div>

      {tab === 'Inspect' && step === 'form' && (
        <main className="wrap">
          {selector}

          <div className="fields three">
            <label>Member CAPID
              <input inputMode="numeric" autoComplete="off" value={memberCAPID}
                onChange={(e) => setMemberCAPID(e.target.value.replace(/\D/g, ''))}
                className={showErrors && !memberCAPID.trim() ? 'bad' : ''} />
            </label>
            <label>Inspector CAPID
              <input inputMode="numeric" autoComplete="off" value={inspectorCAPID}
                onChange={(e) => setInspectorCAPID(e.target.value.replace(/\D/g, ''))}
                className={showErrors && !inspectorCAPID.trim() ? 'bad' : ''} />
            </label>
            <label>Inspection date
              <input type="date" value={inspDate} max={today()} onChange={(e) => setInspDate(e.target.value)}
                className={showErrors && !inspDate ? 'bad' : ''} />
            </label>
          </div>
          <label className="full fb">Activity (optional)
            <input autoComplete="off" value={activity} maxLength={60} placeholder="e.g. SAREX, field day, bivouac" onChange={(e) => setActivity(e.target.value)} />
          </label>

          {groups.map(({ g, rows }) => (
            <section key={g}>
              <h3 className="sec">{g}</h3>
              <ol className="card">
                {rows.map(({ p, i }) => (
                  <li key={i} className={clsx('row', showErrors && !ratings[i] && 'missing')}>
                    <span className="n">{numberOf(i)}</span>
                    <span className="nm">{p.item}{p.sub && <span className="subst">or {p.sub}</span>}</span>
                    <span className="pf">
                      {p.conditional && (
                        <button className={clsx('pfb na', ratings[i] === 'NA' && 'on')} aria-label={`Not needed: ${p.item}`} aria-pressed={ratings[i] === 'NA'} onClick={() => rate(i, 'NA')}>N/A</button>
                      )}
                      {RATINGS.map(({ r, key, label, aria }) => (
                        <button key={r} className={clsx('pfb', key, ratings[i] === r && 'on')} aria-label={`${aria}: ${p.item}`} aria-pressed={ratings[i] === r} onClick={() => rate(i, r)}>{label}</button>
                      ))}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          ))}

          <h3 className="sec">Hotwash (AAR)</h3>
          <p className="label">Refit list</p>
          {refit.length === 0
            ? <p className="hint">None yet. Items rated F appear here and in the PDF.</p>
            : <ul className="retrain">{refit.map((p, i) => <li key={i}>{p.item}</li>)}</ul>}
          {fb('Sustain: what went well', sustain, setSustain, 'Name something packed well and why.')}
          {fb('Improve: one coaching point', improve, setImprove, 'Name one item to fix and how.')}

          {formError && <p className="err">{formError}</p>}
          <button className="btn-primary" onClick={handleSubmit} disabled={busy}>{busy ? 'Preparing PDF' : 'Submit and share PDF'}</button>
          <p className="foot">Reference: {levelSource(level)}.</p>
        </main>
      )}

      {tab === 'Inspect' && step === 'success' && (
        <main className="wrap">
          <div className="result">
            <p className="small">{levelTitle(level)} &middot; Member CAPID {memberCAPID}</p>
            <p className={clsx('big', passing ? 'pass' : 'fail')}>{passing ? 'Pass' : 'Fail'}</p>
            <p>{t.ready} of {t.need} required items passed.{!passing ? ` Refit ${refit.length} and inspect again.` : ''}</p>
          </div>
          <p className="hint">{shareNote}</p>
          <div className="btnrow two">
            <button className="btn-secondary" onClick={savePdf}>Save PDF</button>
            {canShare && <button className="btn-secondary" onClick={shareAgain}>Share again</button>}
          </div>
          <p className="hint">If no mail app opened, save the PDF and email it as an attachment.</p>
          <div className="btnrow"><button className="btn-primary" onClick={reset}>Start a new inspection</button></div>
        </main>
      )}

      {tab === 'Refit' && (
        <main className="wrap guide">
          <h2>Conduct individual refit</h2>
          <p className="sub">The 4 R&rsquo;s, in order (Task O-0002)</p>
          <p className="para">After every sortie, and again after every mission or activity.</p>
          <ol className="steps">
            {REFIT_STEPS.map((s, i) => (
              <li key={i}>
                <button className={clsx('step', doneR[i] && 'on')} aria-pressed={!!doneR[i]} onClick={() => setDoneR(d => ({ ...d, [i]: !d[i] }))}>
                  <span className="n">{i + 1}</span>
                  <span className="body"><span className="say">{s.r}</span><span className="txt">{s.text}</span></span>
                  <span className="check"><span className="box" aria-hidden="true" /><span className="lbl">{doneR[i] ? 'Done' : 'Tap when done'}</span></span>
                </button>
              </li>
            ))}
          </ol>
          <button className="btn-secondary wide" disabled={!Object.values(doneR).some(Boolean)} onClick={() => setDoneR({})}>Clear checklist</button>
        </main>
      )}

      {tab === 'List' && (
        <main className="wrap plist">
          <div className="noprint">{selector}</div>
          <h2>{levelTitle(level)}</h2>
          <p className="sub">{levelSource(level)}</p>
          <button className="btn-secondary wide noprint" onClick={() => window.print()}>Print pack list</button>
          {groups.map(({ g, rows }) => (
            <section key={g}>
              <h3 className="sec">{g}</h3>
              <table>
                <tbody>
                  {rows.map(({ p, i }) => (
                    <tr key={i}>
                      <td className="bx"><span className="box" aria-hidden="true" /></td>
                      <td><span className="it">{p.item}{p.conditional ? ' (if needed)' : ''}</span>{p.sub && <span className="std">or {p.sub}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
          {(() => {
            const rec = PACK.filter(p => p.req === 'rec' && inPacks(p, level));
            return rec.length ? <p className="hint">Recommended, not required: {rec.map(p => p.item).join(', ')}.</p> : null;
          })()}
        </main>
      )}
    </div>
  );
}
