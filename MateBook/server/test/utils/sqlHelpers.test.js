import sqlHelpers from "../../app/utils/sqlHelpers";

describe('Tests for sqlHelpers', () => {
    describe('Tests for getSqlConditionalFromObject function', () => {
        test('Test for object with multiple attributes', () => {
            const input = { attr1: 'value1', attr2: 'value2'};
            expect.stringMatching(sqlHelpers.getSqlConditionalFromObject(input), "attr1='value1' AND attr2='value2");
        });
        test('Test for object with one attribute', () => {
            const input = {attr: 'value'};
            expect.stringMatching(sqlHelpers.getSqlConditionalFromObject(input), "attr='value'");
        });
        test('Test for object with numberic values', () => {
            const input = {attr: 1};
            expect.stringMatching(sqlHelpers.getSqlConditionalFromObject(input), "attr=1");
        });
        test('Test for empty object', () => {
            const input = {};
            expect(() => sqlHelpers.getSqlConditionalFromObject(input)).toThrow();
        });
        test('Test for string value', () => {
            const input = 'string';
            expect(() => sqlHelpers.getSqlConditionalFromObject(input)).toThrow();
        });
        test('Should throw on array value', () => {
            const input = [1, 2, 3];
            expect(() => sqlHelpers.getSqlConditionalFromObject(input)).toThrow();
        });
    });
    describe('Tests for getSqlInsertStatementFromObject function', () => {
        test('Test for object with multiple attributes', () => {
            const input = { attr1: 'value1', attr2: 'value2'};
            expect.stringMatching(sqlHelpers.getSqlInsertStatementFromObject(input), "(attr1, attr2) VALUES ('value1', 'value2')");
        });
        test('Test for object with one attribute', () => {
            const input = { attr1: 'value1' };
            expect.stringMatching(sqlHelpers.getSqlInsertStatementFromObject(input), "(attr1) VALUES ('value1')");
        });
        test('Should throw on empty object', () => {
            const input = { };
            expect(() => sqlHelpers.getSqlInsertStatementFromObject(input)).toThrow();
        });
        test('Should throw on number value', () => {
            const input = 2;
            expect(() => sqlHelpers.getSqlInsertStatementFromObject(input)).toThrow();
        });
        test('Should throw on string value', () => {
            const input = 'string';
            expect(() => sqlHelpers.getSqlInsertStatementFromObject(input)).toThrow();
        });
        test('Should throw on boolean value', () => {
            const input = false;
            expect(() => sqlHelpers.getSqlInsertStatementFromObject(input)).toThrow();
        });
        test('Should throw on boolean value', () => {
            const input = false;
            expect(() => sqlHelpers.getSqlInsertStatementFromObject(input)).toThrow();
        });
        test('Should throw on array value', () => {
            const input = [1, 2, 3];
            expect(() => sqlHelpers.getSqlInsertStatementFromObject(input)).toThrow();
        });
    })
})