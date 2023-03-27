const index = require('../index');

describe('Testing index', () => {

    test('Expecting index to be a function', () => {
        expect(typeof index).toBe('function');
    }); 

    test('Expecting the return value to be an object', () => {
        let res = index({});
        expect(res).toHaveProperty('readFileSync');
        expect(res).toHaveProperty('writeFileSync');
        expect(res).toHaveProperty('_fs');
    });

});