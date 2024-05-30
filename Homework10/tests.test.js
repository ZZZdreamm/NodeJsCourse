const { HashTable } = require("./classes.js");

describe('HashTable', () => {
    let ht = new HashTable();

    beforeEach(() => {
        ht = new HashTable();
    });

    test('inserts and gets key-value pairs', () => {
        ht.insert('name', 'Alice');
        ht.insert('age', 25);
        ht.insert('city', 'Wonderland');

        expect(ht.get('name')).toBe('Alice');
        expect(ht.get('age')).toBe(25);
        expect(ht.get('city')).toBe('Wonderland');
    });

    test('updates value for existing key', () => {
        ht.insert('age', 25);
        ht.insert('age', 26);

        expect(ht.get('age')).toBe(26);
    });

    // test('deletes key-value pairs', () => {
    //     ht.insert('city', 'Wonderland');
    //     ht.delete('city');

    //     expect(ht.get('city')).toBeNull();
    // });

    test('handles collisions', () => {
        ht.insert('abc', '123');
        ht.insert('cab', '321');

        expect(ht.get('abc')).toBe('123');
        expect(ht.get('cab')).toBe('321');
    });

    test('returns null for non-existent keys', () => {
        expect(ht.get('nonExistentKey')).toBeNull();
    });

    test("small hash table", () => {
        ht = new HashTable(10);
        ht.insert('name', 'Alice');
        ht.insert('age', 25);
        ht.insert('city', 'Wonderland');

        expect(ht.get('name')).toBe('Alice');
        expect(ht.get('age')).toBe(25);
        expect(ht.get('city')).toBe('Wonderland');
    });

    test("resizes hash table", () => {
        ht = new HashTable(2);
        ht.insert('name', 'Alice');
        ht.insert('age', 25);
        ht.insert('city', 'Wonderland');

        expect(ht.get('name')).toBe('Alice');
        expect(ht.get('age')).toBe(25);
        expect(ht.get('city')).toBe('Wonderland');
        expect(ht.size).toBe(4);
    });

    test("resizes then shrinks hash table", () => {
        ht = new HashTable(2);
        ht.insert('name', 'Alice');
        ht.insert('age', 25);
        ht.insert('city', 'Wonderland');
        expect(ht.size).toBe(4);
        ht.delete('name');
        ht.delete('age');

        expect(ht.get('name')).toBeNull();
        expect(ht.get('age')).toBeNull();
        expect(ht.get('city')).toBe('Wonderland');
        expect(ht.size).toBe(2);
    });

    test("iterate over hash table", () => {
        ht.insert('name', 'Alice');
        ht.insert('age', 25);
        ht.insert('city', 'Wonderland');

        let tableValues = {};
        for (let { key, value } of ht.iterator()) {
            tableValues[key] = value;
        }

        expect(tableValues).toEqual({
            name: 'Alice',
            age: 25,
            city: 'Wonderland'
        });
    });
});
