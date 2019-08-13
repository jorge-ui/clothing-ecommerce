import React, { Component } from 'react';
import './App.styles.css';
// Components
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop-page/shop-page.component';
import Header from './components/header/header.component';
import SigninAndSignup from './pages/signin-and-signup/signin-and-signup.component';
// Modules
import { auth, createUserDoc } from './firebase/firebase.utils';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// Actions
import { setCurrentUser } from './redux/user/user-actions';

class App extends Component {
  unsubscribeFromAuth = () => null;
  unsubscribeFromSnapshot = () => null;

  componentDidMount() {
    this.props.setCurrentUser(JSON.parse(localStorage.getItem('user')));
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // Login
        const userRef = await createUserDoc(userAuth);
        this.unsubscribeFromSnapshot = userRef.onSnapshot(snapShot => {
          let user = { id: snapShot.id, ...snapShot.data() };

          localStorage.setItem('user', JSON.stringify(user));
          this.props.setCurrentUser(user);
        });
      } else {
        // Logout
        localStorage.removeItem('user');
        this.props.setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromSnapshot();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SigninAndSignup} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setCurrentUser
};

export default connect(
  null,
  mapDispatchToProps
)(App);
