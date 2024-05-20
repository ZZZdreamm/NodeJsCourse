class Stack {
  constructor() {
    this.top = null;
    this.storage = [];
  }
  push(value) {
    this.storage.push(value);
    this.top = value;
  }

  pop() {
    const poppedValue = this.storage.pop();
    this.top = this.storage[this.storage.length - 1];
    return poppedValue;
  }

  peek() {
    return this.top;
  }

  isEmpty() {
    return this.storage.length === 0;
  }
}

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// Bonus class for binary tree
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insertNode(value, node = this.root) {
    if (node == null) {
      this.root = new TreeNode(value);
      return;
    }
    if (value < node.value) {
      if (!node.left) {
        node.left = new TreeNode(value);
      } else {
        this.insertNode(value, node.left);
      }
    } else {
      if (!node.right) {
        node.right = new TreeNode(value);
      } else {
        this.insertNode(value, node.right);
      }
    }
  }

  searchNode(value, node = this.root) {
    if (!node) {
      return false;
    }
    if (value === node.value) {
      return true;
    }
    return value < node.value
      ? this.searchNode(value, node.left)
      : this.searchNode(value, node.right);
  }

  inOrderTraversal(node, result = []) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, weight = 1) {
    if (!this.adjacencyList[vertex1]) this.addVertex(vertex1);
    if (!this.adjacencyList[vertex2]) this.addVertex(vertex2);
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight }); 
  }

  depthFirstSearch(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    (function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor.node]) {
          return dfs(neighbor.node);
        }
      });
    })(start);

    return result;
  }

  breadthFirstSearch(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    let currentVertex;
    visited[start] = true;

    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor.node]) {
          visited[neighbor.node] = true;
          queue.push(neighbor.node);
        }
      });
    }

    return result;
  }

  dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; // To return at the end
    let smallest;

    // Build initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    // As long as there is something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        // We are done
        // Build path to return at the end
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }

    return path.concat(smallest).reverse();
  }

  bfsShortestPath(start, end) {
    const queue = [[start]];
    const visited = new Set();
    visited.add(start);

    while (queue.length > 0) {
      const path = queue.shift();
      const node = path[path.length - 1];

      if (node === end) {
        return path;
      }

      for (const neighbor of this.adjacencyList[node]) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          const newPath = [...path, neighbor.node];
          queue.push(newPath);
        }
      }
    }

    return null;
  }
}

class LinkedItem {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  insert(item) {
    const linkedItem = new LinkedItem(item);
    if (this.head === null) {
      this.head = linkedItem;
      this.tail = linkedItem;
      return;
    }

    this.tail.next = linkedItem;
    this.tail = linkedItem;
  }

  delete(value) {
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let itemBefore = null;
    let currentItem = this.head;
    while (currentItem != null) {
      if (currentItem.value === value) {
        break;
      }
      itemBefore = currentItem;
      currentItem = currentItem.next;
    }
    itemBefore.next = currentItem.next;
  }

  search(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }
}

module.exports = {
  Stack,
  Queue,
  TreeNode,
  BinaryTree,
  Graph,
  LinkedItem,
  LinkedList,
};
