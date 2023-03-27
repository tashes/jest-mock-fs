const { isObject, isString } = require("./checks");
const { extname, basename } = require('path');

class File {

    constructor (name, contents) {

        this.name = name;

        this.ext = extname(name);
        
        this.basename = basename(name, this.ext);

        this.contents = Buffer.isBuffer(contents) ? contents : Buffer.from(contents);

    }

    read (encoding) {
        if (encoding) return this.contents.toString(encoding)
        else return this.contents;
    }

    write (contents, encoding = 'utf-8') {
        if (isString(contents)) contents = Buffer.from(contents, encoding);
        this.contents = contents;
    }

};

class Directory {

    constructor (name, contents) {

        this.name = name;

        this.contents = Object.keys(contents).map(pathname => {
            let item = contents[pathname];
            if ((item instanceof File || item instanceof Directory) === false) {
                if (isObject(item) === true) {
                    let newitem = new Directory(pathname, item);
                    return newitem;
                }
                else {
                    let newitem = new File(pathname, item);
                    return newitem;
                }
            }
            else {
                return item;
            }
        });

        this.paths = Object.keys(contents);
    }

    transverse (next) {
        let path = this.paths.indexOf(next);
        if (next === -1) throw new Error("invalid path", next);
        return this.contents[path];
    }

};

module.exports = {
    Directory,
    File
};