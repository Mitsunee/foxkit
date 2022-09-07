export class Timeout {
  // eslint-disable-next-line no-undef
  #ref: NodeJS.Timeout | null = null; // dear @types/node, why is this not number?
  #running: number | false = false;
  #length: number;
  #callback: () => void;
  #catch?: (err: unknown) => void;

  constructor(callback: () => void, length: number = 0) {
    this.#length = length;
    this.#callback = callback;
  }

  get length() {
    return this.#length;
  }

  get startedAt() {
    return this.#running === false ? null : this.#running;
  }

  isRunning() {
    return this.#running === false ? false : true;
  }

  start() {
    if (this.#ref) return this;
    const wrappedCallback = () => {
      this.#ref = null;
      this.#running = false;
      try {
        this.#callback();
      } catch (e) {
        if (this.#catch) {
          this.#catch(e);
        } else throw e;
      }
    };
    this.#ref = setTimeout(wrappedCallback, this.#length);
    this.#running = Date.now();
    return this;
  }

  cancel() {
    if (!this.#ref) return this;
    clearTimeout(this.#ref);
    this.#ref = null;
    this.#running = false;
    return this;
  }

  catch(callback: (err: unknown) => void) {
    this.#catch = callback;
    return this;
  }
}
