const fs = require('fs');

class Writer {

    /**
     * @type {string}
     */
    _file;
    /**
     * @type {string}
     */
    _fileContent;

    constructor(file) {
        this._file = file;
    }

    /**
     *
     * @param {string} content
     * @description Stores file content to be written
    */
   setContent(content) {
       this._fileContent = content;
       return this;
    }

    /**
     * @param {function} functionCallback
     * @description Writes content to file
     */
    save(functionCallback) {
        fs.writeFileSync(this._file, this._fileContent);
        functionCallback();
    }
}

module.exports = Writer;