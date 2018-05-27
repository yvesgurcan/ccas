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

class CreateOrder extends Component {
    state = {
        order: {
            model: 'anvil',
            packageLevel: '14k'
        }
    }
    handleChange = (event) => {
        const { order } = this.state;
        const updatedOrder = { ...order };
        updatedOrder[event.target.id] = event.target.value;
        console.log(updatedOrder);
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
            model,
            packageLevel,
        } = this.state.order;
        return (
            <div>
                <div>
                    <h1>Your Order</h1>
                </div>
                <Link className="margin-bottom" to="/">Return to Dashboard</Link>
                <div className="margin-left margin-bottom">
                    { status === LOADING && 'Sending...' }
                    { status === SUCCESS && message }
                    { status === ERROR && `An error occurred: ${error}` }
                </div>
                <form className="margin-left" onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="model">Model
                                <select id="model" value={model} onChange={handleChange}>
                                    <option value="anvil">Anvil</option>
                                    <option value="pugetsound">Puget Sound</option>
                                    <option value="olympic">Olympic</option>
                                    <option value="roadrunner">Roadrunner</option>
                                    <option value="wile">Wile</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="packageLevel">Package
                                <select id="packageLevel" value={packageLevel} onChange={handleChange}>
                                    <option value="14k">14K</option>
                                    <option value="elite">Elite</option>
                                    <option value="ltd">LTD</option>
                                    <option value="mtn">MTN</option>
                                    <option value="std">STD</option>
                                    <option value="super">Super</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <button>send</button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
