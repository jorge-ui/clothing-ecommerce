import React, { Component } from 'react';
import './sign-up-form.styles.scss';
//Components
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
//Modules
import { auth, createUserDoc } from '../../firebase/firebase.utils';

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Create a new user on the firebase auth
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      // Store that new user on our database
      await createUserDoc(user, { displayName });
      // Reset to initial state upon success
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      // Handle Errors here.
      switch (error.code) {
        case 'auth/email-already-in-use':
          return alert('Email address already exists.');
        case 'auth/invalid-email':
          return alert('Email address is not valid.');
        case 'auth/weak-password':
          return alert(`The password is too weak. ${error.message}.`);
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
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up-form">
        <h2 className="title">I do not have an accont</h2>
        <span>Sign up with your email and password.</span>
        <form className="form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            handleChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            handleChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            handleChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
