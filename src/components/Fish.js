import React, { Component } from 'react';
import { formatPrice } from '../helpers'
import PropTypes from 'prop-types'
export default class Fish extends Component {
    render() {
        const {details, index} = this.props; // ES6 destructuring
        const isAvailable = details.status === 'available';
        const buttonText = isAvailable ? 'Add To Order' : 'Sold Out';

        return(
            <li className="menu-fish">
                <img src={details.image} alt={details.name } />
                <h3 className="fish-name">{ details.name }
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button disabled={!isAvailable}
                onClick={() => this.props.addToOrder(index)}
                >{buttonText}</button>
            </li>
        )
    }
}

Fish.propTypes = {
    details: PropTypes.object.isRequired,
    index: PropTypes.string.isRequired,
    addToOrder: PropTypes.func.isRequired
}