const { jest: j } = require('@jest/globals');

const { checkConfigFullPath, checkRmsyncOptions } = require('../utils/checks');
const { errorWithState } = require('../utils/errorize');
const {Directory, File } = require('../utils/filesystem');
const { fillRmsyncOptions } = require('../utils/fill');
const { componentize } = require('../utils/path');

module.exports = function (fs) {

    return j.fn((path, options) => {
        opts = fillRmsyncOptions(options);

        let [ pathCheck, pathCheckError ] = checkConfigFullPath(path);
        if (pathCheck === false) throw pathCheckError;
        let [ optsCheck, optsCheckError ] = checkRmsyncOptions(opts);
        if (optsCheck === false) throw optsCheckError;

        let components = componentize(path);
        // transverse fs
        let obj = fs;
        let parent = null;
        for (let i = 0; i < components.length; i++) {
            parent = obj;
            obj = obj.transverse(components[i]);
        }

        if (!(obj instanceof Directory || obj instanceof File)) {
            if (opts.force === false) throw new Error(errorWithState('cannot remove non file or directory', fs));
        }
        if (obj instanceof Directory) {
            if (opts.recursive === false && opts.force === false) {
                if (obj.paths.length > 0) throw new Error(errorWithState('cannot delete directory with items in it.', fs));
            }
        }

        parent.remove(obj.name);
    });

};