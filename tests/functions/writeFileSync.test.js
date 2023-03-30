const { Directory } = require("../../utils/filesystem");

const writeFileSync = require('../../functions/writeFileSync');

describe('Testing writeFileSync', () => {

    test('Expecting writeFileSync to be a function', () => {
        expect(typeof writeFileSync).toBe("function");
    });

    test('Expecting writeFileSync to return jest function', () => {
        let fn = writeFileSync(new Directory('root', {
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
            let fn = writeFileSync(fs);

            expect(fn("anotherpath/file.ext", "WHYGOODDAY!")).toStrictEqual(undefined);
            expect(fs.transverse('anotherpath').transverse('file.ext').contents).toStrictEqual(Buffer.from("WHYGOODDAY!"));
        });

        test('Expecting mock function to capture mock data', () => {
            let fs = new Directory('root', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });
            let fn = writeFileSync(fs);
            fn("anotherpath/file.ext", "WHYGOODDAY!")

            expect(fn).toBeCalled();
            expect(fn).toBeCalledWith('anotherpath/file.ext', "WHYGOODDAY!");
            expect(fn).toHaveReturned();
            expect(fn).toHaveReturnedWith(undefined);
        });

    });

});