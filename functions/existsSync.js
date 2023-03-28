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
        for (let i = 0; i < components.length; i++) {
            obj = obj.transverse(components[i], false);
            if (obj === false) return false;
        }

        return true;
    });

};