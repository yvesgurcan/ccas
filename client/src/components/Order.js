import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = { model: 'anvil', packageLevel: '14k' };
        this.handleChangeModel = this.handleChangeModel.bind(this);
    }
    handleChangeModel(event) {
        this.setState({ model: event.target.value });
    }
    handleChangePackage(event) {
        this.setState({ packageLevel: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const {
            model,
            packageLevel,
        } = this.state;
        
    }
    render() {
        return (
            <div>
                <div>
                    <h1>Your Order</h1>
                </div>
                <Link to="/">Return to Dashboard</Link>
                <form>
                    <div>
                        <div>
                            <label htmlFor="model">Model
                                <select id="model" value={this.state.model} onChange={this.handleChangeModel}>
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
                                <select id="packageLevel" value={this.state.packageLevel} onChange={this.handleChangePackage}>
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

export default Order;
