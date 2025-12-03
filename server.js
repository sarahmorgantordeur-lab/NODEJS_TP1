const http = require('http');
const path = require ('path');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url ==='/') {
        const filepath = path.join(__dirname, 'index.html');
        fs.readFile(filepath, 'utf8', (err, data) => {

            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-type', 'Text/plain');
                res.end('There is an error at reading de html file.');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-type', 'Text/html');
            res.end(data);
        });
        
    } else {
        res.statusCode = 404;
        res.setHeader('Content-type', 'Text/plain');
        res.end('Doc not found.');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});