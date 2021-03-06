import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Stripe extends Component {
  render() {
    return (
      <StripeCheckout
        name="SnapEmail"
        description="Top up 10 surveys"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <button className="btn orange">Add Credits</button>
      </StripeCheckout>
    );
  }
}
export default connect(null, actions)(Stripe);
