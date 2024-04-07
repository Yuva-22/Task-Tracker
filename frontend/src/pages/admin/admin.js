import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Admin = () => {
    const [userIds, setUserIds] = useState([]);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserIds = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users');
                setUserIds(response.data);
            } catch (error) {
                console.error('Error fetching user IDs:', error);
            }
        };

        fetchUserIds();
    }, []);

    const handleUserClick = async (stuid) => {
        try {
            const response = await axios.get(`http://localhost:8000/user/${stuid}/details`);
            setSelectedUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <Link to="/addtask">
                 <h2>Add Task</h2>
            </Link>
            <h2>User IDs</h2>
            <ul>
                {userIds.map((userId) => (
                    <li key={userId.stuid} onClick={() => handleUserClick(userId.stuid)}>
                        {userId.stuid}
                    </li>
                ))}
            </ul>
            {selectedUserDetails && (
                <div>
                    <h2>User Details</h2>
                    {/* <p>{userId.stuid}</p> */}
                    <p>Total tasks: {selectedUserDetails.totalTasks}</p>
                    <p>Tasks completed before deadline: {selectedUserDetails.tasksCompletedBeforeDeadline}</p>
                    <p>Tasks completed after deadline: {selectedUserDetails.tasksCompletedAfterDeadline}</p>
                </div>
            )}
        </div>
    );
};

export default Admin;
