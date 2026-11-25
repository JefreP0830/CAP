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
  sub?: string;           // permitted substitute, the only text shown under an item while inspecting
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

export const LEVELS: InspectionLevel[] = [
  { id: 'EV', mode: 'Event', name: 'Event', who: 'Base safety standard for a day activity of 8 to 10 hours. Add items for weather or event conditions.', includes: ['T'], packs: ['event'],
    source: 'Day-activity safety list, drawn from O-0001; not a CAP-published standard' },
  { id: 'GTM', mode: '24', name: 'Ground Team Member', who: 'Every 24-hour pack item. Qualified GTMs and anyone signing off Task O-0001.', includes: ['T', 'GTM'], packs: ['24'] },
  { id: 'GTL', mode: '24', name: 'Ground Team Leader', who: 'Every 24-hour pack item plus the leader’s equipment.', includes: ['T', 'GTM', 'GTL'], packs: ['24'] },
  { id: 'MT', mode: 'Multi', name: 'Trainee', who: 'Items marked (T) in both the 24-hour and the extended duration pack.', includes: ['T'], packs: ['24', 'ext'] },
  { id: 'MGTM', mode: 'Multi', name: 'Ground Team Member', who: 'Every item in both packs. O-0001 requires the extended pack of GTM-2 and GTM-1.', includes: ['T', 'GTM'], packs: ['24', 'ext'] },
  { id: 'MGTL', mode: 'Multi', name: 'Ground Team Leader', who: 'Every item in both packs plus the leader’s equipment.', includes: ['T', 'GTM', 'GTL'], packs: ['24', 'ext'] },
];

export const REQ_LABEL: Record<PackItem['req'], string> = { T: 'Trainee', GTM: 'GTM', GTL: 'Leader', rec: 'Recommended' };

export const SOURCE = 'Ground & UDF Team Tasks (24 May 2004), Task O-0001';

export const PACK: PackItem[] = [
  // On your person
  // The uniform (O-0001 "complete uniform with cap") is not inspected here: it is uniform, not pack equipment.
  { group: 'On your person', item: 'Notepad and pencil', req: 'T' },
  { group: 'On your person', item: 'CAP ID and CAPF 101 card', req: 'T',
    spec: 'Including 101 card, 76 card, First Aid card, etc.',
    now: 'Today: CAP ID card and a current CAPF 101 card, plus any first aid card. The CAPF 76 radio card is no longer issued.' },
  { group: 'On your person', item: 'Watch', req: 'T' },
  { group: 'On your person', item: 'Handkerchief or tissues', req: 'GTM' },
  { group: 'On your person', item: 'Vest, reflective, orange', req: 'T' },
  { group: 'On your person', item: 'Comb or brush', req: 'T', conditional: true, spec: 'Optional, carry if needed.' },
  { group: 'On your person', item: 'Ground Team Member’s Handbook', req: 'GTM', now: 'The Ground & UDF Team Task Guide itself.' },
  { group: 'On your person', item: 'Signal mirror', req: 'GTM' },
  { group: 'On your person', item: 'Pocket or utility knife with can opener', req: 'T',
    spec: 'Multipurpose with can opener. Swiss Army, Leatherman or Gerber tools are recommended.' },
  { group: 'On your person', item: 'Whistle', req: 'rec',
    now: 'Not in the national O-0001 list, but used in Task O-0406 (whistle signals) and added by many wing lists.' },

  // Container
  { group: 'Pack', item: 'Day pack, webbed gear or SAR/survival vest', req: 'T',
    spec: 'Preferably red or orange. Holds every item below.' },
  { group: 'Pack', item: 'Two meals', req: 'T' },
  { group: 'Pack', item: 'Shelter material', sub: 'spare military poncho', req: 'GTM', spec: 'Preferably 8 ft by 10 ft. A spare military poncho meets the need.' },
  { group: 'Pack', item: 'Coat for the climate', req: 'T', conditional: true, spec: 'If necessary. In the pack when not worn.' },
  { group: 'Pack', item: 'Poncho', req: 'T' },
  { group: 'Pack', item: 'Canteens for 2 quarts of water', req: 'T',
    spec: 'At least one quart of water must be carried by all personnel. Some wings require one quart on the belt.' },
  { group: 'Pack', item: 'Compass in pouch, glow-in-the-dark dial', req: 'GTM',
    spec: 'Lensatic or orienteering (orienteering preferred), glow-in-the-dark dial.' },

  // First aid kit
  { group: 'First aid kit', item: 'Waterproof first aid kit', sub: 'zip-lock bag', req: 'GTM', spec: 'In a zip-lock bag or other waterproof container.' },
  { group: 'First aid kit', item: 'Antiseptic cleansing pads (2)', req: 'GTM' },
  { group: 'First aid kit', item: 'Antiseptic ointment', req: 'GTM' },
  { group: 'First aid kit', item: 'Band-Aids, various sizes (6)', req: 'GTM' },
  { group: 'First aid kit', item: 'Moleskin, 2 in by 4 in', req: 'GTM' },
  { group: 'First aid kit', item: 'Roller bandage', req: 'GTM' },
  { group: 'First aid kit', item: 'Safety pins, large (2)', req: 'GTM' },
  { group: 'First aid kit', item: 'Gauze pads (4)', req: 'GTM' },
  { group: 'First aid kit', item: 'Triangular bandage (1)', req: 'GTM' },
  { group: 'First aid kit', item: 'First aid tape', req: 'GTM' },
  { group: 'First aid kit', item: 'Personal medication', req: 'T', conditional: true,
    spec: 'Any personal medication. Your team leader should know what you have and where you carry it.' },
  { group: 'First aid kit', item: 'Rubber surgical gloves (2 pair minimum)', req: 'GTM' },

  // Survival kit
  { group: 'Survival kit', item: 'Waterproof survival kit bag', sub: 'zip-lock bag', req: 'GTM', spec: 'In a zip-lock bag or other waterproof container.' },
  { group: 'Survival kit', item: 'Duct tape, 5 to 10 ft', sub: 'a partial roll wrapped around a stick', req: 'GTM', spec: 'Need not be a whole roll; may be wrapped around a stick.' },
  { group: 'Survival kit', item: 'Leaf bag, large', req: 'GTM' },
  { group: 'Survival kit', item: 'Wooden waterproofed matches (12)', req: 'T',
    now: 'Check the activity’s rules first; some cadet activities do not allow matches.' },
  { group: 'Survival kit', item: 'Waterproof match container with striker', req: 'GTM' },
  { group: 'Survival kit', item: 'Chemical light stick, green (1)', req: 'T' },
  { group: 'Survival kit', item: 'Nylon line, 50 ft', sub: 'paracord or similar line', req: 'GTM', spec: 'Paracord or similar.' },

  // SAR equipment
  { group: 'SAR equipment', item: 'Change of socks', req: 'T', spec: 'SAR items stored in zip-lock bags.' },
  { group: 'SAR equipment', item: 'Flagging tape (1 roll)', req: 'GTM' },
  { group: 'SAR equipment', item: 'Flashlight, red or blue lens', req: 'GTM', spec: 'With spare bulb and batteries.' },
  { group: 'SAR equipment', item: 'Spare flashlight', sub: 'penlight', req: 'T', spec: 'A penlight will do.' },
  { group: 'SAR equipment', item: 'Insect repellent', req: 'GTM' },
  { group: 'SAR equipment', item: 'Lip balm with sunscreen', req: 'GTM' },
  { group: 'SAR equipment', item: 'Sunscreen lotion', req: 'GTM' },
  { group: 'SAR equipment', item: 'Tissue paper', req: 'T' },
  { group: 'SAR equipment', item: 'Work gloves, leather', req: 'T' },
  { group: 'SAR equipment', item: 'Interviewing forms, blank', req: 'GTM', now: 'CAPF 106.' },
  { group: 'SAR equipment', item: 'Moist towelettes in foil (4)', req: 'GTM' },
  { group: 'SAR equipment', item: 'Cell phone to call mission base', sub: 'change for phone calls or a calling card', req: 'T',
    spec: 'The guide also allows change for phone calls or a calling card.', now: 'Charged, with mission base number saved.' },

  // Leader's equipment
  { group: 'Leader’s equipment', item: 'Protractor for map work', req: 'GTL' },
  { group: 'Leader’s equipment', item: 'Map case', sub: 'large zip-lock bags', req: 'GTL', spec: 'Large zip-lock bags can be used if necessary.' },
  { group: 'Leader’s equipment', item: 'Pencil with eraser', req: 'GTL', spec: 'Plus a sharpener if not a mechanical pencil.' },
  { group: 'Leader’s equipment', item: 'Alcohol pens, fine tip, 2 colors', req: 'GTL', spec: 'Neither the color of your flashlight lens.' },
  { group: 'Leader’s equipment', item: 'Alcohol pen eraser or swabs', req: 'GTL', spec: 'Alcohol swabs or an alcohol pen eraser.' },
  { group: 'Leader’s equipment', item: 'Straightedge ruler, 6 in or longer', sub: 'protractor with a ruler edge', req: 'GTL', spec: 'Some protractors have one.' },
  { group: 'Leader’s equipment', item: 'Ground Team Leader Handbook', req: 'GTL' },

  // O-0001 performance measures 3 and 4 (checked with the pack worn)
  { group: 'Worn checks', item: 'Pack secure when worn', req: 'T',
    spec: 'No undue shifting, snagging or movement. Nothing flapping loose to snag in brush or bang against the body (O-0001 measure 3).' },
  { group: 'Worn checks', item: 'Knives approved type, worn correctly', req: 'T',
    spec: 'Sheath knife only if the team leader authorizes it: blade 6 in or less, 11 in overall, on the pistol belt or in the pack. Not allowed: boot, butterfly, switchblade, double-edged, "Rambo" survival knives, or retracting sheaths (O-0001 measure 4).' },

  // Extended duration pack (O-0001): "to help you live in the field for more than one day, typically 48 to 72 hours."
  { pack: 'ext', group: 'Extended pack', item: 'Backpack, preferably with frame', req: 'T', spec: 'Holds everything below. You must be able to carry all your gear at once.' },
  { pack: 'ext', group: 'Extended pack', item: 'Tent', req: 'T', conditional: true, spec: 'Optional if you share a tent with someone who carries it.' },
  { pack: 'ext', group: 'Extended pack', item: 'Spare rank and CAP cutouts', req: 'GTM', conditional: true, spec: 'For cadets.' },
  { pack: 'ext', group: 'Extended pack', item: 'Five meals', req: 'T' },
  { pack: 'ext', group: 'Extended pack', item: 'Leaf bags, large (2)', req: 'GTM' },
  { pack: 'ext', group: 'Extended pack', item: 'Sleeping bag or bedroll for the climate', req: 'T' },
  { pack: 'ext', group: 'Extended pack', item: 'Sleeping pad, foam or inflatable', req: 'GTM' },
  { pack: 'ext', group: 'Extended pack', item: 'Spare boot laces', req: 'GTM' },
  { pack: 'ext', group: 'Extended pack', item: 'Sewing kit with spare buttons', req: 'GTM' },
  { pack: 'ext', group: 'Extended pack', item: 'Shoe shine kit', req: 'GTM' },
  { pack: 'ext', group: 'Waterproof clothing bag', item: 'Waterproof bag', req: 'T' },
  { pack: 'ext', group: 'Waterproof clothing bag', item: 'Spare uniform', req: 'GTM' },
  { pack: 'ext', group: 'Waterproof clothing bag', item: 'Underwear and socks, 3 changes', req: 'T' },
  { pack: 'ext', group: 'Toilet kit', item: 'Toothbrush and paste', req: 'T' },
  { pack: 'ext', group: 'Toilet kit', item: 'Shaving kit', req: 'T', conditional: true, spec: 'If you shave.' },
  { pack: 'ext', group: 'Toilet kit', item: 'Deodorant', req: 'T' },
  { pack: 'ext', group: 'Toilet kit', item: 'Washcloth and soap', req: 'T' },
  { pack: 'ext', group: 'Toilet kit', item: 'Towel', req: 'T' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Rainwear, durable', req: 'rec' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Nylon webbing, 1 in wide, 20 ft', req: 'rec' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Handheld FM transceiver', req: 'rec', now: 'Highly recommended for Ground Team Leaders.' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Water purification tablets', req: 'rec' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Eye protection', req: 'rec', now: 'Highly recommended.' },
  { pack: 'ext', group: 'Extended pack optional items', item: 'Entrenching tool', req: 'rec', now: 'Highly recommended for base gear.' },
  { pack: 'ext', group: 'Worn checks, extended pack', item: 'Extended pack secure when worn', req: 'T',
    spec: 'With the 24-hour pack stowed, worn or secured, items are secure from undue shifting or movement (O-0001 measure 5).' },

  // Event pack (8-10 hours): base safety standard only. A pragmatic cut drawn from O-0001, not a CAP-published list.
  // No clothing spares (members change at home after a day event). Weather or event conditions
  // (rain gear, warm layer, sun and bugs, reflective vest) are added per event, not part of the base.
  { pack: 'event', group: 'On your person', item: 'CAP ID and CAPF 101 card', req: 'T' },
  { pack: 'event', group: 'On your person', item: 'Whistle', req: 'T' },
  { pack: 'event', group: 'Pack', item: 'Hydration pack, 2-quart capacity', req: 'T', sub: 'day pack with bottles holding 2 quarts' },
  { pack: 'event', group: 'Pack', item: 'Meal and snacks for the day', req: 'T' },
  { pack: 'event', group: 'Pack', item: 'Flashlight / headlamp', req: 'T' },
  { pack: 'event', group: 'Pack', item: 'Notepad with pen / pencil', req: 'T' },
  { pack: 'event', group: 'Pack', item: 'Compass with signal mirror', req: 'T' },
  { pack: 'event', group: 'First aid kit', item: 'PFAK (Personal First Aid Kit)', req: 'T' },
  { pack: 'event', group: 'Safety check', item: 'Personal medications on hand; leader knows what and where', req: 'T', conditional: true },
];

export const GROUPS = Array.from(new Set(PACK.map(p => p.group)));

export const inPacks = (p: PackItem, lvl: InspectionLevel) => lvl.packs.includes(p.pack || '24');
export const isRequired = (p: PackItem, lvl: InspectionLevel) => p.req !== 'rec' && inPacks(p, lvl) && lvl.includes.includes(p.req);
export const levelSource = (l: InspectionLevel) => l.source || SOURCE;
export const levelTitle = (l: InspectionLevel) => l.mode === 'Event' ? 'Event pack' : `${modeLabel(l.mode)} pack: ${l.name}`;
export const requiredItems = (lvl: InspectionLevel) => PACK.map((p, i) => ({ p, i })).filter(({ p }) => isRequired(p, lvl));

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
