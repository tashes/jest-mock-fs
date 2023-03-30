const { Directory } = require("../../utils/filesystem");

const unlinkSync = require("../../functions/unlinkSync");

describe('Testing unlinkSync', () => {

    test('Expecting unlinkSync to be a function', () => {
        expect(typeof unlinkSync).toBe("function");
    });

    test('Expecting unlinkSync to return jest function', () => {
        let fn = unlinkSync(new Directory('root', {
            'file.ext': "HELLO!",
            'anotherpath': {
                'file.ext': "ANOTHERHELLO!"
            }
        }));

        expect(typeof fn).toBe("function");
        expect(fn._isMockFunction).toBe(true);
    });

    describe('Testing mock function', () => {

        test('Expecting mock function to return correct result', () => {
            let fs = new Directory('root', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });
            let fn = unlinkSync(fs);
            fn('file.ext');

            expect(fs.contents).toStrictEqual([
                new Directory("anotherpath", {
                    'file.ext': "ANOTHERHELLO!"
                })
            ]);
            expect(fs.paths).toStrictEqual([
                "anotherpath"
            ]);
        });

    });

});