# jest-mock-fs

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
* `readFileSync`
* `writeFileSync`
* `existsSync`
* `unlinkSync`
* `rmSync`