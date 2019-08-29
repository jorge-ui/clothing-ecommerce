import React from 'react';
import './checkout-page.styles.scss';
// Components
import CheckoutForm from '../../components/checkout-form/checkout-form.component';
import CheckoutReviewList from '../../components/checkout-review-list/checkout-review-list.component';
import Footer from '../../components/footer/footer.component';
// Modules
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectCartTotal } from '../../redux/cart/cart.selectors';

const CheckoutPage = ({ cartTotal }) => (
  <div className="checkout-page">
    <div className="checkout-panel">
      <div className="panel-review">
        <div className="review-header">
          <div className="header-block">
            <span>Product</span>
          </div>
          <div className="header-block">
            <span>Description</span>
          </div>
          <div className="header-block">
            <span>Quantity</span>
          </div>
          <div className="header-block">
            <span>Price</span>
          </div>
          <div className="header-block">
            <span>Clear</span>
          </div>
        </div>
        <div className="review-items">
          <CheckoutReviewList />
        </div>
      </div>
      <div className="panel-order">
        <div className="order-header">Order</div>
        <CheckoutForm price={cartTotal} formdisabled={Boolean(!cartTotal)} />
      </div>
    </div>
    {window.innerWidth < 576 && <Footer />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartTotal: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
