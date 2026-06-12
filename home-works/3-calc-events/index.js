import Emitter from './emitter/index.js';
import { ArgsService } from './args/args.service.js';

const argService = new ArgsService();
await argService.validate();
const { firstArg, secondArg, actionName } = argService.args;

Emitter.on(actionName, async (...args) => {
  const action = await argService.getAction();
  Emitter.emit('result', action(...args));
});

Emitter.emit(actionName, firstArg, secondArg);
Emitter.on('result', (res) => console.log(res));
