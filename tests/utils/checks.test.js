const { isObject, isString, isBuffer, checkConfigString, checkConfigBuffer, checkConfigContents, checkConfigItem, checkConfigPath, checkConfig, checkConfigFullPath } = require("../../utils/checks");

describe('Testing isObject', () => {

    test('Expect correct values to return true', () => {
        expect(isObject({})).toStrictEqual(true);
    });

});

describe ('Testing isString', () => {

    test('Expect correct values to return true', () => {
        expect(isString("")).toStrictEqual(true);
    });

});

describe('Testing isBuffer', () => {

    test('Expect correct values to return true', () => {
        expect(isBuffer(Buffer.from(""))).toStrictEqual(true);
    });

});

describe('Testing checkConfig', () => {
    
    test('Expect correct values to return [ true, null ]', () => {
        expect(checkConfig({
            'item.txt': "teststring",
            anotherpath: {
                'file.ext': Buffer.from("HELLO")
            }
        })).toStrictEqual([ true, null ]);
    });

});

describe('Testing checkConfigPath', () => {

    test('Expect correct values to return [ true, null ]', () => {
        expect(checkConfigPath("testpath")).toStrictEqual([ true, null ])
    });

});

describe('Testing checkConfigFullPath', () => {

    test('Expect correct values to return [ true, null ]', () => {
        expect(checkConfigFullPath("test/path/to/file.ext")).toStrictEqual([ true, null ]);
    });

});

describe('Testing checlkConfigItem', () => {

    test('Expect correct values to return [ true, null ]', () => {
        expect(checkConfigItem({
            'item.txt': "teststring"
        })).toStrictEqual([ true, null ]);
    });

});

describe('Testing checkConfigContents', () => {

    test('Expect correct values to return [ true, null ]', () => {
        expect(checkConfigContents("")).toStrictEqual([ true, null ]);
    });

});

describe('Testing checkConfigBuffer', () => {

    test('Expect correct values to return [ true, null ]', () => {
        expect(checkConfigBuffer(Buffer.from(""))).toStrictEqual([ true, null ]);
    });

});

describe('Testing checkConfigString', () => {

    test('Expect correct values to return [ true, null]', () => {
        expect(checkConfigString("")).toStrictEqual([ true, null ]);
    });

});