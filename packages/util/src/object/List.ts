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

  get(index: number) {
    const node = this.getNode(index);
    if (node) return node.value;
    return undefined;
  }

  set(index: number, value: T) {
    if (index == this.#length) {
      this.push(value);
      return true;
    }

    const node = this.getNode(index);
    if (!node) return false;
    node.value = value;
    return true;
  }

  insert(index: number, value: T): boolean {
    if (index < 0 || index > this.length) return false;
    switch (index) {
      case 0:
        return !!this.unshift(value);
      case this.length:
        return !!this.push(value);
      default: {
        const node = new ListNode(value);
        const prev = this.getNode(index - 1)!;
        const next = prev.next!;
        prev.next = node;
        node.prev = prev;
        next.prev = node;
        node.next = next;
        this.#length++;
        return true;
      }
    }
  }

  remove(index: number, amount: number = 1) {
    if (index < 0 || index > this.length || amount < 1) return false;
    let curr = this.getNode(index)!;
    if (!curr) return true; // this only happens when index == length == 0

    for (let i = 0; i < amount; i++) {
      const { prev, next } = curr;
      curr.next = null;
      curr.prev = null;
      this.#length--;

      if (prev) {
        prev.next = next;
      } else {
        this.#head = next;
      }

      if (next) {
        next.prev = prev;
      } else {
        this.#tail = prev;
        break; // can't remove more, break early
      }

      curr = next;
    }

    return true;
  }

  // WIP
  // TODO: insertArray, insertList, toArray, fromArray, ...array methods, maybe other methods?
}
