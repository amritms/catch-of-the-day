import React, { Component } from 'react'
import {getFunName} from '../helpers'


export default class StorePicker extends Component {
    
  // gotToStore(event) {

  //   // constructor() {
  //   //   super();
  //   //   this.gotToStore = this.gotToStore.bind(this);
  //   // }

  //   event.preventDefault();
  //   // first grab the text fro the box
  //   const storeId = this.storeInput.value;
  //   console.log(storeId);

  //   //second we're going to transition from / to /store/:storeId
  //   this.context.router.transitionTo(`/store/${storeId}`)
  // }

  render() {
      return (
        <form className="store-selector" onSubmit={(e) => this.props.history.push(`/store/${this.storeInput.value}`)}>
          <h2>Please Enter A Store</h2>
          <input type="text" required placeholder="Store Name" 
          defaultValue={getFunName()} 
          ref={(input) => {this.storeInput = input }}/>
          <button type="submit">Visit Store -></button>
        </form>
      );
    }
  }
