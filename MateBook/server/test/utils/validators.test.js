import validators from '../../app/utils/validators.js';

describe('Tests for validators', () => {
    describe('Tests for validateStringInput function', () => {
        test('Should return input when is correct', () => {
            const input = 'string';
            expect.stringMatching(validators.validateStringInput(input), 'string')
        });

        test('Should throw on number value', () => {
            const input = 1;
            expect(() => validators.validateStringInput(input)).toThrow();
        });
        test('Should throw on boolean value', () => {
            const input = false;
            expect(() => validators.validateStringInput(input)).toThrow();
        });
        test('Should throw on object values', () => {
            const input = { attr: 'value' };
            expect(() => validators.validateStringInput(input)).toThrow();
        });
        test('Should throw on object values', () => {
            const input = ['value1', 'value2'];
            expect(() => validators.validateStringInput(input)).toThrow();
        });
        test('Should throw on undefined values', () => {
            const input = undefined;
            expect(() => validators.validateStringInput(input)).toThrow();
        });
        test('Should throw on null values', () => {
            const input = null;
            expect(() => validators.validateStringInput(input)).toThrow();
        });
        test('Should throw on empty string', () => {
            const input = '';
            expect(() => validators.validateStringInput(input)).toThrow();
        });
        test('Should throw on function values', () => {
            const input = () => { }
            expect(() => validators.validateStringInput(input)).toThrow();
        })
    });
    describe('Tests for validateNumberInput function', () => {
        test('Should return input if its a number', () => {
            const input = 1;
            expect(validators.validateNumberInput(input)).toBe(1);
        });
        test('Should return input as a number if its a string number', () => {
            const input = '1';
            expect(validators.validateNumberInput(input)).toBe(1);
        });
        test('Should throw on non-number string', () => {
            const input = 'string';
            expect(() => validators.validateNumberInput(input)).toThrow();
        });
        test('Should throw on boolean values', () => {
            const input = true;
            expect(() => validators.validateNumberInput(input)).toThrow();
        });
        test('Should throw on object values', () => {
            const input = { attr: 1 };
            expect(() => validators.validateNumberInput(input)).toThrow();
        });
        test('Should throw on array values', () => {
            const input = [1, 2];
            expect(() => validators.validateNumberInput(input)).toThrow();
        });
        test('Should throw on function values', () => {
            const input = () => { };
            expect(() => validators.validateNumberInput(input)).toThrow();
        });
        test('Should throw on undefined values', () => {
            const input = undefined;
            expect(() => validators.validateNumberInput(input)).toThrow();
        });
        test('Should throw on null values', () => {
            const input = null;
            expect(() => validators.validateNumberInput(input)).toThrow();
        });
    })
})