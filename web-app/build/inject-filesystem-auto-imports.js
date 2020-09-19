const fs = require('fs');
const path = require('path');
const watch = require('node-watch');


const args = process.argv.slice(2);
const rootPath = `${process.cwd()}/${args[0]}`;
const generatedFileName = args[1];

const generatedFilePath = path.resolve(`${rootPath}/${generatedFileName}`);
// console.debug(`ROOT PATH: ${rootPath}`);

function listFilesFrom(rootPath, path, alreadyListedFiles) {
    try {
        const files = fs.readdirSync(`${rootPath}${path}`);
        files.forEach(file => {
            const currentPath = `${path}/${file}`;
            if(currentPath === `/${generatedFileName}`) {
                // We don't do anything
            } else if(fs.statSync(`${rootPath}${currentPath}`).isDirectory()) {
                listFilesFrom(rootPath, currentPath, alreadyListedFiles);
            } else {
                alreadyListedFiles.push(currentPath.substr(0, currentPath.lastIndexOf('.')));
            }
        });
    } catch(err) {
        console.error(err);
    }
    return alreadyListedFiles;
}

function generateFile(rootPath, generatedFilePath) {
    const filePaths = listFilesFrom(rootPath, '', []);

    const generatedFileContent = filePaths.map(filePath => `import '.${filePath}';\n`).join('');
    // console.debug(`CONTENT GENERATED TO ${generatedFilePath} : `);
    // console.debug(generatedFileContent);

    try {
        fs.writeFileSync(generatedFilePath, generatedFileContent);
    } catch(err) {
        console.error(err);
    }

}

generateFile(rootPath, generatedFilePath);

watch(rootPath, { recursive: true, filter: /\.ts$/, delay: 800 }, (event, filename) => {
    // console.log(`${event} ${filename}`);
    // console.log(generatedFilePath);
    if(filename !== generatedFilePath) {
        // Regenerating files when something is added/removed in filesystem
        // console.log("generation triggered !");
        generateFile(rootPath, generatedFilePath);
    }
});
