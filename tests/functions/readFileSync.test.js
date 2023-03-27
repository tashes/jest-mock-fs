const { Directory } = require("../../utils/filesystem");

const readFileSync = require("../../functions/readFileSync");

describe('Testing readFileSync', () => {

    test('Expecting readFileSync to be a function', () => {
        expect(typeof readFileSync).toBe("function");
    });
    
    test('Expecting readFileSync to return jest function', () => {
        let fn = readFileSync(new Directory('', {
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
            let fn = readFileSync(new Directory('', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            }));

            expect(fn("anotherpath/file.ext")).toStrictEqual(Buffer.from("ANOTHERHELLO!"));
        });

        test('Expecting mock function to capture mock data', () => {
            let fn = readFileSync(new Directory('', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            }));
            fn("anotherpath/file.ext");

            expect(fn).toBeCalled();
            expect(fn).toBeCalledWith('anotherpath/file.ext');
            expect(fn).toHaveReturned();
            expect(fn).toHaveReturnedWith(Buffer.from("ANOTHERHELLO!"));
        });

    });

});