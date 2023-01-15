const http = require('http');
//const requests = require('./controller/requestListener');
const PORT = 3000;
/**
 * Creates local server listening on port 3000
 */
function createLocalServer() {
    const server = http.createServer((req, res) => {
        switch (req.method) {
            case "GET":
                res.setHeader('Content-Type', 'text/html')
                res.writeHead(200)
                res.end("<h1>Welcome to ERS</h1>")
                break;
            default:
                console.log("Invalid Response")
                res.writeHead(400)
                res.end("Invalid Response")            
        }

    });

    server.listen(PORT, '127.0.0.1', () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

module.exports = createLocalServer