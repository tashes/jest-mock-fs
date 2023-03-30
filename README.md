# jest-mock-fs
Install this package using:
```
npm install jest-mock-fs
```

This package will create a jest mock factory function to allow you to mock a filesystem while still being able to check mock calls.
To use it, import it and call it like so:

```javascript
const mockFS = require('jest-mock-fs');

jest.mock('fs', mockFS({
    'folder': {
        'file.ext': "contents",
        'anotherfile.ext': new Buffer()
    },
    'file.txt': "othercontents"
}));
```

The following fs functions have been mocked till now:
* [x] `existsSync`
    * `_path_`
* [x] `readFileSync`
    * _`path`_
    * _`options`_
        * _`encoding`_
* [x] `writeFileSync`
    * _`path`_
    * _`contents`_
    * _`options`_
        * - _`encoding`_
* [x] `unlinkSync`
    * _`path`_
* [x] `readdirSync`
    * -`path`
* [x] `mkdirSync`
    * _`path`_
* [x] `rmSync`
    * _`path`_
    * _`options`_
        * _`force`_
        * _`recursive`_
        * _`maxRetries`_
        * _`retryDelay`_