import React, { Component } from 'react';
import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoggle, auth } from '../../firebase/firebase.utils';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);

      this.setState({
        email: '',
        password: ''
      });
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          return alert('Not a valid email address.');
        case 'auth/user-disabled':
          return alert('The user for that email has beed disabled.');
        case 'auth/user-not-found':
          return alert('There is no user with that email.');
        case 'auth/wrong-password':
          return alert('Password is invalid.');
        default:
          console.error(error);
          return alert(`An unknown error ocurred. ${error}.`);
      }
    }
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in-form">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password.</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            id="email"
            type="text"
            name="email"
            label="Email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            id="password"
            type="password"
            name="password"
            label="Password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton onClick={signInWithGoggle} isGoogleSignIn>
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
