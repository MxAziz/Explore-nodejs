const http = require('http');

const server = http.createServer((req, res) => {
    res.end('welcome to the ToDo app server');
});


server.listen(5000,"127.0.0.1", () => {
    console.log('✅ server is listening on port 5000...');
});