const existsSync = require("../../functions/existsSync");
const { Directory } = require("../../utils/filesystem");

describe('Testing existsSync', () => {

    test('Expecting existsSync to be a function', () => {
        expect(typeof existsSync()).toBe("function");
    });

    test('Expecting existsSync to return jest function', () => {
        let fn = existsSync(new Directory('', {
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
            let fn = existsSync(new Directory('', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            }));
            let result = fn("file.ext");

            expect(result).toBe(true);
        });

        test('Expecting mock function to capture mock data', () => {
            let fn = existsSync(new Directory('', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            }));
            let result = fn("file.ext");

            expect(fn).toBeCalled();
            expect(fn).toBeCalledWith("file.ext");
            expect(fn).toHaveReturned();
            expect(fn).toHaveReturnedWith(true);
        });
    });

});