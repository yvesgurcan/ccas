import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const orders = [];

class Dashboard extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Dashboard</h1>
                </div>
                <Link to="/order/new">Add Order</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Package</th>
                            <th>Customer ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order.make}</td>
                                <td>{order.model}</td>
                                <td>{order.package}</td>
                                <td>{order._id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Dashboard;
