class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    } 
    let current = this.root;
    while(current) {
      if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        } else {
          current = current.right;
        }
      } else {
        if (!current.left) {
          current.left = newNode;
          return this;
        } else {
          current = current.left
        }
      }
    } 
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    let newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    } 

    function _insertRecursively(node, val) {
      if (val > node.val) {
        if (!node.right) {
          node.right = newNode;
        } else {
          _insertRecursively(node.right, val);
        }
      } else {
        if (!node.left) {
          node.left = newNode;
        } else {
          _insertRecursively(node.left, val);
        }
      }
    }
    _insertRecursively(this.root, val);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while (current) {
      if (current.val === val) return current;

      current = val < current.val ? current.left : current.right;
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (node) {
      if (node.val === val) return node;
      if (val > node.val) {
        return this.findRecursively(val, node.right);
      } else {
        return this.findRecursively(val, node.left);
      }
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let nodes = [];
    function _dfsPreOrder(node) {
      nodes.push(node.val);
      if (node.left) _dfsPreOrder(node.left);
      if (node.right) _dfsPreOrder(node.right);
    }
    _dfsPreOrder(this.root);
    return nodes;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let nodes = [];
    function _dfsInOrder(node) {
      if (node.left) _dfsInOrder(node.left);
      nodes.push(node.val);
      if (node.right) _dfsInOrder(node.right);
    }
    _dfsInOrder(this.root);
    return nodes;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let nodes = [];
    function _dfsPostOrder(node) {
      if (node.left) _dfsPostOrder(node.left);
      if (node.right) _dfsPostOrder(node.right);
      nodes.push(node.val);
    }
    _dfsPostOrder(this.root);
    return nodes;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let nodes = [];
    let q = [this.root];
    while(q.length) {
      let current = q.shift();
      nodes.push(current.val);
      if (current.left) q.push(current.left);
      if (current.right) q.push(current.right);
    }
    return nodes;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
