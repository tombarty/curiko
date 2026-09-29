// ═══════════════════════════════════════════════════════════════════════════
// spust-vse.js — spustí všechny testy najednou
//
// Použití (v terminálu, ze složky projektu):
//     node lekce/testy/spust-vse.js
//
// Testy nepotřebují internet ani nic instalovat. Kontrolují:
//   • že matematické úlohy mají správné výsledky,
//   • že texty ke čtení mají správnou délku a strukturu,
//   • že se odpovědi vyhodnocují, jak mají,
//   • že SUN nikdy nepoužije zakázanou formulaci,
//   • že na sebe všechny soubory správně navazují.
// ═══════════════════════════════════════════════════════════════════════════

const { execFileSync } = require('child_process');
const path = require('path');

const TESTY = [
  ['Matematické úlohy', 'matika.test.js'],
  ['Texty ke čtení', 'texty.test.js'],
  ['Vyhodnocení odpovědí', 'cteni.test.js'],
  ['Hvězdičky a tón SUN', 'hodnoceni.test.js'],
  ['Propojení souborů', 'propojeni.test.js'],
];

let selhalo = 0;
const vysledky = [];

for (const [nazev, soubor] of TESTY) {
  process.stdout.write(`\n${'═'.repeat(60)}\n  ${nazev}\n${'═'.repeat(60)}\n`);
  try {
    const vystup = execFileSync('node', [path.join(__dirname, soubor)], { encoding: 'utf8' });
    process.stdout.write(vystup);
    vysledky.push(`  ✅ ${nazev}`);
  } catch (e) {
    process.stdout.write(e.stdout || '');
    process.stdout.write(e.stderr || '');
    vysledky.push(`  ❌ ${nazev}`);
    selhalo++;
  }
}

console.log(`\n${'═'.repeat(60)}\n  SHRNUTÍ\n${'═'.repeat(60)}`);
vysledky.forEach((v) => console.log(v));
console.log(
  selhalo === 0
    ? '\n✅ Všechny testy prošly — můžeme nasazovat.\n'
    : `\n❌ ${selhalo} ${selhalo === 1 ? 'test selhal' : 'testů selhalo'} — před nasazením opravit.\n`
);
process.exit(selhalo ? 1 : 0);
