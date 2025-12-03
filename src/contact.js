const http = require("http");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");

const submitDir = path.join(__dirname, "data", "submit");
if (!fs.existsSync(submitDir)) {
    fs.mkdirSync(submitDir, { recursive: true });
}

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {
        const filePath = path.join(__dirname, "contact.html");
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Erreur : impossible de charger la page HTML");
            }
            res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
            return res.end(data);
        });
    }

    // Traitement du formulaire
    else if (req.method === "POST" && req.url === "/submit") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            // Convertit les données form en objet js
            const params = new URLSearchParams(body);
            const dataObj = Object.fromEntries(params);

            // Nom unique du fichier
            const timestamp = Date.now();
            const filePath = path.join(submitDir, `submit_${timestamp}.json`);

            // Sauvegarde en JSON
            fs.writeFile(filePath, JSON.stringify(dataObj, null, 2), err => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    return res.end("Erreur : impossible d'enregistrer les données.");
                }

                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Formulaire enregistré avec succès !");
            });
        });
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
