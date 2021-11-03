/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    let newItem = new Node(val);

    this.size === 0 ? this.first = newItem : this.last.next = newItem;
    
    this.last = newItem;
    this.size += 1;
    
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if (this.size === 0) throw Error("The queue is empty!");
    let val = this.first;
    if (this.last = val) this.last = val.next;
    this.first = val.next;

    this.size -= 1;
    return val.val;
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    if (this.first) return this.first.val
    else throw Error("The queue is empty!")
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    if (this.first) return false;
    else return true;
  }
}

module.exports = Queue;
