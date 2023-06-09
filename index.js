const { checkConfig } = require('./utils/checks');
const { Directory } = require('./utils/filesystem');

const existsSync = require('./functions/existsSync.js');
const readFileSync = require('./functions/readFileSync.js');
const writeFileSync = require('./functions/writeFileSync.js');
const unlinkSync = require('./functions/unlinkSync.js');
const readdirSync = require('./functions/readdirSync.js');
const mkdirSync = require('./functions/mkdirSync.js');
const rmSync = require('./functions/rmSync.js');
const lstatSync = require('./functions/lstatSync');

module.exports = function (config) {
    let [ configCheck, configCheckError ] = checkConfig(config);
    if (configCheck === false) throw configCheckError;

    let fs = new Directory('root', config);

    return {
        existsSync: existsSync(fs),
        readFileSync: readFileSync(fs),
        writeFileSync: writeFileSync(fs),
        unlinkSync: unlinkSync(fs),
        readdirSync: readdirSync(fs),
        mkdirSync: mkdirSync(fs),
        rmSync: rmSync(fs),
        lstatSync: lstatSync(fs),
        _fs: fs,
        _reconfigure: (newconfig) => {
            let [ configCheck, configCheckError ] = checkConfig(newconfig);
            if (configCheck === false) throw configCheckError;

            fs = new Directory('root', newconfig);
        }
    };
}

