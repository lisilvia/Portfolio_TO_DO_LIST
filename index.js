import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

let todayItem = [];
let tasksItem = [];



// TODAY LIST
app.get("/", (req, res) => {
    
    res.render("index.ejs", {
        formAction: "/",
        todayItem: todayItem.join(" "),
        dateDefault: `${new Date().toString().substring(8, 10)}.${new Date().toString().substring(4, 7)} ${new Date().toString().substring(11, 15)}`
    });
})

// ADDING TASKS TO THE TODAY LIST
app.post("/", (req, res) => {
    const addItem = req.body.todoAdd;
    const todayItemList = `
    <div class="list-item">
        <label><input type="checkbox">
            <div class="item-text">${addItem}</div>
        </label>
    </div>
    `;
    todayItem.push(todayItemList);
    
    res.render("index.ejs", {
        formAction: "/",
        todayItem: todayItem.join(" "),
        dateDefault: `${new Date().toString().substring(8, 10)}.${new Date().toString().substring(4, 7)} ${new Date().toString().substring(11, 15)}`   
      });
})

// TASKS LIST
app.get("/tasks", (req, res) => {
    const path = req.path;
    
    res.render("tasks.ejs", {
        formAction: "/tasks",
        tasksItem: tasksItem.join(" "),
    });
})

// ADDING TASKS TO THE TASKS LIST
app.post("/tasks", (req, res) => {
    const addItem = req.body.todoAdd;

    const tasksItemList = `
    <div class="list-item">
        <label for="myCheckbox"><input type="checkbox" id="myCheckbox">
            <div class="item-text">${addItem}</div>
            </label>
    </div>
    `;
    tasksItem.push(tasksItemList);
    
    res.render("tasks.ejs", {
        formAction: "/tasks",
        tasksItem: tasksItem.join(" "),
    });
})

app.listen(port, () => console.log(`Running on port ${port}`));
