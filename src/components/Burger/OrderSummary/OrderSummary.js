import React, { Component } from 'react'

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    render () {
        let ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransfrom: 'capitalize'}}>{igKey}: {this.props.ingredients[igKey]}</span>
                </li>
            )
        })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Proceed to checkout?</p>
                <Button 
                    btnType="Danger"
                    clicked={this.props.purchasedCancelled}
                >CANCEL</Button>
                <Button 
                    btnType="Success"
                    clicked={this.props.purchaseContinueHandler}
                >CONTINUE</Button>
            </Aux>
        )

    }
}

export default OrderSummary