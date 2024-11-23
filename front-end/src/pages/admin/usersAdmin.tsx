import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const UsersAdmin: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        } catch (err) {
            console.error('Lỗi khi tải danh sách người dùng:', err);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/users', formData);
            setUsers([...users, response.data]);
            resetForm();
        } catch (error) {
            console.error('Lỗi khi thêm người dùng:', error);
        }
    };

    const handleEditUser = async () => {
        if (!currentUser) return;

        try {
            await axios.put(`http://localhost:5000/users/${currentUser.id}`, formData);
            setUsers(
                users.map((user) =>
                    user.id === currentUser.id ? { ...user, ...formData } : user
                )
            );
            resetForm();
        } catch (error) {
            console.error('Lỗi khi sửa người dùng:', error);
        }
    };

    const handleDeleteUser = async (id: number) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/users/${id}`);
                setUsers(users.filter((user) => user.id !== id));
            } catch (error) {
                console.error('Lỗi khi xóa người dùng:', error);
            }
        }
    };

    const handleFormSubmit = () => {
        if (currentUser) {
            handleEditUser();
        } else {
            handleAddUser();
        }
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', role: 'user' });
        setShowAddForm(false);
        setCurrentUser(null);
    };

    const handleEditClick = (user: User) => {
        setCurrentUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role });
        setShowAddForm(true);
    };

    const filteredUsers = users.filter(
        (user) =>
          (user.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (user.email?.toLowerCase().includes(searchQuery.toLowerCase()) )
      );
      

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="admin-container">
            <h1>Quản Lý Người Dùng</h1>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Đóng' : 'Thêm Người Dùng'}
                </button>
            </div>

            {showAddForm && (
                <div className="form-container">
                    <h2>{currentUser ? 'Sửa Người Dùng' : 'Thêm Người Dùng'}</h2>
                    <input
                        type="text"
                        placeholder="Tên"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <div className="form-actions">
                        <button onClick={handleFormSubmit}>
                            {currentUser ? 'Cập Nhật' : 'Thêm'}
                        </button>
                        <button onClick={resetForm}>Hủy</button>
                    </div>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai Trò</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEditClick(user)}>Sửa</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UsersAdmin;
