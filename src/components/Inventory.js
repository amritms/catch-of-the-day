import React, { Component } from 'react'
import AddFishForm from './AddFishForm'
import PropTypes from 'prop-types'
import {firebaseApp, facebookProvider } from '../base'

export default class Inventory extends Component {
    constructor(){
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            uid: null,
            owner: null
        }
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if(user) {
                this.authHandler({user});
            }
        });
    }

    handleChange(e, key){
        const fish = this.props.fishes[key];
        //take a copy of that fish and update it with the new data
        const updatedFish = {
            ...fish, 
            [e.target.name]: e.target.value
        }
        this.props.updateFish(key, updatedFish);
    }

    authenticate(provider) {
        // base.authWithOAuthPopup('facebook', this.authHandler);
        firebaseApp.auth().signInWithPopup(facebookProvider)
        .then((result, error) => {
            if(error) {
                console.error(error);
            }else{
                this.authHandler(result);
            }
        })
    }

    logout() {
        firebaseApp.logout;
        this.setState({ uid: null })
    }
    authHandler(authData) {

        //grab the store info
        const storeRef = firebaseApp.database().ref(this.props.storeId)

        //query the firebase once for the store data
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            //claim it as our own if there is no owner already
            if(!data.owner){
                storeRef.set({
                    owner: authData.user.uid
                });
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.id
            })
        })
    
    }

    renderLogin() {
        return(
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}> Login with Github </button>
                <button className="facebook" onClick={() => this.authenticate('facebook')}> Login with Facebook </button>
                <button className="twitter" onClick={() => this.authenticate('twitter')}> Login with Twitter </button>
            </nav>
        )
    }

    renderInventory(key){
        const fish = this.props.fishes[key];

        return (
            <div key={key} className="fish-edit">
                <input onChange={(e) => this.handleChange(e, key)} type="text" name="name" value={fish.name} placeholder="Fish name" />
                <input onChange={(e) => this.handleChange(e, key)} type="text" name="price" value={fish.price} placeholder="Fish price" />
                <select onChange={(e) => this.handleChange(e, key)} type="text" name="status" value={fish.status} placeholder="Fish status">
                    <option value="available">Fresh!</option>
                    <option value="available">Sold Out!</option>
                </select>
                <textarea onChange={(e) => this.handleChange(e, key)} type="text" name="desc" value={fish.desc} placeholder="Fish desc" ></textarea>
                <input onChange={(e) => this.handleChange(e, key)} type="text" name="image" value={fish.image} placeholder="Fish image" />
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }
    render() {
        const logout = <button onClick={this.logout}>Log Out ! </button>
        //check if they are not logged in at all
        if(!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        // check if they are the owner of the current store
        if(this.state.uid !== this.state.owner){
            return (
                <div>
                    <p> Sorry you aren't the owner of this store!</p>
                    {logout}
                </div>
            )
        }

        return(
        <div>
            <h2>Inventory</h2>
            {logout}
            {Object.keys(this.props.fishes).map(this.renderInventory)}
            <AddFishForm addFish={this.props.addFish} />
            <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
        </div>
        )
    }
}

Inventory.propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
}