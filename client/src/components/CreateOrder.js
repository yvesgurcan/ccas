import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import mapStateToProps from '../mapStateToProps';
import mapDispatchToProps from '../mapDispatchToProps';
import {
    makesList,
    modelsList,
    suppliersList,
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
                <select id={id} value={value} onChange={onChange}>
                    {children}
                </select>
            </label>
        </div>
    )
}

class CreateOrder extends Component {
    state = {
        order: {
            make: makesList[0].value,
            model: modelsList[0].value,
            packageLevel: '14k',
            supplier: suppliersList[0],
        }
    }
    handleChange = (event) => {
        const { order } = this.state;
        const updatedOrder = { ...order };
        updatedOrder[event.target.id] = event.target.value;
        if (event.target.id === 'model') {
            // TODO: update supplier, update packages
        }
        this.setState({ order: updatedOrder });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { order } = this.state;
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
            supplier,
            make,
            model,
            packageLevel,
        } = this.state.order;
        return (
            <div>
                <div>
                    <h1>Your Order</h1>
                </div>
                <Link className='margin-bottom' to='/'>Return to Dashboard</Link>
                <div className='margin-left margin-bottom'>
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
                            {modelsList.filter(item => item.make === make).map(item => <option key={item.value} value={item.value}>{item.label}</option>)}   
                        </Dropdown>
                        <Dropdown id='packageLevel' label='Package' value={packageLevel} onChange={handleChange}>
                            <option value='14k'>14K</option>
                            <option value='elite'>Elite</option>
                            <option value='ltd'>LTD</option>
                            <option value='mtn'>MTN</option>
                            <option value='std'>STD</option>
                            <option value='super'>Super</option>  
                        </Dropdown>
                    </div>
                    <div>Supplier: {supplier.label}</div>
                    <button>send</button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
