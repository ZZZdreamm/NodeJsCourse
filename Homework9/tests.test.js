const { MinMaxStack, isBST, hasCycle } = require("./superClasses.js");
const {
  Stack,
  Queue,
  TreeNode,
  BinaryTree,
  Graph,
  LinkedItem,
  LinkedList,
} = require("./classes.js");

describe("Stack class", () => {
  let stack = new Stack();

  beforeEach(() => {
    stack = new Stack();
  });

  test("push and pop methods", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });
  test("peek method", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.peek()).toBe(3);
    stack.pop();
    expect(stack.peek()).toBe(2);
  });
  test("isEmpty method", () => {
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
    stack.pop();
    expect(stack.isEmpty()).toBe(true);
  });
});

describe("Queue class", () => {
  let queue = new Queue();

  beforeEach(() => {
    queue = new Queue();
  });

  test("enqueue and dequeue methods", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });
  test("peek method", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.peek()).toBe(1);
    queue.dequeue();
    expect(queue.peek()).toBe(2);
  });
  test("isEmpty method", () => {
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(1);
    expect(queue.isEmpty()).toBe(false);
    queue.dequeue();
    expect(queue.isEmpty()).toBe(true);
  });
});

describe("Binary Tree class", () => {
  let binaryTree = new BinaryTree();

  beforeEach(() => {
    binaryTree = new BinaryTree();
  });

  test("insert method", () => {
    binaryTree.insertNode(1);
    binaryTree.insertNode(2);
    binaryTree.insertNode(3);
    expect(binaryTree.root.value).toBe(1);
    expect(binaryTree.root.right.value).toBe(2);
    expect(binaryTree.root.right.right.value).toBe(3);
  });
  test("search method", () => {
    binaryTree.insertNode(1);
    binaryTree.insertNode(2);
    binaryTree.insertNode(3);
    expect(binaryTree.searchNode(1)).toBe(true);
    expect(binaryTree.searchNode(2)).toBe(true);
    expect(binaryTree.searchNode(3)).toBe(true);
    expect(binaryTree.searchNode(4)).toBe(false);
  });

  test("Tree traversal method", () => {
    binaryTree.insertNode(4);
    binaryTree.insertNode(5);
    binaryTree.insertNode(1);
    binaryTree.insertNode(7);
    binaryTree.insertNode(2);
    binaryTree.insertNode(6);
    binaryTree.insertNode(3);
    expect(binaryTree.inOrderTraversal()).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});

describe("Graph class", () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  test("should add a vertex", () => {
    graph.addVertex("A");
    expect(graph.adjacencyList).toHaveProperty("A");
    expect(graph.adjacencyList["A"]).toEqual([]);
  });

  test("should add an edge", () => {
    graph.addEdge("A", "B", 2);
    expect(graph.adjacencyList["A"]).toContainEqual({ node: "B", weight: 2 });
    expect(graph.adjacencyList["B"]).toContainEqual({ node: "A", weight: 2 });
  });

  test("should perform depth first search", () => {
    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("B", "D");
    graph.addEdge("C", "E");
    graph.addEdge("D", "E");
    expect(graph.depthFirstSearch("A")).toEqual(
      expect.arrayContaining(["A", "B", "D", "E", "C"])
    );
  });

  test("should perform breadth first search", () => {
    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("B", "D");
    graph.addEdge("C", "E");
    graph.addEdge("D", "E");
    expect(graph.breadthFirstSearch("A")).toEqual(["A", "B", "C", "D", "E"]);
  });

  test("should find the shortest path using Dijkstra's algorithm", () => {
    graph.addEdge("A", "C", 4);
    graph.addEdge("A", "B", 1);
    graph.addEdge("B", "C", 2);
    graph.addEdge("B", "D", 5);
    graph.addEdge("C", "D", 1);
    expect(graph.dijkstra("A", "D")).toEqual(["A", "B", "C", "D"]);
  });

  test("should find the shortest path using BFS", () => {
    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("B", "D");
    graph.addEdge("C", "E");
    graph.addEdge("D", "E");
    graph.addEdge("D", "F");
    graph.addEdge("E", "F");
    expect(graph.bfsShortestPath("A", "F")).toEqual(["A", "B", "D", "F"]);
  });
});

describe("Linked List class", () => {
  test("insert method", () => {
    const linkedList = new LinkedList();
    linkedList.insert(1);
    linkedList.insert(2);
    linkedList.insert(3);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.head.next.value).toBe(2);
    expect(linkedList.head.next.next.value).toBe(3);
  });
  test("search method", () => {
    const linkedList = new LinkedList();
    linkedList.insert(1);
    linkedList.insert(2);
    linkedList.insert(3);
    const search = linkedList.search(2);
    const searchNonExistent = linkedList.search(4);
    expect(search.value).toBe(2);
    expect(searchNonExistent).toBe(null);
  });
  test("delete method", () => {
    const linkedList = new LinkedList();
    linkedList.insert(1);
    linkedList.insert(2);
    linkedList.insert(3);
    linkedList.delete(2);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.head.next.value).toBe(3);
  });
});

describe("MinMaxStack class", () => {
  let minMaxStack = new MinMaxStack();

  beforeEach(() => {
    minMaxStack = new MinMaxStack();
  });

  test("push method", () => {
    minMaxStack.push(3);
    minMaxStack.push(2);
    minMaxStack.push(1);
    expect(minMaxStack.getMin()).toBe(1);
    expect(minMaxStack.getMax()).toBe(3);
  });
  test("pop method", () => {
    minMaxStack.push(3);
    minMaxStack.push(2);
    minMaxStack.push(1);
    minMaxStack.pop();
    expect(minMaxStack.getMin()).toBe(2);
    expect(minMaxStack.getMax()).toBe(3);
  });
  test("getMin method", () => {
    minMaxStack.push(3);
    minMaxStack.push(2);
    minMaxStack.push(1);
    minMaxStack.push(2);
    expect(minMaxStack.getMin()).toBe(1);
  });

  test("getMax method", () => {
    minMaxStack.push(2);
    minMaxStack.push(3);
    minMaxStack.push(2);
    minMaxStack.push(1);
    expect(minMaxStack.getMax()).toBe(3);
  });
});

describe("isBST function", () => {
  test("valid BST", () => {
    const binaryTree = new BinaryTree([2, 1, 3]);
    expect(isBST(binaryTree.root)).toBe(true);
  });
  test("invalid BST", () => {
    const binaryTree = new BinaryTree([1, 3])
    binaryTree.root.left = new TreeNode(2); // Accessed directly to create an invalid BST
    expect(isBST(binaryTree.root)).toBe(false);
  });
});

describe("hasCycle function", () => {
  test("no cycle", () => {
    const linkedList = new LinkedList([1, 2, 3]);
    expect(hasCycle(linkedList.head)).toBe(false);
  });
  test("cycle", () => {
    const linkedList = new LinkedList([1, 2, 3]);
    linkedList.tail.next = linkedList.head;
    expect(hasCycle(linkedList.head)).toBe(true);
  });
});
