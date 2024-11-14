// src/pages/admin/Users.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = async () => {
        const newUser: Omit<User, 'id'> = { name: 'Người dùng mới', email: 'new@example.com', role: 'user' };
        try {
            const response = await axios.post('/api/users', newUser);
            setUsers([...users, response.data]);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleEdit = async (userId: string) => {
        const updatedUser = { name: 'Tên đã chỉnh sửa', email: 'updated@example.com', role: 'admin' };
        try {
            const response = await axios.put(`/api/users/${userId}`, updatedUser);
            setUsers(users.map(user => (user.id === userId ? response.data : user)));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (userId: string) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
        if (confirmed) {
            try {
                await axios.delete(`/api/users/${userId}`);
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <div className="admin-container">
            <h1>Quản Lý Người Dùng</h1>
            <button onClick={handleAddUser} className="add-button">Thêm Người Dùng</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai Trò</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="action-buttons">
                                <button onClick={() => handleEdit(user.id)} className="edit-button">Sửa</button>
                                <button onClick={() => handleDelete(user.id)} className="delete-button">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
