const { sep } = require('path');

function componentize (path) {
    // Remove cwd
    path = path.replace(process.cwd(), "");
    // split path into components
    let components = path.split(sep);
    
    return components;
};

module.exports = {
    componentize
};