import sqlHelpers from "../../utils/sqlHelpers";

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
        test('Test for object with string attribute holding a number string', () => {
            const input = {attr: '1'};
            expect.stringMatching(sqlHelpers.getSqlConditionalFromObject(input), "attr=1");
        })
    })
})