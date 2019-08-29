import React, { useEffect } from 'react';
import './shop-page.styles.scss';
// Components
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection-page/collection-page.container';
// Modules
import { Route, Switch } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { easeOutQuart } from '../../utils/easingFuctions';
// Redux
import { connect } from 'react-redux';
import { fetchCollectionsAsync } from '../../redux/shop/shop.actions';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsIsLoaded } from '../../redux/shop/shop.selectors';

const nestIn = 'translate(400px, 0px)';
const nestOut = 'translate(-400px, 0px)';

const ShopPage = ({
  match,
  location,
  collectionsIsLoaded,
  fetchCollectionsAsync
}) => {
  useEffect(() => {
    !collectionsIsLoaded && fetchCollectionsAsync();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const willNest = location.pathname.match(/\/\w*/g).length > 1;

  const transitions = useTransition(location, location => location.pathname, {
    ...transitionsConfig,
    from: {
      ...transitionsConfig.from,
      transform: willNest ? nestIn : nestOut
    },
    leave: {
      ...transitionsConfig.leave,
      transform: willNest ? nestOut : nestIn
    }
  });

  return (
    <div className="shop-page">
      <div className="container">
        {transitions.map(({ item, props, key }) => (
          <animated.div
            key={key}
            style={props}
            className="transition-div nested"
          >
            <Switch location={item}>
              <Route
                exact
                path={`${match.path}`}
                component={CollectionsOverviewContainer}
              />
              <Route
                exact
                path={`${match.url}/:collectionName`}
                component={CollectionPageContainer}
              />
            </Switch>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

const transitionsConfig = {
  initial: {
    transform: 'translate(0px, 0px)'
  },
  from: {
    opacity: 0
  },
  enter: {
    opacity: 1,
    transform: 'translate(0px, 0px)'
  },
  leave: {
    opacity: -0.5
  },
  config: {
    duration: 550,
    easing: easeOutQuart
  }
};

const mapStateToProps = createStructuredSelector({
  collectionsIsLoaded: selectCollectionsIsLoaded
});

const mapActionsToProps = {
  fetchCollectionsAsync
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ShopPage);
