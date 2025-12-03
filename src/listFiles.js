const readline = require('readline');
const fs = require("fs").promises;
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

rl.question('Please enter the doc name to list: ', (docName) => {

  async function listeFichiers(dossier) {
    try {
      const fichiers = await fs.readdir(dossier);
      console.log("Files in directory:", fichiers);
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  }

  const dossier = path.join(__dirname, '..', docName);

  listeFichiers(dossier);

  rl.close();
});

