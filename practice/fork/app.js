import { fork } from 'child_process';

const forkProcess = fork(new URL('./fork.js', import.meta.url));

forkProcess.on('message', (msg) => {
  console.log(`Получено сообщение ${msg}`);
});

forkProcess.on('close', (statusCode) => {
  console.log(`Exited with status ${statusCode}`);
});

forkProcess.send('Ping');
forkProcess.send('disconnect');
