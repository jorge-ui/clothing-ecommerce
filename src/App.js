import React, { Component } from 'react';
import './App.styles.css';
// Components
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop-page/shop-page.component';
import Header from './components/header/header.component';
import SigninAndSignup from './pages/signin-and-signup/signin-and-signup.component';
// Modules
import { auth, createUserDoc } from './firebase/firebase.utils';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// Actions
import { setCurrentUser } from './redux/user/user.actions';

class App extends Component {
  unsubscribeFromAuth = () => null;
  unsubscribeFromSnapshot = () => null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    const localStoredUser = JSON.parse(localStorage.getItem('user'));

    setCurrentUser(localStoredUser);

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // Login
        const userDocRef = await createUserDoc(userAuth);
        this.unsubscribeFromSnapshot = userDocRef.onSnapshot(snapShot => {
          const user = { id: snapShot.id, ...snapShot.data() };
          localStorage.setItem('user', JSON.stringify(user));
          setCurrentUser(user);
        });
      } else {
        // Logout
        localStorage.removeItem('user');
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromSnapshot();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={props =>
              currentUser ? (
                <Redirect to="/shop" />
              ) : (
                <SigninAndSignup {...props} />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = {
  setCurrentUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
