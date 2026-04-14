/**
 * Herní témata – 6 originálních příběhů
 * Pořadí: střídavě kluci/holky pro zamíchání na výběrové obrazovce
 *
 * titles[gameType]  – krátký název kapitoly
 * stories[gameType] – 1–2 věty příběhu před hrou
 * games[0..13]      – pořadí her pro toto téma (14 kapitol)
 */

// Pomocná funkce: vrátí předmět a barvu z typu hry
function gameSubject(type) {
  if (type.startsWith('math'))    return { subject: 'Matematika', color: '#f4c842' };
  if (type.startsWith('czech'))   return { subject: 'Čeština',    color: '#4fc3f7' };
  if (type.startsWith('english')) return { subject: 'Angličtina', color: '#a5d6a7' };
  return { subject: '?', color: '#888' };
}

const THEMES = {

  // ═══════════════════════════════════════════════════════════
  // 1. HVĚZDNÝ STRÁŽCE
  // ═══════════════════════════════════════════════════════════
  vesmir: {
    id: 'vesmir', name: 'Hvězdný strážce', emoji: '🚀',
    tagline: 'Chraň galaxii a prozkoumej hvězdy!',
    nicknameTitle: '🚀 Jak se jmenuješ, pilote?',
    nicknameText: 'Vesmírná mise čeká — zadej své jméno a vzlétni!',
    nicknamePlaceholder: 'Jméno pilota...',
    subjectIcons: { math: '🪐', czech: '📡', english: '🛸' },
    levelIcons: ['🌍', '🌙', '⭐'],
    levelLabels: ['Základna na Zemi', 'Měsíční stanice', 'Hvězdná brána'],
    ranks: [
      { min: 0,  label: 'Kadet',              emoji: '👨‍🚀', color: '#90a4ae' },
      { min: 10, label: 'Navigátor',           emoji: '🧭',  color: '#ce93d8' },
      { min: 25, label: 'Pilot',               emoji: '🛩️',  color: '#a5d6a7' },
      { min: 40, label: 'Velitel',              emoji: '🎖️',  color: '#4fc3f7' },
      { min: 55, label: 'Strážce galaxie',      emoji: '🌟',  color: '#f4c842' },
    ],
    accent: '#00bcd4', accent2: '#ff6f00',
    cardGradient: 'linear-gradient(135deg, #0a1628, #001040)',
    mapTitle: '🗺️ Mapa galaxie', dangerLabel: '☄️ Asteroid',
    youtubeTrailer: null, clips: {},
    zones: [
      { label: '🌍 Havárie na Zemi',    ids: [1,2,3] },
      { label: '🌙 Měsíční základna',   ids: [4,5,6] },
      { label: '🪐 Prstenec Saturnu',   ids: [7,8,9] },
      { label: '⭐ Hvězdná brána',      ids: [10,11,12] },
      { label: '🎯 Bonusové mise',      ids: [13,14,15,16,17] },
    ],
    games: [
      'math-addition-easy','czech-soft-i','math-subtraction','english-match',
      'czech-paired','math-multiply2','english-spelling','czech-alphabet',
      'math-wordproblem','english-reading','math-decompose','czech-hypernym',
      'czech-long-iy','math-pyramid',
      'czech-reading','czech-diacritics','czech-letters'
    ],
    titles: {
      'math-addition-easy':'Start rakety','czech-soft-i':'Kódy na palubě','math-subtraction':'Oprava motoru',
      'english-match':'Cizí signály','czech-paired':'Zpráva z vesmíru','math-multiply2':'Navigace k Měsíci',
      'english-spelling':'Kontakt s Marsem','czech-alphabet':'Třídění dat','math-wordproblem':'Asteroidové pole',
      'english-reading':'Tajné frekvence','math-decompose':'Hvězdná mapa','czech-hypernym':'Katalog planet',
      'czech-long-iy':'Dešifrování zpráv','math-pyramid':'Pyramida souřadnic',
      'czech-reading':'Palubní deník','czech-diacritics':'Hvězdné značky','czech-letters':'Sestav heslo'
    },
    stories: {
      'math-addition-easy':'Tvoje raketa je připravená ke startu! Spočítej palivo a vyraz do vesmíru!',
      'czech-soft-i':'Na palubě lodi blikají kódy s chybějícími písmeny. Oprav je!',
      'math-subtraction':'Motor má poruchu! Správné odčítání pomůže s opravou.',
      'english-match':'Přijímáš signály z cizí planety. Rozluštíš anglická slova?',
      'czech-paired':'Přistála zpráva z vesmíru! Chybí písmena na konci slov.',
      'math-multiply2':'Navigační počítač potřebuje násobení a dělení. Pomůžeš?',
      'english-spelling':'Navazuješ kontakt s posádkou na Marsu! Napiš anglická slova správně.',
      'czech-alphabet':'Palubní počítač potřebuje seřadit data podle abecedy.',
      'math-wordproblem':'Asteroidové pole! Rychle spočítej správnou trasu!',
      'english-reading':'Zachytil jsi tajné anglické zprávy. Co říkají?',
      'math-decompose':'Hvězdná mapa se rozpadla na části. Složíš čísla zpět?',
      'czech-hypernym':'Sestavuješ katalog objevených planet. Zařadíš věci do skupin?',
      'czech-long-iy':'Přišla zašifrovaná zpráva — krátká a dlouhá písmena se pomíchala!',
      'math-pyramid':'Na stanici jsi našel pyramidu ze souřadnic. Doplníš čísla?',
      'czech-reading':'Z palubního deníku přišly krátké zprávy. Přečti je a odpověz!',
      'czech-diacritics':'Na hvězdných značkách chybí háčky a čárky. Vyber správnou variantu!',
      'czech-letters':'Heslo do trezoru je rozsypané na písmena. Slož ho zpátky!'
    },
    messages: [
      '🚀 Kapitán hlásí: Mise splněna!',
      '🚀 Hvězdná posádka tě zdraví!',
      '🚀 Řídící středisko jásá!',
      '🚀 Raketa letí díky tobě!',
      '🚀 To byl přesný zásah, pilote!',
      '🚀 Navigace perfektní — letíš dál!',
      '🚀 Vesmírná stanice tleská!',
      '🚀 Senzory hlásí: Úžasný výkon!',
      '🚀 Tvůj mozek je rychlejší než světlo!',
      '🚀 Galaxie je díky tobě bezpečnější!',
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // 2. KOUZELNÝ LES
  // ═══════════════════════════════════════════════════════════
  les: {
    id: 'les', name: 'Kouzelný les', emoji: '🦄',
    tagline: 'Probuď kouzla lesa!',
    nicknameTitle: '🦄 Jak se jmenuješ, kouzelná bytosti?',
    nicknameText: 'Les na tebe čeká — prozraď své jméno!',
    nicknamePlaceholder: 'Tvoje kouzelné jméno...',
    subjectIcons: { math: '🍄', czech: '🌿', english: '🧚' },
    levelIcons: ['🌿', '🍄', '🏰'],
    levelLabels: ['Lesní mýtina', 'Houbový háj', 'Strom moudrosti'],
    ranks: [
      { min: 0,  label: 'Poutník',             emoji: '🌱', color: '#90a4ae' },
      { min: 10, label: 'Lesní učedník',        emoji: '🍀', color: '#ce93d8' },
      { min: 25, label: 'Přítel lesa',          emoji: '🦊', color: '#a5d6a7' },
      { min: 40, label: 'Strážce lesa',         emoji: '🦉', color: '#4fc3f7' },
      { min: 55, label: 'Vládce kouzel',         emoji: '🦄', color: '#f4c842' },
    ],
    accent: '#e040fb', accent2: '#00e5ff',
    cardGradient: 'linear-gradient(135deg, #1a0028, #000a20)',
    mapTitle: '🗺️ Mapa kouzelného lesa', dangerLabel: '😴 Spánek',
    youtubeTrailer: null, clips: {},
    zones: [
      { label: '🌿 Lesní mýtina',      ids: [1,2,3] },
      { label: '🍄 Houbový háj',        ids: [4,5,6] },
      { label: '🌸 Květinová louka',    ids: [7,8,9] },
      { label: '🏰 Strom moudrosti',   ids: [10,11,12] },
      { label: '🎯 Skrytá pěšina',     ids: [13,14,15,16,17] },
    ],
    games: [
      'czech-soft-i','math-addition-easy','english-match','math-subtraction',
      'czech-paired','english-spelling','math-multiply2','czech-alphabet',
      'math-wordproblem','english-reading','math-decompose','czech-hypernym',
      'math-pyramid','czech-long-iy',
      'czech-reading','czech-diacritics','czech-letters'
    ],
    titles: {
      'czech-soft-i':'Pozdrav jednorožce','math-addition-easy':'Počítání světlušek','english-match':'Řeč víl',
      'math-subtraction':'Most přes potok','czech-paired':'Kouzelná říkadla','english-spelling':'Jména květin',
      'math-multiply2':'Houbový hlavolam','czech-alphabet':'Kniha čar','math-wordproblem':'Zásoby pro zimu',
      'english-reading':'Poselství stromu','math-decompose':'Rozbitý amulet','czech-hypernym':'Poklady lesa',
      'math-pyramid':'Pyramida krystalů','czech-long-iy':'Tajný jazyk víl',
      'czech-reading':'Vyprávění sov','czech-diacritics':'Znamení v kůře','czech-letters':'Kouzelné slovo'
    },
    stories: {
      'czech-soft-i':'Jednorožec stráží vstup do lesa. Dokážeš doplnit správná písmena?',
      'math-addition-easy':'Na mýtině poletují světlušky! Spočítej je, ať se rozsvítí cesta.',
      'english-match':'Víly mluví kouzelnou angličtinou. Přiřadíš slova k obrázkům?',
      'math-subtraction':'Potok je rozvodněný! Správným odčítáním postavíš most.',
      'czech-paired':'Kouzelná říkadla mají chybějící písmena na konci slov. Doplníš je?',
      'english-spelling':'Les je plný kouzelných květin. Složíš jejich anglická jména?',
      'math-multiply2':'Houby rostou v řadách! Vyřeš násobení a dělení, ať projdeš hájem.',
      'czech-alphabet':'Kniha kouzel je rozházená. Seřadíš slova podle abecedy?',
      'math-wordproblem':'Zvířátka lesa se chystají na zimu. Pomůžeš spočítat zásoby?',
      'english-reading':'Starý strom ti pošeptal anglickou zprávu. Rozumíš jí?',
      'math-decompose':'Kouzelný amulet se rozbil na číselné části. Složíš ho?',
      'czech-hypernym':'Sbíráš poklady lesa. Roztřídíš věci do správných skupin?',
      'math-pyramid':'V jeskyni jednorožce je pyramida z krystalů. Doplníš čísla?',
      'czech-long-iy':'Víly ti nechaly zprávu v tajném jazyce — pomíchala se krátká a dlouhá písmena!',
      'czech-reading':'Sovy ti vyprávějí krátké příběhy. Přečti je a odpověz na otázky!',
      'czech-diacritics':'Na kůře stromů jsou tajemná znamení. Vyber slovo se správnou diakritikou!',
      'czech-letters':'Z kouzelného slova se rozsypala písmena. Slož ho zpátky!'
    },
    messages: [
      '🦄 Jednorožec jásá: Kouzlo se daří!',
      '🦄 Les ti šeptá: Jsi úžasná!',
      '🦄 Víly tančí radostí!',
      '🦄 Kouzelný prach se třpytí!',
      '🦄 Strom moudrosti roste díky tobě!',
      '🦄 Lesní zvířátka tě obdivují!',
      '🦄 Kouzlo zesílilo — skvělá práce!',
      '🦄 Hvězdy nad lesem svítí jasněji!',
      '🦄 Jednorožec pokyvuje hlavou: Výborně!',
      '🦄 Celý les zpívá radostí!',
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // 3. DRAČÍ OSTROV
  // ═══════════════════════════════════════════════════════════
  draci: {
    id: 'draci', name: 'Dračí ostrov', emoji: '🐉',
    tagline: 'Ochočuj draky a braň ostrov!',
    nicknameTitle: '🐉 Jak se jmenuješ, dračí strážce?',
    nicknameText: 'Draci čekají na svého ochránce — jak ti říkají?',
    nicknamePlaceholder: 'Jméno strážce...',
    subjectIcons: { math: '🔥', czech: '🗡️', english: '🐲' },
    levelIcons: ['🏖️', '🌋', '🏰'],
    levelLabels: ['Pobřeží', 'Sopečná údolí', 'Dračí hrad'],
    ranks: [
      { min: 0,  label: 'Objevitel',            emoji: '🗺️', color: '#90a4ae' },
      { min: 10, label: 'Stopař draků',         emoji: '🐾', color: '#ce93d8' },
      { min: 25, label: 'Krotitel',             emoji: '🔥', color: '#a5d6a7' },
      { min: 40, label: 'Dračí jezdec',         emoji: '🐉', color: '#4fc3f7' },
      { min: 55, label: 'Pán draků',            emoji: '👑', color: '#f4c842' },
    ],
    accent: '#ff5722', accent2: '#4caf50',
    cardGradient: 'linear-gradient(135deg, #1a0a00, #0a1800)',
    mapTitle: '🗺️ Mapa dračího ostrova', dangerLabel: '🌪️ Bouře',
    youtubeTrailer: null, clips: {},
    zones: [
      { label: '🏖️ Pobřeží',          ids: [1,2,3] },
      { label: '🌋 Sopečná údolí',     ids: [4,5,6] },
      { label: '🏔️ Dračí hory',        ids: [7,8,9] },
      { label: '🏰 Dračí hrad',        ids: [10,11,12] },
      { label: '🎯 Tajné jeskyně',     ids: [13,14,15,16,17] },
    ],
    games: [
      'czech-soft-i','math-addition-easy','math-subtraction','english-match',
      'czech-paired','math-multiply2','english-spelling','czech-alphabet',
      'math-wordproblem','english-reading','czech-hypernym','math-decompose',
      'math-pyramid','czech-long-iy',
      'czech-reading','czech-diacritics','czech-letters'
    ],
    titles: {
      'czech-soft-i':'Stopy v písku','math-addition-easy':'Počítání vajec','math-subtraction':'Přes lávový proud',
      'english-match':'Řeč draků','czech-paired':'Dračí zaklínadlo','math-multiply2':'Sopečná zkouška',
      'english-spelling':'Jména draků','czech-alphabet':'Kniha strážců','math-wordproblem':'Obrana ostrova',
      'english-reading':'Stará proroctví','czech-hypernym':'Sbírka dračích šupin','math-decompose':'Dračí poklad',
      'math-pyramid':'Pyramida ohně','czech-long-iy':'Tajné runové písmo',
      'czech-reading':'Dračí kroniky','czech-diacritics':'Runy s háčky','czech-letters':'Tajné slovo draka'
    },
    stories: {
      'czech-soft-i':'Na pobřeží jsi našel stopy draka! V písku jsou slova s chybějícími písmeny.',
      'math-addition-easy':'V hnízdě jsou dračí vejce! Spočítej je, ať žádné nechybí.',
      'math-subtraction':'Lávový proud blokuje cestu! Správné odčítání otevře bezpečnou trasu.',
      'english-match':'Draci komunikují zvláštním jazykem. Přiřadíš anglická slova k obrázkům?',
      'czech-paired':'Našel jsi staré dračí zaklínadlo. Chybí písmena na konci slov!',
      'math-multiply2':'Sopka se probouzí! Vyřeš násobení a dělení, ať unikneš!',
      'english-spelling':'Každý drak má anglické jméno. Složíš je ze správných písmen?',
      'czech-alphabet':'Kniha dračích strážců je rozházená. Seřadíš slova podle abecedy?',
      'math-wordproblem':'Bouře míří na ostrov! Spočítej, kolik zásob potřebuješ na obranu.',
      'english-reading':'V jeskyni jsou stará anglická proroctví. Víš, co znamenají?',
      'czech-hypernym':'Sbíráš dračí šupiny a třídíš poklady. Zařadíš věci do skupin?',
      'math-decompose':'Dračí poklad je zakletý v číslech! Rozlož je na části.',
      'math-pyramid':'V jeskyni stojí ohnivá pyramida z čísel. Doplníš chybějící?',
      'czech-long-iy':'Na stěně jeskyně jsou tajné runy — krátká a dlouhá písmena se pomíchala!',
      'czech-reading':'V dračích kronikách jsou krátké příběhy. Přečti je a odpověz!',
      'czech-diacritics':'Na runách chybí háčky a čárky. Vyber správné slovo!',
      'czech-letters':'Drak schoval tajné slovo do rozsypaných písmen. Slož ho!'
    },
    messages: [
      '🐉 Drak chrlí radostí oheň!',
      '🐉 Ostrov se otřásl nadšením!',
      '🐉 Dračí strážce je hrdý!',
      '🐉 Ohnivý drak tě zdraví křídly!',
      '🐉 Jeskyně zazářila zlatem!',
      '🐉 Dračí vejce praská radostí!',
      '🐉 Vulkán vybuchl nadšením!',
      '🐉 Drak říká: To bylo dračí!',
      '🐉 Tvůj oheň hoří jasně!',
      '🐉 Ostrov je díky tobě bezpečný!',
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // 4. ZVÍŘECÍ ÚTULEK
  // ═══════════════════════════════════════════════════════════
  zvirata: {
    id: 'zvirata', name: 'Zvířecí útulek', emoji: '🐾',
    tagline: 'Zachraň zvířátka a najdi jim domov!',
    nicknameTitle: '🐾 Jak se jmenuješ, záchranáři?',
    nicknameText: 'Zvířátka potřebují pomoc — kdo jsi?',
    nicknamePlaceholder: 'Jméno záchranáře...',
    subjectIcons: { math: '🐶', czech: '🐱', english: '🦜' },
    levelIcons: ['🐶', '🐱', '🐰'],
    levelLabels: ['Psí domky', 'Kočičí koutek', 'Králičí farma'],
    ranks: [
      { min: 0,  label: 'Dobrovolník',          emoji: '🤲', color: '#90a4ae' },
      { min: 10, label: 'Ošetřovatel',          emoji: '💊', color: '#ce93d8' },
      { min: 25, label: 'Záchranář',            emoji: '🦺', color: '#a5d6a7' },
      { min: 40, label: 'Vedoucí útulku',       emoji: '🏠', color: '#4fc3f7' },
      { min: 55, label: 'Ochránce zvířat',       emoji: '🏆', color: '#f4c842' },
    ],
    accent: '#ffab40', accent2: '#69f0ae',
    cardGradient: 'linear-gradient(135deg, #1a1000, #001a08)',
    mapTitle: '🗺️ Mapa útulku', dangerLabel: '🌧️ Opuštěná',
    youtubeTrailer: null, clips: {},
    zones: [
      { label: '🐶 Psí domky',         ids: [1,2,3] },
      { label: '🐱 Kočičí koutek',     ids: [4,5,6] },
      { label: '🐰 Králičí farma',     ids: [7,8,9] },
      { label: '🦜 Ptačí voliéra',     ids: [10,11,12] },
      { label: '🎯 Tajný výběh',       ids: [13,14,15,16,17] },
    ],
    games: [
      'math-addition-easy','czech-soft-i','english-match','math-subtraction',
      'math-multiply2','czech-paired','english-spelling','czech-alphabet',
      'math-wordproblem','english-reading','czech-hypernym','math-decompose',
      'czech-long-iy','math-pyramid',
      'czech-reading','czech-diacritics','czech-letters'
    ],
    titles: {
      'math-addition-easy':'Spočítej štěňata','czech-soft-i':'Jmenovky zvířat','english-match':'Anglicky o zvířatech',
      'math-subtraction':'Krmení koček','math-multiply2':'Objednávka krmiva','czech-paired':'Kartičky zvířátek',
      'english-spelling':'Názvy zvířat','czech-alphabet':'Třídění kartoték','math-wordproblem':'Stavba výběhu',
      'english-reading':'Dopis z ciziny','czech-hypernym':'Kdo kam patří','math-decompose':'Rozpočet útulku',
      'czech-long-iy':'Tajné zápisky','math-pyramid':'Pyramida pamlsků',
      'czech-reading':'Příběhy mazlíčků','czech-diacritics':'Jmenovky s háčky','czech-letters':'Sestav jméno'
    },
    stories: {
      'math-addition-easy':'Do útulku přijela dodávka se štěňaty! Spočítej je, ať žádné nechybí.',
      'czech-soft-i':'Každé zvířátko potřebuje jmenovku. Doplníš správná písmena?',
      'english-match':'Přijeli návštěvníci z Anglie! Přiřadíš anglická slova k obrázkům zvířat?',
      'math-subtraction':'Kočky snědly část krmiva. Odečti a zjisti kolik zbývá!',
      'math-multiply2':'Objednáváš krmivo pro zvířata. Vyřeš násobení a dělení!',
      'czech-paired':'Na kartičkách zvířátek chybí písmena. Doplníš správná?',
      'english-spelling':'Učíš děti anglické názvy zvířat. Složíš je ze správných písmen?',
      'czech-alphabet':'Kartotéka zvířat je rozházená! Seřadíš ji podle abecedy?',
      'math-wordproblem':'Stavíš nový výběh pro králíky. Spočítej kolik materiálu potřebuješ!',
      'english-reading':'Přišel dopis od anglického útulku. Co v něm píšou?',
      'czech-hypernym':'Třídíš zvířata do skupin. Kdo kam patří?',
      'math-decompose':'Rozpočet útulku se rozpadl na kousky. Rozlož čísla správně!',
      'czech-long-iy':'V tajných zápiscích veterináře se pomíchala krátká a dlouhá písmena!',
      'math-pyramid':'Zvířátka poskládala pyramidu z pamlsků. Doplníš chybějící čísla?',
      'czech-reading':'O každém mazlíčkovi je krátký příběh. Přečti a odpověz na otázku!',
      'czech-diacritics':'Na jmenovkách zvířátek chybí háčky a čárky. Vyber správné slovo!',
      'czech-letters':'Jméno zvířátka se rozsypalo na písmena. Slož ho zpátky!'
    },
    messages: [
      '🐾 Mazlíčci mávají tlapkami!',
      '🐾 Štěňátka vrtí ocáskem!',
      '🐾 Koťátko předlo radostí!',
      '🐾 Zvířátka jsou šťastná díky tobě!',
      '🐾 Papoušek volá: Výborně!',
      '🐾 Králíček poskakuje nadšením!',
      '🐾 Celý útulek slaví!',
      '🐾 Mazlíček tě olízl na nose!',
      '🐾 Zvířecí hrdinka — to jsi ty!',
      '🐾 Všechna zvířátka tě milují!',
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // 5. ROBOT CITY
  // ═══════════════════════════════════════════════════════════
  roboti: {
    id: 'roboti', name: 'Robot City', emoji: '🤖',
    tagline: 'Oprav roboty a zachraň město!',
    nicknameTitle: '🤖 Jak se jmenuješ, mechaniku?',
    nicknameText: 'Roboti čekají na opravu — kdo je zachrání?',
    nicknamePlaceholder: 'Jméno mechanika...',
    subjectIcons: { math: '⚙️', czech: '💻', english: '🔌' },
    levelIcons: ['🏭', '🔧', '🏙️'],
    levelLabels: ['Továrna', 'Opravárenská dílna', 'Centrální věž'],
    ranks: [
      { min: 0,  label: 'Praktikant',           emoji: '🔩', color: '#90a4ae' },
      { min: 10, label: 'Technik',              emoji: '🔧', color: '#ce93d8' },
      { min: 25, label: 'Inženýr',              emoji: '⚙️', color: '#a5d6a7' },
      { min: 40, label: 'Hlavní mechanik',       emoji: '🛠️', color: '#4fc3f7' },
      { min: 55, label: 'Mistr robotů',          emoji: '🤖', color: '#f4c842' },
    ],
    accent: '#76ff03', accent2: '#651fff',
    cardGradient: 'linear-gradient(135deg, #0a1a0a, #00100a)',
    mapTitle: '🗺️ Mapa Robot City', dangerLabel: '⚡ Výpadek',
    youtubeTrailer: null, clips: {},
    zones: [
      { label: '🏭 Továrna',           ids: [1,2,3] },
      { label: '🔧 Dílna',             ids: [4,5,6] },
      { label: '💻 Řídicí centrum',    ids: [7,8,9] },
      { label: '🏙️ Centrální věž',     ids: [10,11,12] },
      { label: '🎯 Tajný level',       ids: [13,14,15,16,17] },
    ],
    games: [
      'math-addition-easy','math-subtraction','czech-soft-i','english-match',
      'math-multiply2','czech-paired','english-spelling','math-wordproblem',
      'czech-alphabet','english-reading','math-decompose','czech-hypernym',
      'czech-long-iy','math-pyramid',
      'czech-reading','czech-diacritics','czech-letters'
    ],
    titles: {
      'math-addition-easy':'Zapni generátor','math-subtraction':'Vyměň součástky','czech-soft-i':'Oprav software',
      'english-match':'Přelož instrukce','math-multiply2':'Kalibrace motorů','czech-paired':'Chybné programy',
      'english-spelling':'Anglické příkazy','math-wordproblem':'Zásobování dílny','czech-alphabet':'Třídění robotů',
      'english-reading':'Tajné schéma','math-decompose':'Rozlož obvody','czech-hypernym':'Katalog součástek',
      'czech-long-iy':'Oprav databázi','math-pyramid':'Pyramida kódů',
      'czech-reading':'Logy ze serveru','czech-diacritics':'Oprav diakritiku','czech-letters':'Sestav heslo'
    },
    stories: {
      'math-addition-easy':'Hlavní generátor je vypnutý! Sečti správně čísla a zapni ho.',
      'math-subtraction':'Roboti potřebují nové součástky. Odečti správně, ať víš kolik chybí!',
      'czech-soft-i':'Software robotů má chyby v písmenech. Oprav je!',
      'english-match':'Návod k opravě je v angličtině! Přiřadíš slova k obrázkům?',
      'math-multiply2':'Motory potřebují kalibraci. Vyřeš násobení a dělení!',
      'czech-paired':'Programy mají chyby na konci slov. Doplníš správná písmena?',
      'english-spelling':'Roboti rozumí jen anglickým příkazům. Složíš je správně?',
      'math-wordproblem':'Dílna potřebuje zásoby. Spočítej kolik čeho objednat!',
      'czech-alphabet':'Roboti se zamíchali! Seřaď je podle abecedy.',
      'english-reading':'Našel jsi tajné schéma v angličtině. Rozumíš mu?',
      'math-decompose':'Obvody se rozpadly na kousky! Rozlož čísla na části.',
      'czech-hypernym':'Třídíš součástky do kategorií. Která věc kam patří?',
      'czech-long-iy':'Databáze má chyby — krátká a dlouhá písmena se pomíchala!',
      'math-pyramid':'V řídicím centru je pyramida z kódů. Doplníš chybějící čísla?',
      'czech-reading':'Server zaznamenává krátké zprávy. Přečti je a odpověz na otázky!',
      'czech-diacritics':'V databázi chybí háčky a čárky. Vyber slovo se správnou diakritikou!',
      'czech-letters':'Heslo do hlavního systému je rozsypané na písmena. Slož ho!'
    },
    messages: [
      '🤖 Systém hlásí: 100% úspěch!',
      '🤖 Robot tančí vítězný tanec!',
      '🤖 Baterie nabita na maximum!',
      '🤖 Bzzzz! Výpočet správný!',
      '🤖 Hlavní procesor jásá!',
      '🤖 Robot City tě potřebuje — a ty to zvládáš!',
      '🤖 Senzory hlásí: Génius detekován!',
      '🤖 Všechny diody svítí zeleně!',
      '🤖 Mise dokončena, mechaniku!',
      '🤖 Roboti skandují tvoje jméno!',
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // 6. ZAHRADA KOUZEL
  // ═══════════════════════════════════════════════════════════
  zahrada: {
    id: 'zahrada', name: 'Zahrada kouzel', emoji: '🌸',
    tagline: 'Oživuj kouzelnou zahradu!',
    nicknameTitle: '🌸 Jak se jmenuješ, zahradnice?',
    nicknameText: 'Kouzelná zahrada potřebuje tvou péči — jak ti říkají?',
    nicknamePlaceholder: 'Tvoje jméno...',
    subjectIcons: { math: '🌻', czech: '🌺', english: '🧪' },
    levelIcons: ['🌱', '🌺', '🌳'],
    levelLabels: ['Záhonek klíčků', 'Květinový sad', 'Strom života'],
    ranks: [
      { min: 0,  label: 'Semínko',              emoji: '🌱', color: '#90a4ae' },
      { min: 10, label: 'Zahradnice',           emoji: '🌼', color: '#ce93d8' },
      { min: 25, label: 'Bylinkářka',           emoji: '🌿', color: '#a5d6a7' },
      { min: 40, label: 'Čarodějka přírody',    emoji: '🧙‍♀️', color: '#4fc3f7' },
      { min: 55, label: 'Paní zahrady',          emoji: '👑', color: '#f4c842' },
    ],
    accent: '#f06292', accent2: '#aed581',
    cardGradient: 'linear-gradient(135deg, #200010, #001a00)',
    mapTitle: '🗺️ Mapa kouzelné zahrady', dangerLabel: '🥀 Uvadání',
    youtubeTrailer: null, clips: {},
    zones: [
      { label: '🌱 Záhonek klíčků',    ids: [1,2,3] },
      { label: '🌺 Květinový sad',      ids: [4,5,6] },
      { label: '🧪 Dílna lektvarů',    ids: [7,8,9] },
      { label: '🌳 Strom života',       ids: [10,11,12] },
      { label: '🎯 Tajná stezka',      ids: [13,14,15,16,17] },
    ],
    games: [
      'math-addition-easy','english-match','czech-soft-i','math-subtraction',
      'english-spelling','czech-paired','math-multiply2','math-wordproblem',
      'czech-alphabet','english-reading','czech-hypernym','math-decompose',
      'math-pyramid','czech-long-iy',
      'czech-reading','czech-diacritics','czech-letters'
    ],
    titles: {
      'math-addition-easy':'Sázení semínek','english-match':'Jména květin','czech-soft-i':'Nápisy na záhonech',
      'math-subtraction':'Zalévání sadu','english-spelling':'Bylinkový recept','czech-paired':'Štítky na lahvičkách',
      'math-multiply2':'Míchání lektvarů','math-wordproblem':'Sklizeň plodů','czech-alphabet':'Herbář rostlin',
      'english-reading':'Tajný recept','czech-hypernym':'Třídění surovin','math-decompose':'Rozbitý recept',
      'math-pyramid':'Pyramida květů','czech-long-iy':'Kouzelné formule',
      'czech-reading':'Zápisky z herbáře','czech-diacritics':'Štítky s háčky','czech-letters':'Tajné kouzlo'
    },
    stories: {
      'math-addition-easy':'Zasadíš semínka do záhonku! Spočítej je, ať jich máš dost.',
      'english-match':'Květiny v zahradě mají anglická jména. Přiřadíš je k obrázkům?',
      'czech-soft-i':'Na záhonech jsou nápisy s chybějícími písmeny. Opravíš je?',
      'math-subtraction':'Sad potřebuje zalít! Odečti vodu, kterou už jsi použila.',
      'english-spelling':'Recept na lektvar je v angličtině. Složíš správná slova?',
      'czech-paired':'Na lahvičkách s lektvary chybí písmena. Doplníš je?',
      'math-multiply2':'Míchání kouzelných lektvarů vyžaduje násobení a dělení!',
      'math-wordproblem':'Je čas sklizně! Spočítej kolik plodů zahrádka urodila.',
      'czech-alphabet':'Herbář se rozházel! Seřadíš rostliny podle abecedy?',
      'english-reading':'V zahradě jsi našla tajný anglický recept. Co říká?',
      'czech-hypernym':'Třídíš ingredience do skupin. Co kam patří?',
      'math-decompose':'Kouzelný recept se rozpadl na části. Rozlož čísla správně!',
      'math-pyramid':'V zahradě vyrostla pyramida z květů. Doplníš chybějící čísla?',
      'czech-long-iy':'Kouzelné formule mají pomíchaná krátká a dlouhá písmena!',
      'czech-reading':'V herbáři jsou krátké zápisky. Přečti je a odpověz na otázky!',
      'czech-diacritics':'Na štítcích bylin chybí háčky a čárky. Vyber správné slovo!',
      'czech-letters':'Tajné kouzlo se rozsypalo na písmena. Slož ho zpátky!'
    },
    messages: [
      '🌸 Květiny rozkvetly radostí!',
      '🌸 Zahrada září kouzlem!',
      '🌸 Motýli tančí kolem tebe!',
      '🌸 Semínko moudrosti vyklíčilo!',
      '🌸 Kouzelná růže rozkvétá!',
      '🌸 Zahrada ti děkuje!',
      '🌸 Vítr šeptá: Skvělá práce!',
      '🌸 Berušky tleskají křidélky!',
      '🌸 Celá zahrada voní štěstím!',
      '🌸 Jsi nejlepší zahradnice!',
    ]
  }

};
