// process.env.UV_THREADPOOL_SIZE = 12;
// const crypto = await import('crypto');

// const start = performance.now();

// for (let i = 0; i < 50; i += 1) {
//   crypto.pbkdf2('test', 'salt', 100000, 64, 'sha512', () => {
//     console.log(performance.now() - start);
//   });
// }

import https from 'https';

const start = performance.now();

for (let i = 0; i < 50; i += 1) {
  https.get('https://yandex.ru', (res) => {
    res.on('data', () => {});

    res.on('end', () => {
      console.log(performance.now() - start);
    });
  });
}
