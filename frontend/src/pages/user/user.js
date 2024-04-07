// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const UserPage = () => {
//     const [studentDetails, setStudentDetails] = useState(null);
//     const { stuid } = useParams();

//     useEffect(() => {
//         const fetchStudentDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/user/${stuid}/details`);
//                 setStudentDetails(response.data);
//             } catch (error) {
//                 console.error('Error fetching student details:', error);
//             }
//         };

//         fetchStudentDetails();
//     }, [stuid]);

//     return (
//         <div>
//             {studentDetails ? (
//                 <>
//                     <h1>Welcome, {studentDetails.name}</h1>
//                     <p>Status: {studentDetails.status}</p>
//                     <p>Total tasks: {studentDetails.totalTasks}</p>
//                     <p>Tasks completed before deadline: {studentDetails.tasksCompletedBeforeDeadline}</p>
//                     <p>Tasks completed after deadline: {studentDetails.tasksCompletedAfterDeadline}</p>
//                 </>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default UserPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const [studentDetails, setStudentDetails] = useState(null);
    const { stuid } = useParams();

    const fetchStudentDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/${stuid}/details`);
            setStudentDetails(response.data);
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

    useEffect(() => {
        fetchStudentDetails();
    }, [stuid]);

    const handleTaskCompletion = async (taskId) => {
        try {
            await axios.put(`http://localhost:8000/tasks/${taskId}`, { status: 'completed' });
            // Refresh student details after completing the task
            fetchStudentDetails();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div>
            {studentDetails ? (
                <>
                    <h1>Welcome, {studentDetails.name}</h1>
                    <p>Status: {studentDetails.status}</p>
                    <p>Total tasks: {studentDetails.totalTasks}</p>
                    <p>Tasks completed before deadline: {studentDetails.tasksCompletedBeforeDeadline}</p>
                    <p>Tasks completed after deadline: {studentDetails.tasksCompletedAfterDeadline}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Task Description</th>
                                <th>Deadline</th>
                                <th>Completion Status</th>
                                <th>Mark as Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentDetails && studentDetails.tasks && studentDetails.tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.description}</td>
                                    <td>{task.deadline}</td>
                                    <td>{task.status}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={task.status === 'completed'}
                                            onChange={() => handleTaskCompletion(task.id)}
                                            disabled={task.status === 'completed'}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserPage;

















































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const UserPage = () => {
//     const [studentDetails, setStudentDetails] = useState(null);
//     const [tasks, setTasks] = useState([]);
//     const { stuid } = useParams();

//     useEffect(() => {
//         const fetchStudentDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/user/${stuid}/details`);
//                 setStudentDetails(response.data);
//                 if (response.data.tasks) {
//                     setTasks(response.data.tasks);
//                 } else {
//                     setTasks([]);
//                 }
//             } catch (error) {
//                 console.error('Error fetching student details:', error);
//             }
//         };
    
//         fetchStudentDetails();
//     }, [stuid]);
    

//     const handleTaskCompletion = async (taskId, deadline) => {
//         let status;
//         if (new Date() <= new Date(deadline)) {
//             status = 'completed_before_deadline';
//         } else {
//             status = 'completed_after_deadline';
//         }

//         try {
//             await axios.put(`http://localhost:8000/tasks/${taskId}`, { status });
//             // Update tasks state to reflect the change
//             setTasks((prevTasks) =>
//                 prevTasks.map((task) =>
//                     task.id === taskId ? { ...task, status } : task
//                 )
//             );
//         } catch (error) {
//             console.error('Error updating task status:', error);
//         }
//     };

//     return (
//         <div>
//             {studentDetails ? (
//                 <>
//                     <h1>Welcome, {studentDetails.name}</h1>
//                     <p>Status: {studentDetails.status}</p>
//                     <p>Total tasks: {studentDetails.totalTasks}</p>
//                     <p>Tasks completed before deadline: {studentDetails.tasksCompletedBeforeDeadline}</p>
//                     <p>Tasks completed after deadline: {studentDetails.tasksCompletedAfterDeadline}</p>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Serial No</th>
//                                 <th>Task Description</th>
//                                 <th>Deadline</th>
//                                 <th>Completion status</th>
//                                 <th>Mark as completed</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {tasks.map((task, index) => (
//                                 <tr key={task.id}>
//                                     <td>{index + 1}</td>
//                                     <td>{task.description}</td>
//                                     <td>{task.deadline}</td>
//                                     <td>{task.status}</td>
//                                     <td>
//                                         <input
//                                             type="checkbox"
//                                             checked={task.status === 'completed_before_deadline' || task.status === 'completed_after_deadline'}
//                                             onChange={() => handleTaskCompletion(task.id, task.deadline)}
//                                             disabled={task.status === 'completed_before_deadline' || task.status === 'completed_after_deadline'}
//                                         />
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default UserPage;


