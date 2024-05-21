Stack:
- push, pop, peek, is_empty are constant time operations O(1) (even though some of them use length of array but length is stored)

Queue:
- enqueue, peek, is_empty are constant time operations O(1)
- dequeue is O(n) because it has to shift all elements to the left

Binary Tree:
- insert, search, delete can be O(n) in the worst case if the tree is unbalanced, but O(log n) in the average case
- traversal is O(n) because it has to visit all nodes

Graph:
- add_vertex, add_edge are O(1) because they involve adding/removing elements from a dictionary
- depth_first_search: iterate through all vertices and edges, going as deep as possible before checking other vertices
- breadth_first_search: iterate through all vertices and edges, checking all vertices at the same level before going deeper
- depth_first_search, breadth_first_search are O(V + E) where V is the number of vertices and E is the number of edges because it has to check all vertices and edges
- dijkstra's algorithm: find the shortest path between two vertices going through the smallest weight edges at beginning and updating the shortest path to each vertex so later vertices can use the shortest path to previous vertices and omit unnecessary iterations
- dijkstra's algorithm is O((V + E) * log V) because it has to check all vertices and edges (O(V + E)) and additionally it uses a priority queue which has O(log V) time complexity for insertion and extraction of the smallest element
- bfsShortestPath: find the smallest number of edges between two vertices (works only for unweighted graphs)
- bfsShortestPath is O(V + E) because it has to check all vertices and edges

Linked List:
- insert is O(1) because linked list has a reference to tail node which allows insertion at the end in constant time
- delete, search are O(n) because they have to traverse the list

Min/Max Stack:
1. It contains a stack and a min/max stacks to keep track of the minimum/maximum values in the stack.
- push, pop, peek, is_empty are constant time operations O(1)
- get_min, get_max are also constant time operations O(1)


isBST function:
1. The function takes a binary tree's root as input and returns True if the tree is a binary search tree, and False otherwise.
2. It traverses the tree and checks if any node on left is not greater than its parent node, and any node on right is not less than its parent node.
3. Time complexity is O(n) because it has to visit all nodes in the tree.

hasCycle function:
1. The function takes a head of a linked list as input and returns True if the linked list has a cycle, and False otherwise.
2. It uses two pointers, slow and fast, to traverse the linked list. If there is a cycle, the two pointers will eventually meet.
3. Time complexity is O(n) because slower pointer has to visit all nodes in the list because they will catch up to each other always at the end of the cycle.
