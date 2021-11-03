/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    let newItem = new Node(val);
    let prevFirst = this.first;
    this.first = newItem;

    this.size === 0 ? this.last = newItem : this.first.next = prevFirst;
    
    this.size += 1;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (this.size === 0) throw Error("The stack is empty!");
    let val = this.first;
    this.first = val.next;

    this.size -= 1;
    return val.val;
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    if (this.first) return this.first.val
    else throw Error("The queue is empty!")
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    if (this.first) return false;
    else return true;
  }
}

module.exports = Stack;
