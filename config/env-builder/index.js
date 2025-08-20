const Reader = require('./reader/reader.js');
const Writer = require('./writer/writer.js');

const backendFileReader = new Reader();
const content = backendFileReader.setContent('config/env-builder/.env').getContent();

const writer = new Writer('.env');
writer
    .setContent(content)
    .save(
        () => console.log('File saved!'),
    );