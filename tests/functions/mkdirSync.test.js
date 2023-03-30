const mkdirSync = require("../../functions/mkdirSync");
const { Directory } = require("../../utils/filesystem");

describe('Testing mkdirSync', () => {

    test('Expecting mkdirSync to be a function', () => {
        expect(typeof mkdirSync).toBe("function");
    });

    test('Expecting mkdirSync to return jest function', () => {
        let fn = mkdirSync(new Directory('root', {
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
            let fn = mkdirSync(fs);
            fn('./anotherpath/worker');

            expect(fs.transverse('anotherpath').paths).toStrictEqual([
                "file.ext",
                "worker"
            ]);
        });

        test('Expecting mock function to capture mock data', () => {
            let fs = new Directory('root', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });
            let fn = mkdirSync(fs);
            fn('./anotherpath/worker');

            expect(fn).toBeCalled();
            expect(fn).toBeCalledWith("./anotherpath/worker");
            expect(fn).toHaveReturned();
            expect(fn).toHaveReturnedWith(undefined);
        });

    });
    
});