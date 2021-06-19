
const express = require('express')
const app = express()

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi mohamed')
})

const todos = [];
app.post("/todos", (req, res) =>{
    todos.push(req.body)
    res.status(204).end()
});

app.get("/todos", (req, res) =>{
    res.json(todos);
});

app.get("/todos/:id", (req, res) =>{
    const id = req.params;
    const todo = todos.find((todo) => +todo.id === +id)
    if(!todo){
        res.status(404).end()
        return
    }
    res.json(todo)
});

app.patch("/todos/:id", (req, res) =>{
    
    const newTodo = req.body;
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id == id);
    todo.todo = newTodo.todo;
    
    return res.json(todo);
            
});
 
app.delete("/todos/:id", (req, res) =>{
    
    const todo_id = req.params.id;
      
    for (let todo of todos) {
        if (todo.id == todo_id) {
            todos.splice(todos.indexOf(todo), 1);
            return res.status(200).json({
              message: "Deleted Successfully"
            });
          }
    }

    res.status(404).json({ message: "Invalid Id" });        
});

app.listen(3000, () => {
    console.log(`Server is Running`);
})



