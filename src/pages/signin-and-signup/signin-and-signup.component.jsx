import React from 'react';
import './signin-and-signup.styles.scss';
// Components
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import Footer from '../../components/footer/footer.component';

const SigninAndSignup = () => (
  <div className="signin-and-signup">
    <h1>Sign In</h1>
    <div className="container">
      <SignInForm />
      <SignUpForm />
    </div>
    {window.innerWidth < 576 && <Footer />}
  </div>
);

export default SigninAndSignup;
