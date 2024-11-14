import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Order {
    id: number;
    items: { id: number; name: string; quantity: number; price: number }[];
    total: number;
    address: string;
    paymentMethod: string;
    date: string;
    status: string;
}

const OrdersAdmin: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId: number, newStatus: string) => {
        try {
            await axios.patch(`http://localhost:5000/orders/${orderId}`, { status: newStatus });
            setOrders(orders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Quản Lý Đơn Hàng</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sản Phẩm</th>
                        <th>Tổng</th>
                        <th>Địa Chỉ</th>
                        <th>Phương Thức</th>
                        <th>Ngày</th>
                        <th>Trạng Thái</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.items.map(item => (
                                <div key={item.id}>{item.name} x{item.quantity}</div>
                            ))}</td>
                            <td>{order.total} VND</td>
                            <td>{order.address}</td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => handleUpdateStatus(order.id, 'Hoàn thành')}>Hoàn thành</button>
                                <button onClick={() => handleUpdateStatus(order.id, 'Đã hủy')}>Hủy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersAdmin;
