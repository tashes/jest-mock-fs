const { jest: j } = require('@jest/globals');

const { checkConfigFullPath, checkConfigContents } = require('../utils/checks');
const { errorWithState } = require('../utils/errorize');
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
        let parent = null;
        if (components[0] === '.') {
            components[0] = obj.name;
            let directoryBuilder = {};
            directoryBuilder[obj.name] = obj;
            obj = new Directory('__root__', directoryBuilder);
        }
        for (let i = 0; i < components.length; i++) {
            parent = obj;
            obj = obj.transverse(components[i]);
        }

        if (!(obj instanceof File)) {
            if (obj instanceof Directory) {
                throw new Error(errorWithState('EISDIR: illegal operation on a directory, read <directory>', fs));
            }
            else {
                // Create file here
                let name = components[components.length - 1];
                let file = new File(name, contents);
                parent.add(file);
                obj = file;
            }
        }

        return obj.write(contents, options?.encoding);

    });

};