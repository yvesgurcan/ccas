import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import mapStateToProps from '../mapStateToProps';
import mapDispatchToProps from '../mapDispatchToProps';

import {
    makesList,
    modelsList,
    suppliersList,
    packagesList,
} from '../constants';

import {
    LOADING,
    SUCCESS,
    ERROR,
} from '../reducers/statusTypes';

class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchOrders();
    }
    findMatchingLabel(list, value) {
        const match = list.filter(item => item.value === value);
        if (match.length > 0) {
            return match[0].label;
        }
        return value;
    }
    render() {
        const {
            findMatchingLabel,
        } = this;
        const {
            status,
            orders = [],
            error,
        } = this.props.dashboard;
        return (
            <div>
                <h2>Dashboard</h2>
                <Link className='margin-left margin-bottom' to='/order/new'>Add Order</Link>
                <div className='margin-left'>
                    { status === LOADING && 'Loading...' }
                    { status === ERROR && `An error occurred: ${error}` }
                </div>
                { status === SUCCESS && 
                    <div>
                        <div className='margin-left'>
                            {orders.length} orders.
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Package</th>
                                    <th>Supplier</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{findMatchingLabel(makesList, order.make)}</td>
                                        <td>{findMatchingLabel(modelsList, order.model)}</td>
                                        <td>{findMatchingLabel(packagesList, order.packageLevel)}</td>
                                        <td>{findMatchingLabel(suppliersList, order.supplier)}</td>
                                        <td>{order.createdAt && new Date(order.createdAt).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
