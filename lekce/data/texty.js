// ═══════════════════════════════════════════════════════════════════════════
// texty.js — zásoba čtenářských textů
//
// Úrovně podle délky (počet slov):
//   1 = 120–160    2 = 160–220    3 = 220–300    4 = 300–400    5 = ~strana A4
//
// Ke každému textu patří:
//   • nejvýše tři obtížnější slova se slabikami a vysvětlením,
//   • pět otázek v pořadí: z textu → z textu → vlastními slovy → proč/jak →
//     vlastní názor.
//
// Otázky na názor nemají „správnou“ odpověď — hodnotí se jen to, že Ami
// odpověděla celou větou a k tématu.
//
// Fakta v textech jsou držená u obecně známých a ověřitelných věcí.
// ═══════════════════════════════════════════════════════════════════════════

const Texty = {
  SEZNAM: [

    // ───────────────────────────── ÚROVEŇ 1 ─────────────────────────────────
    {
      id: 'vydra',
      nadpis: 'Vydry se drží za ruce',
      uroven: 1,
      tema: 'zvirata',
      text:
        'Vydra mořská tráví skoro celý život ve vodě. Spí na hladině, jí na hladině a na hladině se i houpe, když odpočívá.\n\n' +
        'Když vydra usne, může ji proud odnést daleko od ostatních. Vydry na to přišly na chytrý nápad. Než usnou, chytnou se za přední tlapky. Vypadá to, jako by se držely za ruce. Díky tomu zůstanou pohromadě i ve spánku.\n\n' +
        'Někdy se také zamotají do dlouhých mořských řas. Řasy je udrží na místě jako provaz, který drží loďku u břehu.\n\n' +
        'Vydry mají ještě jednu zvláštnost. Každá si schovává svůj oblíbený kamínek. Nosí ho v kapse kůže pod přední tlapkou. Kamínkem rozbíjí ulity mušlí, aby se dostala k jídlu. Některá vydra používá stejný kamínek celé roky a jiný by nevzala.\n\n' +
        'Malá mláďata plavat neumějí. Máma je proto pokládá na břicho, plave na zádech a mládě veze nahoře jako na loďce. Když si potřebuje zaplavat pro jídlo, zamotá mládě do řas, aby jí neodplavalo. Pak se pro ně vrátí.',
      tezkaSlova: [
        { slovo: 'hladině', slabiky: 'hla-di-ně', vyznam: 'na povrchu vody, úplně nahoře' },
        { slovo: 'zvláštnost', slabiky: 'zvlášt-nost', vyznam: 'něco neobvyklého, čím se liší od ostatních' },
        { slovo: 'oblíbený', slabiky: 'ob-lí-be-ný', vyznam: 'takový, který má někdo nejradši' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Kde vydra mořská tráví skoro celý život?', klicova: ['vod', 'hladin', 'moř'], odstavec: 0,
          napoveda: 'Odpověď je hned v první větě textu.' },
        { typ: 'z-textu', otazka: 'Co dělají vydry, aby je proud neodnesl od ostatních?', klicova: ['tlapk', 'ruce', 'drží', 'chytn'], odstavec: 1,
          napoveda: 'Podívej se na druhý odstavec — je tam popsaný jejich chytrý nápad.' },
        { typ: 'vlastnimi-slovy', otazka: 'Vysvětli vlastními slovy, k čemu vydra používá svůj kamínek.', klicova: ['rozbí', 'ulit', 'mušl', 'jídl', 'otvír'], odstavec: 3,
          napoveda: 'Poslední odstavec mluví o kamínku. Co s ním vydra dělá?' },
        { typ: 'proc-jak', otazka: 'Proč je pro vydry důležité zůstat ve spánku pohromadě?', klicova: ['odnes', 'proud', 'ztrat', 'daleko', 'bezpeč', 'sam'], odstavec: 1,
          napoveda: 'Zamysli se, co by se stalo, kdyby vydra usnula úplně sama.' },
        { typ: 'nazor', otazka: 'Kdybys byla vydra, jaký kamínek by sis vybrala a proč?', klicova: [], odstavec: null,
          napoveda: 'Tady není správná odpověď — napiš, co si myslíš ty. Nezapomeň na celou větu.' },
      ],
    },

    {
      id: 'moonwalk',
      nadpis: 'Chůze, která jde pozpátku',
      uroven: 1,
      tema: 'hudba',
      text:
        'Michael Jackson byl zpěvák a tanečník. Lidé mu říkali král popu, protože jeho písničky znal skoro celý svět.\n\n' +
        'Nejvíc se proslavil tancem, kterému se říká moonwalk. Česky by se dalo říct měsíční chůze. Vypadá to, jako by tanečník kráčel dopředu, ale ve skutečnosti klouže dozadu. Diváci nemohli uvěřit svým očím.\n\n' +
        'Michael tenhle pohyb nevymyslel úplně sám. Viděl ho u pouličních tanečníků a naučil se ho od nich. Potom ho cvičil tak dlouho, až mu šel dokonale.\n\n' +
        'Poprvé ho ukázal v televizi v roce 1983. Druhý den se moonwalk pokoušely tancovat děti po celém světě. Zkoušely to na chodbách, na chodnících i v kuchyni. Většině to napoprvé vůbec nešlo. Právě to je na tom to nejzajímavější — i králi popu to zpočátku nešlo.',
      tezkaSlova: [
        { slovo: 'proslavil', slabiky: 'pro-sla-vil', vyznam: 'stal se známým, lidé o něm začali mluvit' },
        { slovo: 'skutečnosti', slabiky: 'sku-teč-nos-ti', vyznam: 'jak to je doopravdy' },
        { slovo: 'dokonale', slabiky: 'do-ko-na-le', vyznam: 'úplně bez chyby' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Jak se říká tanci, kterým se Michael Jackson proslavil?', klicova: ['moonwalk', 'měsíční chůz', 'měsíčn'], odstavec: 1,
          napoveda: 'Název tance je ve druhém odstavci. Je napsaný anglicky i česky.' },
        { typ: 'z-textu', otazka: 'V kterém roce ukázal moonwalk poprvé v televizi?', klicova: ['1983'], odstavec: 3,
          napoveda: 'Rok najdeš v posledním odstavci.' },
        { typ: 'vlastnimi-slovy', otazka: 'Popiš vlastními slovy, jak moonwalk vypadá.', klicova: ['dopředu', 'dozadu', 'klouž', 'pozpátku', 'zdá'], odstavec: 1,
          napoveda: 'Tanečník vypadá, že jde jedním směrem, ale ve skutečnosti jde jinam. Jak to popíšeš?' },
        { typ: 'proc-jak', otazka: 'Jak je možné, že Michaelovi šel moonwalk tak dobře?', klicova: ['cvič', 'trén', 'dlouho', 'nauč', 'znovu'], odstavec: 2,
          napoveda: 'Třetí odstavec říká, co dělal poté, co tanec viděl u jiných tanečníků.' },
        { typ: 'nazor', otazka: 'Zkoušela jsi někdy něco, co ti napoprvé nešlo? Napiš o tom.', klicova: [], odstavec: null,
          napoveda: 'Vzpomeň si na něco, co ses učila. Klidně to může být cokoli.' },
      ],
    },

    {
      id: 'mesic-stopa',
      nadpis: 'Stopa, která nezmizí',
      uroven: 1,
      tema: 'vesmir',
      text:
        'Na Měsíci není žádný vzduch. To znamená, že tam nefouká vítr. Neprší tam a nesněží.\n\n' +
        'Proto se na Měsíci děje něco zvláštního. Když tam někdo šlápne do prachu, jeho stopa tam zůstane. Nikdo ji nesmete, nikdo ji nesmyje. Stopa zůstane skoro navždycky.\n\n' +
        'První lidé přistáli na Měsíci v roce 1969. Chodili po něm jen pár hodin. Jejich stopy jsou tam ale dodnes. A budou tam ještě hodně dlouho poté, co my všichni budeme pryč.\n\n' +
        'Na Zemi to funguje úplně jinak. Když šlápneš do písku na pláži, stopa vydrží jen chvilku. Přijde vlna nebo zafouká vítr a je pryč. Možná právě proto je stopa na Měsíci tak zvláštní. Je to obyčejná šlápota, která přežije všechno.\n\n' +
        'Kromě stop tam astronauti nechali i jiné věci. Zůstala tam vlajka, fotoaparáty a taky jedna zlatá olivová ratolest. Je to znamení míru. Položil ji tam jeden z astronautů jako vzkaz pro každého, kdo tam někdy přiletí po nich.',
      tezkaSlova: [
        { slovo: 'nesmete', slabiky: 'ne-sme-te', vyznam: 'neodfoukne, neuklidí pryč' },
        { slovo: 'přistáli', slabiky: 'při-stá-li', vyznam: 'dosedli na povrch, dorazili tam' },
        { slovo: 'obyčejná', slabiky: 'o-by-čej-ná', vyznam: 'úplně normální, nijak zvláštní' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Proč na Měsíci nefouká vítr?', klicova: ['vzduch', 'není vzduch', 'nemá vzduch'], odstavec: 0,
          napoveda: 'Odpověď je v první větě celého textu.' },
        { typ: 'z-textu', otazka: 'V kterém roce přistáli na Měsíci první lidé?', klicova: ['1969'], odstavec: 2,
          napoveda: 'Rok je ve třetím odstavci.' },
        { typ: 'vlastnimi-slovy', otazka: 'Vysvětli vlastními slovy, proč stopa na pláži zmizí, ale na Měsíci ne.', klicova: ['vlna', 'vítr', 'moře', 'vod', 'fouká', 'smyj'], odstavec: 3,
          napoveda: 'Na Zemi něco stopu smaže. Co to je? A proč to na Měsíci není?' },
        { typ: 'proc-jak', otazka: 'Co by se muselo stát, aby stopa na Měsíci zmizela?', klicova: ['vítr', 'vzduch', 'déšť', 'někdo', 'šláp', 'zaves', 'meteor', 'kámen'], odstavec: null,
          napoveda: 'Zamysli se, co stopy maže na Zemi — a co by na to bylo potřeba na Měsíci.' },
        { typ: 'nazor', otazka: 'Chtěla bys jednou stát na Měsíci? Napiš proč ano, nebo proč ne.', klicova: [], odstavec: null,
          napoveda: 'Napiš, co si myslíš ty. Obě odpovědi jsou správné.' },
      ],
    },

    {
      id: 'tuzka',
      nadpis: 'Co je uvnitř tužky',
      uroven: 1,
      tema: 'predmety',
      text:
        'Uvnitř obyčejné tužky není olovo, i když se tomu černému uvnitř říká tuha. Kdysi si lidé mysleli, že to olovo je. Spletli se.\n\n' +
        'Ve skutečnosti je uvnitř grafit. Grafit je nerost, který se dobývá ze země. Je černý, měkký a maže se. Právě proto po papíře zanechává čáru.\n\n' +
        'Zajímavé je, z čeho grafit vzniká. Je to stejná látka jako diamant. Rozdíl je jenom v tom, jak jsou v ní částečky poskládané. V diamantu drží pevně u sebe, a proto je diamant nejtvrdší věcí na světě. V grafitu leží ve vrstvách, které po sobě kloužou. Proto se grafit maže.\n\n' +
        'Když tedy píšeš tužkou, píšeš vlastně příbuzným diamantu. Jednou obyčejnou tužkou se dá nakreslit čára dlouhá skoro padesát kilometrů.\n\n' +
        'Tvrdost tužky se pozná podle písmenka na konci. Písmeno H znamená tvrdá, písmeno B měkká. Tvrdá tužka kreslí tenkou světlou čáru a hodí se na rýsování. Měkká tužka kreslí tlustě a černě, a proto ji mají rádi malíři.',
      tezkaSlova: [
        { slovo: 'nerost', slabiky: 'ne-rost', vyznam: 'kámen nebo látka, která se najde v zemi' },
        { slovo: 'částečky', slabiky: 'čás-teč-ky', vyznam: 'úplně malinké kousíčky, které nejsou vidět' },
        { slovo: 'příbuzným', slabiky: 'pří-buz-ným', vyznam: 'někdo ze stejné rodiny' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Co je doopravdy uvnitř tužky?', klicova: ['grafit'], odstavec: 1,
          napoveda: 'Odpověď je ve druhém odstavci. Je to jedno slovo.' },
        { typ: 'z-textu', otazka: 'Která věc je podle textu nejtvrdší na světě?', klicova: ['diamant'], odstavec: 2,
          napoveda: 'Třetí odstavec porovnává dvě věci ze stejné látky.' },
        { typ: 'vlastnimi-slovy', otazka: 'Vysvětli vlastními slovy, proč je diamant tvrdý a grafit měkký.', klicova: ['částečk', 'pevně', 'vrstv', 'klouž', 'poskláda', 'u sebe'], odstavec: 2,
          napoveda: 'Obojí je stejná látka. Liší se tím, jak jsou částečky uvnitř uspořádané.' },
        { typ: 'proc-jak', otazka: 'Proč tužka po papíře zanechává čáru?', klicova: ['maže', 'měkk', 'otír', 'kousk', 'zůst'], odstavec: 1,
          napoveda: 'Souvisí to s tím, že grafit je měkký. Co se s ním děje na papíře?' },
        { typ: 'nazor', otazka: 'Co bys nakreslila, kdybys měla čáru dlouhou padesát kilometrů?', klicova: [], odstavec: null,
          napoveda: 'Vymysli si cokoli. Napiš odpověď celou větou.' },
      ],
    },

    // ───────────────────────────── ÚROVEŇ 2 ─────────────────────────────────
    {
      id: 'shakira',
      nadpis: 'Holčička, která neuměla zpívat',
      uroven: 2,
      tema: 'hudba',
      text:
        'Shakira se narodila v Kolumbii, v zemi na severu Jižní Ameriky. Už jako malá holčička milovala hudbu a tanec. Když jí byly čtyři roky, tančila v restauraci před cizími lidmi a vůbec se nestyděla.\n\n' +
        'Ve škole ji ale čekalo zklamání. Přihlásila se do školního sboru a učitel ji nevzal. Řekl jí, že její hlas zní divně — prý jako koza. Shakira brečela. Mohla toho nechat a věnovat se něčemu jinému.\n\n' +
        'Neudělala to. Zpívala dál doma, psala si vlastní písničky a učila se hrát. Její zvláštní hlas se nakonec stal tím, podle čeho ji lidé poznají mezi tisíci jinými zpěvačkami. To, co učiteli vadilo, se ukázalo jako to nejcennější, co měla.\n\n' +
        'Shakira zpívá španělsky i anglicky. Její písničky poslouchají lidé v Evropě, v Americe i v Asii. Ke zpěvu vždycky patří i tanec, protože bez tance by to podle ní nebylo ono.\n\n' +
        'Když se jí lidé ptají na ten školní sbor, směje se. Prý je ráda, že ji tehdy nevzali. Kdyby ji vzali, možná by se snažila zpívat jako všichni ostatní.',
      tezkaSlova: [
        { slovo: 'zklamání', slabiky: 'zkla-má-ní', vyznam: 'smutek z toho, že něco nedopadlo, jak jsme si přáli' },
        { slovo: 'nejcennější', slabiky: 'nej-cen-něj-ší', vyznam: 'to nejdůležitější, čeho si nejvíc ceníme' },
        { slovo: 'ostatní', slabiky: 'os-tat-ní', vyznam: 'ti druzí, všichni kolem' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Ve které zemi se Shakira narodila?', klicova: ['kolumbi'], odstavec: 0,
          napoveda: 'Země je hned v první větě.' },
        { typ: 'z-textu', otazka: 'Co se stalo, když se přihlásila do školního sboru?', klicova: ['nevzal', 'nepřijal', 'odmít', 'koza', 'divn'], odstavec: 1,
          napoveda: 'Druhý odstavec mluví o tom, jak to ve škole dopadlo.' },
        { typ: 'vlastnimi-slovy', otazka: 'Vysvětli vlastními slovy, proč je Shakira ráda, že ji do sboru nevzali.', klicova: ['jako ostatn', 'jako všichni', 'zvláštn', 'vlastn', 'jin', 'sama sebou', 'hlas'], odstavec: 4,
          napoveda: 'Poslední odstavec říká, čeho se bojí, kdyby ji tehdy vzali.' },
        { typ: 'proc-jak', otazka: 'Jak to, že se z jejího „divného“ hlasu stala výhoda?', klicova: ['pozna', 'jin', 'zvláštn', 'nezaměn', 'odliš', 'mezi tisíc'], odstavec: 2,
          napoveda: 'Třetí odstavec popisuje, co ten hlas nakonec lidem udělal.' },
        { typ: 'nazor', otazka: 'Řekl ti někdy někdo, že ti něco nejde? Co bys mu odpověděla dneska?', klicova: [], odstavec: null,
          napoveda: 'Napiš, co si o tom myslíš. Klidně dvě věty.' },
      ],
    },

    {
      id: 'vcely-tanec',
      nadpis: 'Včely si to vytančí',
      uroven: 2,
      tema: 'zvirata',
      text:
        'Když včela najde louku plnou květů, potřebuje to říct ostatním. Nemůže jim to ale povědět — včely spolu nemluví. Používají něco jiného. Tančí.\n\n' +
        'Včela se vrátí do úlu a začne na plástvi běhat dokolečka. Ostatní včely se k ní přitisknou a sledují ji. Podle toho, jak se pohybuje, poznají, kde ta louka je.\n\n' +
        'Když je jídlo blízko, dělá včela kolečka. Když je daleko, tančí něco, čemu se říká osmičkový tanec. Běží rovně, zatřese zadečkem, otočí se doleva a vrátí se zpátky. Potom to udělá znovu, ale otočí se doprava. Dohromady to vykresluje tvar osmičky.\n\n' +
        'A teď to nejchytřejší. Směr, kterým běží rovně, ukazuje, kterým směrem mají ostatní letět. A jak dlouho třese zadečkem, prozradí, jak daleko to je. Čím delší třesení, tím delší cesta.\n\n' +
        'Tomuhle tanci rozumí každá včela v úlu. Nikdo je to neučí ve škole. Umí to od narození.\n\n' +
        'V úlu je přitom skoro úplná tma. Ostatní včely tanečnici nevidí. Musí se k ní přitisknout tykadly a cítit, jak se chvěje. Tanec tedy vlastně nesledují očima, ale hmatem.\n\n' +
        'Vědci na to přišli tak, že do úlu udělali okénko a celé dny tanec pozorovali. Trvalo jim mnoho let, než pochopili, co která část tance znamená. Včely to znaly odjakživa.',
      tezkaSlova: [
        { slovo: 'plástvi', slabiky: 'plást-vi', vyznam: 'voskové patro v úlu, kde včely bydlí a skladují med' },
        { slovo: 'prozradí', slabiky: 'pro-zra-dí', vyznam: 'dá ostatním vědět, ukáže' },
        { slovo: 'nejchytřejší', slabiky: 'nej-chyt-řej-ší', vyznam: 'ze všeho nejchytřejší, nejvíc vymyšlené' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Jak si včely řeknou, kde je jídlo?', klicova: ['tanc', 'tanč', 'tanec', 'pohyb'], odstavec: 0,
          napoveda: 'Poslední slovo prvního odstavce je odpověď.' },
        { typ: 'z-textu', otazka: 'Jaký tanec tančí včela, když je jídlo daleko?', klicova: ['osmičk'], odstavec: 2,
          napoveda: 'Třetí odstavec popisuje dva různé tance — jeden pro blízko, druhý pro daleko.' },
        { typ: 'vlastnimi-slovy', otazka: 'Vysvětli vlastními slovy, jak včely poznají, jak daleko musí letět.', klicova: ['třes', 'zadeč', 'dlouh', 'délk', 'čím dél'], odstavec: 3,
          napoveda: 'Ve čtvrtém odstavci je řeč o tom, jak dlouho včela něčím třese.' },
        { typ: 'proc-jak', otazka: 'Proč je pro celý úl důležité, že si včely umějí předat, kde je jídlo?', klicova: ['všichn', 'rychl', 'nemus', 'hled', 'čas', 'víc medu', 'najd', 'společ'], odstavec: null,
          napoveda: 'Představ si, že by to každá včela musela hledat sama. Co by to znamenalo?' },
        { typ: 'nazor', otazka: 'Kdybys nemohla mluvit, jak bys kamarádce ukázala cestu domů?', klicova: [], odstavec: null,
          napoveda: 'Vymysli vlastní způsob. Napiš ho celou větou.' },
      ],
    },

    {
      id: 'lavina-pes',
      nadpis: 'Pes, který hledá pod sněhem',
      uroven: 2,
      tema: 'profese',
      text:
        'Když v horách spadne lavina, může pod sněhem zůstat člověk. Záchranáři mají málo času. Nejdůležitější je první čtvrthodina.\n\n' +
        'Proto s nimi chodí zvláštně vycvičení psi. Pes projde plochu, kterou by lidé prohledávali celé hodiny, za pár minut. Neuvidí nic, ale ucítí. Lidský pach prochází i metrem sněhu a pes ho pozná.\n\n' +
        'Výcvik takového psa trvá roky a začíná jako hra. Psovod se schová pod deku a pes ho hledá. Když ho najde, dostane pochvalu a hraje si. Postupně se skrýš zhoršuje — nejdřív pod dekou, potom v jámě, nakonec pod sněhem.\n\n' +
        'Nikdy se ale nezmění jedna věc. Pro psa to zůstává hra. Nikdy se nedozví, že jde o život. Kdyby to věděl, byl by nervózní a hledal hůř.\n\n' +
        'Zajímavé je, že psa je potřeba nechat občas „vyhrát“ i naostro. Když dlouho hledá a nikoho nenajde, ztrácí chuť. Proto se do sněhu schová někdo ze záchranářů, aby pes zažil úspěch. Vypadá to jako podvod, ale je to důležité. Pes, který věří, že najde, hledá nejlíp.',
      tezkaSlova: [
        { slovo: 'záchranáři', slabiky: 'zá-chra-ná-ři', vyznam: 'lidé, kteří pomáhají zachránit někoho v nebezpečí' },
        { slovo: 'psovod', slabiky: 'pso-vod', vyznam: 'člověk, který psa cvičí a pracuje s ním' },
        { slovo: 'nervózní', slabiky: 'ner-vóz-ní', vyznam: 'neklidný, když má někdo strach nebo trému' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Jak dlouhá doba je po pádu laviny nejdůležitější?', klicova: ['čtvrthodin', 'patnáct', '15'], odstavec: 0,
          napoveda: 'V prvním odstavci je uvedený čas.' },
        { typ: 'z-textu', otazka: 'Čím pes člověka pod sněhem najde?', klicova: ['pach', 'čich', 'ucít', 'vůn', 'nos'], odstavec: 1,
          napoveda: 'Druhý odstavec říká, že pes nic neuvidí — ale něco udělá.' },
        { typ: 'vlastnimi-slovy', otazka: 'Vysvětli vlastními slovy, proč se psa nechává občas „vyhrát“.', klicova: ['chuť', 'úspěch', 'věř', 'nadš', 'vzda', 'motiv', 'nebav'], odstavec: 4,
          napoveda: 'Poslední odstavec vysvětluje, co se stane, když pes dlouho nikoho nenajde.' },
        { typ: 'proc-jak', otazka: 'Proč je lepší, že pes neví, že jde o život?', klicova: ['nervóz', 'hra', 'strach', 'klid', 'hůř', 'lép', 'stres'], odstavec: 3,
          napoveda: 'Čtvrtý odstavec říká, co by se stalo, kdyby to pes věděl.' },
        { typ: 'nazor', otazka: 'Co by ses chtěla naučit dělat společně se psem?', klicova: [], odstavec: null,
          napoveda: 'Napiš svůj nápad celou větou.' },
      ],
    },

    {
      id: 'bruno-mars',
      nadpis: 'Kluk, který uměl všechno',
      uroven: 2,
      tema: 'hudba',
      text:
        'Bruno Mars vyrostl na Havaji, na ostrově uprostřed Tichého oceánu. Celá jeho rodina se živila hudbou. Táta hrál na bicí, máma zpívala a tančila. Doma se hrálo pořád.\n\n' +
        'Bruno vystupoval už jako malý kluk. Když mu byly čtyři roky, napodoboval na pódiu Elvise Presleyho. Lidé na Havaji ho znali dřív, než chodil do školy.\n\n' +
        'Naučil se hrát na spoustu nástrojů — na kytaru, na klavír, na bicí i na baskytaru. Nikdo mu neřekl, že by se měl soustředit jen na jeden. Prostě hrál na to, co bylo zrovna po ruce.\n\n' +
        'Když se později přestěhoval do Ameriky, dlouho se mu nedařilo. Nahrávací společnosti ho odmítaly. Řekly mu, že neví, do jaké škatulky patří — není ani takový, ani onaký.\n\n' +
        'Bruno se rozhodl, že se do žádné škatulky cpát nebude. Začal psát písničky pro jiné zpěváky a čekal na svou příležitost. Ta přišla a jeho písničky dnes zná celý svět. Právě to, že uměl od každého trochu, se nakonec ukázalo jako jeho největší síla.',
      tezkaSlova: [
        { slovo: 'napodoboval', slabiky: 'na-po-do-bo-val', vyznam: 'dělal to po někom, snažil se být jako on' },
        { slovo: 'soustředit', slabiky: 'sou-stře-dit', vyznam: 'věnovat se jen jedné věci' },
        { slovo: 'příležitost', slabiky: 'pří-le-ži-tost', vyznam: 'vhodná chvíle, kdy se něco povede' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Kde Bruno Mars vyrostl?', klicova: ['havaj'], odstavec: 0,
          napoveda: 'Místo je v první větě.' },
        { typ: 'z-textu', otazka: 'Vyjmenuj aspoň dva nástroje, na které se naučil hrát.', klicova: ['kytar', 'klavír', 'bic', 'baskytar'], odstavec: 2,
          napoveda: 'Třetí odstavec vyjmenovává čtyři nástroje.' },
        { typ: 'vlastnimi-slovy', otazka: 'Vysvětli vlastními slovy, co znamená „nevěděly, do jaké škatulky patří“.', klicova: ['zařad', 'nevěd', 'jak', 'nepodob', 'jin', 'druh', 'styl'], odstavec: 3,
          napoveda: 'Škatulka tady neznamená opravdovou krabičku. Co tím lidé mysleli?' },
        { typ: 'proc-jak', otazka: 'Jak se z jeho „nevýhody“ nakonec stala síla?', klicova: ['všechn', 'od každ', 'víc', 'nástroj', 'styl', 'sil', 'trochu'], odstavec: 4,
          napoveda: 'Poslední věta textu to říká přímo.' },
        { typ: 'nazor', otazka: 'Umíš od každého trochu, nebo máš jednu věc, která ti jde nejvíc? Napiš o tom.', klicova: [], odstavec: null,
          napoveda: 'Odpověz za sebe, celou větou.' },
      ],
    },

    // ───────────────────────────── ÚROVEŇ 3 ─────────────────────────────────
    {
      id: 'aisha-mongolsko',
      nadpis: 'Škola, která se stěhuje',
      uroven: 3,
      tema: 'deti-sveta',
      text:
        'Ajša je osmiletá holčička a bydlí v Mongolsku. Její rodina chová koně, ovce a velbloudy. Nebydlí v domě, ale ve stanu, kterému se říká jurta.\n\n' +
        'Jurta je kulatá, uvnitř je kamna a kolem dokola postele. Vypadá jako obyčejný stan, ale je teplá i v zimě, kdy venku mrzne až třicet stupňů pod nulou. Když se pastviny vypasou, celá rodina jurtu složí, naloží na náklaďák a odjede o kus dál. Za rok se takhle stěhují i čtyřikrát.\n\n' +
        'Škola se ale stěhovat nemůže. Proto Ajša bydlí přes týden na internátu ve městě. V pondělí ráno ji táta odveze a v pátek si ji přijede vyzvednout. Někdy je cesta tak dlouhá, že trvá půl dne.\n\n' +
        'Ajše se po rodině stýská, ale na internátu má kamarádky ze stejných rodin. Všechny vědí, jaké to je. Večer si vyprávějí, kam se která rodina přestěhovala a kolik se komu narodilo hříbat.\n\n' +
        'Nejradši má pátek odpoledne. Vyjde ven, uvidí tátovo auto a už z dálky pozná, jestli s ním přijel i její kůň. Vlastního koně dostala, když jí bylo pět let. Jmenuje se Bors, což mongolsky znamená bouře.\n\n' +
        'V létě, o prázdninách, jezdí Ajša s rodinou po stepi celé dny. Říká, že ve městě je moc zdí. Ve stepi je vidět až tam, kde se země dotýká nebe.\n\n' +
        'Jednou za rok se v Mongolsku konají velké závody. Jezdí v nich jenom děti, protože jsou lehčí než dospělí a koně s nimi doběhnou dál. Závodní trať měří i pětadvacet kilometrů. Ajša se přihlásila loni a dojela sedmnáctá ze třiceti.\n\n' +
        'Než závod začal, byla nervózní tak, že skoro nemohla mluvit. Táta jí řekl jedinou větu: „Nedívej se na ostatní, dívej se mezi uši svého koně.“ Ajša říká, že to je nejlepší rada, jakou kdy dostala.',
      tezkaSlova: [
        { slovo: 'pastviny', slabiky: 'past-vi-ny', vyznam: 'louky, kde se pase dobytek' },
        { slovo: 'internát', slabiky: 'in-ter-nát', vyznam: 'místo u školy, kde děti bydlí přes týden' },
        { slovo: 'stepi', slabiky: 'ste-pi', vyznam: 'v obrovské rovné krajině s trávou, skoro bez stromů' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Jak se jmenuje stan, ve kterém Ajšina rodina bydlí?', klicova: ['jurt'], odstavec: 0,
          napoveda: 'Název je na konci prvního odstavce.' },
        { typ: 'z-textu', otazka: 'Proč Ajša bydlí přes týden na internátu?', klicova: ['škol', 'stěhov', 'daleko', 'nemůž'], odstavec: 2,
          napoveda: 'Třetí odstavec začíná vysvětlením.' },
        { typ: 'vlastnimi-slovy', otazka: 'Vysvětli vlastními slovy, proč se rodina několikrát za rok stěhuje.', klicova: ['pastvin', 'vypas', 'tráv', 'zvířat', 'jídl', 'pastv'], odstavec: 1,
          napoveda: 'Druhý odstavec říká, co se stane s pastvinami. Co pak musí rodina udělat?' },
        { typ: 'proc-jak', otazka: 'Co Ajša myslí tím, že „ve městě je moc zdí“?', klicova: ['nevid', 'dalek', 'stísn', 'volno', 'daleko', 'zavř', 'step', 'prostor', 'brán'], odstavec: 5,
          napoveda: 'Porovnej to s tím, co říká o stepi hned v další větě.' },
        { typ: 'nazor', otazka: 'Chtěla bys žít tak, že se každé tři měsíce stěhuješ jinam? Napiš proč.', klicova: [], odstavec: null,
          napoveda: 'Zamysli se, co by na tom bylo hezké a co těžké. Odpověz celou větou.' },
      ],
    },

    {
      id: 'strom-mluvi',
      nadpis: 'Stromy si posílají zprávy',
      uroven: 3,
      tema: 'veda',
      text:
        'Dlouho si lidé mysleli, že strom je sám. Že si stojí na místě a nikoho nepotřebuje. Vědci ale zjistili, že to tak vůbec není.\n\n' +
        'Pod zemí, kolem kořenů, roste síť tenkých vláken. Patří houbám. Ta vlákna se propletou s kořeny stromů a spojí je dohromady. Vznikne tak něco jako podzemní síť, kterou si stromy mohou posílat vodu, cukr i zprávy.\n\n' +
        'Zní to zvláštně, ale funguje to. Když na strom zaútočí housenky, strom vypustí do sítě látku, která ostatním hlásí nebezpečí. Sousední stromy zprávu přijmou a začnou si vyrábět hořkou šťávu, aby jim housenky nechutnaly. Zprávu tedy dostanou dřív, než k nim housenky dolezou.\n\n' +
        'Ještě zajímavější je, co se děje se starými stromy. Velký starý strom, kterému vědci někdy říkají matka, posílá cukr malým stromkům ve svém stínu. Ty by samy nepřežily, protože se k nim nedostane dost světla. Matka je živí, dokud nevyrostou.\n\n' +
        'A když starý strom umírá, pošle do sítě všechno, co mu zbývá. Rozdělí to mezi ty kolem sebe. Vypadá to skoro jako poslední dárek.\n\n' +
        'Vědci tuhle podzemní síť objevili teprve nedávno. Napůl žertem jí začali říkat dřevěný internet. Fungoval ale dávno předtím, než lidi napadlo postavit ten svůj.\n\n' +
        'Houby to samozřejmě nedělají zadarmo. Za vodu a zprávy, které stromům předávají, si berou cukr. Strom ho vyrobí v listech ze slunečního světla a část ho pošle houbám dolů ke kořenům. Oba na tom vydělají.\n\n' +
        'Právě proto vědci říkají, že les není jenom hromada stromů vedle sebe. Je to jeden velký propojený celek. Když se pokácí jeden strom, ubude ze sítě kus, který ostatním chybí.',
      tezkaSlova: [
        { slovo: 'vlákna', slabiky: 'vlák-na', vyznam: 'tenoučké nitky' },
        { slovo: 'nebezpečí', slabiky: 'ne-bez-pe-čí', vyznam: 'něco, co může ublížit' },
        { slovo: 'propletou', slabiky: 'pro-ple-tou', vyznam: 'zamotají se dohromady, spojí se' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Komu patří vlákna, která spojují stromy pod zemí?', klicova: ['houb'], odstavec: 1,
          napoveda: 'Druhý odstavec to říká krátkou větou.' },
        { typ: 'z-textu', otazka: 'Co udělají sousední stromy, když dostanou zprávu o housenkách?', klicova: ['hořk', 'šťáv', 'nechutn', 'vyráb', 'brán'], odstavec: 2,
          napoveda: 'Třetí odstavec popisuje, jak se stromy brání.' },
        { typ: 'vlastnimi-slovy', otazka: 'Vysvětli vlastními slovy, proč starý strom posílá cukr malým stromkům.', klicova: ['svět', 'stín', 'nepřež', 'mal', 'nedosta', 'živ', 'pomáh'], odstavec: 3,
          napoveda: 'Čtvrtý odstavec vysvětluje, co malým stromkům ve stínu chybí.' },
        { typ: 'proc-jak', otazka: 'Proč vědci té síti říkají „dřevěný internet“?', klicova: ['zpráv', 'posíl', 'spoj', 'síť', 'informac', 'komunik', 'jako internet'], odstavec: 5,
          napoveda: 'Zamysli se, co dělá internet mezi lidmi a co dělá tahle síť mezi stromy.' },
        { typ: 'nazor', otazka: 'Změnilo tohle čtení něco na tom, jak se díváš na les? Napiš, co si myslíš.', klicova: [], odstavec: null,
          napoveda: 'Napiš svůj názor. Není špatná odpověď.' },
      ],
    },

    {
      id: 'draci-knihovna',
      nadpis: 'Dračí knihovna',
      uroven: 3,
      tema: 'pohadka',
      text:
        'Ve skále nad městem bydlel drak. Lidé se ho báli, i když jim nikdy nic neudělal. Nikdo se k němu neodvážil, a tak si o něm vyprávěli, co je napadlo.\n\n' +
        'Jednou se do skály zatoulala holčička jménem Mira. Nešla tam schválně, jen se jí zakutálel míč. Když vešla do jeskyně, čekala oheň a kosti. Uviděla knihy.\n\n' +
        'Knihy byly úplně všude. Ve stozích u stěn, na kamenných policích, i na zemi kolem draka. Drak seděl uprostřed a jednu z nich držel v drápech. Vypadal spíš unaveně než hrozivě.\n\n' +
        '„Neumím číst,“ řekl drak, aniž by zvedl hlavu. „Sbírám je tři sta let a ani jednu jsem nepřečetl. Dračí oči nerozeznají písmena. Jsou na to moc velké.“\n\n' +
        'Mira se posadila. Otevřela knihu, kterou drak držel, a začala nahlas číst. Četla pomalu a někde se zadrhla, protože jí bylo teprve osm. Drakovi to nevadilo. Poslouchal tak soustředěně, že se ani nepohnul.\n\n' +
        'Od té doby chodila Mira do skály každý čtvrtek. Přečetla drakovi za rok jedenáct knih. Šlo jí to čím dál rychleji, protože kdo čte nahlas každý týden, ten se to naučí.\n\n' +
        'Lidé ve městě si všimli, že Mira chodí ke skále, a ptali se, jestli se nebojí. Mira vždycky odpověděla to samé: „On se bál víc než já. Bál se, že se to nikdy nedozví.“\n\n' +
        'Postupem času se za nimi začaly trousit i další děti. Sedaly si kolem draka do kruhu a četly po kouskách. Kdo se zadrhl, toho nikdo nepopoháněl, protože drak měl času dost. Čekal tři sta let, pár vteřin navíc mu nevadilo.\n\n' +
        'Nakonec drak knihy z jeskyně vynosil a postavil z nich ve městě knihovnu. Sám v ní sedával u dveří. Číst se sice nikdy nenaučil, ale poznal každou knihu podle vůně a dokázal poradit, která je ta pravá.',
      tezkaSlova: [
        { slovo: 'neodvážil', slabiky: 'ne-od-vá-žil', vyznam: 'neměl odvahu, bál se' },
        { slovo: 'soustředěně', slabiky: 'sou-stře-dě-ně', vyznam: 'pozorně, se vší pozorností' },
        { slovo: 'zadrhla', slabiky: 'za-drh-la', vyznam: 'zastavila se uprostřed slova, zakoktala se' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Co Mira našla v dračí jeskyni místo ohně a kostí?', klicova: ['knih'], odstavec: 1,
          napoveda: 'Poslední slovo druhého odstavce.' },
        { typ: 'z-textu', otazka: 'Proč drak neuměl číst?', klicova: ['oči', 'velk', 'nerozezn', 'písmen'], odstavec: 3,
          napoveda: 'Drak to sám vysvětlí ve své řeči.' },
        { typ: 'vlastnimi-slovy', otazka: 'Vysvětli vlastními slovy, proč Miře šlo čtení čím dál lépe.', klicova: ['každ', 'týden', 'čet', 'cvič', 'nahlas', 'prax', 'často', 'znovu'], odstavec: 5,
          napoveda: 'Šestý odstavec končí větou, která to říká přímo.' },
        { typ: 'proc-jak', otazka: 'Co Mira myslela tím, že se drak bál víc než ona?', klicova: ['nedozv', 'sám', 'nikdy', 'osamě', 'nepřeč', 'zůstan', 'bál se, že'], odstavec: 6,
          napoveda: 'Zamysli se, čeho konkrétně se drak podle Miry bál — poslední věta to naznačuje.' },
        { typ: 'nazor', otazka: 'Kdybys mohla někomu předčítat nahlas, komu by to bylo a jakou knihu bys vybrala?', klicova: [], odstavec: null,
          napoveda: 'Napiš svůj nápad celou větou.' },
      ],
    },

    // ───────────────────────────── ÚROVEŇ 4 ─────────────────────────────────
    {
      id: 'majak',
      nadpis: 'Poslední hlídač majáku',
      uroven: 4,
      tema: 'profese',
      text:
        'Ještě před sto lety měl skoro každý maják svého hlídače. Byla to práce, kterou nešlo dělat napůl. Hlídač bydlel přímo v majáku, často i s celou rodinou, a jeho jediným úkolem bylo, aby světlo nikdy nezhaslo.\n\n' +
        'Znělo to jednoduše. Ve skutečnosti to znamenalo vstávat několikrát za noc, dolévat olej, čistit skla od soli a natahovat těžký mechanismus, který otáčel lampou. Kdyby se lampa přestala otáčet, loď by na moři nepoznala, který maják vidí. Každý maják totiž bliká jinak — jeden jednou za pět vteřin, jiný dvakrát rychle po sobě. Kapitáni to poznají a podle toho vědí, kde jsou.\n\n' +
        'Nejtěžší nebyla práce, ale samota. Některé majáky stojí na skalách daleko od pevniny. Loď s jídlem a poštou přijížděla jednou za několik týdnů, a když byla bouře, nepřijela vůbec. Hlídači si psali deníky, sbírali kameny, učili se hrát na nástroje. Jeden hlídač v Anglii se za třicet let naučil sedm jazyků, i když neměl s kým mluvit.\n\n' +
        'Byla to ale také práce, na které záviselo hodně životů. Když se v mlze ztratila loď, hlídač troubil na mlhový roh každou minutu. Někdy troubil celou noc, aniž by věděl, jestli ho vůbec někdo slyší. Ráno se to většinou nedozvěděl.\n\n' +
        'Dneska jsou skoro všechny majáky automatické. Světlo se rozsvítí samo, když se setmí, a poruchu hlásí počítač. Poslední hlídači odešli do důchodu a nikdo za ně nenastoupil.\n\n' +
        'Ve Skotsku ale nechali jeden maják schválně tak, jak byl. Návštěvníci si mohou prohlédnout hlídačův pokoj, jeho postel, hrnek i deník, který nedopsal. Na poslední stránce je jediná věta: „Dnes v noci byla vidět všechna světla na pobřeží, jedno vedle druhého.“\n\n' +
        'Průvodci návštěvníkům vysvětlují, že to nebyla poznámka o počasí. Pro hlídače to byla ta nejlepší zpráva, jakou mohl zapsat. Znamenalo to, že všichni ostatní hlídači po celém pobřeží také nespali a dělali svou práci.\n\n' +
        'Někteří návštěvníci se ptají, jestli hlídačům nebylo líto, že jejich práci nakonec převzal stroj. Průvodci odpovídají, že většina z nich to brala klidně. Šlo jim vždycky o to, aby světlo svítilo — a ne o to, kdo ho rozsvítí.',
      tezkaSlova: [
        { slovo: 'mechanismus', slabiky: 'me-cha-nis-mus', vyznam: 'stroj složený z koleček a pružin, který něco pohání' },
        { slovo: 'pevniny', slabiky: 'pev-ni-ny', vyznam: 'souš, země — na rozdíl od ostrova nebo skály v moři' },
        { slovo: 'automatické', slabiky: 'au-to-ma-tic-ké', vyznam: 'takové, které funguje samo bez člověka' },
      ],
      otazky: [
        { typ: 'z-textu', otazka: 'Co bylo jediným úkolem hlídače majáku?', klicova: ['světl', 'nezhas', 'svít', 'hoř'], odstavec: 0,
          napoveda: 'Poslední věta prvního odstavce to říká přímo.' },
        { typ: 'z-textu', otazka: 'Podle čeho kapitáni poznají, který maják vidí?', klicova: ['blik', 'jinak', 'otáč', 'rychl', 'vteřin', 'světl'], odstavec: 1,
          napoveda: 'Druhý odstavec vysvětluje, čím se majáky od sebe liší.' },
        { typ: 'vlastnimi-slovy', otazka: 'Vysvětli vlastními slovy, proč byla nejtěžší část té práce samota.', klicova: ['sám', 'dalek', 'nikdo', 'týdn', 'skál', 'bouř', 'mluv', 'osamě'], odstavec: 2,
          napoveda: 'Třetí odstavec popisuje, jak často za hlídačem někdo přijel.' },
        { typ: 'proc-jak', otazka: 'Proč byla věta v deníku pro hlídače tak dobrá zpráva?', klicova: ['ostatn', 'nespal', 'všichn', 'dělal', 'prác', 'pobřež', 'taky', 'sám'], odstavec: 6,
          napoveda: 'Poslední odstavec vysvětluje, co ta světla pro hlídače znamenala.' },
        { typ: 'nazor', otazka: 'Dokázala bys dělat práci, kterou nikdo nevidí a nikdo za ni nepoděkuje? Napiš, co si o tom myslíš.', klicova: [], odstavec: null,
          napoveda: 'Odpověz za sebe, klidně dvěma větami.' },
      ],
    },
  ],

  // ─── Slovní detektiv — dvojice podobných slov ────────────────────────────
  //
  // Cílí přesně na to, co Ami plete: a/o, p/b/d, i/e. Ke každé dvojici patří
  // krátký kontext, ze kterého se pozná, které slovo tam patří.

  DETEKTIV: [
    // p / b
    { dvojice: ['pila', 'bila'], veta: 'Táta řezal dřevo a ___ se mu zasekla.', spravne: 'pila', zamena: 'p/b' },
    { dvojice: ['pere', 'bere'], veta: 'Máma ___ prádlo v pračce.', spravne: 'pere', zamena: 'p/b' },
    { dvojice: ['pít', 'bít'], veta: 'Po běhání se mi chtělo ___.', spravne: 'pít', zamena: 'p/b' },
    { dvojice: ['pas', 'bas'], veta: 'Na cestu do ciziny potřebuješ ___.', spravne: 'pas', zamena: 'p/b' },
    { dvojice: ['pod', 'bod'], veta: 'Kočka se schovala ___ postel.', spravne: 'pod', zamena: 'p/b' },
    { dvojice: ['prát', 'brát'], veta: 'Musíme ___ ty zablácené kalhoty.', spravne: 'prát', zamena: 'p/b' },

    // b / d
    { dvojice: ['bok', 'dok'], veta: 'Spal na pravém ___.', spravne: 'bok', zamena: 'b/d' },
    { dvojice: ['bal', 'dal'], veta: 'Kamarád mi ___ svoji svačinu.', spravne: 'dal', zamena: 'b/d' },
    { dvojice: ['bát', 'dát'], veta: 'Nemusíš se ničeho ___.', spravne: 'bát', zamena: 'b/d' },
    { dvojice: ['buben', 'duben'], veta: 'Po březnu přijde ___.', spravne: 'duben', zamena: 'b/d' },
    { dvojice: ['bere', 'dere'], veta: 'Ami si ___ z police knížku.', spravne: 'bere', zamena: 'b/d' },

    // a / o
    { dvojice: ['had', 'hod'], veta: 'V trávě se plazil dlouhý ___.', spravne: 'had', zamena: 'a/o' },
    { dvojice: ['rak', 'rok'], veta: 'Pod kamenem v potoce seděl ___.', spravne: 'rak', zamena: 'a/o' },
    { dvojice: ['mák', 'mok'], veta: 'Na buchtě byl sladký ___.', spravne: 'mák', zamena: 'a/o' },
    { dvojice: ['tam', 'tom'], veta: 'Podívej se ___ na tu duhu!', spravne: 'tam', zamena: 'a/o' },
    { dvojice: ['sad', 'sud'], veta: 'Za domem máme jabloňový ___.', spravne: 'sad', zamena: 'a/u' },

    // i / e
    { dvojice: ['les', 'lis'], veta: 'Šli jsme na houby do ___.', spravne: 'les', zamena: 'e/i' },
    { dvojice: ['děl', 'díl'], veta: 'Dostala jsem svůj ___ dortu.', spravne: 'díl', zamena: 'e/i' },
    { dvojice: ['mele', 'míle'], veta: 'Mlýn ___ obilí na mouku.', spravne: 'mele', zamena: 'e/í' },
    { dvojice: ['ves', 'vis'], veta: 'Naše ___ má jenom dvacet domů.', spravne: 'ves', zamena: 'e/i' },

    // y / i, z / s — na pravopis, který se učí ve třetí třídě
    { dvojice: ['byl', 'bil'], veta: 'Včera ___ celý den doma.', spravne: 'byl', zamena: 'y/i' },
    { dvojice: ['koza', 'kosa'], veta: 'Na louce se pásla bílá ___.', spravne: 'koza', zamena: 'z/s' },
  ],

  // ─── Výběr textu pro dnešní lekci ────────────────────────────────────────

  proUroven(uroven) {
    return this.SEZNAM.filter((t) => t.uroven === uroven);
  },

  // Vybere text, který Ami dlouho nečetla, na správné úrovni.
  // Když na dané úrovni všechny přečetla, sáhne po nejstarším.
  vyber(uroven, prectene, vypnutaTemata) {
    const vypnuta = vypnutaTemata || [];
    let kandidati = this.proUroven(uroven).filter((t) => !vypnuta.includes(t.tema));

    // Když na úrovni nic nezbývá, půjč si z nejbližší nižší
    let u = uroven;
    while (!kandidati.length && u > 1) {
      u--;
      kandidati = this.proUroven(u).filter((t) => !vypnuta.includes(t.tema));
    }
    if (!kandidati.length) kandidati = this.SEZNAM.slice();

    const nove = kandidati.filter((t) => !prectene[t.id]);
    if (nove.length) return nove[Math.floor(Math.random() * nove.length)];

    // Všechno přečteno — vrať ten nejdéle nečtený
    return kandidati.sort(
      (a, b) => (prectene[a.id] || 0) - (prectene[b.id] || 0)
    )[0];
  },

  pocetSlov(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
  },

  odstavce(text) {
    return text.split('\n\n').map((o) => o.trim()).filter(Boolean);
  },

  nahodnyDetektiv(kolik) {
    const kopie = this.DETEKTIV.slice();
    for (let i = kopie.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
    }
    return kopie.slice(0, kolik);
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = { Texty };
