const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}


const app = express();
app.use(cors(corsOption));
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"task-tracker"
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});




app.post('/register',(req,res)=>{
    const sql = "INSERT INTO studentlogin (`stuid`,`password`,`name`,`dob`,`year`,`dept`,`gender`) VALUES (?,?,?,?,?,?,?)";
    const values = [
        req.body.stuid,
        req.body.password,
        req.body.name,
        req.body.dob,
        req.body.year,
        req.body.dept,
        req.body.gender
    ]
    db.query(sql,values,(err, data) => {
        if(err) return res.json(err);
        console.log(err);
        return res.json("created");
    })

})



app.post('/login', (req, res) => {
    console.log("hello");
  const { stuid, password } = req.body;
  const sql = "SELECT * FROM studentlogin WHERE stuid = ? AND password = ?";
  db.query(sql, [stuid, password], (err, data) => {
      if (err) {
          console.error(err);
          return res.json('error');
      }
      if (data.length > 0) {
          // Login successful
          return res.json('success');
      } else {
          // Login failed
          return res.json('fail');
      }
  });
});




app.get('/users', (req, res) => {
    const sql = "SELECT stuid FROM studentlogin";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.json('error');
        }
        return res.json(data);
    });
});

app.get('/user/:stuid/details', (req, res) => {
    const stuid = req.params.stuid;
    const sql = "SELECT COUNT(*) AS totalTasks, " +
                "SUM(CASE WHEN status = 'completed_before_deadline' THEN 1 ELSE 0 END) AS tasksCompletedBeforeDeadline, " +
                "SUM(CASE WHEN status = 'completed_after_deadline' THEN 1 ELSE 0 END) AS tasksCompletedAfterDeadline " +
                "FROM tasks " +
                "WHERE stuid = ?";
    db.query(sql, [stuid], (err, data) => {
        if (err) {
            console.error(err);
            return res.json('error');
        }
        return res.json(data[0]);
    });
});

app.put('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const { status } = req.body;
    const sql = "UPDATE tasks SET status = ? WHERE id = ?";
    db.query(sql, [status, taskId], (err, result) => {
        if (err) {
            console.error('Error updating task status:', err);
            return res.status(500).json({ error: 'Failed to update task status' });
        }
        return res.status(200).json({ message: 'Task status updated successfully' });
    });
});




// app.get('/user/details', (req, res) => {
//     const stuid = req.headers.stuid; // Assuming stuid is sent in the request headers

//     const userDetailsQuery = "SELECT name, status FROM studentlogin WHERE stuid = ?";
//     const tasksQuery = "SELECT * FROM tasks WHERE stuid = ?";

//     db.query(userDetailsQuery, [stuid], (err, userDetails) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Failed to fetch user details' });
//         }

//         db.query(tasksQuery, [stuid], (err, tasks) => {
//             if (err) {
//                 console.error('Error fetching tasks:', err);
//                 return res.status(500).json({ error: 'Failed to fetch tasks' });
//             }

//             const userDetailsWithTasks = {
//                 name: userDetails[0].name,
//                 status: userDetails[0].status,
//                 totalTasks: tasks.length,
//                 tasksCompletedBeforeDeadline: tasks.filter(task => task.status === 'completed_before_deadline').length,
//                 tasksCompletedAfterDeadline: tasks.filter(task => task.status === 'completed_after_deadline').length,
//                 tasks: tasks
//             };

//             res.status(200).json(userDetailsWithTasks);
//         });
//     });
// });



app.post('/tasks', (req, res) => {
    const { taskDescription, studentId, status, deadline } = req.body;
    
    // if (!isValidDateFormat(deadline)) {
    //     return res.status(400).json({ error: 'Invalid deadline format. Expected format: YYYY-MM-DD' });
    // }

    // const formattedDeadline = new Date(deadline).toISOString().slice(0, 10);

    // console.log(formattedDeadline);

    const sql = 'INSERT INTO tasks (taskdescription, stuid, status, deadline) VALUES (?, ?, ?, ?)';
    db.query(sql, [taskDescription, studentId, status, formattedDeadline], (error, results) => {
        if (error) {
            console.error('Error adding task:', error);
            res.status(500).json({ error: 'Failed to add task' });
        } else {
            res.status(201).json({ message: 'Task added successfully' });
        }
    });
});

function isValidDateFormat(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}



app.listen(8000,()=>{
    console.log("Listening...");
})