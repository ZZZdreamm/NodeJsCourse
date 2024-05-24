class Node {
  constructor(value, color = "RED", left = null, right = null, parent = null) {
    this.value = value;
    this.color = color;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

class RedBlackTree {
  constructor(listOfValues) {
    this.nil = new Node(null, "BLACK"); // Sentinel node for representing leaves
    this.root = null;
    listOfValues?.forEach((value) => {
      this.insert(value);
    });
  }

  insert(value) {
    let newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      this.root.color = "BLACK";
      this.root.left = this.nil;
      this.root.right = this.nil;
      return;
    }
    newNode.left = this.nil;
    newNode.right = this.nil;

    let parent = null;
    let current = this.root;

    // Find the parent of the new node (normal BST insert)
    while (current !== this.nil) {
      parent = current;
      if (newNode.value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    newNode.parent = parent;

    if (newNode.value < parent.value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    newNode.color = "RED";
    this.insertFix(newNode);
  }

  // Fix RBT properties after insertion
  insertFix(node) {
    while (node !== this.root && node.parent.color === "RED") {
      if (node.parent === node.parent.parent.left) {
        let uncle = node.parent.parent.right;
        if (uncle.color === "RED") {
          node.parent.color = "BLACK";
          uncle.color = "BLACK";
          node.parent.parent.color = "RED";
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            node = node.parent;
            this.leftRotate(node);
          }
          node.parent.color = "BLACK";
          node.parent.parent.color = "RED";
          this.rightRotate(node.parent.parent);
        }
      } else {
        let uncle = node.parent.parent.left;
        if (uncle.color === "RED") {
          node.parent.color = "BLACK";
          uncle.color = "BLACK";
          node.parent.parent.color = "RED";
          node = node.parent.parent;
        } else {
          if (node === node.parent.left) {
            node = node.parent;
            this.rightRotate(node);
          }
          node.parent.color = "BLACK";
          node.parent.parent.color = "RED";
          this.leftRotate(node.parent.parent);
        }
      }
    }
    this.root.color = "BLACK";
  }

  leftRotate(node) {
    let temp = node.right;
    node.right = temp.left;

    if (temp.left !== this.nil) {
      temp.left.parent = node;
    }

    temp.parent = node.parent;

    if (node.parent === null) {
      this.root = temp;
    } else if (node === node.parent.left) {
      node.parent.left = temp;
    } else {
      node.parent.right = temp;
    }

    temp.left = node;
    node.parent = temp;
  }

  rightRotate(node) {
    let temp = node.left;
    node.left = temp.right;

    if (temp.right !== this.nil) {
      temp.right.parent = node;
    }

    temp.parent = node.parent;

    if (node.parent === null) {
      this.root = temp;
    } else if (node === node.parent.right) {
      node.parent.right = temp;
    } else {
      node.parent.left = temp;
    }

    temp.right = node;
    node.parent = temp;
  }

  delete(value) {
    // Find the node to delete
    let node = this.search(value);
    if (node === this.nil) return;

    let y = node;
    let yOriginalColor = y.color;
    let x;

    // Node doesn't have left child
    if (node.left === this.nil) {
      // Put right children in place of node to delete
      x = node.right;
      this.transplant(node, node.right);
      // Node doesn't have right child
    } else if (node.right === this.nil) {
      // Put left children in place of node to delete
      x = node.left;
      this.transplant(node, node.left);
      // Node has two children
    } else {
      // Find the minimum node in the right subtree of the node to delete and swap them, removing node to delete from tree
      y = this.minimum(node.right);
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === node) {
        x.parent = y;
      } else {
        this.transplant(y, y.right);
        y.right = node.right;
        y.right.parent = y;
      }
      this.transplant(node, y);
      y.left = node.left;
      y.left.parent = y;
      y.color = node.color;
    }

    // Fix RBT properties after deletion
    if (yOriginalColor === "BLACK") {
      this.deleteFix(x);
    }
  }

  // Fix RBT properties after deletion
  deleteFix(x) {
    while (x !== this.root && x.color === "BLACK") {
      if (x === x.parent.left) {
        let w = x.parent.right;
        if (w.color === "RED") {
          w.color = "BLACK";
          x.parent.color = "RED";
          this.leftRotate(x.parent);
          w = x.parent.right;
        }
        if (w.left.color === "BLACK" && w.right.color === "BLACK") {
          w.color = "RED";
          x = x.parent;
        } else {
          if (w.right.color === "BLACK") {
            w.left.color = "BLACK";
            w.color = "RED";
            this.rightRotate(w);
            w = x.parent.right;
          }
          w.color = x.parent.color;
          x.parent.color = "BLACK";
          w.right.color = "BLACK";
          this.leftRotate(x.parent);
          x = this.root;
        }
      } else {
        let w = x.parent.left;
        if (w.color === "RED") {
          w.color = "BLACK";
          x.parent.color = "RED";
          this.rightRotate(x.parent);
          w = x.parent.left;
        }
        if (w.right.color === "BLACK" && w.left.color === "BLACK") {
          w.color = "RED";
          x = x.parent;
        } else {
          if (w.left.color === "BLACK") {
            w.right.color = "BLACK";
            w.color = "RED";
            this.leftRotate(w);
            w = x.parent.left;
          }
          w.color = x.parent.color;
          x.parent.color = "BLACK";
          w.left.color = "BLACK";
          this.rightRotate(x.parent);
          x = this.root;
        }
      }
    }
    x.color = "BLACK";
  }

  // Replace subtree rooted at node u with subtree rooted at node v
  transplant(u, v) {
    if (u.parent === null) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }
    v.parent = u.parent;
  }

  // Find the node with the given value by going down the tree
  search(value) {
    let current = this.root;
    while (current !== this.nil && value !== current.value) {
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return current;
  }

  // Find the minimum node in the subtree rooted at node by going down the left children
  minimum(node) {
    while (node.left !== this.nil) {
      node = node.left;
    }
    return node;
  }

  prettyPrint(node = this.root, indent = "", last = true) {
    if (node !== this.nil) {
      console.log(
        indent +
          (last ? "└── " : "├── ") +
          (node.color === "RED" ? "R:" : "B:") +
          node.value
      );
      indent += last ? "    " : "│   ";
      this.prettyPrint(node.left, indent, false);
      this.prettyPrint(node.right, indent, true);
    }
  }
}

let tree = new RedBlackTree([10, 20, 30, 15, 25, 35, 12, 14, 11]);
tree.prettyPrint();

module.exports = { Node, RedBlackTree };
