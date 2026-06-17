// import { exec } from 'child_process';

// const childProcess = exec(
//   'dir',
//   { encoding: 'buffer', shell: 'powershell.exe' },
//   (err, stdout, stderr) => {
//     if (err) {
//       console.log(err.message);
//     }
//     const decoder = new TextDecoder('cp866');
//     console.log(`stdout: ${decoder.decode(stdout)}`);
//     console.log(`stderr: ${decoder.decode(stderr)}`);
//   },
// );

// childProcess.on('exit', (code) => {
//   console.log(`child process exited with code ${code}`);
// });
// -------------------------------------------
import { spawn } from 'child_process';

const childProcess = spawn('dir', {
  encoding: 'buffer',
  shell: 'powershell.exe',
});

const decoder = new TextDecoder('cp866');

childProcess.stdout.on('data', (data) => {
  console.log(`STDOUT: ${decoder.decode(data)}`);
});

childProcess.stdout.on('error', (data) => {
  console.log(`STDERR: ${decoder.decode(data)}`);
});

childProcess.on('exit', (code) => {
  console.log(`child process exited with code ${code}`);
});
