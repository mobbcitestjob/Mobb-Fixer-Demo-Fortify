const http = require('node:http');
const fs = require('node:fs/promises');

http.createServer((req, res) => {
    fs.readFile("./no-file.txt").catch((e) => {
        // here's a system information leak:
        /* Logging errors in the console.error() may lead to information leakage. Instead, you should write the error to your logger like so: LOGGER.error("Unexpected error: mobb-b0982cf42637537d5c3e7817513468c8"); */;
    });
    res.writeHead(200);
    res.end("👋");
}).listen(8080);
