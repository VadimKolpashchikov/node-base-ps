import ArgsService from './args/args.service.js';
import Timer from './entities/timer.js';
import sysNotifier from 'node-notifier';

const inputtedValue = new ArgsService().parse();
const timer = new Timer(inputtedValue, console);

timer.start().then(() => {
  sysNotifier.notify({
    title: 'Attention!',
    message: 'Timer completed!',
  });
});
