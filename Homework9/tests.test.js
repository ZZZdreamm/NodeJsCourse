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
  test("push and pop methods", () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });
  test("peek method", () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.peek()).toBe(3);
    stack.pop();
    expect(stack.peek()).toBe(2);
  });
  test("isEmpty method", () => {
    const stack = new Stack();
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
    stack.pop();
    expect(stack.isEmpty()).toBe(true);
  });
});

describe("Queue class", () => {
  test("enqueue and dequeue methods", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });
  test("peek method", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.peek()).toBe(1);
    queue.dequeue();
    expect(queue.peek()).toBe(2);
  });
  test("isEmpty method", () => {
    const queue = new Queue();
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(1);
    expect(queue.isEmpty()).toBe(false);
    queue.dequeue();
    expect(queue.isEmpty()).toBe(true);
  });
});

describe("Binary Tree class", () => {
  test("insert method", () => {
    const binaryTree = new BinaryTree();
    binaryTree.insertNode(1);
    binaryTree.insertNode(2);
    binaryTree.insertNode(3);
    expect(binaryTree.root.value).toBe(1);
    expect(binaryTree.root.right.value).toBe(2);
    expect(binaryTree.root.right.right.value).toBe(3);
  });
  test("search method", () => {
    const binaryTree = new BinaryTree();
    binaryTree.insertNode(1);
    binaryTree.insertNode(2);
    binaryTree.insertNode(3);
    expect(binaryTree.searchNode(1)).toBe(true);
    expect(binaryTree.searchNode(2)).toBe(true);
    expect(binaryTree.searchNode(3)).toBe(true);
    expect(binaryTree.searchNode(4)).toBe(false);
  });
});

describe('Graph class', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  test('should add a vertex', () => {
    graph.addVertex('A');
    expect(graph.adjacencyList).toHaveProperty('A');
    expect(graph.adjacencyList['A']).toEqual([]);
  });

  test('should add an edge', () => {
    graph.addEdge('A', 'B', 2);
    expect(graph.adjacencyList['A']).toContainEqual({ node: 'B', weight: 2 });
    expect(graph.adjacencyList['B']).toContainEqual({ node: 'A', weight: 2 });
  });

  test('should perform depth first search', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'E');
    expect(graph.depthFirstSearch('A')).toEqual(expect.arrayContaining(['A', 'B', 'D', 'E', 'C']));
  });

  test('should perform breadth first search', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'E');
    expect(graph.breadthFirstSearch('A')).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  test('should find the shortest path using Dijkstra\'s algorithm', () => {
    graph.addEdge('A', 'B', 1);
    graph.addEdge('A', 'C', 4);
    graph.addEdge('B', 'C', 2);
    graph.addEdge('B', 'D', 5);
    graph.addEdge('C', 'D', 1);
    expect(graph.dijkstra('A', 'D')).toEqual(['A', 'B', 'C', 'D']);
  });

  test('should find the shortest path using BFS', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'E');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'F');
    expect(graph.bfsShortestPath('A', 'F')).toEqual(['A', 'B', 'D', 'F']);
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
  test("find method", () => {
    const linkedList = new LinkedList();
    linkedList.insert(1);
    linkedList.insert(2);
    linkedList.insert(3);
    expect(linkedList.search(1)).toBe(true);
    expect(linkedList.search(2)).toBe(true);
    expect(linkedList.search(3)).toBe(true);
    expect(linkedList.search(4)).toBe(false);
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
  test("push method", () => {
    const minMaxStack = new MinMaxStack();
    minMaxStack.push(3);
    minMaxStack.push(2);
    minMaxStack.push(1);
    expect(minMaxStack.getMin()).toBe(1);
    expect(minMaxStack.getMax()).toBe(3);
  });
  test("pop method", () => {
    const minMaxStack = new MinMaxStack();
    minMaxStack.push(3);
    minMaxStack.push(2);
    minMaxStack.push(1);
    minMaxStack.pop();
    expect(minMaxStack.getMin()).toBe(2);
    expect(minMaxStack.getMax()).toBe(3);
  });
});

describe("isBST function", () => {
  test("valid BST", () => {
    const node = new TreeNode(2);
    node.left = new TreeNode(1);
    node.right = new TreeNode(3);
    expect(isBST(node)).toBe(true);
  });
  test("invalid BST", () => {
    const node = new TreeNode(1);
    node.left = new TreeNode(2);
    node.right = new TreeNode(3);
    expect(isBST(node)).toBe(false);
  });
});

describe("hasCycle function", () => {
  test("no cycle", () => {
    const head = new LinkedItem(1);
    head.next = new LinkedItem(2);
    head.next.next = new LinkedItem(3);
    expect(hasCycle(head)).toBe(false);
  });
  test("cycle", () => {
    const head = new LinkedItem(1);
    head.next = new LinkedItem(2);
    head.next.next = new LinkedItem(3);
    head.next.next.next = head;
    expect(hasCycle(head)).toBe(true);
  });
});


