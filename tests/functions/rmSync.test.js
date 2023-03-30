const rmSync = require("../../functions/rmSync");
const { Directory, File } = require("../../utils/filesystem");

describe('Testing rmSync', () => {

    test('Expecting rmSync to be a function', () => {
        expect(typeof rmSync).toBe("function");
    });

    test('Expecting rmSync to return jest function', () => {
        let fn = rmSync(new Directory('root', {
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
            let fn = rmSync(fs);
            let result = fn('./anotherpath', {
                recursive: true
            });

            expect(result).toStrictEqual(undefined);
            expect(fs.contents).toStrictEqual([
                new File('file.ext', "HELLO!")
            ]);
        });

        test('Expecting mock function to capture mock data', () => {
            let fs = new Directory('root', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });
            let fn = rmSync(fs);
            let result = fn('./anotherpath', {
                recursive: true
            });

            expect(fn).toBeCalled();
            expect(fn).toBeCalledWith("./anotherpath", {
                recursive: true
            });
            expect(fn).toHaveReturned();
            expect(fn).toHaveReturnedWith(undefined);
        });

    });

});