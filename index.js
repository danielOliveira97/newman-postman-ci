const fs = require('fs');
const process = require('process')
const newman = require('newman')

const args = process.argv.slice(2);
const ENV = args.length !== 0 ? args[0] : 'sandbox';
const collectionDir = './collection';
const environmentDir = './environment'

const listFiles = (path) => fs.readdirSync(path, {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name);

const collectionFiles = listFiles(collectionDir);
const environmentFiles = listFiles(environmentDir).filter(item => item.includes(ENV));

newman.run({
    collection: require(`${collectionDir}/${collectionFiles[0]}`),
    reporters: ['cli', 'htmlextra'],
    environment: require(`${environmentDir}/${environmentFiles[0]}`)
}, function (err) {
    if (err) { throw err;}
    console.log('collection run complete!');
});
