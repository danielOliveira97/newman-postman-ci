const fs = require('fs');
const process = require('process')
const newman = require('newman')
const path = require('path')

const args = process.argv.slice(2);
const ENV = args.length !== 0 ? args[0] : 'sandbox';

const collectionPath = path.join(__dirname, '/collection');
const envPath = path.join(__dirname, '/environment')

const getFiles = (pathDir) => fs.readdirSync(pathDir, {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name);

const collectionFile = getFiles(collectionPath)[0];
const envFile = getFiles(envPath).filter(item => item.includes(ENV))[0];

const options = {
    collection: require(`${collectionPath}/${collectionFile}`),
    reporters: ['cli', 'htmlextra'],
    environment: require(`${envPath}/${envFile}`)
}

newman.run(options, function (err) {
    if (err) { throw err; }
    console.info('collection run complete!');
});