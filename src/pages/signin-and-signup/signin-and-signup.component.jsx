import React from 'react';
import './signin-and-signup.styles.scss';
// Components
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
// Modules
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const SigninAndSignup = ({ currentUser }) => {
  if (currentUser) {
    return <Redirect to="/shop" />;
  } else {
    return (
      <div className="signin-and-signup">
        <h1>Sign In</h1>
        <div className="container">
          <SignInForm />
          <SignUpForm />
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(SigninAndSignup);
