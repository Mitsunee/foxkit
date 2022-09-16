import { convertUnits } from "./convertUnits";

type CallbackFn = () => void;
type ErrorHandler = (err: unknown) => void;

export class Timeout {
  // eslint-disable-next-line no-undef
  #ref: NodeJS.Timeout | null = null; // dear @types/node, why is this not number?
  #running: number | false = false;
  #length: number;
  #callback: CallbackFn;
  #catch?: ErrorHandler;

  constructor(callback: CallbackFn, length: number = 0) {
    this.#length =
      typeof length === "number" ? length : convertUnits(length, false);
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

  catch(callback: ErrorHandler) {
    this.#catch = callback;
    return this;
  }
}
