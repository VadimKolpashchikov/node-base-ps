/**
 * ##Фазы выполнения:
 * * //---------------- microtaskQueue, nextTick
 * timers
 * //---------------- microtaskQueue, nextTick
 * pending callbacks
 * //---------------- microtaskQueue, nextTick
 * idle, prepare
 * //---------------- microtaskQueue, nextTick
 * poll
 * //---------------- microtaskQueue, nextTick
 * check
 * //---------------- microtaskQueue, nextTick
 * close callbacks
 * проверка на завершение
 */
import { readFile } from 'fs';

console.log('Init');

setTimeout(() => {
  console.log(performance.now(), 'Timer 0ms');
}, 1);

setImmediate(() => {
  console.log('Immediate');
});

readFile(import.meta.filename, () => {
  console.log('read file');
});

setTimeout(() => {
  for (let i = 0; i < 3000000000; i += 1) {}
  console.log('loop down', performance.now());

  process.nextTick(() => console.log('nextTick inside timeout'));

  Promise.resolve().then(() => {
    console.log('Promise inside timeout');
  });
}, 1);

process.nextTick(() => console.log('nextTick'));

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('Final');
