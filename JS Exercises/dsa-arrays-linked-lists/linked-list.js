/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.head === null) this.head = newNode;

    if (this.tail !== null) this.tail.next = newNode;

    this.tail = newNode;
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head !== null) newNode.next = this.head;
    this.head = newNode;
    if (this.tail === null) this.tail = newNode;
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    let lastItem = this.tail;
    if (this.tail === null) throw "Cannot pop from empty list!";
    let currentItem = this.head;
    while (currentItem !== null) {
      if (currentItem === this.tail) {
        this.tail = null;
        this.head = null;
        this.length -= 1;
        return lastItem.val;
      }
      if (currentItem.next === this.tail) {
        this.tail = currentItem;
        currentItem.next = null;
      }

      currentItem = currentItem.next;
    }

    this.length -= 1;
    return lastItem.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    let firstItem = this.head;
    if (firstItem === null) throw "Cannot shift from empty list!";
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return firstItem.val;
    }
    this.head = firstItem.next;
    this.length -= 1;

    return firstItem.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx > this.length - 1 || idx < 0) throw "Invalid index";
    let result = this.head;
    while (idx > 0) {
      result = result.next;
      idx--;
    }
    return result.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx > this.length - 1 || idx < 0) throw "Invalid index";
    let targetItem = this.head;
    let prevItem = null;
    for (let i = 0; i < idx; i++) {
      prevItem = targetItem;
      targetItem = targetItem.next;
    }
    if (this.tail === this.head) {
      this.head.val = val;
      this.tail.val = val;
    } else if (targetItem === this.tail) {
      this.tail.val = val;
    } else if (targetItem === this.head) {
      this.head.val = val
    } else {
      prevItem.next = val;
      targetItem.val = val;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) throw "Invalid index";
    let newItem = new Node(val)
    let targetItem = this.head;
    let prevItem = null;
    for (let i = 0; i < idx; i++) {
      prevItem = targetItem;
      targetItem = targetItem.next;
    }
    if (targetItem === this.head) {
      if(this.tail === null) this.tail = newItem;
      this.head = newItem;
      this.head.next = targetItem;
      this.length++;
    } else if (targetItem === null) {
      this.tail = newItem;
      prevItem.next = newItem;
      this.length++;
    } else {
      prevItem.next = newItem;
      newItem.next = targetItem;
      this.length++;
    }
     
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx > this.length || idx < 0) throw "Invalid index";

    let targetItem = this.head;
    let prevItem = null;
    for (let i = 0; i < idx; i++) {
      prevItem = targetItem;
      targetItem = targetItem.next;
    }

    if (targetItem === this.head) {
      if (this.head === this.tail) this.tail = null;
      this.head = targetItem.next;
      targetItem.next = null;
      this.length--;
    } else if (targetItem === this.tail) {
      this.tail = prevItem;
      prevItem.next = null;
      this.length--;
    } else {
      prevItem.next = targetItem.next;
      targetItem.next = null;
      this.length--;
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let currentItem = this.head;
    while (currentItem) {
      total = total + currentItem.val;
      currentItem = currentItem.next;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;
