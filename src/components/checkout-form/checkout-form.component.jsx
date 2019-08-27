import React, { Component } from 'react';
import './checkout-form.styles.scss';
// Componets
import FormInput from '../form-input/form-input.component';
import crownLogo from '../../assets/crown-img.png';
// Modules
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import StripeCheckout from 'react-stripe-checkout';

const stripePublishableKey = 'pk_test_ISm2ExeGCOVKScWl1rmNU1KT00cz3zAHZo';
class CheckoutForm extends Component {
  state = {
    name: '',
    email: '',
    address: '',
    country: '',
    region: ''
  };

  handleSubmit = async e => {
    e.preventDefault();
    document.querySelector('button.StripeCheckout').click();
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onToken = token => {
    console.log(token);
    alert('Payment Successful');
  };

  render() {
    const { price, formdisabled } = this.props;
    const priceForStripe = price * 100;
    return (
      <form
        className="checkout-form"
        onSubmit={this.handleSubmit}
        formdisabled={String(formdisabled)}
      >
        <div className="disabled-div" />
        <h2>Shipping Info</h2>
        <FormInput
          handleChange={this.handleChange}
          label="Name"
          name="name"
          value={this.state.name}
          required
        />
        <FormInput
          handleChange={this.handleChange}
          label="Address"
          name="address"
          value={this.state.address}
          required
        />
        <CountryDropdown
          onChange={val => this.setState({ country: val })}
          value={this.state.country}
          required
        />
        <RegionDropdown
          country={this.state.country}
          onChange={val => this.setState({ region: val })}
          value={this.state.region}
          required
        />
        <div className="checkout-submit">
          <span className="total">TOTAL: ${price}</span>
          <button type="submit">Place Order</button>
        </div>
        <div className="warning-message">
          <p>*Please use the following test credit card for payments*</p>
          <p>4242 4242 4242 4242 -- Exp:01/20 -- CW: 123</p>
        </div>
        <StripeCheckout
          label="Pay now"
          name="CRWN Clothing Ltd."
          billingAddress={false}
          shippingAddress={false}
          image={crownLogo}
          description={`Your total is $${price}`}
          amount={priceForStripe}
          panelLabel="Pay Now"
          token={this.onToken}
          stripeKey={stripePublishableKey}
          ref={this.stripeButton}
          ComponentClass="div"
          type="button"
        />
      </form>
    );
  }
}

export default CheckoutForm;
