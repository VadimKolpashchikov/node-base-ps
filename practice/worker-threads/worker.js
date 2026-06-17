import factorial from './factorial.js';
import { parentPort, workerData } from 'worker_threads';

const compute = (array) => {
  const arr = [];
  for (let i = 0; i < 100_000_000; i += 1) {
    arr.push(i * i);
  }
  return array.map((el) => factorial(el));
};

parentPort.postMessage(compute(workerData.array));
