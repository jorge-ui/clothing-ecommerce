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

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = () => null;
  unsubscribeFromSnapshot = () => null;

  componentDidMount() {
    this.setState({
      currentUser: JSON.parse(localStorage.getItem('user'))
    });
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserDoc(userAuth);
        this.unsubscribeFromSnapshot = userRef.onSnapshot(snapShot => {
          let userSnap = { id: snapShot.id, ...snapShot.data() };

          localStorage.setItem('user', JSON.stringify(userSnap));

          this.setState({ currentUser: userSnap });
        });
      } else {
        localStorage.removeItem('user');
        this.setState({ currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SigninAndSignup} />
        </Switch>
      </div>
    );
  }
}

export default App;
