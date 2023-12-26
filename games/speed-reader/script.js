let currentMode = "standard"; // Default game mode
let currentDifficulty = "Characters"; // Default difficulty
let currentLevel = "1"; // Default level
let currentQuestionIndex = 0;
let score = 0;
let mistakes = 0;
const gameContainer = document.getElementById('game-container');


let displaySpeeds = {
    "5 sec": 5000,
    "2 sec": 2000,
    "1 sec": 1000,
    "500ms": 500,
    "250ms": 250,
    "150ms": 150,
    "100ms": 100,
    "75ms": 75,
    "50ms": 50,
    "25ms": 25,
    "13ms": 13,
    "8ms": 8
};

let currentSpeed = displaySpeeds["500ms"]; // Set the default speed to 500 milliseconds


let twoLetterWords = ["AA","AB","AD","AE","AG","AH","AI","AL","AM","AN","AR","AS","AT","AW","AX","AY","BA","BE","BI","BO","BY","CH","DA","DE","DI","DO","EA","ED","EE","EF","EH","EL","EM","EN","ER","ES","ET","EX","FA","FE","FY","GI","GO","GU","HA","HE","HI","HM","HO","ID","IF","IN","IO","IS","IT","JA","JO","KA","KI","KO","KY","LA","LI","LO","MA","ME","MI","MM","MO","MU","MY","NA","NE","NO","NU","NY","OB","OD","OE","OF","OH","OI","OM","ON","OO","OP","OR","OS","OU","OW","OX","OY","PA","PE","PI","PO","QI","RE","SH","SI","SO","ST","TA","TE","TI","TO","UG","UH","UM","UN","UP","UR","US","UT","WE","WO","XI","XU","YA","YE","YO","YU","ZA","ZO"]
let threeLetterWords = ["AAH","AAL","AAS","ABA","ABB","ABO","ABS","ABY","ACE","ACH","ACT","ADD","ADO","ADS","ADZ","AFF","AFT","AGA","AGE","AGO","AGS","AHA","AHI","AHS","AIA","AID","AIL","AIM","AIN","AIR","AIS","AIT","AKA","AKE","ALA","ALB","ALE","ALF","ALL","ALP","ALS","ALT","AMA","AMI","AMP","AMU","ANA","AND","ANE","ANI","ANN","ANT","ANY","APE","APO","APP","APT","ARB","ARC","ARD","ARE","ARF","ARK","ARM","ARS","ART","ARY","ASH","ASK","ASP","ASS","ATE","ATT","AUA","AUE","AUF","AUK","AVA","AVE","AVO","AWA","AWE","AWL","AWN","AXE","AYE","AYS","AYU","AZO","BAA","BAC","BAD","BAG","BAH","BAL","BAM","BAN","BAP","BAR","BAS","BAT","BAY","BED","BEE","BEG","BEL","BEN","BES","BET","BEY","BEZ","BIB","BID","BIG","BIN","BIO","BIS","BIT","BIZ","BOA","BOB","BOD","BOG","BOH","BOI","BOK","BON","BOO","BOP","BOR","BOS","BOT","BOW","BOX","BOY","BRA","BRO","BRR","BRU","BUB","BUD","BUG","BUM","BUN","BUR","BUS","BUT","BUY","BYE","BYS","CAA","CAB","CAD","CAG","CAM","CAN","CAP","CAR","CAT","CAW","CAY","CAZ","CEE","CEL","CEP","CHA","CHE","CHI","CID","CIG","CIS","CIT","CLY","COB","COD","COG","COL","CON","COO","COP","COR","COS","COT","COW","COX","COY","COZ","CRU","CRY","CUB","CUD","CUE","CUM","CUP","CUR","CUT","CUZ","CWM","DAB","DAD","DAE","DAG","DAH","DAK","DAL","DAM","DAN","DAP","DAS","DAW","DAY","DEB","DEE","DEF","DEG","DEI","DEL","DEN","DEV","DEW","DEX","DEY","DIB","DID","DIE","DIF","DIG","DIM","DIN","DIP","DIS","DIT","DIV","DOB","DOC","DOD","DOE","DOF","DOG","DOH","DOL","DOM","DON","DOO","DOP","DOR","DOS","DOT","DOW","DOY","DRY","DSO","DUB","DUD","DUE","DUG","DUH","DUI","DUN","DUO","DUP","DUX","DYE","DZO","EAN","EAR","EAS","EAT","EAU","EBB","ECH","ECO","ECU","EDH","EDS","EEK","EEL","EEN","EFF","EFS","EFT","EGG","EGO","EHS","EIK","EKE","ELD","ELF","ELK","ELL","ELM","ELS","ELT","EME","EMO","EMS","EMU","END","ENE","ENG","ENS","EON","ERA","ERE","ERF","ERG","ERK","ERN","ERR","ERS","ESS","EST","ETA","ETH","EUK","EVE","EVO","EWE","EWK","EWT","EXO","EYE","FAA","FAB","FAD","FAE","FAG","FAH","FAN","FAP","FAR","FAS","FAT","FAW","FAX","FAY","FED","FEE","FEG","FEH","FEM","FEN","FER","FES","FET","FEU","FEW","FEY","FEZ","FIB","FID","FIE","FIG","FIL","FIN","FIR","FIT","FIX","FIZ","FLU","FLY","FOB","FOE","FOG","FOH","FON","FOP","FOR","FOU","FOX","FOY","FRA","FRO","FRY","FUB","FUD","FUG","FUM","FUN","FUR","GAB","GAD","GAE","GAG","GAL","GAM","GAN","GAP","GAR","GAS","GAT","GAU","GAY","GED","GEE","GEL","GEM","GEN","GEO","GET","GEY","GHI","GIB","GID","GIE","GIF","GIG","GIN","GIO","GIP","GIS","GIT","GJU","GNU","GOA","GOB","GOD","GOE","GON","GOO","GOR","GOS","GOT","GOV","GOX","GOY","GUB","GUE","GUL","GUM","GUN","GUP","GUR","GUS","GUT","GUV","GUY","GYM","GYP","HAD","HAE","HAG","HAH","HAJ","HAM","HAN","HAO","HAP","HAS","HAT","HAW","HAY","HEH","HEM","HEN","HEP","HER","HES","HET","HEW","HEX","HEY","HIC","HID","HIE","HIM","HIN","HIP","HIS","HIT","HMM","HOA","HOB","HOC","HOD","HOE","HOG","HOH","HOI","HOM","HON","HOO","HOP","HOS","HOT","HOW","HOX","HOY","HUB","HUE","HUG","HUH","HUI","HUM","HUN","HUP","HUT","HYE","HYP","ICE","ICH","ICK","ICY","IDE","IDS","IFF","IFS","IGG","ILK","ILL","IMP","INK","INN","INS","ION","IOS","IRE","IRK","ISH","ISM","ISO","ITA","ITS","IVY","IWI","JAB","JAG","JAI","JAK","JAM","JAP","JAR","JAW","JAY","JEE","JET","JEU","JEW","JIB","JIG","JIN","JIZ","JOB","JOE","JOG","JOL","JOR","JOT","JOW","JOY","JUD","JUG","JUN","JUS","JUT","KAB","KAE","KAF","KAI","KAK","KAM","KAS","KAT","KAW","KAY","KEA","KEB","KED","KEF","KEG","KEN","KEP","KET","KEX","KEY","KHI","KID","KIF","KIN","KIP","KIR","KIS","KIT","KOA","KOB","KOI","KON","KOP","KOR","KOS","KOW","KUE","KYE","KYU","LAB","LAC","LAD","LAG","LAH","LAM","LAP","LAR","LAS","LAT","LAV","LAW","LAX","LAY","LEA","LED","LEE","LEG","LEI","LEK","LEP","LES","LET","LEU","LEV","LEW","LEX","LEY","LEZ","LIB","LID","LIE","LIG","LIN","LIP","LIS","LIT","LOB","LOD","LOG","LOO","LOP","LOR","LOS","LOT","LOU","LOW","LOX","LOY","LUD","LUG","LUM","LUR","LUV","LUX","LUZ","LYE","LYM","MAA","MAC","MAD","MAE","MAG","MAK","MAL","MAM","MAN","MAP","MAR","MAS","MAT","MAW","MAX","MAY","MED","MEE","MEG","MEL","MEM","MEN","MES","MET","MEU","MEW","MHO","MIB","MIC","MID","MIG","MIL","MIM","MIR","MIS","MIX","MIZ","MNA","MOA","MOB","MOC","MOD","MOE","MOG","MOI","MOL","MOM","MON","MOO","MOP","MOR","MOS","MOT","MOU","MOW","MOY","MOZ","MUD","MUG","MUM","MUN","MUS","MUT","MUX","MYC","NAB","NAE","NAG","NAH","NAM","NAN","NAP","NAS","NAT","NAW","NAY","NEB","NED","NEE","NEF","NEG","NEK","NEP","NET","NEW","NIB","NID","NIE","NIL","NIM","NIP","NIS","NIT","NIX","NOB","NOD","NOG","NOH","NOM","NON","NOO","NOR","NOS","NOT","NOW","NOX","NOY","NTH","NUB","NUN","NUR","NUS","NUT","NYE","NYS","OAF","OAK","OAR","OAT","OBA","OBE","OBI","OBO","OBS","OCA","OCH","ODA","ODD","ODE","ODS","OES","OFF","OFT","OHM","OHO","OHS","OIK","OIL","OKA","OKE","OLD","OLE","OLM","OMS","ONE","ONO","ONS","ONY","OOF","OOH","OOM","OON","OOP","OOR","OOS","OOT","OPE","OPS","OPT","ORA","ORB","ORC","ORD","ORE","ORF","ORS","ORT","OSE","OUD","OUK","OUP","OUR","OUS","OUT","OVA","OWE","OWL","OWN","OWT","OXO","OXY","OYE","OYS","PAC","PAD","PAH","PAL","PAM","PAN","PAP","PAR","PAS","PAT","PAV","PAW","PAX","PAY","PEA","PEC","PED","PEE","PEG","PEH","PEN","PEP","PER","PES","PET","PEW","PHI","PHO","PHT","PIA","PIC","PIE","PIG","PIN","PIP","PIR","PIS","PIT","PIU","PIX","PLU","PLY","POA","POD","POH","POI","POL","POM","POO","POP","POS","POT","POW","POX","POZ","PRE","PRO","PRY","PSI","PST","PUB","PUD","PUG","PUH","PUL","PUN","PUP","PUR","PUS","PUT","PUY","PYA","PYE","PYX","QAT","QIS","QUA","RAD","RAG","RAH","RAI","RAJ","RAM","RAN","RAP","RAS","RAT","RAW","RAX","RAY","REB","REC","RED","REE","REF","REG","REH","REI","REM","REN","REO","REP","RES","RET","REV","REW","REX","REZ","RHO","RHY","RIA","RIB","RID","RIF","RIG","RIM","RIN","RIP","RIT","RIZ","ROB","ROC","ROD","ROE","ROK","ROM","ROO","ROT","ROW","RUB","RUC","RUD","RUE","RUG","RUM","RUN","RUT","RYA","RYE","SAB","SAC","SAD","SAE","SAG","SAI","SAL","SAM","SAN","SAP","SAR","SAT","SAU","SAV","SAW","SAX","SAY","SAZ","SEA","SEC","SED","SEE","SEG","SEI","SEL","SEN","SER","SET","SEW","SEX","SEY","SEZ","SHA","SHE","SHH","SHY","SIB","SIC","SIF","SIK","SIM","SIN","SIP","SIR","SIS","SIT","SIX","SKA","SKI","SKY","SLY","SMA","SNY","SOB","SOC","SOD","SOG","SOH","SOL","SOM","SON","SOP","SOS","SOT","SOU","SOV","SOW","SOX","SOY","SPA","SPY","SRI","STY","SUB","SUD","SUE","SUI","SUK","SUM","SUN","SUP","SUQ","SUR","SUS","SWY","SYE","SYN","TAB","TAD","TAE","TAG","TAI","TAJ","TAK","TAM","TAN","TAO","TAP","TAR","TAS","TAT","TAU","TAV","TAW","TAX","TAY","TEA","TEC","TED","TEE","TEF","TEG","TEL","TEN","TES","TET","TEW","TEX","THE","THO","THY","TIC","TID","TIE","TIG","TIL","TIN","TIP","TIS","TIT","TIX","TOC","TOD","TOE","TOG","TOM","TON","TOO","TOP","TOR","TOT","TOW","TOY","TRY","TSK","TUB","TUG","TUI","TUM","TUN","TUP","TUT","TUX","TWA","TWO","TWP","TYE","TYG","UDO","UDS","UEY","UFO","UGH","UGS","UKE","ULE","ULU","UMM","UMP","UMU","UNI","UNS","UPO","UPS","URB","URD","URE","URN","URP","USE","UTA","UTE","UTS","UTU","UVA","VAC","VAE","VAG","VAN","VAR","VAS","VAT","VAU","VAV","VAW","VEE","VEG","VET","VEX","VIA","VID","VIE","VIG","VIM","VIN","VIS","VLY","VOE","VOL","VOR","VOW","VOX","VUG","VUM","WAB","WAD","WAE","WAG","WAI","WAN","WAP","WAR","WAS","WAT","WAW","WAX","WAY","WEB","WED","WEE","WEM","WEN","WET","WEX","WEY","WHA","WHO","WHY","WIG","WIN","WIS","WIT","WIZ","WOE","WOF","WOG","WOK","WON","WOO","WOP","WOS","WOT","WOW","WOX","WRY","WUD","WUS","WYE","WYN","XIS","YAD","YAE","YAG","YAH","YAK","YAM","YAP","YAR","YAW","YAY","YEA","YEH","YEN","YEP","YES","YET","YEW","YEX","YGO","YID","YIN","YIP","YOB","YOD","YOK","YOM","YON","YOS","YOU","YOW","YUG","YUK","YUM","YUP","YUS","ZAG","ZAP","ZAS","ZAX","ZEA","ZED","ZEE","ZEK","ZEL","ZEP","ZEX","ZHO","ZIG","ZIN","ZIP","ZIT","ZIZ","ZOA","ZOL","ZOO","ZOS","ZUZ","ZZZ"];
let hebrewTwoLetterWords = [
    "בר", "בד", "כד", "כי", "או", "אי", "אז", "נר", "בן", "כן",
    "הר", "הד", "די", "הי", "מי", "מה", "מר", "מד", "מו", "את",
    "זו", "זה", "אם", "חי"
];
let Reception = ['age', 'appear', 'artist', 'Autumn', 'beak', 'bloom', 'bumpy', 'burst', 'buzz', 'care', 'check', 'chilly', 'chore', 'comfort', 'community', 'country', 'covered', 'dangle', 'decision', 'delicious', 'dentist', 'dew', 'disappear', 'drawer', 'dusty', 'edge', 'farmer', 'fear', 'firefly', 'fix', 'flipper', 'fluffy', 'follow', 'gallop', 'gentle', 'giggle', 'glance', 'glossy', 'glow', 'goal', 'grasp', 'gust', 'half', 'healthy', 'herd', 'hoof', 'include', 'invitation', 'knight', 'laundry', 'lazy', 'leaf', 'leak', 'library', 'market', 'melt', 'miserable', 'month', 'muddy', 'museum', 'note', 'pace', 'pair', 'patient', 'peaceful', 'peck', 'pilot', 'plan', 'pointy', 'polite', 'pond', 'president', 'protect', 'proud', 'race', 'reach', 'relax', 'rotten', 'sail', 'scene', 'scrub', 'shade', 'shaky', 'ship', 'shore', 'silky', 'sink', 'slide', 'slip', 'sniff', 'soapy', 'sparkle', 'spotted', 'spring', 'stare', 'summer', 'supplies', 'tangled', 'tent', 'tomorrow', 'trade', 'trunk', 'warm', 'wave', 'week', 'wiggle', 'winter', 'wish', 'yesterday', 'young'];
let Year1 = ['ache', 'adjust', 'affordable', 'alarm', 'alone', 'apologise', 'appetite', 'applause', 'artistic', 'atmosphere', 'attach', 'bashful', 'basket', 'batch', 'behave', 'belong', 'bend', 'blink', 'blush', 'bolt', 'bolts', 'borrow', 'bundle', 'cabin', 'caterpillar', 'caution', 'cave', 'celebrate', 'champion', 'chat', 'cheat', 'chimney', 'compass', 'complain', 'conductor', 'construct', 'costume', 'cosy', 'cranky', 'crash', 'creak', 'croak', 'crowded', 'cue', 'curved', 'daily', 'dainty', 'dart', 'decorate', 'delighted', 'denied', 'deserve', 'divide', 'dodge', 'drenched', 'drowsy', 'enormous', 'equal', 'exclaim', 'exhausted', 'expensive', 'fancy', 'fasten', 'filthy', 'flat', 'flee', 'fog', 'footprint', 'forest', 'freezing', 'gather', 'giant', 'glad', 'gleaming', 'glum', 'grab', 'grateful', 'grin', 'grip', 'groan', 'hatch', 'heap', 'hide', 'hobby', 'honest', 'howl', 'illustrator', 'injury', 'jealous', 'knob', 'lively', 'loosen', 'mask', 'misty', 'modern', 'mountain', 'narrow', 'obey', 'pain', 'passenger', 'pattern', 'pest', 'polish', 'pretend', 'polish', 'promise', 'rapid', 'remove', 'repeat', 'rescue', 'restart', 'return', 'ripe', 'rise', 'roar', 'rough', 'rusty', 'scold', 'scratch', 'seed', 'selfish', 'serious', 'shell', 'shovel (verb)', 'shriek', 'sibling', 'silent', 'simple', 'slippery', 'sly', 'sneaky', 'sob', 'spiral', 'splendid', 'sprinkle', 'squirm', 'startle', 'steep', 'stormy', 'striped', 'surround', 'switch', 'terrified', 'thick', 'thunder', 'ticket', 'timid', 'transportation', 'travel', 'trust', 'upset', 'weed', 'whimper', 'whirl', 'wicked', 'yank'];
let Year2 = ['accident', 'agree', 'arrive', 'astronomy', 'atlas', 'attention', 'award', 'aware', 'balance', 'banner', 'bare', 'beach', 'besides', 'blast', 'board', 'bounce', 'brain', 'branch', 'brave', 'bright', 'cage', 'calf', 'calm', 'career', 'centre', 'cheer', 'chew', 'claw', 'clear', 'cliff', 'club', 'collect', 'connect', 'corner', 'couple', 'crowd', 'curious', 'damp', 'dangerous', 'dash', 'dawn', 'deep', 'demolish', 'design', 'discard', 'doubt', 'dozen', 'enemy', 'evening', 'exactly', 'excess', 'factory', 'fair', 'famous', 'feast', 'field', 'finally', 'flap', 'float', 'flood', 'fold', 'fresh', 'frighten', 'fuel', 'gap', 'gaze', 'gift', 'gravity', 'greedy', 'harm', 'herd', 'idea', 'insect', 'instrument', 'invent', 'island', 'leader', 'leap', 'lizard', 'local', 'lonely', 'luxury', 'march', 'mention', 'motor', 'nervous', 'net', 'nibble', 'notice', 'ocean', 'orbit', 'pack', 'pale', 'parade', 'past', 'peak', 'planet', 'present', 'proof', 'reflect', 'rumour', 'safe', 'scholar', 'seal', 'search', 'settle', 'share', 'shelter', 'shiver', 'shy', 'skill', 'slight', 'smooth', 'soil', 'stack', 'steady', 'strand', 'stream', 'support', 'team', 'telescope', 'tiny', 'tower', 'travel', 'tremble', 'universe', 'village', 'warn', 'weak', 'wealthy', 'whisper', 'wise', 'wonder', 'worry', 'yard', 'zigzag'];
let Year3 = ['ability', 'absorb', 'accuse', 'act', 'active', 'actual', 'adopt', 'advantage', 'advice', 'ambition', 'ancient', 'approach', 'arrange', 'arctic', 'attitude', 'attract', 'average', 'avoid', 'bold', 'border', 'brief', 'brilliant', 'capture', 'certain', 'chill', 'clever', 'climate', 'cling', 'coast', 'confess', 'consider', 'contain', 'continent', 'convince', 'coward', 'crew', 'crumple', 'custom', 'decay', 'defend', 'delicate', 'diagram', 'digest', 'disease', 'distant', 'doze', 'drift', 'elegant', 'enable', 'examine', 'explore', 'fan', 'fatal', 'fierce', 'flutter', 'fortunate', 'frail', 'gasp', 'glide', 'globe', 'grace', 'gradual', 'grasp', 'habit', 'harsh', 'imitate', 'individual', 'intelligent', 'intend', 'journey', 'launch', 'limit', 'locate', 'loyal', 'magnificent', 'marsh', 'method', 'misery', 'moisture', 'mural', 'mystify', 'nation', 'nectar', 'nursery', 'observe', 'opponent', 'ordeal', 'origin', 'outcome', 'passage', 'pastime', 'pause', 'perform', 'plunge', 'predator', 'predict', 'prevent', 'primary', 'privilege', 'process', 'rare', 'rate', 'recall', 'rely', 'remark', 'resident', 'respect', 'responsible', 'reverse', 'revive', 'risk', 'scatter', 'schedule', 'sensitive', 'signal', 'solution', 'spoil', 'starve', 'steer', 'struggled', 'suitable', 'survey', 'swift', 'symbol', 'talent', 'theory', 'thrill', 'treasure', 'triumph', 'value', 'vision', 'volunteer', 'wander', 'wisdom', 'wit', 'woe'];
let Year4 = ['accurate', 'address', 'afford', 'alert', 'analyse', 'ancestor', 'annual', 'apparent', 'appropriate', 'arena', 'arrest', 'ascend', 'assist', 'attempt', 'attentive', 'attractive', 'awkward', 'baggage', 'basic', 'benefit', 'blend', 'blossom', 'burrow', 'calculate', 'capable', 'captivity', 'carefree', 'century', 'chamber', 'circular', 'coax', 'column', 'communicate', 'competition', 'complete', 'concentrate', 'concern', 'conclude', 'confuse', 'congratulate', 'considerable', 'content', 'contribute', 'crafty', 'create', 'demonstrate', 'descend', 'desire', 'destructive', 'develop', 'disaster', 'disclose', 'distract', 'distress', 'dusk', 'eager', 'ease', 'entertain', 'envy', 'essential', 'extraordinary', 'flexible', 'focus', 'fragile', 'frantic', 'frequent', 'frontier', 'furious', 'generosity', 'hail', 'hardship', 'heroic', 'host', 'humble', 'impact', 'increase', 'indicate', 'inspire', 'instant', 'invisible', 'jagged', 'lack', 'limb', 'limp', 'manufacture', 'master', 'mature', 'meadow', 'mistrust', 'mock', 'modest', 'noble', 'orchard', 'outstanding', 'peculiar', 'peer', 'permit', 'plead', 'plentiful', 'pointless', 'portion', 'practice', 'precious', 'prefer', 'prepare', 'proceed', 'queasy', 'recent', 'recognise', 'reduce', 'release', 'represent', 'request', 'resist', 'response', 'reveal', 'routine', 'severe', 'shabby', 'shallow', 'sole', 'source', 'sturdy', 'surface', 'survive', 'terror', 'threat', 'tidy', 'tour', 'tradition', 'tragic', 'typical', 'vacant', 'valiant', 'variety', 'vast', 'venture', 'weary'];
let Year6 = ['abandon', 'abundant', 'access', 'accommodate', 'accumulate', 'adapt', 'adhere', 'agony', 'allegiance', 'ambition', 'ample', 'anguish', 'anticipate', 'anxious', 'apparel', 'appeal', 'apprehensive', 'arid', 'arrogant', 'awe', 'barren', 'beacon', 'beneficial', 'blunder', 'boisterous', 'boycott', 'burden', 'campaign', 'capacity', 'capital', 'chronological', 'civic', 'clarity', 'collaborate', 'collide', 'commend', 'commentary', 'compact', 'composure', 'concise', 'consent', 'consequence', 'conserve', 'conspicuous', 'constant', 'contaminate', 'context', 'continuous', 'controversy', 'convenient', 'cope', 'cordial', 'cultivate', 'cumulative', 'declare', 'deluge', 'dense', 'deplete', 'deposit', 'designate', 'desperate', 'deteriorate', 'dialogue', 'diligent', 'diminish', 'discretion', 'dissent', 'dissolve', 'distinct', 'diversity', 'domestic', 'dominate', 'drastic', 'duration', 'dwell', 'eclipse', 'economy', 'eerie', 'effect', 'efficient', 'elaborate', 'eligible', 'elude', 'encounter', 'equivalent', 'erupt', 'esteem', 'evolve', 'exaggerate', 'excel', 'exclude', 'expanse', 'exploit', 'extinct', 'extract', 'factor', 'former', 'formulates', 'fuse', 'futile', 'generate', 'genre', 'habitat', 'hazardous', 'hostile', 'idiom', 'ignite', 'immense', 'improvises', 'inept', 'inevitable', 'influence', 'ingenious', 'innovation', 'intimidate', 'jovial', 'knack', 'leeway', 'legislation', 'leisure', 'liberate', 'likeness', 'linger', 'literal', 'loathe', 'lure', 'majority', 'makeshift', 'manipulate', 'marvel', 'massive', 'maximum', 'meagre', 'mere', 'migration', 'mimic', 'minute', 'monotonous', 'negotiate', 'objective', 'obstacle', 'omniscient', 'onset', 'optimist', 'originate', 'painstaking', 'paraphrase', 'parody', 'persecute', 'plummet', 'possess', 'poverty', 'precise', 'predicament', 'predict', 'prejudice', 'preliminary', 'primitive', 'priority', 'prominent', 'propel', 'prosecute', 'prosper', 'provoke', 'pursue', 'quest', 'recount', 'refuge', 'reinforce', 'reluctant', 'remorse', 'remote', 'resolute', 'restrain', 'retaliate', 'retrieve', 'rigorous', 'rural', 'salvage', 'sanctuary', 'siege', 'significant', 'solar', 'soothe', 'stationary', 'stifle', 'strive', 'subordinate', 'subsequent', 'superior', 'supplement', 'swarm', 'tangible', 'terminate', 'terrain', 'trait', 'transform', 'transport', 'treacherous', 'unanimous', 'unruly', 'urban', 'vacate', 'verdict', 'verge', 'vibrant', 'vital', 'vow'];

let gameData = {
    "Characters": {
        "1": { generator: generateLetterData, params: [1, 'English'] },
        // Add more character levels as needed
    },
    "Words": {
        "1": { generator: generateWordData, params: [twoLetterWords] },
        "2": { generator: generateWordData, params: [twoLetterWords] },
        "3": { generator: generateWordData, params: [threeLetterWords] },
        "4": { generator: generateWordData, params: [threeLetterWords] },
        "Reception": { generator: generateWordData, params: [Reception] },
        "Year 1": { generator: generateWordData, params: [Year1] },
        "Year 2": { generator: generateWordData, params: [Year2] },
        "Year 3": { generator: generateWordData, params: [Year3] },
        "Year 4": { generator: generateWordData, params: [Year4] },
        "Year 6": { generator: generateWordData, params: [Year6] },


        // Additional levels for single words can be added here
    },
    "Hebrew": {
        "1": { generator: generateLetterData, params: [1, 'Hebrew'] },
        "2": { generator: generateWordData, params: [hebrewTwoLetterWords] }
        // More Hebrew levels can be added here
    },
    "Cyrillic": {
        "1": { generator: generateLetterData, params: [1, 'Cyrillic'] }
        // Additional data for Cyrillic level can be added here
    }
    // Add other categories as needed, e.g. short, long sentences 
};


function generateLetterData(count, alphabetType) {
    let letters;
    switch (alphabetType) {
        case 'English':
            letters = 'abcdefghijklmnopqrstuvwxyz';
            break;
        case 'Hebrew':
            letters = 'אבגדהוזחטיכלמנסעפצקרשת';
            break;
        case 'Cyrillic':
            letters = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
            break;
        default:
            letters = 'abcdefghijklmnopqrstuvwxyz';
    }
    // Generate data for 10 rounds
    return Array.from({ length: 10 }, () => { // Change to 10 for ten rounds
        const letter = letters[Math.floor(Math.random() * letters.length)];
        return {
            content: letter,
            question: "Which letter was shown?",
            options: generateRandomOptions(letter, letters),
            correct: letter
        };
    });
}

function generateWordData(wordList) {
    // Log to check the word list received
    console.log('Word list received:', wordList);
    console.log('Type of word list:', typeof wordList);


    let rounds = [];
    let existingOptions = new Set();

    for (let i = 0; i < 10; i++) {
        const word = selectUniqueRandomWord(wordList, existingOptions);
        existingOptions.add(word);

        let options;
        if (currentMode === 'easy') {
            options = generateRandomWordOptions(word, wordList, existingOptions);
        } else {
            options = generateChallengingOptions(word, wordList, existingOptions);
        }

        rounds.push({
            content: word,
            question: "Which word was shown?",
            options: options,
            correct: word
        });
    }
    return rounds;
}




function selectRandomWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function generateChallengingOptions(correctWord, wordList) {
    let options = new Set([correctWord]);
    while (options.size < 4) {
        let similarWords = findSimilarWord(correctWord, wordList, options);
        if (similarWords && similarWords.length) {
            similarWords.forEach(word => {
                if (options.size < 4) {
                    options.add(word);  // Add each similar word individually
                }
            });
        } else {
            // Fill the remaining options with random words
            while (options.size < 4) {
                let randomWord = selectUniqueRandomWord(wordList, options);
                options.add(randomWord);
            }
        }
    }
    return Array.from(options);
}



function findSimilarWord(word, wordList, existingOptions) {
    let candidates = wordList.filter(w => w !== word && w.length === word.length && !existingOptions.has(w));
    let rankedCandidates = getPriority(candidates, word);
    if (rankedCandidates.length > 2) {
        // Select the top 2 and one more randomly from the remaining
        let topCandidates = rankedCandidates.slice(0, 2);
        let thirdCandidate = rankedCandidates[Math.floor(Math.random() * (rankedCandidates.length - 2)) + 2];
        topCandidates.push(thirdCandidate);
        return topCandidates;
    }
    return rankedCandidates; // If less than 3 candidates, return them all
}


function getPriority(candidates, word) {
    let scoredCandidates = candidates.map(candidate => {
        return { 
            word: candidate, 
            score: calculateSimilarityScore(candidate, word) 
        };
    });

    // Sort by score in descending order
    scoredCandidates.sort((a, b) => b.score - a.score);

    // Return only the words, ranked by score
    return scoredCandidates.map(candidate => candidate.word);
}

function calculateSimilarityScore(candidate, word) {
    let score = 0;

    // Special handling for two-letter words
    if (word.length === 2 && candidate.length === 2 && candidate !== word) {
        score += (candidate.charAt(0) === word.charAt(0)) ? 2 : 0; // Higher score for matching first letter
        score += (candidate.charAt(1) === word.charAt(1)) ? 1 : 0; // Some score for matching second letter
        return score; // Directly return the score for two-letter words
    }

    // Scoring for longer words
    if (candidate.charAt(0) === word.charAt(0)) {
        score += 3; // 3 points for same first letter
    }
    if (candidate.length === word.length) {
        score += 2; // 2 points for same number of letters
    }
    if (candidate.length > 1 && word.length > 1 && candidate.charAt(1) === word.charAt(1)) {
        score += 2; // 2 points for same second letter
    }
    if (candidate.length > 2 && word.length > 2 && candidate.charAt(2) === word.charAt(2)) {
        score += 1; // 1 point for same third letter
    }
    if (candidate.charAt(candidate.length - 1) === word.charAt(word.length - 1)) {
        score += 1; // 1 point for same last letter
    }
    return score;
}



function selectUniqueRandomWord(wordList, existingOptions) {
    let filteredList = wordList.filter(word => !existingOptions.has(word));
    return filteredList[Math.floor(Math.random() * filteredList.length)];
}


function countCommonLetters(word1, word2) {
    let commonLetters = 0;
    for (let char of word1) {
        if (word2.includes(char)) {
            commonLetters++;
        }
    }
    return commonLetters;
}

function generateRandomWordOptions(correct, words) {
    let options = new Set([correct]);
    while (options.size < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        options.add(randomWord);
    }
    return Array.from(options);
}

function generateRandomOptions(correct, letters) {
    let options = new Set([correct]);
    while (options.size < 4) {
        options.add(letters[Math.floor(Math.random() * letters.length)]);
    }
    return Array.from(options);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createWordButtons(question) {
    const wordOptionsContainer = document.getElementById('word-options');
    wordOptionsContainer.innerHTML = '';
    shuffleArray(question.options);

    // Define a set of vibrant colors
    const colors = [
        '#007bff', // Bright Blue
        '#17a2b8', // Teal
        '#fd7e14', // Orange
        '#6f42c1', // Purple
        '#20c997', // Mint Green
        '#FF7F50', // Coral
        '#FF00FF'  // Pink
    ];

    // Select a random color for this invocation
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    const buttonColor = colors[randomColorIndex];

    // Calculate the total number of letters in all options
    const totalLetters = question.options.reduce((total, option) => total + option.length, 0);
    
    // Adjust font size based on the total number of letters
    let buttonFontSize = '30px'; // Default font size
    if (totalLetters > 24 && totalLetters < 34) {
        buttonFontSize = '26px'; // Smaller font size for more letters
    }
    if (totalLetters > 33) {
        buttonFontSize = '22px'; // Smaller font size for more letters
    }
    // Further adjustments can be made based on different thresholds if needed

    question.options.forEach((option) => {
        const button = document.createElement('button');
        button.innerText = option.toLowerCase();
        button.style.fontFamily = document.getElementById('font-selector').value;
        button.style.backgroundColor = buttonColor; // Use the selected color
        button.style.color = 'white';
        button.style.fontSize = buttonFontSize;

        button.addEventListener('click', () => handleWordSelection(option.toLowerCase(), question.correct.toLowerCase()));
        wordOptionsContainer.appendChild(button);
    });
}



function updateDisplay(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = message || '&nbsp;'; // Replace an empty message with a non-breaking space
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('mistakes').innerText = 'Mistakes: ' + mistakes;
}

function clearMessage() {
    const messageElement = document.getElementById('message');
    if (messageElement.innerHTML === 'Correct!') {
        messageElement.innerHTML = '&nbsp;'; // Replace the "Correct!" message with a non-breaking space
    }
}

function handleWordSelection(selectedOption, correctAnswer) {
    const currentQuestion = gameData[currentDifficulty][currentLevel][currentQuestionIndex];

    if (selectedOption === correctAnswer) {
        consecutiveCorrect++;
        consecutiveIncorrect = 0;
        gameContainer.classList.add('flash-green');
        setTimeout(() => gameContainer.classList.remove('flash-green'), 500);
        score++;
        updateDisplay('Correct!');
        setTimeout(clearMessage, 5000);
        currentQuestionIndex++;

        if (currentQuestionIndex >= gameData[currentDifficulty][currentLevel].length) {
            updateDisplay('Round ' + currentLevel + ' complete! Moving to next level...');
            finishLevel();
        } else {
            setTimeout(() => {
                displayContentForLimitedDuration(gameData[currentDifficulty][currentLevel][currentQuestionIndex]);
            }, 500);
        }
    } else {
        consecutiveIncorrect++;
        consecutiveCorrect = 0;
        gameContainer.classList.add('flash-red');
        setTimeout(() => gameContainer.classList.remove('flash-red'), 500);
        mistakes++;
        updateDisplay('Not quite...');

        // Google Analytics Event for a Mistake
        gtag('event', 'make_mistake', {
            'event_category': 'Game Actions',
            'event_label': `Mistake Made - Difficulty: ${currentDifficulty}, Level: ${currentLevel}, Question: ${currentQuestionIndex}`
        });
    }

    if (currentMode === 'dynamic') {
        adjustSpeed();
    }
}


function startLevel(difficulty, level) {
    currentDifficulty = difficulty;
    currentLevel = level;
    currentQuestionIndex = 0;
    score = 0;
    mistakes = 0;

    if (!gameData[currentDifficulty] || !gameData[currentDifficulty][currentLevel]) {
        console.error('Invalid difficulty or level');
        return;
    }

    let levelConfig = gameData[currentDifficulty][currentLevel];

    console.log('levelConfig:', levelConfig);
    console.log('levelConfig.params:', levelConfig.params);

    if (typeof levelConfig.generator === 'function' && levelConfig.params && levelConfig.params.length > 0) {
        // Explicitly access the first element of levelConfig.params
        gameData[currentDifficulty][currentLevel] = levelConfig.generator(...levelConfig.params);

    } else {
        console.error('Invalid level configuration:', levelConfig);
        return;
    }

    displayContentForLimitedDuration(gameData[currentDifficulty][currentLevel][currentQuestionIndex]);
    createWordButtons(gameData[currentDifficulty][currentLevel][currentQuestionIndex]);
    updateDisplay('');
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('instructions-button').style.display = 'none';
}





document.addEventListener('DOMContentLoaded', () => {
    populateDifficulties();
    populateLevels("Characters"); 
    populateSpeeds();

 
    // Set up event listeners for difficulty and level dropdowns
    const difficultySelect = document.getElementById('difficulty-selector');
    const levelSelect = document.getElementById('level-select');

    difficultySelect.addEventListener('change', () => {
        populateLevels(difficultySelect.value);
        showStartNewGameButton();
    });

    levelSelect.addEventListener('change', showStartNewGameButton);

    function showStartNewGameButton() {
        document.getElementById('start-new-game').style.display = 'block';
    }

    // Event listener for start new game and start game buttons
    document.getElementById('start-new-game').addEventListener('click', () => {
        const selectedDifficulty = difficultySelect.value;
        const selectedLevel = levelSelect.value;
        startLevel(selectedDifficulty, selectedLevel);
    });
    
    document.getElementById('start-button').addEventListener('click', () => {
        const selectedDifficulty = difficultySelect.value;
        const selectedLevel = levelSelect.value;
        startLevel(selectedDifficulty, selectedLevel);
    });

    // Font selector logic
    var fontSelector = document.getElementById('font-selector');
    fontSelector.addEventListener('change', function() {
        var selectedFont = this.value;
        document.body.style.fontFamily = selectedFont;
        var wordButtons = document.querySelectorAll('#word-options button');
        wordButtons.forEach(function(button) {
            button.style.fontFamily = selectedFont;
        });
    });

    // Speed selector logic
    const speedSelector = document.getElementById('speed-selector');
    speedSelector.value = "500ms"; // Set default speed to Level 3
    speedSelector.addEventListener('change', function() {
        currentSpeed = displaySpeeds[this.value]; // Update the current speed
    });
});



function displayContentForLimitedDuration(question) {
    const flashArea = document.getElementById('flash-area');
    const gameElements = document.querySelectorAll('#game-container > *:not(#flash-area)');
    const selectedFont = document.getElementById('font-selector').value;
    flashArea.style.fontFamily = selectedFont; // Apply selected font


    // Hide all elements except the flash area
    gameElements.forEach(element => element.classList.add('hidden-but-occupy-space'));

    // Introduce a delay before showing the flash content
    setTimeout(() => {
        flashArea.textContent = question.content.toLowerCase();
        flashArea.classList.add('flash-show');

        // After displaying the content for the specified time, hide it and proceed
        setTimeout(() => {
            // Clear flash area and show all game elements
            flashArea.textContent = '';
            flashArea.classList.remove('flash-show');

            // Introduce an additional 0.5-second pause after hiding the content
            setTimeout(() => {
                gameElements.forEach(element => element.classList.remove('hidden-but-occupy-space'));

                // Show question and options
                updateDisplay(question.question); // Display the question
                createWordButtons(question); // Display the word options
            }, 500); // Additional 0.5-second pause

        }, currentSpeed); // Duration for displaying the content

    }, 500); // 0.5-second delay before showing the flash content
}



function populateLevels(difficulty) {
    const levelSelect = document.getElementById('level-select');
    levelSelect.innerHTML = '';

    const levels = gameData[difficulty];
    Object.keys(levels).forEach(level => {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = '' + level;
        levelSelect.appendChild(option);
    });

    levelSelect.value = "1"; // Default to Level 1
}


function populateSpeeds() {
    const speedSelector = document.getElementById('speed-selector');
    speedSelector.innerHTML = '';
    Object.keys(displaySpeeds).forEach(speed => {
        const option = document.createElement('option');
        option.value = speed; 
        option.textContent = speed;
        speedSelector.appendChild(option);
    });
}



function finishLevel() {
    flashImage(); // Display the completion image
    gtag('event', 'finish_level', {
        'event_category': 'Game Actions',
        'event_label': `Level Completed - Difficulty: ${currentDifficulty}, Level: ${currentLevel}`
    });
}


const completionImages = [
    'images/image1.webp',
    'images/image2.webp',
    'images/image3.webp',
    'images/image4.webp',
    'images/image5.webp',
    'images/image6.webp',
    'images/image7.webp',
    'images/image8.webp',
    'images/image9.webp',
    'images/image10.webp',
    'images/image11.webp',
    'images/image12.webp',
    'images/image13.webp',
    'images/image14.webp',
    'images/image15.webp',
    'images/image16.webp',
    'images/image17.webp',
    'images/image18.webp',
    'images/image19.webp',
    'images/image20.webp',
    'images/image21.webp',
    'images/image22.webp',
    'images/image23.webp',
    'images/image24.webp',
    'images/image25.webp',
    'images/image26.webp',
    'images/image27.webp',
    'images/image28.webp',
    'images/image29.webp',
    'images/image30.webp',
    'images/image31.webp',
    'images/image32.webp',
    'images/image33.webp',
    'images/image34.webp',
    'images/image35.webp', 
];
// Shuffle the completionImages array once at the beginning
shuffleArray(completionImages);
// Variable to keep track of the current image index
let currentImageIndex = 0;

function flashImage() {
    setTimeout(() => {
        const gameContainer = document.getElementById('game-container');
        const titleElement = document.querySelector('.game-wrapper > h1');

        gameContainer.style.display = 'none';
        titleElement.style.color = 'black';

        const imageContainer = document.createElement('div');
        imageContainer.style.opacity = '0';
        imageContainer.style.transition = 'opacity 1s ease-in-out';
        imageContainer.style.position = 'absolute';
        imageContainer.style.zIndex = '1000';
        imageContainer.style.width = '80%';
        imageContainer.style.maxWidth = '600px';
        imageContainer.style.margin = 'auto';
        imageContainer.style.left = '0';
        imageContainer.style.right = '0';
        imageContainer.style.top = '50%';
        imageContainer.style.transform = 'translateY(-50%)';
        imageContainer.style.textAlign = 'center';
        imageContainer.style.borderRadius = '10px';
        document.body.appendChild(imageContainer);

        const completionMessage = document.createElement('p');
        completionMessage.innerText = `Well done! You passed Level ${currentLevel}.`;
        completionMessage.style.fontSize = '24px';
        completionMessage.style.fontWeight = 'bold';
        completionMessage.style.marginBottom = '10px';
        imageContainer.appendChild(completionMessage);

        const clickMessage = document.createElement('p');
        clickMessage.innerText = "Click anywhere to continue";
        clickMessage.style.fontSize = '16px';
        imageContainer.appendChild(clickMessage);

        const imageSrc = completionImages[currentImageIndex];
        const image = document.createElement('img');
        image.src = imageSrc;
        image.alt = 'Flashing Image';
        image.style.width = '100%';
        image.style.borderRadius = '10px';
        imageContainer.appendChild(image);

        setTimeout(() => imageContainer.style.opacity = '1', 0);

        currentImageIndex = (currentImageIndex + 1) % completionImages.length;

        // Event Listener to remove the image container on click and progress to the next level/difficulty
        imageContainer.addEventListener('click', () => {
            document.body.removeChild(imageContainer);
            gameContainer.style.display = '';
            titleElement.style.color = '';

            let nextLevel = parseInt(currentLevel) + 1;
            let difficulties = Object.keys(gameData);
            let currentDifficultyIndex = difficulties.indexOf(currentDifficulty);

            if (nextLevel > Object.keys(gameData[currentDifficulty]).length) {
                if (currentDifficultyIndex < difficulties.length - 1) {
                    let nextDifficulty = difficulties[currentDifficultyIndex + 1];
                    startLevel(nextDifficulty, "1"); // Start first level of the next difficulty
                } else {
                    updateDisplay('Congratulations! You have completed all levels and difficulties.');
                }
            } else {
                startLevel(currentDifficulty, String(nextLevel));
            }
        });
    }, 2000);
}


function populateDifficulties() {
    const difficultySelect = document.getElementById('difficulty-selector');
    difficultySelect.innerHTML = ''; // Clear existing options

    Object.keys(gameData).forEach(difficulty => {
        const option = document.createElement('option');
        option.value = difficulty;
        option.textContent = difficulty;
        difficultySelect.appendChild(option);
    });
}

document.getElementById('instructions-button').addEventListener('click', function() {
    document.getElementById('instructions-container').style.display = 'block';
});

document.getElementById('close-instructions').addEventListener('click', function() {
    document.getElementById('instructions-container').style.display = 'none';
});
document.getElementById('test-speed-button').addEventListener('click', startSpeedTest);


let consecutiveCorrect = 0;
let consecutiveIncorrect = 0;

function adjustSpeed() {
    // Retrieve the index of the current speed in the displaySpeeds object
    const currentSpeedIndex = Object.values(displaySpeeds).indexOf(currentSpeed);

    if (consecutiveCorrect >= 2) {
        // Speed up: move to a lower index in the displaySpeeds array
        if (currentSpeedIndex < Object.values(displaySpeeds).length - 1) {
            currentSpeed = Object.values(displaySpeeds)[currentSpeedIndex + 1];
        }
        consecutiveCorrect = 0;
    } else if (consecutiveIncorrect >= 2) {
        // Slow down: move to a higher index in the displaySpeeds array
        if (currentSpeedIndex > 0) {
            currentSpeed = Object.values(displaySpeeds)[currentSpeedIndex - 1];
        }
        consecutiveIncorrect = 0;
    }

    // Update the speed selector display
    const speedSelector = document.getElementById('speed-selector');
    const speedLevel = Object.keys(displaySpeeds).find(key => displaySpeeds[key] === currentSpeed);
    speedSelector.value = speedLevel;

    // Optional: Display the current speed to the user
    updateDisplay(`Current Speed: Level ${speedLevel}`);
}

function startSpeedTest() {
    currentMode = 'dynamic'; // Set mode to dynamic for speed adjustments
    currentDifficulty = 'Words'; // Using the 'Words' difficulty
    currentLevel = 'Reception'; // Using the 'Reception' word list for the test
    currentQuestionIndex = 0;
    score = 0;
    mistakes = 0;function startSpeedTest() {
        currentMode = 'dynamic'; // Set mode to dynamic for speed adjustments
        currentDifficulty = 'Words'; // Using the 'Words' difficulty
        currentLevel = 'Reception'; // Using the 'Reception' word list for the test
        currentQuestionIndex = 0;
        score = 0;
        mistakes = 0;
        consecutiveCorrect = 0;
        consecutiveIncorrect = 0;
    
        // No need to modify the gameData structure, as we're using existing categories
    
        startLevel(currentDifficulty, currentLevel);
    }
    consecutiveCorrect = 0;
    consecutiveIncorrect = 0;

    // No need to modify the gameData structure, as we're using existing categories

    startLevel(currentDifficulty, currentLevel);
}