module.exports = {
    errorWithState: function (message, fs) {
        return `${ message }\nCurrent State:\n${ fs.toString() }`;
    }
};