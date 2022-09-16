import { convertUnits } from "./convertUnits";

type CallbackFn = () => void;
type ErrorHandler = (err: unknown) => void;

export class Interval {
  // eslint-disable-next-line no-undef
  #ref: NodeJS.Timer | null = null; // dear @types/node, why is this not number?
  #running: number | false = false;
  #lastActivation?: number;
  #length: number;
  #callback: CallbackFn;
  #catch?: ErrorHandler;

  constructor(callback: CallbackFn, length: number | string) {
    this.#length = typeof length === "number" ? length : convertUnits(length);
    this.#callback = callback;
  }

  get length() {
    return this.#length;
  }

  get startedAt() {
    return this.#running === false ? null : this.#running;
  }

  get lastActivation() {
    return this.#lastActivation ?? null;
  }

  isRunning() {
    return this.#running === false ? false : true;
  }

  start() {
    if (this.#ref) return this;
    const wrappedCallback = () => {
      this.#lastActivation = Date.now();
      try {
        this.#callback();
      } catch (e) {
        if (this.#catch) {
          this.#catch(e);
        } else throw e;
      }
    };
    this.#ref = setInterval(wrappedCallback, this.#length);
    this.#running = Date.now();
    return this;
  }

  stop() {
    if (!this.#ref) return this;
    clearInterval(this.#ref);
    this.#ref = null;
    this.#running = false;
    return this;
  }

  catch(callback: ErrorHandler) {
    this.#catch = callback;
    return this;
  }
}
