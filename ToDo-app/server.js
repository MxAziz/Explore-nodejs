const http = require('http');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, './db/todo.json');

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    //GET all todos
    if (method === "GET", url === "/todos") {
        const data = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
    }
    //post a new todo
    else if (method === "POST", url === "/todos/create-todo") {
        let data = '';
        req.on('data', (chunk) => {
            data = data + chunk;
        })

        req.on('end', () => {
            const {title, body} = JSON.parse(data);

            const createdAt = new Date().toLocaleString();

        const AllTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
            console.log(AllTodos);

            // Parse the existing todos
            const todos = JSON.parse(AllTodos || '[]');

            todos.push({ title, body, createdAt });

            fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), {encoding: "utf-8"});

            res.end(JSON.stringify({ title, body, createdAt },null, 2));

         })

    } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }

    // res.end('welcome to the ToDo app server');
});


server.listen(5000,"127.0.0.1", () => {
    console.log('✅ server is listening on port 5000...');
});