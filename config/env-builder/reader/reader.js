const fs = require('fs');

class Reader {

    /**
     * @type {string}
     */
    _fileContent;

    constructor() {
    }

    /**
     * @description Store file content
     */
    setContent(file) {
        this._fileContent = fs.readFileSync(file, 'utf8');
        return this;
    }

    /**
     * @returns {string}
     * @description Reads file content
     */
    getContent() {
        return this._fileContent;
    }
}

module.exports = Reader;