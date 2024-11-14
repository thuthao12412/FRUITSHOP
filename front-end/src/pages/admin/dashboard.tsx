// src/pages/admin/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface DashboardStats {
    totalRevenue: number;
    productCount: number;
    userCount: number;
}

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            <div className="stats">
                <div className="stat-item">
                    <h3>Tổng Doanh Thu</h3>
                    <p>{stats ? `$${stats.totalRevenue.toLocaleString()}` : 'Loading...'}</p>
                </div>
                <div className="stat-item">
                    <h3>Số Lượng Sản Phẩm</h3>
                    <p>{stats ? stats.productCount : 'Loading...'}</p>
                </div>
                <div className="stat-item">
                    <h3>Số Lượng Người Dùng</h3>
                    <p>{stats ? stats.userCount : 'Loading...'}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
