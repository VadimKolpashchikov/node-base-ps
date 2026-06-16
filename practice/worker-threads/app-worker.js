import { Worker } from 'worker_threads';

const compute = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./worker.js', import.meta.url), {
      workerData: { array },
    });

    let id;

    worker.on('message', (message) => {
      id = worker.threadId;
      console.log(worker.threadId);
      resolve(message);
    });

    worker.on('error', (err) => {
      id = worker.threadId;
      reject(err);
    });

    worker.on('exit', () => {
      console.log(`Завершил работу ${id}`);
    });
  });
};

const main = async () => {
  performance.mark('start');
  const result = await Promise.all([
    compute([20, 39, 34, 59, 48]),
    compute([20, 39, 34, 59, 48]),
    compute([20, 39, 34, 59, 48]),
    compute([20, 39, 34, 59, 48]),
  ]);

  console.log(result);

  performance.mark('end');
  performance.measure('main', 'start', 'end');
  console.log(performance.getEntriesByName('main').pop());
};

main();
