const {RedBlackTree, Node} = require("./classes.js");

describe("RedBlackTree", () => {
    let tree = new RedBlackTree();

    beforeEach(() => {
        tree = new RedBlackTree([10, 20, 30, 15, 25, 35, 12, 14, 11]);
    });

    test("insert", () => {
        tree.insert(45);
        let insertedNode = tree.search(45);
        expect(insertedNode.color).toBe('RED');
        expect(insertedNode.parent.value).toBe(35);
        expect(insertedNode.parent.color).toBe('BLACK');
        expect(insertedNode.parent.parent.value).toBe(30);
        expect(insertedNode.parent.parent.color).toBe('RED');
    });

    test("insert uncle color red", () => {
        tree.insert(45);
        tree.insert(50);
        let insertedNode = tree.search(50);
        expect(insertedNode.color).toBe('RED');
        expect(insertedNode.parent.value).toBe(45);
        expect(insertedNode.parent.color).toBe('BLACK');
        expect(insertedNode.parent.parent.value).toBe(30);
        expect(insertedNode.parent.parent.color).toBe('RED');
        expect(insertedNode.parent.parent.left.color).toBe('BLACK');
        expect(insertedNode.parent.parent.right.color).toBe('BLACK');
    });

    test("insert uncle color black", () => {
        tree.insert(45);
        tree.insert(50);
        tree.insert(55);
        let insertedNode = tree.search(55);
        expect(insertedNode.color).toBe('RED');
        expect(insertedNode.parent.value).toBe(50);
        expect(insertedNode.parent.color).toBe('BLACK');
        expect(insertedNode.parent.parent.value).toBe(45);
        expect(insertedNode.parent.parent.color).toBe('RED');
        expect(insertedNode.parent.parent.left.color).toBe('BLACK');
        expect(insertedNode.parent.parent.right.color).toBe('BLACK');
    });

    test("delete leaf, no fixes needed", () => {
        let nodeParent = tree.search(35).parent;
        tree.delete(35);
        expect(nodeParent.right).toBe(tree.nil);
    });

    test("delete node without left child", () => {
        let nodeChild = tree.search(10).right;
        tree.delete(10);
        expect(tree.search(10)).toBe(tree.nil);
        expect(nodeChild.value).toBe(11);
        expect(nodeChild.color).toBe('BLACK');
        expect(nodeChild.parent.value).toBe(12);
        expect(nodeChild.parent.color).toBe('RED');
    });

    test("delete node without right child", () => {
        let nodeChild = tree.search(15).left;
        tree.delete(15);
        expect(tree.search(15)).toBe(tree.nil);
        expect(nodeChild.value).toBe(14);
        expect(nodeChild.color).toBe('BLACK');
        expect(nodeChild.parent.value).toBe(12);
        expect(nodeChild.parent.color).toBe('RED');
    });

    test("delete node with both children", () => {
        tree.delete(20);
        expect(tree.root.value).toBe(25);
        expect(tree.root.color).toBe('BLACK');
        expect(tree.root.left.value).toBe(12);
        expect(tree.root.left.color).toBe('RED');
        expect(tree.root.right.value).toBe(30);
        expect(tree.root.right.color).toBe('BLACK');
    });

    test("search", () => {
        expect(tree.search(20).value).toBe(20);
        expect(tree.search(20).color).toBe('BLACK');
        expect(tree.search(20).left.value).toBe(12);
        expect(tree.search(20).left.color).toBe('RED');
    });

});