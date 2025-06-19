const express = require('express');
const task = require("./task.json")
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

//retrieve all tasks
app.get("/tasks", (req, res) => {
    try {
        if (!task) return res.send(404).json({ error: "Tasks not found!!" })

        const { completed } = req.query
        const tasks = [...task.tasks]

        //retriving task data based on status
        if (req.query) {
            const taskUpdateByStatus = tasks.filter((data) => data.completed === Boolean(completed))
            return res.json(taskUpdateByStatus)
        }
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
})

//get specific tasks
app.get("/tasks/:id", (req, res) => {
    try {
        if (!task) return res.send(404).json({ error: "Tasks not found!!" })
        const { id } = req.params
        const getSingleTaskData = task.tasks.find((data) => data.id === parseInt(id))
        res.json(getSingleTaskData)
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
})

//Adding a new task in task json
app.post("/tasks", (req, res) => {
    try {
        const { title, description, completed } = req.body;

        if (title === "") res.status(404).json("Title not found!!!");
        if (description === "") res.status(400).json("Description not found!!!");

        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: "Status must be a boolean!!!" });
        }
        const newTask = {
            id: 100,
            title,
            description,
            completed
        }

        task.tasks.push(newTask)
        res.status(201).json("Added the new Tasks!!!")
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
})

//Updating an existing task in task json
app.put("/tasks/:id", (req, res) => {
    try {
        const { id } = req.params
        const { title, description, completed } = req.body;

        if (title === "") res.status(400).json("Title and description not found!!!");
        if (description === "") res.status(400).json("Description not found!!!");
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: "Status must be a boolean!!!" });
        }

        const taskToUpdate = task.tasks.find((data) => data.id === parseInt(id))

        if (!taskToUpdate) {
            return res.status(404).json({ error: "Task not found!" });
        }

        if (title !== undefined) taskToUpdate.title = title;
        if (completed !== undefined) taskToUpdate.completed = completed;
        if (description !== undefined) taskToUpdate.description = description;

        res.json(taskToUpdate);

    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
})

//deleting the task
app.delete("/tasks/:id", (req, res) => {
    try {
        if (!task) return res.send(404).json({ error: "Tasks not found!!" })
        const { id } = req.params
        const updatedTasks = task.tasks.filter((data) => data.id !== parseInt(id))
       if (updatedTasks.length === task.tasks.length) {
            return res.status(404).json({ error: "Task not found" });
        }

        task.tasks = updatedTasks;
        res.json({ message: "Task deleted successfully", tasks: task.tasks });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
})

//retriving tasks based on priority level

app.get("/tasks/priority/:level", (req, res) => {
    try {
        if (!task) return res.send(404).json({ error: "Tasks not found!!" })
        const { level } = req.params
        const taskResult = task.tasks.filter((data) => data.priority === level)
        res.json(taskResult)
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
})

module.exports = app;