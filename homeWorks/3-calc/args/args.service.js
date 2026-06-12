import { join, relative } from 'path';
import { pathToFileURL } from 'url';
import { promises } from 'fs';

export class ArgsService {
  #firstArg = process.argv[2];
  #secondArg = process.argv[3];
  #actionName = process.argv[4];

  #getActionPath() {
    return join(import.meta.dirname, '..', 'actions', `${this.#actionName}.js`);
  }

  async validate() {
    if (
      this.#firstArg === undefined ||
      this.#secondArg === undefined ||
      this.#actionName === undefined
    ) {
      throw new Error(
        'Error: Requires 3 arguments (arg1: number, arg2: number, actionName: string)',
      );
    }

    try {
      await promises.stat(this.#getActionPath());
    } catch {
      throw new Error(`Action named ${this.#actionName} is not defined`);
    }
  }

  async getPreparedAction() {
    const { default: action } = await import(
      pathToFileURL(this.#getActionPath())
    );

    return () => action(this.args.firstArg, this.args.secondArg);
  }

  get args() {
    return {
      firstArg: +this.#firstArg,
      secondArg: +this.#secondArg,
      actionName: this.#actionName,
      actionPath: this.#getActionPath(),
    };
  }
}
