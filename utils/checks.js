const { expect } = require('chai');
const { errorWithState } = require('./errorize');

function isObject (item) {
    try {
        expect(item).to.be.an('object');
    }
    catch (e) {
        return false;
    }
    return true;
};

function isString (item) {
    try {
        expect(item).to.be.an('string');
    }
    catch (e) {
        return false;
    }
    return true;
};

function isBuffer (item) {
    try {
        expect(Buffer.isBuffer(item)).to.be.true;
    }
    catch (e) {
        return false;
    }
    return true;
};

function checkConfig (config) {
    try {
        expect(config).to.be.an('object');
        let configKeys = Object.keys(config);
        configKeys.forEach(item => {
            let [keyNameCheck, keyNameCheckError] = checkConfigPath(item);
            if (keyNameCheck === false) throw keyNameCheckError;
            let [keyCheck, keyCheckError] = checkConfigItem(config[item]);
            if (keyCheck === false) throw keyCheckError;
        })
    }
    catch (e) {
        return [ false, e ];
    }
    return [ true, null ];
};

function checkConfigPath (path) {
    try {
        expect(path).to.be.a('string');
        expect(path).to.match(/^[a-zA-Z0-9_ -.]+$/);
    }
    catch (e) {
        return [ false, e ];
    }
    return [ true, null ];
};

function checkConfigFullPath (path) {
    try {
        expect(path).to.be.a('string');
        expect(path).to.match(/^[a-zA-Z0-9_ -.\\/:]+$/);
    }
    catch (e) {
        return [ false, e ];
    }
    return [true, null];
};

function checkConfigItem (item) {
    try {
        if (isBuffer(item)) {
            let [ bufferCheck, bufferCheckError ] = checkConfigBuffer(item);
            if (bufferCheck === false) throw bufferCheckError;
        }
        else if (isString(item)) {
            let [ stringCheck, stringCheckError ] = checkConfigString(item);
            if (stringCheck === false) throw stringCheckError;
        }
        else if (isObject(item)) {
            let [ objCheck, objCheckError ] = checkConfig(item);
            if (objCheck === false) throw objCheckError;
        }
        else {
            throw new Error(errorWithState('invalid config item', fs));
        }
    }
    catch (e) {
        return [ false, e ];
    }
    return [ true, null ];
};

function checkConfigContents (item) {
    try {
        if (isBuffer(item)) {
            let [ bufferCheck, bufferCheckError ] = checkConfigBuffer(item);
            if (bufferCheck === false) throw bufferCheckError;
        }
        else if (isString(item)) {
            let [ stringCheck, stringCheckError ] = checkConfigString(item);
            if (stringCheck === false) throw stringCheckError;
        }
        else {
            throw new Error(errorWithState('invalid config contents', fs));
        }
    }
    catch (e) {
        return [ false, e ];
    }
    return [ true, null ];
};

function checkConfigBuffer (item) {
    try {
        expect(Buffer.isBuffer(item)).to.be.true;
    }
    catch (e) {
        return [ false, e ];
    }
    return [ true, null ];
}

function checkConfigString (item) {
    try {
        expect(item).to.be.a('string');
    }
    catch (e) {
        return [ false, e ];
    };
    return [ true, null ];
}

function checkRmsyncOptions (value) {
    try {
        expect(value).to.be.a('object');
        expect(value).to.have.property('force');
        let [ forceCheck, forceCheckError ] = checkRmsyncOptionsForce(value.force);
        if (forceCheck === false) throw forceCheckError;
        expect(value).to.have.property('maxRetries');
        let [ maxRetriesCheck, maxRetriesCheckError ] = checkRmsyncOptionsMaxretries(value.maxRetries);
        if (maxRetriesCheck === false) throw maxRetriesCheckError;
        expect(value).to.have.property('recursive');
        let [ recursiveCheck, recursiveCheckError ] = checkRmsyncOptionsRecursive(value.recursive);
        if (recursiveCheck === false) throw recursiveCheckError;
        expect(value).to.have.property('retryDelay');
        let [ retrydelayCheck, retrydelayCheckError ] = checkRmsyncOptionsRetrydelay(value.retryDelay);
        if (retrydelayCheck === false) throw retrydelayCheckError;
    }
    catch (e) {
        return [ false, e ];
    };
    return [ true, null ]
};

function checkRmsyncOptionsForce (value) {
    try {
        expect(value).to.be.a('boolean');
    }
    catch (e) {
        return [false, e];
    };
    return [ true, null ];
};

function checkRmsyncOptionsMaxretries (value) {
    try {
        expect(value).to.be.a('number');
        expect(value).to.be.greaterThanOrEqual(0);
    }
    catch (e) {
        return [ false, e ];
    }
    return [ true, null ];
};

function checkRmsyncOptionsRecursive (value) {
    try {
        expect(value).to.be.a('boolean');
    }
    catch (e) {
        return [ false, e ];
    }
    return [ true, null ];
};

function checkRmsyncOptionsRetrydelay (value) {
    try {
        expect(value).to.be.a('number');
        expect(value).to.be.greaterThanOrEqual(0);
    }
    catch (e) {
        return [ false, e ];
    }
    return [ true, null ];
};

module.exports = {
    isObject,
    isString,
    isBuffer,
    checkConfig,
    checkConfigPath,
    checkConfigFullPath,
    checkConfigItem,
    checkConfigContents,
    checkConfigBuffer,
    checkConfigString,

    checkRmsyncOptions
};