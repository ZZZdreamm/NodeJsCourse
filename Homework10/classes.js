const A = (Math.sqrt(5) - 1) / 2; // A is constant value for hash function
function customHashFunction(str, tableSize) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  const fractionalPart = (hash * A) % 1; // Fraction part of hash
  return Math.floor(tableSize * fractionalPart); // Fraction multiplied by table size which results in keys/indexes from [0, tableSize)]
}

class LinkedListNode {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashTable {
  constructor(size = 64) {
    this.size = size;
    this.buckets = Array(size)
      .fill(null)
      .map(() => null);
    this.count = 0;
  }

  hash(key) {
    return customHashFunction(key, this.size);
  }

  insert(key, value) {
    if (this.count / this.size > 0.7) {
      this.resize(this.size * 2);
    }
    const index = this.hash(key);
    let node = this.buckets[index];

    if (node === null) {
      this.buckets[index] = new LinkedListNode(key, value);
    } else {
      let prev = null;
      while (node !== null) {
        if (node.key === key) {
          node.value = value;
          return;
        }
        prev = node;
        node = node.next;
      }
      prev.next = new LinkedListNode(key, value); // Append new node to the end
    }
    this.count++;
  }

  get(key) {
    const index = this.hash(key);
    let node = this.buckets[index];
    while (node != null) {
      if (node.key === key) {
        return node.value;
      }
      node = node.next;
    }
    return null;
  }

  delete(key) {
    const index = this.hash(key);
    let node = this.buckets[index];
    let prev = null;

    while (node !== null) {
      if (node.key === key) {
        if (prev === null) {
          this.buckets[index] = node.next;
        } else {
          prev.next = node.next;
        }
        this.count--;
        if (this.count / this.size < 0.3) { // && this.size > 64
          this.resize(Math.floor(this.size / 2));
        }
        return node.value;
      }
      prev = node;
      node = node.next;
    }
    return null;
  }

  resize(newSize) {
    const oldBuckets = this.buckets;
    this.size = newSize;
    this.buckets = Array(newSize)
      .fill(null)
      .map(() => null);
    this.count = 0;

    for (let i = 0; i < oldBuckets.length; i++) {
      let node = oldBuckets[i];
      while (node !== null) {
        this.insert(node.key, node.value);
        node = node.next;
      }
    }
  }

  *iterator() {
    for (let bucket of this.buckets) {
      let node = bucket;
      while (node !== null) {
        yield { key: node.key, value: node.value };
        node = node.next;
      }
    }
  }
}

module.exports = { HashTable };
