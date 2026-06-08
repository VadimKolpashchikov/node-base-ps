// import log, { characters, greet as greetFn } from './characters.mjs';

// for (const c of characters) {
//   greetFn(c);
// }

// log();

async function main() {
  try {
    const {
      default: log,
      characters,
      greet: greetFn,
    } = await import('./characters.mjs');

    for (const c of characters) {
      greetFn(c);
    }

    log();
  } catch (e) {
    console.log('Ошибка');
  }
}

main();
