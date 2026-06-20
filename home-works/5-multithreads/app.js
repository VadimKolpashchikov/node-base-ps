import { Worker } from 'worker_threads';
import perfHooks from 'perf_hooks';
import { remainder, chunkArray } from './utils.js';

process.env.UV_THREADPOOL_SIZE = 6;
const remainderPerf = perfHooks.performance.timerify(remainder);
const mainPerf = perfHooks.performance.timerify(main);

const performanceObserver = new perfHooks.PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}'s duration: ${entry.duration}`);
  });
});
performanceObserver.observe({ entryTypes: ['function'] });

const numbersData = Array.from({ length: 300_000 }, (_, i) => i + 1);

const workerFunction = (array) => {
  const worker = new Worker(new URL('./worker.js', import.meta.url), {
    workerData: { array, divider: 3 },
  });

  const { promise, resolve, reject } = Promise.withResolvers();

  worker.on('message', (message) => {
    resolve(message);
  });

  return promise;
};

async function main(arrays) {
  const result = await Promise.all(arrays.map((arr) => workerFunction(arr)));
  return result.reduce((a, n) => a + n, 0);
}

remainderPerf(numbersData, 3);
mainPerf(chunkArray(numbersData, process.env.UV_THREADPOOL_SIZE));
