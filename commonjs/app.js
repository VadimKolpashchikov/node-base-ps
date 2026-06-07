const { characters, stealRing } = require('./characters.js');
const log = require('./log.js');

let myCharacters = characters;

myCharacters = stealRing(myCharacters, 'Фродо');

for (const c of myCharacters) {
  console.log(c);
  log();
}
