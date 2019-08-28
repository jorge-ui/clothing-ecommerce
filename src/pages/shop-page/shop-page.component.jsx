import React, { useEffect, useRef } from 'react';
import './shop-page.styles.scss';
// Components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection-page/collection-page.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
// Modules
import { Route, Switch } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { easeOutQuart } from '../../utils/easingFuctions';
// Redux
import { connect } from 'react-redux';
import { fetchCollectionsAsync } from '../../redux/shop/shop.actions';
import { createStructuredSelector } from 'reselect';
import {
  selectCollectionsIsFetching,
  selectCollectionsIsLoaded
} from '../../redux/shop/shop.selectors';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({
  match,
  location,
  history,
  collectionsIsLoaded,
  fetchCollectionsAsync
}) => {
  const shopPage = useRef(null);
  useEffect(() => {
    !collectionsIsLoaded && fetchCollectionsAsync();
    shopPage.current.scrollTo(0, 0);
  });

  const nestIn = 'translate(400px, 0px)';
  const nestout = 'translate(-400px, 0px)';
  const willNest = location.pathname.match(/\/\w*/g).length > 1;
  const transitions = useTransition(location, location => location.key, {
    ...transitionsConfig,
    from: {
      opacity: 0,
      transform: willNest ? nestIn : nestout
    },
    leave: {
      opacity: -0.5,
      transform: willNest ? nestout : nestIn
    }
  });

  return (
    <div ref={shopPage} className="shop-page">
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props} className="transition-div nested">
          <h1>
            {willNest && <span onClick={() => history.goBack()}>Back</span>}
            COLLECTION{!willNest && 'S'}
          </h1>
          <Switch location={item}>
            <Route
              exact
              path={`${match.path}`}
              isLoading={!collectionsIsLoaded}
              render={props => (
                <CollectionsOverviewWithSpinner
                  isLoading={!collectionsIsLoaded}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`${match.url}/:collectionName`}
              render={props => (
                <CollectionPageWithSpinner
                  isLoading={!collectionsIsLoaded}
                  {...props}
                />
              )}
            />
          </Switch>
        </animated.div>
      ))}
    </div>
  );
};

const transitionsConfig = {
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
  collectionsIsFetching: selectCollectionsIsFetching,
  collectionsIsLoaded: selectCollectionsIsLoaded
});

const mapActionsToProps = {
  fetchCollectionsAsync
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ShopPage);
