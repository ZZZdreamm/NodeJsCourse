const { Stack } =  require("./classes.js");

class MinMaxStack extends Stack {
  constructor() {
    super();
    this.minStack = new Stack();
    this.maxStack = new Stack();
  }

  push(value) {
    super.push(value);
    if (this.minStack.isEmpty() || value <= this.minStack.peek()) {
      this.minStack.push(value);
    }
    if (this.maxStack.isEmpty() || value >= this.maxStack.peek()) {
      this.maxStack.push(value);
    }
  }

  pop() {
    const value = super.pop();
    if (value === this.minStack.peek()) {
      this.minStack.pop();
    }
    if (value === this.maxStack.peek()) {
      this.maxStack.pop();
    }
    return value;
  }

  getMin() {
    return this.minStack.peek();
  }

  getMax() {
    return this.maxStack.peek();
  }
}

function isBST(node, min = null, max = null) {
  if (node === null) {
    return true;
  }
  if (
    (min !== null && node.value <= min) ||
    (max !== null && node.value >= max)
  ) {
    return false;
  }
  return (
    isBST(node.left, min, node.value) && isBST(node.right, node.value, max)
  );
}

function hasCycle(head) {
  if (!head || !head.next) {
    return false;
  }

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}


module.exports = { MinMaxStack, isBST, hasCycle };