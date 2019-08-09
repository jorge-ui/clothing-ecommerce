import React from 'react';
import { Redirect } from 'react-router-dom';
import './signin-and-signup.styles.scss';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SigninAndSignup = () => {
  if (localStorage.getItem('user')) {
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

export default SigninAndSignup;
