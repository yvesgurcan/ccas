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



const Dropdown = (props) => {
    const {
        id,
        value,
        onChange,
        label,
        children,
    } = props;
    return (
        <div>
            <label htmlFor={id}>{label}
                <select id={id} value={value || ''} onChange={onChange}>
                    <option disabled value=''>Choose</option>
                    {children}
                </select>
            </label>
        </div>
    )
}

class CreateOrder extends Component {
    state = {}
    handleChange = (event) => {
        const { order } = this.state;
        const updatedOrder = { ...order };
        updatedOrder[event.target.id] = event.target.value;

        // update related values
        switch (event.target.id) {
            case 'make': {
                updatedOrder.model = undefined;
                break;
            }
            case 'model': {
                // update supplier as well
                const modelMatch = modelsList.filter(item => item.value === event.target.value);
                if (modelMatch.length > 0) {
                    const supplierMatch = suppliersList.filter(item => item.value === modelMatch[0].supplier);
                    if (supplierMatch.length > 0) {
                        updatedOrder.supplier = supplierMatch[0];
                        
                        // update package level
                        if (order.supplier !== updatedOrder.supplier) {
                            updatedOrder.packageLevel = undefined;
                        }
                    }
                }
                break;
            }
            default: {
                break;
            }
        }
        
        this.setState({ order: updatedOrder });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const {
            order={},
        } = this.state;
        const {
            make,
            model,
            packageLevel,
        } = order;

        if (!make || !model || !packageLevel) {
            return this.setState({validationError: 'All fields are required.'});
        }

        this.setState({validationError: ''});

        this.props.submitOrder(order);
    }
    render() {
        const {
            handleChange,
            handleSubmit,
        } = this;
        const {
            status,
            message,
            error,
        } = this.props.createOrder;
        const {
            order={},
            validationError,
        } = this.state;
        const {
            supplier,
            make,
            model,
            packageLevel,
        } = order;
        console.log(order)
        return (
            <div>
                <h2>Your Order</h2>
                <Link className='margin-bottom' to='/'>Return to Dashboard</Link>
                <div className='margin-left margin-bottom'>
                    { validationError }
                    { status === LOADING && 'Sending...' }
                    { status === SUCCESS && message }
                    { status === ERROR && `An error occurred: ${error}` }
                </div>
                <form className='margin-left' onSubmit={handleSubmit}>
                    <div>
                        <Dropdown id='make' label='Make' value={make} onChange={handleChange}>
                            {makesList.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}  
                        </Dropdown>
                        <Dropdown id='model' label='Model' value={model} onChange={handleChange}>
                            {make && modelsList.filter(item => item.make === make).map(item => <option key={item.value} value={item.value}>{item.label}</option>)}   
                        </Dropdown>
                        <Dropdown id='packageLevel' label='Package' value={packageLevel} onChange={handleChange}>
                            {supplier && packagesList.filter(item => item.supplier === supplier.value).map(item => <option key={item.value} value={item.value}>{item.label}</option>)} 
                        </Dropdown>
                    </div>
                    <div>Supplier: {supplier && supplier.label}</div>
                    <button>send</button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
