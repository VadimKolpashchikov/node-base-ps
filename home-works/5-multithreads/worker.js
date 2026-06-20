import { parentPort, workerData } from 'worker_threads';
import { remainder } from './utils.js';

parentPort.postMessage(remainder(workerData.array, workerData.divider));
