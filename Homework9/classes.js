class Stack {
  constructor() {
    this.storage = [];
  }
  push(value) {
    this.storage.push(value);
  }

  pop() {
    return this.storage.pop();
  }

  peek() {
    return this.storage[this.storage.length - 1];
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
  constructor(values = []) {
    this.root = null;
    values.forEach((value) => this.insertNode(value));
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

  inOrderTraversal(node = this.root, result = []) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }
}


// Binary Heap used for faster inserting and extracting minimum values for Dijkstra's algorithm
class BinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(value) {
    this.values.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.values.length - 1;
    const value = this.values[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.values[parentIndex];
      if (value.val >= parent.val) break;
      this.values[parentIndex] = value;
      this.values[index] = parent;
      index = parentIndex;
    }
  }

  extractMin() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  bubbleDown() {
    let index = 0;
    const length = this.values.length;
    const value = this.values[0];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild.val < value.val) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (swap === null && rightChild.val < value.val) ||
          (swap !== null && rightChild.val < leftChild.val)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      this.values[index] = this.values[swap];
      this.values[swap] = value;
      index = swap;
    }
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

    function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor.node]) {
          return dfs(neighbor.node);
        }
      });
    }

    dfs(start);
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
    let nodesLength = 0;
    const nodes = new BinaryHeap();
    const distances = {};
    const previous = {};
    let path = [];
    let smallest;

    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.insert({ val: 0, node: vertex });
      } else {
        distances[vertex] = Infinity;
        nodes.insert({ val: Infinity, node: vertex });
      }
      nodesLength++;
      previous[vertex] = null;
    }

    while (nodesLength) {
      smallest = nodes.extractMin().node;
      nodesLength--;
      if (smallest === finish) {
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
            nodes.insert({ val: candidate, node: nextNeighbor });
            nodesLength++;
          }
        }
      }
    }

    // Add the start node and reverse order for easier reading
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
  constructor(values = []) {
    this.head = null;
    this.tail = null;
    values.forEach((value) => this.insert(value));
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
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
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
