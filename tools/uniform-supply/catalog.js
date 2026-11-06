// VT-014 Uniform Supply - item catalog (single source).
// No member data here, ever (docs/decisions.md D-001).
//
// Rules (Lt Palmer, 6 Nov 2026):
// - No links to product pages. Staff find items by the exact Vanguard title,
//   starting from https://www.vanguardmil.com only.
// - No swaps. If the listed size is not available, stop on that line and
//   mark it NOT AVAILABLE. Never substitute a different item or size.
// - Personalized text is entered in ALL CAPS.
//
// One item = one line on a pack list. An item may span more than one Vanguard
// product when the member's own answers decide which one applies:
//   style  "Male" / "Female" (Blues shirt, trousers, belt; CWU polo)
//   youth vs adult OCP is decided by the size the member picks.
// That is a selection made at intake, not a swap at order time.
//
// variants: [Vanguard option exactly as the site shows it, SKU, price USD].
// SKU and price are per size: they come from vanguardmil.com product data,
// read 6 Nov 2026. Audit SKUs against prior squadron purchases.
// kits: K1 Cadet OCP, K2 Senior OCP, K3 Cadet Blues, K4 Senior CWU.
// The JSON between the DATA markers is parsed by build_template.py.
const CATALOG = /*DATA*/[
 {"id":"OCP-01","uniform":"OCP","item":"OCP coat","kits":{"K1":1,"K2":1},"ask":"OCP coat size","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.1",
  "note":"Cadets may pick youth or adult sizes; seniors adult only.",
  "products":[
   {"title":"Civil Air Patrol OCP Uniform: Youth Shirt (coat)","style":"","option":"Size","variants":[["Youth Size 8","CAP2005",59.20],["Youth Size 10","CAP2006",59.20],["Youth Size 12","CAP2007",59.20]]},
   {"title":"Civil Air Patrol OCP Uniform: Adult Shirt (coat)","style":"","option":"Size","variants":[["X-Small","CAP2013",69.00],["Small","CAP2008",69.00],["Medium","CAP2009",69.00],["Large","CAP2010",69.00],["XL","CAP2011",69.00],["2XL","CAP2012",69.00]]}]},
 {"id":"OCP-02","uniform":"OCP","item":"OCP trousers","kits":{"K1":1,"K2":1},"ask":"OCP trouser size","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.6",
  "note":"Cadets may pick youth or adult sizes; seniors adult only.",
  "products":[
   {"title":"Civil Air Patrol OCP Uniform: Youth Pants","style":"","option":"Size","variants":[["Youth Size 8","CAP2014",59.20],["Youth Size 10","CAP2015",59.20],["Youth Size 12","CAP2016",59.20]]},
   {"title":"Civil Air Patrol OCP Uniform: Adult Pants","style":"","option":"Size","variants":[["X-Small","CAP2022",69.00],["Small","CAP2017",69.00],["Medium","CAP2018",69.00],["Large","CAP2019",69.00],["XL","CAP2020",69.00],["2XL","CAP2021",69.00]]}]},
 {"id":"OCP-03","uniform":"OCP","item":"T-shirt, coyote brown","kits":{"K1":1,"K2":1},"ask":"T-shirt size","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.5",
  "note":"Not the 'T-Shirt Tan' item.",
  "products":[{"title":"Civil Air Patrol Uniform: T-Shirt OCP","style":"","option":"Size","variants":[["Small","CAP2040",8.00],["Medium","CAP2041",8.00],["Large","CAP2042",8.00],["XL","CAP2043",8.00],["2XL","CAP2044",8.00]]}]},
 {"id":"OCP-04","uniform":"OCP","item":"Rigger belt, tan","kits":{"K1":1,"K2":1},"ask":"Belt length","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.7",
  "note":"Belt is cut to fit. 44 inches unless the member asks for 55.",
  "products":[{"title":"Civil Air Patrol Rigger Belt: Khaki Nylon Rigger Belt with Buckle (Tan 499)","style":"","option":"Size","variants":[["44 inches","CAP2510700",14.10],["55 inches","CAP2510701",14.25]]}]},
 {"id":"OCP-05","uniform":"OCP","item":"Boots, coyote brown, side zip","kits":{"K1":1,"K2":1},"ask":"Boot size","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.9",
  "note":"Sizes are men's, with the women's equal shown up to men's 8 1/2.",
  "products":[{"title":"Civil Air Patrol: Coyote Boots Side zip (Unisex)","style":"","option":"Boot Size","variants":[
   ["3 Regular Male- 5 Regular Female","CAP2070",119.90],["3.5 Regular Male- 5.5 Regular Female","CAP2071",119.90],["4 Regular Male- 6 Regular Female","CAP2072",119.90],["4.5 Regular Male- 6.5 Regular Female","CAP2073",119.90],["5 Regular Male- 7 Regular Female","CAP2074",119.90],["5 1/2 Regular Male- 7 1/2 Regular Female","CAP2075",119.90],["6 Regular Male- 8 Regular Female","CAP2076",119.90],["6 1/2 Regular Male- 8 1/2 Regular Female","CAP2077",119.90],["7 Regular Male- 9 Regular Female","CAP2078",119.90],["7 Wide Male- 9 Wide Female","CAP2078W",119.90],["7 1/2 Regular Male- 9 1/2 Regular Female","CAP2079",119.90],["7 1/2 Wide Male- 9 1/2 Wide Female","CAP2079W",119.90],["8 Regular Male- 10 Regular Female","CAP2080",119.90],["8 Wide Male- 10 Wide Female","CAP2080W",119.90],["8 1/2 Regular- 10 1/2 Regular Female","CAP2081",119.90],["8 1/2 Wide Male- 10 1/2 Wide Female","CAP2081W",119.90],["9 Regular Male","CAP2082",119.90],["9 Wide Male","CAP2082W",119.90],["9 1/2 Regular Male","CAP2083",119.90],["9 1/2 Wide Male","CAP2083W",119.90],["10 Regular Male","CAP2084",119.90],["10 Wide Male","CAP2084W",119.90],["10 1/2 Regular Male","CAP2085",119.90],["10 1/2 Wide Male","CAP2085W",119.90],["11 Regular Male","CAP2086",119.90],["11 Wide Male","CAP2086W",119.90],["11 1/2 Regular Male","CAP2087",119.90],["11 1/2 Wide Male","CAP2087W",119.90],["12 Regular Male","CAP2088",119.90],["12 Wide Male","CAP2088W",119.90],["13 Regular Male","CAP2089",119.90],["13 Wide Male","CAP2089W",119.90],["14 Regular Male","CAP2090",119.90],["14 Wide Male","CAP2090W",119.90]]}]},
 {"id":"OCP-06","uniform":"OCP","item":"Boot socks, tan","kits":{"K1":1,"K2":1},"ask":"Boot sock size","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.9",
  "note":"Vanguard: fits men's shoe 5 1/2 to 8 1/2, women's 6 1/2 to 10 (read as Medium). Larger feet: Large. Black socks are not allowed with OCP.",
  "products":[{"title":"Boot Socks: Thorlo - tan 499 (OCP) over-the-calf","style":"","option":"Size","variants":[["Medium","CAP2500M",21.35],["Large","CAP2500N",21.35]]}]},
 {"id":"OCP-07","uniform":"OCP","item":"Patrol cap","kits":{"K1":1,"K2":1},"ask":"OCP cap size","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.8",
  "note":"Carries the second name tape on the back.",
  "products":[{"title":"Civil Air Patrol Uniform: OCP Cap-Flat Top","style":"","option":"Cap Size","variants":[["6 3/4","CAP2025",14.45],["7","CAP2026",14.45],["7 1/4","CAP2027",14.45],["7 1/2","CAP2028",14.45],["7 3/4","CAP2029",14.45]]}]},
 {"id":"OCP-08","uniform":"OCP","item":"Name tape","kits":{"K1":2,"K2":2},"ask":"","custom":"LAST NAME","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.2.3, §7.1.1.8",
  "note":"Quantity 2: coat and cap. Adds 5-7 working days.",
  "products":[{"title":"CAP Embroidered Name Tape: Last Name Only, w/ hook closure (New Insignia)","style":"","option":"","variants":[["","CAP6401",4.65]]}]},
 {"id":"OCP-09","uniform":"OCP","item":"CIVIL AIR PATROL tape","kits":{"K1":1,"K2":1},"ask":"","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.2.3",
  "note":"The title says fleece jacket; it is the same tape for the coat.",
  "products":[{"title":"Civil Air Patrol Tape: Civil Air Patrol with hook closure for Fleece jacket (New Insignia)","style":"","option":"","variants":[["","CAP6404",4.15]]}]},
 {"id":"OCP-10","uniform":"OCP","item":"US flag, reversed","kits":{"K1":1,"K2":1},"ask":"","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.4.1.1","note":"",
  "products":[{"title":"Flag Patch: United States of America - hook closure gold edge reversed","style":"","option":"","variants":[["","CAP4432431",6.30]]}]},
 {"id":"OCP-11","uniform":"OCP","item":"AUX patch","kits":{"K1":1,"K2":1},"ask":"","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.4.2","note":"",
  "products":[{"title":"Civil Air Patrol Tape: AUX Patch","style":"","option":"","variants":[["","CAP6087",3.00]]}]},
 {"id":"OCP-12","uniform":"OCP","item":"Vermont Wing patch","kits":{"K1":1,"K2":1},"ask":"","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.4.2.1","note":"",
  "products":[{"title":"Civil Air Patrol Patch: Vermont Wing w/ HOOK","style":"","option":"","variants":[["","CAP0638SV",5.10]]}]},
 {"id":"OCP-13","uniform":"OCP","item":"VT-014 unit patch","kits":{"K1":1,"K2":1},"ask":"","custom":"","source":"Squadron stock","cite":"CAPR 39-1 ICL 26-14 §7.1.1.4.1.2",
  "note":"Issue from the squadron locker. Not on Vanguard.","products":[]},
 {"id":"OCP-14","uniform":"OCP","item":"Blank 2x2 tab","kits":{"K2":1},"ask":"","custom":"","source":"Vanguard","cite":"CAPR 39-1 ICL 26-14 §7.1.1.2.1",
  "note":"Seniors without grade insignia. The title says NCO rank; it is the blank tab.",
  "products":[{"title":"Civil Air Patrol Fleece Rank: Non-Commissioned Officers (New Insignia)","style":"","option":"","variants":[["","CAP6038",2.15]]}]},
 {"id":"BLU-01","uniform":"Blues","item":"Light blue shirt, short sleeve","kits":{"K3":1},"ask":"Blues shirt size","custom":"","source":"Vanguard","cite":"CAPR 39-1 §4.1.11.1.1, §4.1.12.2",
  "note":"Male: neck size. Female: overblouse, dress size.",
  "products":[
   {"title":"Civil Air Patrol Uniform: Short Sleeve Dress Shirt - male","style":"Male","option":"Size","variants":[["13 1/2 Neck Measurement","CAP1001",62.25],["14 1/2 Neck Measurement","CAP1001A",62.25],["15 1/2 Neck Measurement","CAP1001C",62.25],["16 1/2 Neck Measurement","CAP1001E",62.25],["17 1/2 Neck Measurement","CAP1001G",62.25],["18 1/2 Neck Measurement","CAP1001I",62.25]]},
   {"title":"Civil Air Patrol Uniform: Dress Shirt Overblouse - female","style":"Female","option":"Size","variants":[["2","CAP1017J",62.30],["4","CAP1017K",62.30],["6","CAP1017",62.30],["8","CAP1017A",62.30],["10","CAP1017B",62.30],["12","CAP1017C",62.30],["14","CAP1017D",62.30],["16","CAP1017E",62.30],["18","CAP1017F",62.30],["20","CAP1017G",62.30],["22","CAP1017H",62.30]]}]},
 {"id":"BLU-02","uniform":"Blues","item":"Blue trousers or slacks","kits":{"K3":1},"ask":"Blues trouser size","custom":"","source":"Vanguard","cite":"CAPR 39-1 §4.1.11.1.1.4, §4.1.12.5",
  "note":"Arrive unhemmed; must be hemmed before wear.",
  "products":[
   {"title":"Civil Air Patrol Uniform: Trouser - male","style":"Male","option":"Size","variants":[["26","CAP0993A",78.00],["28","CAP0993B",78.00],["30","CAP0993D",78.00],["32","CAP0993E",78.00],["34","CAP0993F",78.00],["36","CAP0993G",78.00],["38","CAP0993H",78.00],["40","CAP0993I",78.00],["42","CAP0993J",78.00],["44","CAP0993K",78.00],["46","CAP0993L",78.00],["48","CAP0993M",78.00],["50","CAP0993N",78.00],["52","CAP0993O",84.90],["54","CAP0993P",84.90],["56","CAP0993Q",84.90],["58","CAP0993R",92.15]]},
   {"title":"Civil Air Patrol Uniform: Slacks - female","style":"Female","option":"Size","variants":[["2","CAP3500J",70.95],["4","CAP3500K",70.95],["6","CAP3500A",70.95],["8","CAP3500B",70.95],["10","CAP3500C",70.95],["12","CAP3500D",70.95],["14","CAP3500E",70.95],["16","CAP3500F",70.95],["18","CAP3500G",70.95],["20","CAP3500H",70.95]]}]},
 {"id":"BLU-03","uniform":"Blues","item":"Blue belt, silver buckle","kits":{"K3":1},"ask":"Blues belt length","custom":"","source":"Vanguard","cite":"CAPR 39-1 §4.1.11.1.1.5, §4.1.12.7",
  "note":"Standard unless the member asks for Extra Long. Tip faces left (male), right (female).",
  "products":[
   {"title":"Air Force Belt: Blue Cotton with Mirror Buckle and Tip - male","style":"Male","option":"","variants":[["Standard","2500500",20.60],["Extra Long","2500511",27.40]]},
   {"title":"Air Force Belt: Blue Elastic with Mirror Buckle and Tip - female","style":"Female","option":"","variants":[["Standard","2500550",21.70],["Extra Long","2500551",24.00]]}]},
 {"id":"BLU-04","uniform":"Blues","item":"Flight cap","kits":{"K3":1},"ask":"Flight cap size","custom":"","source":"Vanguard","cite":"CAPR 39-1 §4.1.11.1.1.7, §4.1.12.9",
  "note":"All cadets wear the male style (allowed for women).",
  "products":[{"title":"Civil Air Patrol Uniform: Flight Cap: Airman - male","style":"","option":"Cap Size","variants":[["6 1/2","CAP0994K",25.50],["6 5/8","CAP0994L",25.50],["6 3/4","CAP0994M",25.50],["6 7/8","CAP0994N",25.50],["7","CAP0994O",25.50],["7 1/8","CAP0994P",25.50],["7 1/4","CAP0994Q",25.50],["7 3/8","CAP0994R",25.50],["7 1/2","CAP0994S",25.50],["7 5/8","CAP0994T",25.50],["7 3/4","CAP0994U",25.50],["7 7/8","CAP0994X",25.50],["8","CAP0994W",25.50]]}]},
 {"id":"BLU-05","uniform":"Blues","item":"Flight cap device","kits":{"K3":1},"ask":"","custom":"","source":"Vanguard","cite":"CAPR 39-1 §4.1.11.1.1.7","note":"",
  "products":[{"title":"Civil Air Patrol Cap Device: Cadet Enlisted - Flight","style":"","option":"","variants":[["","CAP0748A",8.60]]}]},
 {"id":"BLU-06","uniform":"Blues","item":"Cadet nameplate","kits":{"K3":1},"ask":"","custom":"LAST NAME","source":"Vanguard","cite":"CAPR 39-1 §4.1.11.1.1.2.1",
  "note":"Adds 7-10 working days.",
  "products":[{"title":"Civil Air Patrol Name Plate: Cadet","style":"","option":"","variants":[["","CAP0599M",5.10]]}]},
 {"id":"BLU-07","uniform":"Blues","item":"Black dress socks","kits":{"K3":1},"ask":"","custom":"","source":"Vanguard","cite":"CAPR 39-1 §4.1.11.1.1.6","note":"",
  "products":[{"title":"Black Dress Sock","style":"","option":"Size","variants":[["Large","CAP25001",9.95]]}]},
 {"id":"BLU-08","uniform":"Blues","item":"Black low quarter shoes","kits":{"K3":1},"ask":"","custom":"","source":"Member","cite":"CAPR 39-1 §4.1.11.1.1.6",
  "note":"Member provides. Not ordered.","products":[]},
 {"id":"BLU-09","uniform":"Blues","item":"White V-neck undershirt","kits":{"K3":1},"ask":"","custom":"","source":"Member","cite":"CAPR 39-1 §4.1.11.1.1, §4.1.12.2",
  "note":"Member provides. Not ordered. Required for men, optional for women.","products":[]},
 {"id":"CWU-01","uniform":"Corporate Working","item":"Polo with CAP seal, personalized","kits":{"K4":1},"ask":"Polo size","custom":"FIRST AND LAST NAME","source":"Vanguard","cite":"CAPR 39-1 §5.3.1.1, §5.3.2.1.1",
  "note":"Tick the embroidery box on the product page. No grade on the polo.",
  "products":[
   {"title":"Civil Air Patrol Uniform: Golf Shirt with Seal - male (PERSONALIZED)","style":"Male","option":"Size","variants":[["Small","CAP0320",46.70],["Medium","CAP0321",46.70],["Large","CAP0322",46.70],["Large-Tall","CAP0326",46.70],["XL","CAP0323",46.70],["XL-Tall","CAP0327",48.15],["2XL","CAP0324",51.40],["2XL-Tall","CAP0328",52.95],["3XL","CAP0325",54.75],["3XL-Tall","CAP0329",57.30],["4XL-Tall","CAP0330",58.65],["5XL- Tall","CAP0331",61.10],["6XL- Tall","CAP0332",61.10]]},
   {"title":"Civil Air Patrol Uniform: Golf Shirt with Seal - female (PERSONALIZED)","style":"Female","option":"Size","variants":[["Small","CAP0342",46.70],["Medium","CAP0343",46.70],["Large","CAP0344",46.70],["XL","CAP0345",46.70],["2XL","CAP0346",46.70],["3XL","CAP0347",54.75]]}]},
 {"id":"CWU-02","uniform":"Corporate Working","item":"Gray trousers, tactical","kits":{"K4":1},"ask":"Gray trouser size","custom":"","source":"Vanguard","cite":"CAPR 39-1 §5.3.3",
  "note":"Arrive hemmed.",
  "products":[{"title":"Civil Air Patrol Uniform: Grey Trouser (Tactical) HEMMED","style":"","option":"Size","variants":[["28","CAP0129",62.95],["30","CAP0130",62.95],["32","CAP0131",62.95],["34","CAP0132",62.95],["36","CAP0133",62.95],["38","CAP0134",62.95],["40","CAP0135",62.95],["42","CAP0136",62.95],["44","CAP0137",62.95]]}]},
 {"id":"CWU-03","uniform":"Corporate Working","item":"Rigger belt, black","kits":{"K4":1},"ask":"Belt length","custom":"","source":"Vanguard","cite":"CAPR 39-1 §5.3.5",
  "note":"Belt is cut to fit. 44 inches unless the member asks for 55.",
  "products":[{"title":"Rigger Belt: Black Nylon Rigger Belt with Buckle","style":"","option":"Size","variants":[["44 inches","2510600",14.10],["55 inches","2510601",14.70]]}]},
 {"id":"CWU-04","uniform":"Corporate Working","item":"Black socks","kits":{"K4":1},"ask":"","custom":"","source":"Vanguard","cite":"CAPR 39-1 §5.3.8.1","note":"",
  "products":[{"title":"Black Dress Sock","style":"","option":"Size","variants":[["Large","CAP25001",9.95]]}]},
 {"id":"CWU-05","uniform":"Corporate Working","item":"Black shoes or boots","kits":{"K4":1},"ask":"","custom":"","source":"Member","cite":"CAPR 39-1 §5.3.6",
  "note":"Member provides. Not ordered.","products":[]}
]/*DATA*/;

const KITS = {
  K1: "Cadet OCP",
  K2: "Senior OCP",
  K3: "Cadet Blues (Class B, short sleeve)",
  K4: "Senior Corporate Working Uniform"
};
