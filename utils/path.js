const { sep, normalize } = require('path');

function componentize (path) {
    // Remove cwd
    path = path.replace(process.cwd(), "");
    path = normalize(path);
    // split path into components
    let components = path.split(sep);
    if (components[0] === "") components.shift();
    
    return components;
};

module.exports = {
    componentize
};