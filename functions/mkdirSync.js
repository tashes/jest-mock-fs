const { jest: j } = require('@jest/globals');

const { checkConfigFullPath } = require('../utils/checks');
const { Directory, File } = require('../utils/filesystem');
const { componentize } = require('../utils/path');

module.exports = function (fs) {

    return j.fn((path) => {
        let [ pathCheck, pathCheckError ] = checkConfigFullPath(path);
        if (pathCheck === false) throw pathCheckError;

        let components = componentize(path);
        // transverse fs
        let obj = fs;
        let parent = null;
        let index = 0;
        if (components[0] === '.') {
            components[0] = obj.name;
            let directoryBuilder = {};
            directoryBuilder[obj.name] = obj;
            obj = new Directory('__root__', directoryBuilder);
        }
        for (let i = 0; i < components.length; i++) {
            parent = obj;
            obj = obj.transverse(components[i]);
            index = i;
        }

        if (!(parent instanceof Directory)) {
            if (obj instanceof File) {
                throw new Error('cannot create new directory in file');
            }
            else {
                throw new Error('invalid folder');
            }
        }

        //  new directory
        let directory = new Directory(components[components.length - 1], {});
        parent.add(directory);
    });

};