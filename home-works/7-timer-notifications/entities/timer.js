export default class Timer {
  #value = 0;
  #interval;
  #logger;
  #resolver;

  constructor(value, logger) {
    this.#value = value;
    this.#logger = logger;
  }

  start() {
    const { promise, resolve } = Promise.withResolvers();
    this.#resolver = resolve;
    this.#logger.log('Timer Start');
    this.#logger.log(this.#formattedValue());
    if (this.#value <= 0) {
      this.end();
      return;
    }

    this.#interval = setInterval(() => {
      this.#value -= 1000;
      if (this.#value >= 0) {
        this.#logger.log(this.#formattedValue());
      }

      if (this.#value <= 0) {
        this.end();
      }
    }, 1000);

    return promise;
  }

  pause() {
    this.#logger.log('Timer Stopped!');
    clearInterval(this.#interval);
  }

  end() {
    clearInterval(this.#interval);
    this.#logger.log('Timer End!');
    this.#resolver();
  }

  #formattedValue() {
    const d = Math.floor(this.#value / (1000 * 60 * 60 * 24));
    const h = Math.floor(
      (this.#value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const m = Math.floor((this.#value % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((this.#value % (1000 * 60)) / 1000);

    return `${d}d ${h}h ${m}m ${s}s`;
  }
}
