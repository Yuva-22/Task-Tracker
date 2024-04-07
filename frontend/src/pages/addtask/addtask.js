import React, { useState } from 'react';
import axios from 'axios';

const Addtask = () => {
    const [taskDescription, setTaskDescription] = useState('');
    const [studentId, setStudentId] = useState('');
    const [status, setStatus] = useState('pending');
    const [deadline, setDeadline] = useState('');
    const today = new Date();
    today.setDate(today.getDate() + 1);

    const handleAddTask = async (e) => {
        e.preventDefault();
        const stuidRegex = /^CIT\d{3}$/;
        if(!stuidRegex.test(studentId))
        {
        alert("Student ID should be of the form CIT followed by 3 digits.");
        return;
        }
         // Set to tomorrow
        const selectedDeadline = new Date(deadline);
        if (selectedDeadline < today) {
            alert('Please select a deadline starting from tomorrow onwards.');
            return;
        }

        console.log(selectedDeadline);
        console.log(deadline);

        try {
            await axios.post('http://localhost:8000/tasks', {
                taskDescription,
                studentId,
                status,
                deadline // Include deadline in the request
            });
            // Clear input fields after successful submission
            setTaskDescription('');
            setStudentId('');
            setStatus('pending');
            setDeadline('');
            // Refresh the user list or perform any other necessary actions
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <h2>Add Task</h2>
            <form onSubmit={handleAddTask}>
                <label>
                    Task Description:
                    <input
                        type="text"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Student ID:
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Deadline:
                    <input
                        type="date"
                        value={deadline}
                        min={today}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default Addtask;
