const { jest: j } = require('@jest/globals');

const { checkConfigFullPath, checkConfigContents } = require('../utils/checks');
const { Directory, File } = require('../utils/filesystem');
const { componentize } = require('../utils/path');

function parseOptions (options) {
    if (typeof options === 'string') return {
        encoding: options
    };
};

module.exports = function (fs) {

    return j.fn((path, contents, options) => {
        let [ pathCheck, pathCheckError ] = checkConfigFullPath(path);
        if (pathCheck === false) throw pathCheckError;
        let [ contentsCheck, contentsCheckError ] = checkConfigContents(contents);
        if (contentsCheck === false) throw contentsCheckError;
        options = parseOptions(options);
        
        let components = componentize(path);
        // transverse fs
        let obj = fs;
        for (let i = 0; i < components.length; i++) {
            obj = obj.transverse(components[i]);
        }

        if (!(obj instanceof File)) {
            if (obj instanceof Directory) {
                throw new Error('EISDIR: illegal operation on a directory, read <directory>');
            }
            else {
                throw new Error('invalid file');
            }
        }

        return obj.write(contents, options?.encoding);

    });

};