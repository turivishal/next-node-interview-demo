const yaml = require('yaml');
const fs = require('fs');

// GET YML CONTENT FROM FILE
exports.getYmlFromFile = (filePath) => {
    const file = fs.readFileSync(filePath, 'utf8');
    return yaml.parse(file);
}

// READ ALL LANGUAGES
exports.getAllMessageLib = (path) => {
    let files = {};
    fs.readdirSync(path).forEach(fileName => {
        const file = fs.readFileSync(path+'/'+fileName, 'utf8');
        const parseFile = yaml.parse(file);
        const finalFile = {};
        for (let f in parseFile) {
            for (let f1 in parseFile[f]) {
                finalFile[f+'.'+f1] = parseFile[f][f1];
            }
        }
        files[fileName] = finalFile;
    });
    return files;
}

