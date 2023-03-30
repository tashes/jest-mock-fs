const { isObject, isString, checkConfigPath } = require("./checks");
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

    toObject () {
        return this.contents;
    }

};

class Directory {

    constructor (name, contents) {

        let [ nameCheck, nameCheckError ] = checkConfigPath(name);
        if (nameCheck === false) throw nameCheckError;
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

    add (item) {
        this.contents.push(item);
        this.paths.push(item.name);
    }

    remove (name) {
        let index = this.paths.findIndex(pathname => pathname === name);

        this.contents.splice(index, 1);
        this.paths.splice(index, 1);
    }

    transverse (next, err = true) {
        let path = this.paths.indexOf(next);
        if (next === -1) {
            if (err) throw new Error("invalid path", next);
            else return false;
        }
        return this.contents[path];
    }

    toObject () {
        let obj = this.paths.reduce((ass, path, i) => {
            ass[path] = this.contents[i].toObject();
            return ass;
        }, {});
        return obj;
    }

};

module.exports = {
    Directory,
    File
};