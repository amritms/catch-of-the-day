import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import SampleFishes from '../sample-fishes'
import {base} from '../base'
import PropTypes from 'prop-types'

export default class App extends Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
        this.removeFish = this.removeFish.bind(this);
        // getInitalState
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount() {
        //this runs right before the <App> is rendered
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,
    {
        context: this,
        state: 'fishes'
    });

    //check if tehre is any order in localstorage
    const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);

    if(localStorageRef){
        //update our App component's order state
        this.setState({
            order: JSON.parse(localStorageRef)
        });
    }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {

        localStorage.setItem(`order-${this.props.match.params.storeId}`, 
        JSON.stringify(nextState.order));
    }
    
    addFish(fish){
        //udpate our state
        const fishes = {...this.state.fishes};
        // add in our new fish
        const timestamp = Date.now(); 
        fishes[`fish-${timestamp}`] = fish;
        //set state
        this.setState({ fishes });
    }

    removeFish(key){
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        console.log(fishes);
        this.setState({ fishes });
    }
    removeFromOrder(key){
        const order = {...this.state.order};
        delete(order[key]);
        console.log(order);
        this.setState({ order })
    }

    updateFish(key, updatedFish){
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    loadSamples(){
        this.setState({
            fishes: SampleFishes
        })
    }

    addToOrder(key) {
        // take a copy of our state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        //update our state
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    { 
                        Object.keys(this.state.fishes)
                        .map(key => <Fish key={key} index={key}
                        details={ this.state.fishes[key] } addToOrder={this.addToOrder} />)
                    }
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    params={this.props.match.params}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                    addFish={this.addFish} 
                    loadSamples={this.loadSamples} 
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

App.protoTypes = {
    params: PropTypes.object.isRequired
}