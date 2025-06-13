const http = require('http');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, './db/todo.json');

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    if (method === "GET", url === "/todos") {
        const data = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
    } else if (method === "POST", url === "/todoss") {
        res.end("Todo created successfully");
    } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }

    res.end('welcome to the ToDo app server');
});


server.listen(5000,"127.0.0.1", () => {
    console.log('✅ server is listening on port 5000...');
});