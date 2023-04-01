const lstatSync = require("../../functions/lstatSync");
const { Directory } = require("../../utils/filesystem");

describe('Testing lstatSync', () => {

    test('Expecting lstatSync to be a function', () => {
        expect(typeof lstatSync).toBe("function");
    });

    test('Expecting lstatSync to return jest function', () => {
        let fn = lstatSync(new Directory('root', {
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
            let fn = lstatSync(fs);
            let result = fn('./anotherpath/file.ext');

            expect(result.isDirectory()).toStrictEqual(false);
        });

        test('Expecting mock function to capture mock data', () => {
            let fs = new Directory('root', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });
            let fn = lstatSync(fs);
            let result = fn('./anotherpath/file.ext');

            expect(fn).toBeCalled();
            expect(fn).toBeCalledWith("./anotherpath/file.ext");
            expect(fn).toHaveReturned();
            // TODO expect(fn).toHaveReturnedWith();
        });

    });

});