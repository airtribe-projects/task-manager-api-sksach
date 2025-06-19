A simple RestFull Api built with Express.js to manage the list of task in local JSON FIle.THe APi develop basic CRUD operation with filter

SetUp Instruction
1.Clone the repository
2.Install dependency
3.Start server


API Documentation
1.Get Task
Endpoint - GET/tasks
Description - Retrieve all tasks also filtering based on completion status
Example - 
 http://localhost:3000/tasks
 http://localhost:3000/tasks?completed=true

2.Get Task by ID
Endpoint: GET /tasks/:id
Description: Retrieve a task by ID.
Example - 
http://localhost:3000/tasks/1

3.Add a NEW TASK
Endpoint: POST /tasks
Description: Add a new task.
Example - 
 url = http://localhost:3000/tasks
body = {
  "title": "New Task",
  "description": "Task details",
  "completed": false
}

4.Update Task
Endpoint: PUT /tasks/:id
Description: Update title, description, and completion status of a task.
url = http://localhost:3000/tasks/1 
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}

5.Delete Task
Endpoint: DELETE /tasks/:id
Description: Delete a task by ID.
http://localhost:3000/tasks/1

6.Filter by Priority
Endpoint: GET /tasks/priority/:level
Description: Retrieve tasks based on priority level.
http://localhost:3000/tasks/priority/high