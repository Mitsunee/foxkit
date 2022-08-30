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

  shift() {
    if (this.#head == null) return undefined;
    const node = this.#head;
    if (node.next == null) {
      this.#tail = null;
    }
    this.#head = node.next;
    this.#length--;
    return node.value;
  }

  unshift(value: T) {
    const node = new ListNode(value);
    if (this.#head) {
      node.next = this.#head;
      this.#head.prev = node;
    } else {
      this.#tail = node;
    }
    this.#head = node;
    this.#length++;
    return this;
  }

  getNode(n: number) {
    if (n < 0 || n >= this.#length) return undefined;
    const mid = this.#length / 2;
    let curr: ListNode<T>;
    if (n < mid) {
      curr = this.#head!;
      for (let i = 0; i < n; i++) {
        curr = curr.next!;
      }
    } else {
      curr = this.#tail!;
      for (let i = this.#length - 1; i > n; i--) {
        curr = curr.prev!;
      }
    }
    return curr;
  }

  get(n: number) {
    const node = this.getNode(n);
    if (node) return node.value;
    return undefined;
  }

  set(n: number, value: T) {
    if (n == this.#length) {
      this.push(value);
      return true;
    }

    const node = this.getNode(n);
    if (!node) return false;
    node.value = value;
    return true;
  }

  // WIP
  // TODO: insert, remove, ...array methods, toArray, fromArray, maybe other methods?
}
