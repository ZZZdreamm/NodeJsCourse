const {customFilterUnique, chunkArray, randomShuffle, getArrayIntersection, getArrayUnion} = require('./functions.js');



describe('Test functions', () => {
    describe('Task 1', () => {
        it('filter by specific property', () => {
            const array = [
                { name: 'John', age: 20 },
                { name: 'Jane', age: 20 },
                { name: 'John', age: 25 },
                { name: 'Jane', age: 25 },
            ];
            const callback = (item) => item.name;
            const expected = [
                { name: 'John', age: 20 },
                { name: 'Jane', age: 20 },
            ];
            const result = customFilterUnique(array, callback);

            expect(result).toEqual(expected);
        });

        it('rest left from division by 2', () => {
            const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const callback = (item) => item % 2;
            const expected = [1, 2];
            const result = customFilterUnique(array, callback);

            expect(result).toEqual(expected);
        });
    });

    describe('Task 2', () => {
        it('chunk array', () => {
            const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const chunkSize = 3;
            const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];
            const result = chunkArray(array, chunkSize);

            expect(result).toEqual(expected);
        });
    });
    
    describe("Task 4", () => {
        it("intersection of two arrays", () => {
            const array1 = [1, 2, 3, 4, 5];
            const array2 = [3, 4, 5, 6, 7];
            const expected = [3, 4, 5];
            const result = getArrayIntersection(array1, array2);

            expect(result).toEqual(expected);
        });

        it("union of two arrays containing some of common elements", () => {
            const array1 = [1, 2, 3, 4, 5];
            const array2 = [3, 4, 5, 6, 7];
            const expected = [1, 2, 3, 4, 5, 6, 7];
            const result = getArrayUnion(array1, array2);

            expect(result).toEqual(expected);
        });

    });
});

