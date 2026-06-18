process.on('message', (msg) => {
  if (msg === 'disconnect') {
    process.disconnect();
    return;
  }

  console.log(`Fork: Sended Message: ${msg}`);
  process.send('Pong!');
});
