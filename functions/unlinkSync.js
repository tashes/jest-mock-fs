const { jest: j } = require('@jest/globals');

const { checkConfigFullPath } = require('../utils/checks');
const { errorWithState } = require('../utils/errorize');
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
                throw new Error(errorWithState('EISDIR: illegal operation on a directory, unlink <directory>', fs));
            }
            else {
                throw new Error(errorWithState('invalid file', fs));
            }
        }

        parent.remove(obj.name);

    });

};