import React, { Component } from 'react';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('yup');
    this.setState({
      email: '',
      password: ''
    });
  };

  handleChange = e => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in-form">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password.</span>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input type="submit" value="Submit Form" />
        </form>
      </div>
    );
  }
}

export default SignInForm;
