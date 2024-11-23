import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    productCount: 0,
    userCount: 0,
    orderCount: 0,
  });
  const [chartData, setChartData] = useState<any>(null); // Dữ liệu cho biểu đồ

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:5000/products');
        const usersResponse = await axios.get('http://localhost:5000/users');
        const ordersResponse = await axios.get('http://localhost:5000/orders');

        const totalRevenue = ordersResponse.data.reduce((sum: number, order: any) => sum + order.total, 0);
        const productCount = productsResponse.data.length;
        const userCount = usersResponse.data.length;
        const orderCount = ordersResponse.data.length;

        setStats({ totalRevenue, productCount, userCount, orderCount });

        // Tổng hợp doanh thu theo tháng
        const revenueByMonth = Array(12).fill(0); // Mảng 12 tháng
        ordersResponse.data.forEach((order: any) => {
          const month = new Date(order.date).getMonth(); // Lấy tháng từ 0-11
          revenueByMonth[month] += order.total; // Cộng dồn doanh thu
        });

        // Tạo dữ liệu biểu đồ
        setChartData({
          labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
          ],
          datasets: [
            {
              label: 'Doanh thu (VND)',
              data: revenueByMonth,
              borderColor: '#3498db',
              backgroundColor: 'rgba(52, 152, 219, 0.2)',
              tension: 0.3,
            },
          ],
        });
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
          <p>{stats.totalRevenue.toLocaleString()} VND</p>
        </div>
        <div className="stat-item">
          <h3>Số Lượng Sản Phẩm</h3>
          <p>{stats.productCount}</p>
        </div>
        <div className="stat-item">
          <h3>Số Lượng Người Dùng</h3>
          <p>{stats.userCount}</p>
        </div>
        <div className="stat-item">
          <h3>Số Lượng Đơn Hàng</h3>
          <p>{stats.orderCount}</p>
        </div>
      </div>

      {chartData && (
        <div className="chart-container">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
