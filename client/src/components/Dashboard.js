import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import mapStateToProps from '../mapStateToProps';
import mapDispatchToProps from '../mapDispatchToProps';

import {
    LOADING,
    SUCCESS,
    ERROR,
} from '../reducers/statusTypes';

class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchOrders();
    }
    render() {
        const {
            status,
            orders = [],
            error,
        } = this.props.dashboard;
        return (
            <div>
                <h2>Dashboard</h2>
                <Link className="margin-bottom" to="/order/new">Add Order</Link>
                <div className="margin-left">
                    { status === LOADING && 'Loading...' }
                    { status === ERROR && `An error occurred: ${error}` }
                </div>
                { status === SUCCESS && 
                    <table>
                        <thead>
                            <tr>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Package</th>
                                <th>Supplier</th>
                                <th>Customer ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order.make}</td>
                                    <td>{order.model}</td>
                                    <td>{order.packageLevel}</td>
                                    <td>{order.supplier}</td>
                                    <td>{order._id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
