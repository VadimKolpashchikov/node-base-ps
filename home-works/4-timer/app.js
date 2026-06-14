import ArgsService from './args/args.service.js';
import Timer from './entities/timer.js';

const inputtedValue = new ArgsService().parse();
const timer = new Timer(inputtedValue, console);

timer.start();
