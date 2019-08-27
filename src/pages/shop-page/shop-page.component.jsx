import React, { useEffect, useState } from 'react';
import './shop-page.styles.scss';
// Components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection-page/collection-page.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
// Modules
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
  db,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';
// Actions
import { setCollections } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, setCollections }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const collectionRef = db.collection('collections');
    const unsubscribeSnapShot = collectionRef.onSnapshot(async snapShot => {
      const collectionMap = convertCollectionsSnapshotToMap(snapShot);
      setCollections(collectionMap);
      setIsLoading(false);
    });

    return () => {
      unsubscribeSnapShot();
    };
  }, [setCollections]);
  return (
    <div className="shop-page">
      <Switch>
        <Route
          exact
          path={`${match.path}`}
          isLoading={isLoading}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.url}/:collectionName`}
          render={props => (
            <CollectionPageWithSpinner isLoading={isLoading} {...props} />
          )}
        />
      </Switch>
    </div>
  );
};

const mapActionsToProps = {
  setCollections
};

export default connect(
  null,
  mapActionsToProps
)(ShopPage);
