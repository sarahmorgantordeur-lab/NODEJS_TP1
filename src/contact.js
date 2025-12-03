// src/contact.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");

// Dossier de stockage des JSON : data/submit au même niveau que src/
const submitDir = path.join(__dirname, "..", "data", "submit");
if (!fs.existsSync(submitDir)) fs.mkdirSync(submitDir, { recursive: true });

const server = http.createServer((req, res) => {

    // Servir la page HTML
    if (req.method === "GET" && req.url === "/") {
        const htmlPath = path.join(__dirname, "contact.html");
        fs.readFile(htmlPath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Erreur lecture HTML");
            }
            res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
            res.end(data);
        });
    }

    // Traitement du formulaire
    else if (req.method === "POST" && req.url === "/submit") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            // Debug : vérifier si les données arrivent
            console.log("Données reçues :", body);

            // Convertir les données form en objet JS
            const params = new URLSearchParams(body);
            const dataObj = Object.fromEntries(params);

            // Nom unique du fichier
            const filePath = path.join(submitDir, `submit_${Date.now()}.json`);

            // Sauvegarde en JSON
            fs.writeFile(filePath, JSON.stringify(dataObj, null, 2), err => {
                if (err) {
                    console.error("Erreur écriture JSON :", err);
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    return res.end("Erreur lors de l'enregistrement du formulaire.");
                }

                console.log("Fichier créé :", filePath);

                // Message de succès
                res.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8" });
                res.end("Formulaire enregistré avec succès !");
            });
        });
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

// Lancer le serveur sur le port 3000
server.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
