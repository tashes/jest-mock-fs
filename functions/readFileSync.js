const { jest: j } = require('@jest/globals');

const { checkConfigFullPath } = require('../utils/checks');
const { errorWithState } = require('../utils/errorize');
const { Directory, File } = require('../utils/filesystem');
const { componentize } = require('../utils/path');

function parseOptions (options) {
    if (typeof options === 'string') return {
        encoding: options
    };
};

module.exports = function (fs) {

    return j.fn((path, options) => {
        let [ pathCheck, pathCheckError ] = checkConfigFullPath(path);
        if (pathCheck === false) throw pathCheckError;
        options = parseOptions(options);
        
        let components = componentize(path);
        // transverse fs
        let obj = fs;
        if (components[0] === '.') {
            components[0] = obj.name;
            let directoryBuilder = {};
            directoryBuilder[obj.name] = obj;
            obj = new Directory('__root__', directoryBuilder);
        }
        for (let i = 0; i < components.length; i++) {
            obj = obj.transverse(components[i]);
        }

        if (!(obj instanceof File)) {
            if (obj instanceof Directory) {
                throw new Error(errorWithState('EISDIR: illegal operation on a directory, read <directory>', fs));
            }
            else {
                throw new Error(errorWithState('invalid file', fs));
            }
        }

        return obj.read(options?.encoding);

    });

};