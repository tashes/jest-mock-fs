const { File, Directory } = require("../../utils/filesystem");

describe('Testing File', () => {

    describe('Testing constructor', () => {

        test('Expecting constructor to return File Instance', () => {
            let file = new File('newfile.ext', "HELLO!");

            expect(file).toBeInstanceOf(File);
        });

        test('Expecting file instance to have correct properties', () => {
            let file = new File('newfile.ext', "HELLO!");

            expect(file).toHaveProperty('name');
            expect(file).toHaveProperty('ext');
            expect(file).toHaveProperty('basename');
            expect(file).toHaveProperty('contents');
        });

        test('Expecting file properties to be valid', () => {
            let file = new File('newfile.ext', "HELLO!");
            
            expect(file.name).toStrictEqual('newfile.ext');
            expect(file.ext).toStrictEqual('.ext');
            expect(file.basename).toStrictEqual('newfile');
            expect(file.contents).toStrictEqual(Buffer.from("HELLO!"));
        });

    });

    describe('Testing read', () => {
        
        test('Expecting correct values to return correct values', () => {
            let file = new File('newfile.ext', "HELLO!");

            expect(file.read()).toStrictEqual(Buffer.from("HELLO!"));
        });

        test('Expecting encoding utf-8 to return a string', () => {
            let file = new File('newfile.ext', "HELLO!");
            
            expect(typeof file.read('utf-8')).toBe("string");
            expect(file.read('utf-8')).toStrictEqual("HELLO!");
        });

    });

    describe('Testing write', () => {

        test('Expecting correct values to result in different file contents', () => {
            let file = new File('newfile.ext', "HELLO!");

            expect(file.write("ANOTHERHELLO!")).toStrictEqual(undefined);
            expect(file.contents).toStrictEqual(Buffer.from("ANOTHERHELLO!"));
        });

    });

});

describe('Testing Directory', () => {

    describe('Testing constructor', () => {

        test('Expecting constructor to return instance of Directory', () => {
            let directory = new Directory('newdirectory', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });

            expect(directory).toBeInstanceOf(Directory);
        });

        test('Expecting directory instance to have correct properties', () => {
            let directory = new Directory('newdirectory', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });

            expect(directory).toHaveProperty('name');
            expect(directory).toHaveProperty('contents');
            expect(directory).toHaveProperty('paths');
        });

        test('Expecting properties to be valid', () => {
            let directory = new Directory('newdirectory', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });

            expect(directory.name).toStrictEqual('newdirectory');
            expect(directory.paths).toStrictEqual([
                'file.ext',
                'anotherpath'
            ]);
            expect(directory.contents).toStrictEqual([
                new File('file.ext', Buffer.from("HELLO!")),
                new Directory('anotherpath', {
                    'file.ext': "ANOTHERHELLO!"
                })
            ]);
        });

    });

    describe('Testing transverse', () => {

        test('Expecting correct values to return correct values', () => {
            let directory = new Directory('newdirectory', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });

            expect(directory.transverse('file.ext')).toStrictEqual(new File('file.ext', Buffer.from("HELLO!")))
        });

    });

});