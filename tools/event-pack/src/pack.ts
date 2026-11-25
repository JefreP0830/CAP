// 24-hour pack contents, from the national Ground & Urban Direction Finding Team Tasks
// guide (24 May 2004), Task O-0001 "Prepare Ground Team Individual Equipment" (1-MAR-01).
// Source: gocivilairpatrol.com/media/cms/Ground_Team__UDF_Task_Guide__24_May_CD5DA29E1340B.pdf
//
// `item` and `spec` keep the task guide's wording. `now` is a current-practice note added by
// this tool where the 2004 wording names something CAP no longer uses; it never changes
// what is required. O-0001 lets a wing supplement the national list, so check yours.

export type Level = 'T' | 'GTM' | 'GTL';
export type Mode = 'Event' | '24' | 'Multi';
export type PackKind = '24' | 'ext' | 'event';
export type Rating = 'Pass' | 'Fail' | 'NA';

export interface PackItem {
  group: string;
  item: string;
  spec?: string;
  now?: string;
  req: Level | 'rec';      // lowest level that must carry it; 'rec' = recommended, never graded
  sub?: string;
  contents?: string;       // what a kit must hold; shown under the item without "or"           // permitted substitute, the only text shown under an item while inspecting
  conditional?: boolean;   // "if needed" items may be rated Not needed
  pack?: PackKind;         // default '24'; 'ext' = extended duration (multi-day) pack
}

export interface InspectionLevel {
  id: string;
  mode: Mode;
  name: string;
  who: string;
  includes: Level[];
  packs: PackKind[];
  source?: string;
}

export const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: 'Event', label: 'Event', hint: '8-10 Hrs' },
  { id: '24', label: '24 Hr', hint: '' },
  { id: 'Multi', label: 'Multi-Day', hint: '24-72 Hrs' },
];
export const modeLabel = (m: Mode) => MODES.find(x => x.id === m)!.label;

// One standard per pack type. Ground Team Leader items sit at the end ("GTL only") and are rated N/A for everyone else.
export const LEVELS: InspectionLevel[] = [
  { id: 'EV', mode: 'Event', name: 'Event', who: 'Base safety standard for a day activity of 8 to 10 hours. Add items for weather or event conditions.', includes: ['T'], packs: ['event'],
    source: 'Day-activity safety list, drawn from O-0001; not a CAP-published standard' },
  { id: '24', mode: '24', name: '24 Hr', who: 'Field safety for one day plus an unplanned night.', includes: ['T', 'GTM', 'GTL'], packs: ['24'] },
  { id: 'MD', mode: 'Multi', name: 'Multi-Day', who: 'The 24 Hr pack plus the extended duration pack.', includes: ['T', 'GTM', 'GTL'], packs: ['24', 'ext'] },
];

export const REQ_LABEL: Record<PackItem['req'], string> = { T: 'Trainee', GTM: 'GTM', GTL: 'Leader', rec: 'Recommended' };

export const SOURCE = 'Field safety list drawn from Ground & UDF Team Tasks (2004) O-0001; not a CAP-published standard';

export const PACK: PackItem[] = [
  // 24-hour pack: field safety for one day plus an unplanned night. Drawn from O-0001 (2004) with judgment,
  // and the same rules as the Event pack: no uniform items, no cell phone, personal medication is a safety
  // check, weather and condition items (warm layer, sun, bugs) are added per event, only substitutes shown.
  { group: 'On your person', item: 'CAP ID and CAPF 101 card', req: 'T' },
  { group: 'Pack', item: 'Hydration pack, 2-quart capacity', req: 'T', sub: 'day pack with bottles holding 2 quarts' },
  { group: 'Pack', item: 'Two meals and snacks', req: 'T' },
  { group: 'Pack', item: 'Flashlight / headlamp', req: 'T', contents: 'with spare batteries' },
  { group: 'Pack', item: 'Notepad with pen / pencil', req: 'T' },
  { group: 'Pack', item: 'Compass', req: 'T' },
  { group: 'Pack', item: 'Signal mirror', req: 'T' },
  { group: 'Pack', item: 'Whistle', req: 'T' },
  { group: 'Pack', item: 'Reflective vest', req: 'T' },
  { group: 'Pack', item: 'PFAK (Personal First Aid Kit)', req: 'T', contents: 'Band-Aids, moleskin, gauze, tape, antiseptic wipes and gloves in a zip-lock bag' },
  { group: 'Pack', item: 'Poncho', req: 'T', sub: 'emergency shelter, tarp or bivy' },
  { group: 'Pack', item: 'Fire starter, waterproof', req: 'T', sub: 'waterproof matches' },
  { group: 'Pack', item: 'Paracord, 50 ft', req: 'T' },
  { group: 'Pack', item: 'Multi-tool or pocket knife', req: 'T' },
  { group: 'Pack', item: 'Work gloves', req: 'T' },
  { group: 'Pack', item: 'Change of socks', req: 'T' },
  { group: 'Pack', item: 'Flagging tape, 1 roll', req: 'GTM' },
  { group: 'GTL only', item: 'Map case', req: 'GTL', conditional: true, sub: 'large zip-lock bag' },
  { group: 'GTL only', item: 'Protractor with ruler', req: 'GTL', conditional: true },
  { group: 'GTL only', item: 'Alcohol pens, 2 colors, with eraser', req: 'GTL', conditional: true, sub: 'alcohol swabs to erase' },
  { group: 'Safety check', item: 'Personal medications on hand; leader knows what and where', req: 'T', conditional: true },

  // Extended duration pack (O-0001): "to help you live in the field for more than one day, typically 48 to 72 hours."
  { pack: 'ext', group: 'Extended pack', item: 'Backpack, preferably with frame', req: 'T', spec: 'Holds everything below. You must be able to carry all your gear at once.' },
  { pack: 'ext', group: 'Extended pack', item: 'Tent', req: 'T', conditional: true, spec: 'Optional if you share a tent with someone who carries it.' },
  { pack: 'ext', group: 'Extended pack', item: 'Spare rank and CAP cutouts', req: 'GTM', conditional: true, spec: 'For cadets.' },
  { pack: 'ext', group: 'Extended pack', item: 'Five meals', req: 'T' },
  { pack: 'ext', group: 'Extended pack', item: 'Large trash bags (x2)', req: 'GTM', contents: '30 gallon or larger' },
  { pack: 'ext', group: 'Extended pack', item: 'Sleeping bag or bedroll for the climate', req: 'T' },
  { pack: 'ext', group: 'Extended pack', item: 'Sleeping pad, foam or inflatable', req: 'GTM' },
  { pack: 'ext', group: 'Extended pack', item: 'Spare boot laces', req: 'GTM' },
  { pack: 'ext', group: 'Extended pack', item: 'Sewing kit with spare buttons', req: 'GTM' },
  { pack: 'ext', group: 'Clothing', item: 'Spare uniform', req: 'GTM' },
  { pack: 'ext', group: 'Clothing', item: 'Underwear and socks, 3 changes', req: 'T' },
  { pack: 'ext', group: 'Toilet kit', item: 'Toothbrush and paste', req: 'T' },
  { pack: 'ext', group: 'Toilet kit', item: 'Personal hygiene kit', req: 'T', contents: 'soap, plus shaving and feminine hygiene supplies as needed' },
  { pack: 'ext', group: 'Toilet kit', item: 'Deodorant', req: 'T' },
  { pack: 'ext', group: 'Toilet kit', item: 'Washcloth + towel', req: 'T' },
  { pack: 'ext', group: 'Toilet kit', item: 'Laundry soap', req: 'T' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Rainwear, durable', req: 'rec' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Nylon webbing, 1 in wide, 20 ft', req: 'rec' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Handheld FM transceiver', req: 'rec', now: 'Highly recommended for Ground Team Leaders.' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Water purification tablets', req: 'rec' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Eye protection', req: 'rec', now: 'Highly recommended.' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Entrenching tool', req: 'rec', now: 'Highly recommended for base gear.' },

  // Event pack (8-10 hours): base safety standard only. A pragmatic cut drawn from O-0001, not a CAP-published list.
  // No clothing spares (members change at home after a day event). Weather or event conditions
  // (rain gear, warm layer, sun and bugs, reflective vest) are added per event, not part of the base.
  { pack: 'event', group: 'On your person', item: 'CAP ID and CAPF 101 card', req: 'T' },
  { pack: 'event', group: 'Pack', item: 'Hydration pack, 2-quart capacity', req: 'T', sub: 'day pack with bottles holding 2 quarts' },
  { pack: 'event', group: 'Pack', item: 'Meal and snacks for the day', req: 'T' },
  { pack: 'event', group: 'Pack', item: 'Flashlight / headlamp', req: 'T' },
  { pack: 'event', group: 'Pack', item: 'Notepad with pen / pencil', req: 'T' },
  { pack: 'event', group: 'Pack', item: 'Compass', req: 'T' },
  { pack: 'event', group: 'Pack', item: 'Signal mirror', req: 'T' },
  { pack: 'event', group: 'Pack', item: 'Whistle', req: 'T' },
  { pack: 'event', group: 'Pack', item: 'PFAK (Personal First Aid Kit)', req: 'T', contents: 'Band-Aids, moleskin and gloves in a zip-lock bag' },
  { pack: 'event', group: 'Safety check', item: 'Personal medications on hand; leader knows what and where', req: 'T', conditional: true },
];

// Safety check, then GTL only, always come last.
const LAST: Record<string, number> = { 'Safety check': 1, 'GTL only': 2 };
export const GROUPS = Array.from(new Set(PACK.map(p => p.group))).sort((a, b) => (LAST[a] || 0) - (LAST[b] || 0));

export const inPacks = (p: PackItem, lvl: InspectionLevel) => lvl.packs.includes(p.pack || '24');
export const isRequired = (p: PackItem, lvl: InspectionLevel) => p.req !== 'rec' && inPacks(p, lvl) && lvl.includes.includes(p.req);
export const levelSource = (l: InspectionLevel) => l.source || SOURCE;
export const levelTitle = (l: InspectionLevel) => `${modeLabel(l.mode)} pack`;
// In screen order: by section (GROUPS order), then list order within a section.
export const requiredItems = (lvl: InspectionLevel) => PACK.map((p, i) => ({ p, i })).filter(({ p }) => isRequired(p, lvl))
  .sort((x, y) => GROUPS.indexOf(x.p.group) - GROUPS.indexOf(y.p.group) || x.i - y.i);

// O-0001: "All required items must be present... No exceptions or substitutions."
// The tool also requires each present item to be serviceable; worn-out or used-up items are rated Fail.
export const tally = (lvl: InspectionLevel, r: Record<number, Rating>) => {
  const req = requiredItems(lvl);
  const counted = req.filter(({ i }) => r[i] !== 'NA');
  return {
    need: counted.length,
    ready: counted.filter(({ i }) => r[i] === 'Pass').length,
    rated: req.filter(({ i }) => r[i]).length,
    total: req.length,
  };
};

// Items rated Fail go on the refit list (Task O-0002, 4 R's).
export const refitList = (lvl: InspectionLevel, r: Record<number, Rating>) =>
  requiredItems(lvl).filter(({ i }) => r[i] === 'Fail').map(({ p }) => p);

export const MIN_FEEDBACK_WORDS = 5;
export const wordCount = (t: string) => (t.trim().match(/\S+/g) || []).length;

export const CAP_COLORS = { blue: '#001489', red: '#BA0C2F', body: '#4D4D4D' };

// Task O-0002 "Conduct Individual Refit" (31-JAN-01): the 4 R's, in order.
export const REFIT_STEPS = [
  { r: 'Replenish', text: 'Restock anything missing or used: food, water, batteries and medical supplies first. After a mission, buy replacements before the next alert.' },
  { r: 'Repair', text: 'Inspect every item and fix what you can in the field. After a mission, also clean the uniform and gear, dry tents and air out sleeping bags.' },
  { r: 'Repack', text: 'Pack so you can leave at a moment’s notice.' },
  { r: 'Rest', text: 'Rest only after the gear is ready. Alerts can come within hours.' },
];
