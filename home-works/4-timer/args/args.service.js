export default class ArgsService {
  args = process.argv.slice(2);
  #regex = /(?:(\d+)d)?\s*(?:(\d+)h)?\s*(?:(\d+)m)?\s*(?:(\d+)s)?/;

  parse() {
    if (this.args.length === 0) {
      return 0;
    }

    const valueString = this.args.join(' ');
    const matches = valueString.match(this.#regex);

    if (!matches) {
      return 0;
    }

    const date = new Date();
    const baseDate = new Date(date);

    const days = parseInt(matches[1] || 0, 10);
    const hours = parseInt(matches[2] || 0, 10);
    const minutes = parseInt(matches[3] || 0, 10);
    const seconds = parseInt(matches[4] || 0, 10);

    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    date.setSeconds(date.getSeconds() + seconds);

    return date.getTime() - baseDate.getTime();
  }
}
