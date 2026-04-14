var CHAPTER_1 = {
  chapter: 1,
  title: "Tichý les",
  goal: "Prozkoumat tichý les a najít kouzelný klíček",
  theme: "forest",
  pointsNeeded: 32,
  scenes: [
    // === 1. INTRO: Probuzení ===
    {
      panel_1: {
        text: "Laura se probudila. Bylo divné ticho.",
        image_prompt: "A 10-year-old girl with messy brown hair sitting up in bed, looking confused. Morning light streams through the window. Cartoon comic style, warm colors, no text.",
        image_url: "images/ch1_01a.webp",
        emoji: "🛏️"
      },
      panel_2: {
        text: "Žádný zpěv ptáků. Žádný vítr. Nic.",
        image_prompt: "View from a bedroom window showing a quiet garden with still trees and silent birds sitting on branches with closed beaks. Cartoon comic style, eerie calm atmosphere.",
        image_url: "images/ch1_01b.webp",
        emoji: "🪟"
      },
      task: null
    },
    // === 2. Rodiče ===
    {
      panel_1: {
        text: "Laura běžela za rodiči. Taky nic neslyšeli.",
        image_prompt: "A girl running into the kitchen where her parents stand looking worried. The mother holds a cup, the father looks out the window. Comic style, warm indoor lighting.",
        image_url: "images/ch1_02a.webp",
        emoji: "👨‍👩‍👧"
      },
      panel_2: {
        text: "Její malý bratr plakal. Ale bylo to bez zvuku.",
        image_prompt: "A 5-year-old boy crying silently, tears on his cheeks but no sound coming out. His big sister Laura kneels next to him, trying to comfort him. Comic style, emotional scene.",
        image_url: "images/ch1_02b.webp",
        emoji: "👦"
      },
      task: null
    },
    // === 3. Úkol: Matika — sčítání do 20 ===
    {
      rewards: [
        { item: "jablka", name: "Jablka", emoji: "🍎" },
        { item: "susenky", name: "Sušenky", emoji: "🍪" },
        { item: "voda", name: "Láhev vody", emoji: "💧" },
        { item: "baterka", name: "Baterka", emoji: "🔦" }
      ],
      panel_1: {
        text: "Laura se rozhodla jít hledat zvuky.",
        image_prompt: "Laura putting on her backpack determinedly, standing at the front door of her house. Her parents watch nervously from behind. Comic style, adventure feeling.",
        image_url: "images/ch1_03a.webp",
        emoji: "🎒"
      },
      panel_2: {
        text: "Než odešla, spočítala si zásoby v baťůžku.",
        image_prompt: "Close-up of an open backpack showing various items: apples, a water bottle, a flashlight, cookies. Laura counts them carefully. Comic style.",
        image_url: "images/ch1_03b.webp",
        emoji: "🍎"
      },
      tasks: [
        {
          type: "math",
          question: "Laura má 8 jablek a 6 sušenek. Kolik má zásob celkem?",
          options: ["14", "12", "13"],
          correct: "14",
          hint_1: "Spočítej: 8 + 6. Začni od 8 a přidávej po jedné.",
          hint_2: "8 + 6: nejdřív 8 + 2 = 10, a pak ještě 4.",
          fallback: { question: "Kolik je 8 + 2?", options: ["9", "10", "11"], correct: "10" }
        },
        {
          type: "math",
          question: "Maminka přidala ještě 3 jablka. Kolik jablek má Laura teď?",
          options: ["10", "11", "12"],
          correct: "11",
          hint_1: "Laura měla 8 jablek a dostala 3 navíc.",
          hint_2: "8 + 3 = ? Počítej: 8... 9, 10, 11.",
          fallback: { question: "Kolik je 5 + 3?", options: ["7", "8", "9"], correct: "8" }
        },
        {
          type: "czech",
          question: "Doplň: Laura si sbalila ba_ _žek.",
          options: ["tu", "dů", "tů"],
          correct: "tů",
          hint_1: "Říkáme: baťůžek. Jaká písmena tam slyšíš?",
          hint_2: "Ba-ťů-žek. Hledáš TŮ.",
          fallback: { question: "Jak se řekne malý batoh?", options: ["baťůžek", "batožek", "batůhek"], correct: "baťůžek" }
        }
      ]
    },
    // === 4. Vstup do lesa ===
    {
      panel_1: {
        text: "Les byl blízko. Stromy vypadaly jinak než jindy.",
        image_prompt: "Laura walking on a path towards a mysterious forest. The trees are unusually still, leaves frozen in mid-air. Dappled sunlight. Comic style, slightly mysterious.",
        image_url: "images/ch1_04a.webp",
        emoji: "🌲"
      },
      panel_2: {
        text: "Na zemi ležely stopy. Vedly hlouběji do lesa.",
        image_prompt: "Close-up of mysterious animal tracks on a forest path, leading deeper into the woods. Laura kneels down examining them. Comic style, mystery feeling.",
        image_url: "images/ch1_04b.webp",
        emoji: "🐾"
      },
      task: null
    },
    // === 5. Úkol: Čeština — doplň CH ===
    {
      panel_1: {
        text: "Laura vešla do lesa. Bylo tu úplné ticho.",
        image_prompt: "Laura standing among tall dark trees in a silent forest. No movement, no wind. Rays of light filter through the canopy. Comic style, atmospheric.",
        image_url: "images/ch1_05a.webp",
        emoji: "🌲"
      },
      panel_2: {
        text: "Na stromě byl nápis. Chyběla v něm písmena.",
        image_prompt: "A large tree trunk with letters carved into the bark spelling TI__Ý with missing letters. Laura traces the carving with her finger. Comic style.",
        image_url: "images/ch1_05b.webp",
        emoji: "🔤"
      },
      tasks: [
        {
          type: "czech",
          question: "Doplň písmena: Les je TI _ _ Ý",
          options: ["CH", "SK", "CK"],
          correct: "CH",
          hint_1: "Říkáme: je tu ticho. Jaká písmena slyšíš uprostřed?",
          hint_2: "Ti-chý. Hledáš CH.",
          fallback: { question: "Doplň: Ko _ ka (zvíře, co mňouká)", options: ["č", "š", "c"], correct: "č" }
        },
        {
          type: "czech",
          question: "Najdi opačné slovo k TICHO",
          options: ["SVĚTLO", "HLUK", "VODA"],
          correct: "HLUK",
          hint_1: "Když je ticho, není nic slyšet. Co je naopak slyšet hodně?",
          hint_2: "Křik, rámus, hlasité zvuky — to je HLUK.",
          fallback: { question: "Najdi opačné slovo k VELKÝ", options: ["MALÝ", "TĚŽKÝ", "DLOUHÝ"], correct: "MALÝ" }
        },
        {
          type: "math",
          question: "Laura viděla 5 stromů napravo a 7 nalevo. Kolik stromů celkem?",
          options: ["11", "13", "12"],
          correct: "12",
          hint_1: "Sečti: 5 + 7. Začni od 7 a přidej 5.",
          hint_2: "7 + 5: nejdřív 7 + 3 = 10, pak + 2 = ?",
          fallback: { question: "Kolik je 5 + 5?", options: ["9", "10", "11"], correct: "10" }
        }
      ]
    },
    // === 6. Úkol: Angličtina — zvířata ===
    {
      panel_1: {
        text: "Laura potkala kočku. Kočka mlčela.",
        image_prompt: "An orange tabby cat sitting on a tree stump in the forest, looking directly at Laura with big eyes. The cat's mouth is closed. Comic style, cute.",
        image_url: "images/ch1_06a.webp",
        emoji: "🐱"
      },
      panel_2: {
        text: "Kočka ukázala tlapkou na tři cedulky.",
        image_prompt: "The cat pointing its paw at three wooden signs with English words. Laura looks at the signs thoughtfully. Comic style, forest setting.",
        image_url: "images/ch1_06b.webp",
        emoji: "🇬🇧"
      },
      tasks: [
        {
          type: "english",
          question: "Jak se řekne KOČKA anglicky?",
          options: ["cat", "dog", "bird"],
          correct: "cat",
          hint_1: "Dog = pes, bird = pták. Co zbývá?",
          hint_2: "Kočka = C_T. Doplň písmeno A uprostřed.",
          fallback: { question: "Jak se řekne PES anglicky?", options: ["cat", "dog", "fish"], correct: "dog" }
        },
        {
          type: "english",
          question: "Jak se řekne STROM anglicky?",
          options: ["flower", "tree", "grass"],
          correct: "tree",
          hint_1: "Flower = květina, grass = tráva.",
          hint_2: "Strom = TR_ _. Začíná na TR.",
          fallback: { question: "Jak se řekne KVĚTINA anglicky?", options: ["tree", "flower", "sun"], correct: "flower" }
        },
        {
          type: "math",
          question: "Kočka má 4 tlapky. Kolik tlapek mají 2 kočky?",
          options: ["6", "10", "8"],
          correct: "8",
          hint_1: "Dvě kočky = dvakrát 4 tlapky.",
          hint_2: "4 + 4 = ? Nebo 2 × 4 = ?",
          fallback: { question: "Kolik je 4 + 4?", options: ["7", "8", "9"], correct: "8" }
        }
      ]
    },
    // === 7. Tajemné stopy ===
    {
      panel_1: {
        text: "Kočka odběhla. Ale nechala za sebou stopy.",
        image_prompt: "The orange cat running away deeper into the forest, leaving paw prints behind. Laura watches it go. Comic style, dynamic motion.",
        image_url: "images/ch1_07a.webp",
        emoji: "🐾"
      },
      panel_2: {
        text: "Laura šla za ní. Stopy vedly k potoku.",
        image_prompt: "Laura following cat paw prints on the forest floor. The trail leads towards a stream visible in the distance. Comic style, adventure mood.",
        image_url: "images/ch1_07b.webp",
        emoji: "👣"
      },
      task: null
    },
    // === 8. Úkol: Matika — odčítání ===
    {
      panel_1: {
        text: "U potoka rostly houby. Některé byly jedovaté.",
        image_prompt: "Mushrooms growing near a forest stream. Some are colorful edible ones, others are red with white dots (poisonous). Laura examines them. Comic style.",
        image_url: "images/ch1_08a.webp",
        emoji: "🍄"
      },
      panel_2: {
        text: "Laura musela spočítat, kolik hub je dobrých.",
        image_prompt: "Laura counting mushrooms, separating good ones from bad ones. She holds up fingers to count. Comic style, educational feeling.",
        image_url: "images/ch1_08b.webp",
        emoji: "🔢"
      },
      tasks: [
        {
          type: "math",
          question: "U potoka roste 15 hub. 7 je jedovatých. Kolik hub je dobrých?",
          options: ["8", "7", "9"],
          correct: "8",
          hint_1: "Od 15 odečti 7. Začni od 15 a odečítej.",
          hint_2: "15 - 7: nejdřív 15 - 5 = 10, pak 10 - 2 = ?",
          fallback: { question: "Kolik je 10 - 3?", options: ["6", "7", "8"], correct: "7" }
        },
        {
          type: "czech",
          question: "Doplň i nebo y: Houb_ rostou u potoka.",
          options: ["y", "i"],
          correct: "y",
          hint_1: "Houby — po B píšeme tvrdé Y.",
          hint_2: "B je tvrdá souhláska. Po tvrdých je vždy Y.",
          fallback: { question: "Doplň i nebo y: Dub_ jsou stromy.", options: ["i", "y"], correct: "y" }
        },
        {
          type: "english",
          question: "Jak se řekne VODA anglicky?",
          options: ["fire", "water", "stone"],
          correct: "water",
          hint_1: "Fire = oheň, stone = kámen.",
          hint_2: "Voda = W_ _ _R. Začíná na W.",
          fallback: { question: "Jak se řekne OHEŇ anglicky?", options: ["water", "fire", "ice"], correct: "fire" }
        }
      ]
    },
    // === 9. Úkol: Čeština — i/y ===
    {
      panel_1: {
        text: "Na kameni u potoka byl další nápis.",
        image_prompt: "A large flat stone by the stream with text carved into it. Laura bends down to read the mysterious inscription. Comic style, mysterious.",
        image_url: "images/ch1_09a.webp",
        emoji: "🪨"
      },
      panel_2: {
        text: "Laura musela doplnit správné písmeno.",
        image_prompt: "Close-up of the stone inscription showing a word with a missing letter. Laura thinks hard, finger on her chin. Comic style.",
        image_url: "images/ch1_09b.webp",
        emoji: "✏️"
      },
      tasks: [
        {
          type: "czech",
          question: "Doplň i nebo y: Kam_nky v potoce jsou kluzké.",
          options: ["ý", "í"],
          correct: "í",
          hint_1: "Říkáme: kamínky. Slyšíš tam Í nebo Ý?",
          hint_2: "Ka-mín-ky. Po M je měkké Í.",
          fallback: { question: "Doplň i nebo y: P_smo", options: ["í", "ý"], correct: "í" }
        },
        {
          type: "math",
          question: "Laura viděla 9 kamenů. 3 spadly do vody. Kolik zůstalo?",
          options: ["5", "7", "6"],
          correct: "6",
          hint_1: "Od 9 odečti 3.",
          hint_2: "9 - 3 = ? Počítej pozpátku: 9, 8, 7, 6.",
          fallback: { question: "Kolik je 8 - 3?", options: ["4", "5", "6"], correct: "5" }
        },
        {
          type: "czech",
          question: "Které slovo je správně?",
          options: ["potok", "podok", "pottok"],
          correct: "potok",
          hint_1: "Slyš pozorně: po-tok.",
          hint_2: "Uprostřed je T, ne D ani TT.",
          fallback: { question: "Které slovo je správně?", options: ["les", "lez", "less"], correct: "les" }
        }
      ]
    },
    // === 10. Přechod přes potok ===
    {
      panel_1: {
        text: "Před Laurou byl potok. Voda tekla potichu.",
        image_prompt: "Laura standing at the edge of a forest stream with large stepping stones crossing it. The water flows silently. Comic style, serene but tense.",
        image_url: "images/ch1_10a.webp",
        emoji: "🌊"
      },
      panel_2: {
        text: "Na kamenech byly čísla. Musí najít správný.",
        image_prompt: "Stepping stones in the stream, each with a number written on it (12, 15, 18, 21). Laura prepares to jump. Comic style, action scene.",
        image_url: "images/ch1_10b.webp",
        emoji: "🪨"
      },
      task: null
    },
    // === 11. Úkol: Matika — násobení 2 ===
    {
      panel_1: {
        text: "Správný kámen má číslo, které je 2 × 9.",
        image_prompt: "Laura mid-jump between stepping stones over the stream, looking at numbers on the stones. Splash effects around her feet. Comic style, dynamic.",
        image_url: "images/ch1_11a.webp",
        emoji: "🦘"
      },
      panel_2: {
        text: "Který kámen to je? Laura přemýšlí.",
        image_prompt: "Close-up of three stepping stones with numbers 15, 18, 21 visible. Laura's feet on one stone, deciding where to jump next. Comic style.",
        image_url: "images/ch1_11b.webp",
        emoji: "🤔"
      },
      tasks: [
        {
          type: "math",
          question: "Laura potřebuje kámen s číslem 2 × 9. Kolik to je?",
          options: ["15", "18", "21"],
          correct: "18",
          hint_1: "2 × 9 znamená: dvakrát devět. Tedy 9 + 9.",
          hint_2: "9 + 9 = ? Spočítej: 9 a ještě 9.",
          fallback: { question: "Kolik je 2 × 5?", options: ["8", "10", "12"], correct: "10" }
        },
        {
          type: "math",
          question: "Další kámen má číslo 20 - 6. Kolik to je?",
          options: ["12", "16", "14"],
          correct: "14",
          hint_1: "Od 20 odečti 6.",
          hint_2: "20 - 6: nejdřív 20 - 0 = 20, pak odečti 6.",
          fallback: { question: "Kolik je 20 - 10?", options: ["8", "10", "12"], correct: "10" }
        },
        {
          type: "english",
          question: "Jak se řekne KÁMEN anglicky?",
          options: ["stone", "water", "wood"],
          correct: "stone",
          hint_1: "Water = voda, wood = dřevo.",
          hint_2: "Kámen = ST_ _ _. Začíná na ST.",
          fallback: { question: "Jak se řekne DŘEVO anglicky?", options: ["stone", "wood", "leaf"], correct: "wood" }
        }
      ]
    },
    // === 12. Druhý břeh ===
    {
      panel_1: {
        text: "Laura přeskočila! Byla na druhé straně.",
        image_prompt: "Laura landing safely on the other side of the stream, looking relieved and proud. The forest continues behind her. Comic style, triumphant moment.",
        image_url: "images/ch1_12a.webp",
        emoji: "🎉"
      },
      panel_2: {
        text: "Tady byl les tmavší. Ale Laura se nebála.",
        image_prompt: "Laura walking confidently into a darker part of the forest. Tall trees form a natural tunnel. Small rays of light peek through. Comic style, brave mood.",
        image_url: "images/ch1_12b.webp",
        emoji: "🌳"
      },
      task: null
    },
    // === 13. Úkol: Angličtina — barvy ===
    {
      panel_1: {
        text: "Na stromech visely barevné stuhy.",
        image_prompt: "Colorful ribbons (red, blue, green) tied to tree branches in the dark forest. They seem to form a code or pattern. Laura looks up at them. Comic style, magical.",
        image_url: "images/ch1_13a.webp",
        emoji: "🎀"
      },
      panel_2: {
        text: "Pod každou stuhou bylo anglické slovo.",
        image_prompt: "Laura reading small wooden tags hanging from colorful ribbons. Each tag has an English color word. Comic style, educational and magical.",
        image_url: "images/ch1_13b.webp",
        emoji: "🏷️"
      },
      tasks: [
        {
          type: "english",
          question: "Která stuha je GREEN?",
          options: ["🔴 červená", "🟢 zelená", "🔵 modrá"],
          correct: "🟢 zelená",
          hint_1: "GREEN = zelená barva. Jako tráva.",
          hint_2: "Green začíná na GR... a tráva je zelená.",
          fallback: { question: "Jak se řekne MODRÁ anglicky?", options: ["red", "blue", "green"], correct: "blue" }
        },
        {
          type: "english",
          question: "Jak se řekne ČERVENÁ anglicky?",
          options: ["blue", "yellow", "red"],
          correct: "red",
          hint_1: "Blue = modrá, yellow = žlutá.",
          hint_2: "Červená = R_D. Má tři písmena.",
          fallback: { question: "Jak se řekne ŽLUTÁ anglicky?", options: ["red", "blue", "yellow"], correct: "yellow" }
        },
        {
          type: "czech",
          question: "Kolik slabik má slovo STROMY?",
          options: ["2", "1", "3"],
          correct: "2",
          hint_1: "Rozděl si slovo na části a tlesknej u každé.",
          hint_2: "STRO — MY. Dvě tlesknutí, dvě slabiky.",
          fallback: { question: "Kolik slabik má slovo MÁMA?", options: ["1", "2", "3"], correct: "2" }
        }
      ]
    },
    // === 14. Úkol: Čeština — abeceda ===
    {
      panel_1: {
        text: "Za stuhou byl zamčený box. Na zámku byl kód.",
        image_prompt: "A small wooden box with a combination lock sits at the base of a tree. Letters and symbols are carved on it. Laura kneels to examine it. Comic style, puzzle element.",
        image_url: "images/ch1_14a.webp",
        emoji: "📦"
      },
      panel_2: {
        text: "Na boxu stálo: Seřaď slova podle abecedy.",
        image_prompt: "Close-up of the wooden box showing three words carved on it: STROM, HORA, LES. An arrow points to a keyhole. Laura studies the puzzle. Comic style.",
        image_url: "images/ch1_14b.webp",
        emoji: "🔠"
      },
      tasks: [
        {
          type: "czech",
          question: "Seřaď podle abecedy: STROM, HORA, LES. Které slovo je PRVNÍ?",
          options: ["STROM", "HORA", "LES"],
          correct: "HORA",
          hint_1: "Abeceda: A, B, C, D... H, I, J, K, L... S. Které písmeno je nejdřív?",
          hint_2: "H je dřív než L a S. Které slovo začíná na H?",
          fallback: { question: "Co je dřív v abecedě: H nebo S?", options: ["H", "S"], correct: "H" }
        },
        {
          type: "czech",
          question: "A které slovo je POSLEDNÍ podle abecedy?",
          options: ["HORA", "LES", "STROM"],
          correct: "STROM",
          hint_1: "H, L, S — které písmeno je poslední?",
          hint_2: "S je za H i L. Které slovo začíná na S?",
          fallback: { question: "Co je dřív v abecedě: L nebo S?", options: ["L", "S"], correct: "L" }
        },
        {
          type: "math",
          question: "Na boxu je zámek se 3 čísly. První je 2, druhé je 4. Třetí je o 2 víc. Jaké?",
          options: ["6", "5", "8"],
          correct: "6",
          hint_1: "Řada: 2, 4, ? — vždy přidáváme 2.",
          hint_2: "4 + 2 = ?",
          fallback: { question: "Kolik je 4 + 2?", options: ["5", "6", "7"], correct: "6" }
        }
      ]
    },
    // === 15. Úkol: Matika — slovní úloha ===
    {
      panel_1: {
        text: "Box se otevřel! Uvnitř byla mapa.",
        image_prompt: "The wooden box clicking open, revealing an old folded map inside with a golden glow. Laura's eyes widen with excitement. Comic style, treasure discovery.",
        image_url: "images/ch1_15a.webp",
        emoji: "🗺️"
      },
      panel_2: {
        text: "Na mapě byl příklad. Ukazoval počet kroků.",
        image_prompt: "Laura holding an old map with a math problem written on it. The map shows a dotted path through the forest leading to a glowing spot. Comic style.",
        image_url: "images/ch1_15b.webp",
        emoji: "🔢"
      },
      tasks: [
        {
          type: "math",
          question: "Laura ušla 34 kroků a potřebuje ujít 50. Kolik jí zbývá?",
          options: ["14", "16", "24"],
          correct: "16",
          hint_1: "Od 50 odečti 34. Nebo: kolik musíš přidat k 34, aby bylo 50?",
          hint_2: "34 + ? = 50. Od 34 do 40 je 6, od 40 do 50 je 10. Celkem?",
          fallback: { question: "Kolik je 50 - 30?", options: ["10", "20", "30"], correct: "20" }
        },
        {
          type: "english",
          question: "Na mapě je napsáno FOREST. Co to znamená?",
          options: ["hora", "řeka", "les"],
          correct: "les",
          hint_1: "Laura je přece v lese!",
          hint_2: "FOREST = les. Začíná na F.",
          fallback: { question: "Jak se řekne LES anglicky?", options: ["river", "forest", "mountain"], correct: "forest" }
        },
        {
          type: "math",
          question: "Na mapě je 6 značek. Každá znamená 10 kroků. Kolik kroků celkem?",
          options: ["60", "16", "66"],
          correct: "60",
          hint_1: "6 krát 10. Kolik to je?",
          hint_2: "6 × 10 = ? Šestkrát deset.",
          fallback: { question: "Kolik je 3 × 10?", options: ["13", "30", "31"], correct: "30" }
        }
      ]
    },
    // === 16. Záře v lese ===
    {
      panel_1: {
        text: "Laura počítala kroky. Šestnáct... a stála tam.",
        image_prompt: "Laura counting steps through the forest, fingers up, looking determined. The forest around her starts to glow slightly golden. Comic style, anticipation.",
        image_url: "images/ch1_16a.webp",
        emoji: "🚶‍♀️"
      },
      panel_2: {
        text: "Mezi stromy se objevila zlatá záře!",
        image_prompt: "A magical golden glow between dark tree trunks. Laura shields her eyes, walking towards the bright light. Sparkles and light rays. Comic style, magical moment.",
        image_url: "images/ch1_16b.webp",
        emoji: "✨"
      },
      task: null
    },
    // === 17. OUTRO: Klíček ===
    {
      panel_1: {
        text: "Na zemi ležel malý zářící klíček!",
        image_prompt: "A small golden key lying on green moss, surrounded by a soft magical glow. Tiny sparkles float around it. Close-up view. Comic style, magical.",
        image_url: "images/ch1_17a.webp",
        emoji: "🔑"
      },
      panel_2: {
        text: "Laura ho zvedla. Klíček byl teplý a vibroval.",
        image_prompt: "Laura carefully picking up the golden key, holding it in both hands. The key emits a warm golden glow. Her face shows wonder and excitement. Comic style, emotional.",
        image_url: "images/ch1_17b.webp",
        emoji: "🤩"
      },
      task: null
    }
  ],
  reward: {
    item: "kouzelny-klicek",
    name: "Kouzelný klíček",
    emoji: "🔑",
    description: "Malý zlatý klíček, který ukazuje cestu. Kdo ví, co odemkne?"
  },
  cliffhanger: "Klíček se rozvibroval a začal ukazovat hlouběji do lesa. Co tam Laura najde?"
};
