Generally insert, retrieve and delete functions are constant time O(1) as they instantly access the data. However, if there are multiple elements at the same index, the time complexity will be O(n) as it will have to iterate through at worst case all of the elements to find the correct one.
Elements are distributed evenly across the hash table, the time complexity will be O(1) as it will only have to access the index of the element for most of the situations.
There could be down limit for shrinking table, but to show it in tests easier I didn't add it.
For iterating through all elements I used generator for controlling the iteration. It allows more flexibility than using a list to store all elements.