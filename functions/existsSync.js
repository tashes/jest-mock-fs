const { jest: j } = require('@jest/globals');

const { checkConfigFullPath } = require('../utils/checks');
const { componentize } = require('../utils/path');

module.exports = function (fs) {

    return j.fn((path) => {
        let [ pathCheck, pathCheckError ] = checkConfigFullPath(path);
        if (pathCheck === false) throw pathCheckError;

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
            obj = obj.transverse(components[i], false);
            if (obj === false) return false;
        }

        return true;
    });

};