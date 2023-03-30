const { jest: j } = require('@jest/globals');

const { checkConfigFullPath } = require('../utils/checks');
const {Directory, File } = require('../utils/filesystem');
const { componentize } = require('../utils/path');

module.exports = function (fs) {

    return j.fn((path) => {
        let [ pathCheck, pathCheckError ] = checkConfigFullPath(path);
        if (pathCheck === false) throw pathCheckError;

        let components = componentize(path);
        // transverse fs
        let obj = fs;
        let parent = null;
        for (let i = 0; i < components.length; i++) {
            parent = obj;
            obj = obj.transverse(components[i]);
        }

        if (!(obj instanceof File)) {
            if (obj instanceof Directory) {
                throw new Error('EISDIR: illegal operation on a directory, unlink <directory>');
            }
            else {
                throw new Error('invalid file');
            }
        }

        parent.remove(obj.name);

    });

};