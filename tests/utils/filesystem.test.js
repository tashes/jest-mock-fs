const { File, Directory, Stats } = require("../../utils/filesystem");

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

    describe('Testing toObject', () => {

        test('Expecting correct values to result in correct return value', () => {
            let file = new File('newfile.ext', "HELLO!");

            expect(file.toObject()).toStrictEqual(Buffer.from("HELLO!"));
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

    describe('Testing remove', () => {
        
        test('Expecting correct values to return correct values', () => {
            let directory = new Directory('newdirectory', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });

            directory.remove('file.ext');

            expect(directory.contents).toStrictEqual([
                new Directory("anotherpath", {
                    'file.ext': "ANOTHERHELLO!"
                })
            ]);
            expect(directory.paths).toStrictEqual([
                'anotherpath'
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

    describe('Testing toObject', () => {

        test('Expecting correct values to result in correct return value', () => {
            let directory = new Directory('newdirectory', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });

            expect(directory.toObject()).toStrictEqual({
                'file.ext': Buffer.from("HELLO!"),
                'anotherpath': {
                    'file.ext': Buffer.from("ANOTHERHELLO!")
                }
            });
        });

    });

});

describe('Testing stats', () => {

    describe('Testing constructor', () => {

        test('Expecting constructor to return instance of Stats', () => {
            let file = new File('newfile.ext', "HELLO!");
            let stats = new Stats(file);

            expect(stats).toBeInstanceOf(Stats);
        });

        test('Expecting stats instance to have correct properties', () => {
            let file = new File('newfile.ext', "HELLO!");
            let stats = new Stats(file);

            expect(stats).toHaveProperty('obj');
        });

        test('Expecting stats properties to be valid', () => {
            let file = new File('newfile.ext', "HELLO!");
            let stats = new Stats(file);

            expect(stats.obj).toBe(file);
        });

    });

    describe('Testing isFile', () => {

        test('Expecting correct values to return correct values', () => {
            let file = new File('newfile.ext', "HELLO!");
            let stats = new Stats(file);

            expect(stats.isFile()).toBe(true);
        });

    });

    describe('Testing isDirectory', () => {

        test('Expecting correct values to return correct values', () => {
            let directory = new Directory('newdirectory', {
                'file.ext': "HELLO!",
                'anotherpath': {
                    'file.ext': "ANOTHERHELLO!"
                }
            });
            let stats = new Stats(directory);

            expect(stats.isDirectory()).toBe(true);
        })

    });

});