let characters = [
  { name: 'Фродо', hasRing: false },
  { name: 'Сэм', hasRing: false },
];

function stealRing(characters, owner) {
  return characters.map((c) => {
    if (c.name === owner) {
      c.hasRing = true;
    } else {
      c.hasRing = false;
    }

    return c;
  });
}

module.exports = { characters, stealRing };
