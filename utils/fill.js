function fillRmsyncOptions (options) {
    let opts = options ? { ...options } : {};
    if (opts.force === undefined) opts.force = false;
    if (opts.maxRetries === undefined) opts.maxRetries = 0;
    if (opts.recursive === undefined) opts.recursive = false;
    if (opts.retryDelay === undefined) opts.retryDelay = 100;
    return opts;
};

module.exports = {
    fillRmsyncOptions
};