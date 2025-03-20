import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { writeFile, utils } from 'xlsx';

interface Order {
    id: number;
    items: { id: number; name: string; quantity: number; price: number }[];
    total: number;
    address: string;
    paymentMethod: string;
    date: string;
    status: string;
    history?: { status: string; timestamp: string }[];
    email?: string;
}

const OrdersAdmin: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const itemsPerPage = 10;

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
            const updatedOrder = orders.find((order) => order.id === orderId);
            await axios.patch(`http://localhost:5000/orders/${orderId}`, {
                status: newStatus,
                history: [
                    ...(updatedOrder?.history || []),
                    { status: newStatus, timestamp: new Date().toISOString() },
                ],
            });

            if (updatedOrder?.email) {
                await axios.post('http://localhost:5000/send-email', {
                    to: updatedOrder.email,
                    subject: `Cập nhật trạng thái đơn hàng #${orderId}`,
                    body: `Trạng thái đơn hàng của bạn đã được cập nhật thành "${newStatus}".`,
                });
            }

            fetchOrders();
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
        }
    };

    const exportToExcel = () => {
        const ws = utils.json_to_sheet(orders);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Orders');
        writeFile(wb, 'orders.xlsx');
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toString().includes(searchQuery) ||
            order.address.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus ? order.status === filterStatus : true;
        return matchesSearch && matchesFilter;
    });

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    return (
        <div className="admin-container">
            <h1>Quản Lý Đơn Hàng</h1>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Tìm kiếm đơn hàng..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="">Tất cả trạng thái</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã hủy">Đã hủy</option>
                </select>
                <button onClick={exportToExcel}>Xuất báo cáo</button>
            </div>

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
                    {paginatedOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>
                                {order.items.map((item) => (
                                    <div key={item.id}>
                                        {item.name} x{item.quantity}
                                    </div>
                                ))}
                            </td>
                            <td>{order.total.toLocaleString()} VND</td>
                            <td>{order.address}</td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td>
                                <button
                                    onClick={() => handleUpdateStatus(order.id, 'Hoàn thành')}
                                    disabled={order.status === 'Hoàn thành' || order.status === 'Đã hủy'}
                                >
                                    Hoàn thành
                                </button>
                                {order.status !== 'Hoàn thành' && (
                                    <button
                                        onClick={() => handleUpdateStatus(order.id, 'Đã hủy')}
                                        disabled={order.status === 'Đã hủy'}
                                    >
                                        Hủy
                                    </button>
                                )}
                                <button onClick={() => setSelectedOrder(order)}>Xem chi tiết</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Trang trước
                </button>
                <span>
                    Trang {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Trang sau
                </button>
            </div>

            {selectedOrder && (
                <div className="order-modal">
                    <h3>Chi tiết đơn hàng #{selectedOrder.id}</h3>
                    <p>Địa chỉ: {selectedOrder.address}</p>
                    <p>Ngày: {selectedOrder.date}</p>
                    <h4>Sản phẩm:</h4>
                    <ul>
                        {selectedOrder.items.map((item) => (
                            <li key={item.id}>
                                {item.name} x {item.quantity} - {item.price.toLocaleString()} VND
                            </li>
                        ))}
                    </ul>
                    <h4>Lịch sử trạng thái:</h4>
                    <ul>
                        {selectedOrder.history?.map((entry, index) => (
                            <li key={index}>
                                {entry.status} - {new Date(entry.timestamp).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setSelectedOrder(null)}>Đóng</button>
                </div>
            )}
        </div>
    );
};

export default OrdersAdmin;
