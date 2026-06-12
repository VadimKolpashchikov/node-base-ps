import { ArgsService } from './args/args.service.js';

const argService = new ArgsService();
await argService.validate();
const action = await argService.getPreparedAction();

console.log(action());
