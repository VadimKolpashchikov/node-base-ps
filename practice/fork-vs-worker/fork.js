import { compute } from './factorial.js';

process.on('message', (msg) => {
  process.send(compute(msg.array));
  process.disconnect();
});
