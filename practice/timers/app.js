console.log('Start timers');
const startTime = performance.now();

setTimeout(() => {
  console.log(performance.now() - startTime);
  console.log('setTimeout:', 'Прошла секунда');
}, 1000);

function myFunc(arg) {
  console.log(`Аргумент => ${arg}`);
}
setTimeout(myFunc, 1200, '1200мс');

const timerId1 = setTimeout(() => {
  console.log('BOOOM!!!');
}, 2000);
setTimeout(() => {
  console.log(`Таймер с id = ${timerId1} отменён`);
  clearTimeout(timerId1);
}, 1999);

const intervalId = setInterval(() => {
  console.log('Interval', performance.now());
}, 1000);

setTimeout(() => {
  console.log(`Интервал с id = ${timerId1} отменён`);
  clearInterval(intervalId);
}, 4999);

console.log('Before');
setTimeout(() => {
  console.log(`Интервал с 0мс`);
}, 0);
setImmediate(() => {
  console.log('Immediate');
});
console.log('After');

const timerId2 = setTimeout(() => {
  console.log('BOOOMMM!!!');
}, 6000);

timerId2.unref(); // отмена отслеживания таймера, выполнится если успеет до закрытия процесса
setImmediate(() => {
  timerId2.ref();
});
