const { checkConfig } = require('./utils/checks');
const { Directory } = require('./utils/filesystem');

const readFileSync = require('./functions/readFileSync.js');
const writeFileSync = require('./functions/writeFileSync.js');

module.exports = function (config) {
    let [ configCheck, configCheckError ] = checkConfig(config);
    if (configCheck === false) throw configCheckError;

    let fs = new Directory('', config);

    return {
        readFileSync: readFileSync(fs),
        writeFileSync: writeFileSync(fs),
        _fs: fs
    };
}

