const { Directory } = require("../../utils/filesystem");

const readdirSync = require("../../functions/readdirSync");

describe('Testing readdirSync', () => {

    test('Expecting readdirSync to be a function', () => {
        expect(typeof readdirSync()).toBe("function");
    });

    test('Expecting readdirSync to return jest function', () => {
        let fn = readdirSync(new Directory('root', {
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
            let fn = readdirSync(new Directory('root', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            }));

            expect(fn(".")).toStrictEqual([
                'file.ext',
                'anotherpath'
            ]);
        });

        test('Expecting mock function to capture mock data', () => {
            let fn = readdirSync(new Directory('root', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            }));
            fn("anotherpath");

            expect(fn).toBeCalled();
            expect(fn).toBeCalledWith('anotherpath');
            expect(fn).toHaveReturned();
            expect(fn).toHaveReturnedWith([
                'file.ext'
            ]);
        });

    });

})