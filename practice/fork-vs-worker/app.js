import { Worker } from 'worker_threads';
import { fork } from 'child_process';
import perfHooks from 'perf_hooks';

const performanceObserver = new perfHooks.PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}'s duration: ${entry.duration}`);
  });
});
performanceObserver.observe({ entryTypes: ['function'] });

const workerFunction = (array) => {
  const worker = new Worker(new URL('./worker.js', import.meta.url), {
    workerData: { array },
  });

  const { promise, resolve, reject } = Promise.withResolvers();

  worker.on('message', (message) => {
    resolve(message);
  });

  worker.on('error', (err) => {
    reject(err);
  });

  return promise;
};
const workerFunctionPerf = perfHooks.performance.timerify(workerFunction);

const forkFunction = (array) => {
  const forkProcess = fork(new URL('./fork.js', import.meta.url));
  const { promise, resolve, reject } = Promise.withResolvers();

  forkProcess.on('message', (message) => {
    resolve(message);
  });

  forkProcess.on('close', (statusCode) => {
    reject(`Fork close with status code: ${statusCode}`);
  });

  forkProcess.send({ array });

  return promise;
};
const forkFunctionPerf = perfHooks.performance.timerify(forkFunction);

const main = async () => {
  await workerFunctionPerf([25, 19, 48, 30, 39, 12]);
  await forkFunctionPerf([25, 19, 48, 30, 39, 12]);
};

main();
