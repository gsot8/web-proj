import React, {useEffect, useState} from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/users')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setError('Failed to load users');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="enter form-box">
                <div className="header">Users List</div>
                <div className="body">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="enter form-box">
                <div className="header">Users List</div>
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="users datatable">
            <div className="caption">Users List</div>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Login</th>
                    <th>Creation Time</th>
                </tr>
                </thead>
                <tbody>
                {users.length === 0 ? (
                    <tr className="noData">
                        <td colSpan="3">
                            No users found
                        </td>
                    </tr>
                ) : (
                    users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.login}</td>
                            <td>{new Date(user.creationTime).toLocaleString()}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default User;