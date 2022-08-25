class ListNode<T> {
  next: ListNode<T> | null = null;
  prev: ListNode<T> | null = null;
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

export class List<T> {
  #head: ListNode<T> | null = null;
  #tail: ListNode<T> | null = null;
  #length: number = 0;

  get head() {
    return this.#head?.value;
  }

  get tail() {
    return this.#tail?.value;
  }

  get length() {
    return this.#length;
  }

  // TODO: tests
  push(value: T) {
    const node = new ListNode(value);
    if (this.#tail == null) {
      this.#head = node;
    } else {
      this.#tail.next = node;
      node.prev = this.#tail;
    }
    this.#tail = node;
    this.#length++;
    return this;
  }

  // TODO: tests
  pop() {
    if (this.#tail == null) return undefined;
    const node = this.#tail;

    if (this.length == 1) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = node.prev;
      this.#tail!.next = null;
      node.prev = null;
    }

    this.#length--;
    return node.value;
  }

  // WIP
  // TODO: shift, unshift, _getNode, get, set, insert, remove, reverse, maybe other methods?
}
