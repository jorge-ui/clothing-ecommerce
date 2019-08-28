import React, { useEffect } from 'react';
import './App.styles.scss';
// Components
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop-page/shop-page.component';
import Header from './components/header/header.component';
import SigninAndSignup from './pages/signin-and-signup/signin-and-signup.component';
import CheckoutPage from './pages/checkout-page/checkout-page.component';
// Modules
import useRouter from './utils/useRouter';
import { useTransition, animated } from 'react-spring';
import { auth, createUserDoc } from './firebase/firebase.utils';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { easeOutQuart } from './utils/easingFuctions';
// Actions
import { setCurrentUser } from './redux/user/user.actions';

const App = ({ setCurrentUser, currentUser }) => {
  useEffect(() => {
    let unsubscribeFromAuth = () => null;
    let unsubscribeFromSnapshot = () => null;

    const localStoredUser = JSON.parse(localStorage.getItem('user'));

    setCurrentUser(localStoredUser);

    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // Login
        const userDocRef = await createUserDoc(userAuth);
        unsubscribeFromSnapshot = userDocRef.onSnapshot(snapShot => {
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

    return () => {
      unsubscribeFromAuth();
      unsubscribeFromSnapshot();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { location } = useRouter();
  const transitions = useTransition(
    location,
    location => location.pathname.match(/\/\w*/)[0], // Top level, not nested pathname = key
    transitionsConfig
  );
  return (
    <div className="App">
      <Header />
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props} className="transition-div">
          <Switch location={item}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
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
        </animated.div>
      ))}
    </div>
  );
};

const transitionsConfig = {
  from: {
    opacity: 0,
    transform: 'translate(0px, -60px)'
  },
  enter: {
    opacity: 1,
    transform: 'translate(0px, 0px)'
  },
  leave: item => async next => {
    await next({ overflow: 'hidden', config: { duration: 5 } });
    await next({
      opacity: -1,
      transform: 'translate(0px, 100px)'
    });
  },
  config: {
    duration: 400,
    easing: easeOutQuart
  }
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = { setCurrentUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
