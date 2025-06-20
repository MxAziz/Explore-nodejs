const http = require('http');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, './db/todo.json');

const server = http.createServer((req, res) => {
    const method = req.method;
    // const url = req.url;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathName = url.pathname;
    //GET all todos
    if (method === "GET" && pathName === "/todos") {
        const data = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
    }
    //post a new todo
    else if (method === "POST" && pathName === "/todos/create-todo") {
      let data = "";
      req.on("data", (chunk) => {
        data = data + chunk;
      });

      req.on("end", () => {
        const { title, body } = JSON.parse(data);

        const createdAt = new Date().toLocaleString();

        const AllTodos = fs.readFileSync(filePath, { encoding: "utf-8" });

        // Parse the existing todos
        const todos = JSON.parse(AllTodos || "[]");

        todos.push({ title, body, createdAt });

        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), {
          encoding: "utf-8",
        });

        res.end(JSON.stringify({ title, body, createdAt }, null, 2));
      });
    }
    // GET a single todo
    else if (method === "GET" && pathName === '/todo'  ){
        const title = url.searchParams.get('title');
        const data = fs.readFileSync(filePath, 'utf-8');
      const parseData = JSON.parse(data);

      const todo = parseData.find((todo) => todo.title === title);

      const stringifiedTodo = JSON.stringify(todo, null, 2);
      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(stringifiedTodo);

    }
    //update a todo
    else if (method === "PATCH" && pathName === "/todos/update-todo") {
        const title = url.searchParams.get('title');
      let data = "";
      req.on("data", (chunk) => {
        data = data + chunk;
      });

      req.on("end", () => {
        const {  body } = JSON.parse(data);

        const AllTodos = fs.readFileSync(filePath, { encoding: "utf-8" });

        const todos = JSON.parse(AllTodos || "[]");

        const todoIndex = todos.findIndex((todo) => todo.title === title);
        if (todoIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Todo not found" }));
            return;
        }

        todos[todoIndex].body = body;

        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), {
          encoding: "utf-8",
        });

        res.end(JSON.stringify({ title, body, createdAt :todos[todoIndex].createdAt }, null, 2));
      });
    }
      // delete a todo
   else if (method === "DELETE" && pathName === "/todos/delete-todo") {
    const title = url.searchParams.get('title');
    const AllTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
    const todos = JSON.parse(AllTodos || "[]");

    const todoIndex = todos.findIndex((todo) => todo.title === title);

    if (todoIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Todo not found for delete a todo" }));
        return;
    }

    // Remove the todo
    const deletedTodo = todos.splice(todoIndex, 1)[0];

    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), {
        encoding: "utf-8",
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Todo deleted", deleted: deletedTodo }, null, 2));
}

    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route not found");
    }

    // res.end('welcome to the ToDo app server');
});


server.listen(5000,"127.0.0.1", () => {
    console.log('✅ server is listening on port 5000...');
});