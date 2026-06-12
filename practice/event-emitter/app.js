import { EventEmitter } from 'events';

const myEmitter = new EventEmitter();

const logDbConnection = () => {
  console.log('db connected');
};

myEmitter.addListener('connected', logDbConnection);
myEmitter.emit('connected');

myEmitter.removeListener('connected', logDbConnection);
// myEmitter.off('connected', logDbConnection);
// myEmitter.removeAllListeners('connected');
myEmitter.emit('connected');

myEmitter.on('msg', (data) => console.log(`Message: ${data}`));
myEmitter.prependListener('msg', () => console.log('prepend msg'));
myEmitter.emit('msg', 'myMessage');

myEmitter.once('off', () => console.log('вызваться 1 раз и удалиться'));
myEmitter.emit('off');
myEmitter.emit('off');

console.log(myEmitter.getMaxListeners()); // 10
// myEmitter.setMaxListeners(1);
// console.log(myEmitter.getMaxListeners()); // 1

console.log(myEmitter.listenerCount('msg')); // 1
console.log(myEmitter.listenerCount('off')); // 0
myEmitter.on('msg', (data) => console.log(`Message: ${data}`));
console.log(myEmitter.listenerCount('msg')); // 2

console.log(myEmitter.listeners('msg')); // [...Function[]]
console.log(myEmitter.eventNames()); // ['msg']

myEmitter.on('error', (err) => {
  console.log(`Произошла ошибка ${err}`);
});
myEmitter.emit('error', new Error('Error BOOOOOM!!!'));

////////////////////////// Event EventTarget
const target = new EventTarget();
const logTarget = () => {
  console.log('Connected to target!');
};

target.addEventListener('connected', logTarget);
target.dispatchEvent(new Event('connected'));
