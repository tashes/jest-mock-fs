const { componentize } = require("../../utils/path");

describe('Testing componentize', () => {

    test('Expecting correct values to return correct values', () => {
        let path = `path/to/filespace.ext`;
        let components = componentize(path);

        expect(components).toStrictEqual([
            'path',
            'to',
            'filespace.ext'
        ]);
    });

});