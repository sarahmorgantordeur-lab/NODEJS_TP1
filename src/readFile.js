const readline = require('readline');
const fs = require('fs');
const path = require('path');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

rl.question('Please enter the file name to read: ', (fileName) => {

    const filePath = path.join(__dirname, '..', 'data', 'files', fileName);

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        console.log(content);
        rl.on('close', () => {
            content.end();
            console.log(`\nFichier "${fileName}" fermé.`);
        });
    } catch (e) {
        console.error('Error reading file:', e.path);
    }
});
