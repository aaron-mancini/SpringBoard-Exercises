/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (this.root === null) return 0;
    let toAddQueue = [this.root];
    let sum = 0;

    while (toAddQueue.length) {
      let current = toAddQueue.shift();

      for (let child of current.children) {
        toAddQueue.push(child);
      }

      sum += current.val;
     
    }

    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (this.root === null) return 0;
    let toCheckQueue = [this.root];
    let count = 0;

    while (toCheckQueue.length) {
      let current = toCheckQueue.shift();

      for (let child of current.children) {
        toCheckQueue.push(child);
      }

      if (current.val % 2 === 0) count++;
     
    }

    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (this.root === null) return 0;
    let toCheckQueue = [this.root];
    let count = 0;

    while (toCheckQueue.length) {
      let current = toCheckQueue.shift();

      for (let child of current.children) {
        toCheckQueue.push(child);
      }

      if (current.val > lowerBound) count++;
     
    }

    return count;
  }
}

module.exports = { Tree, TreeNode };
