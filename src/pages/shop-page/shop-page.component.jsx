import React, { useEffect } from 'react';
import './shop-page.styles.scss';
// Components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection-page/collection-page.component';
// Modules
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
  db,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';
// Actions
import { setCollections } from '../../redux/shop/shop.actions';

const ShopPage = ({ match, setCollections }) => {
  useEffect(() => {
    const collectionRef = db.collection('collections');
    const unsubscribeSnapShot = collectionRef.onSnapshot(snapShot => {
      const collectionMapped = convertCollectionsSnapshotToMap(snapShot);
      setCollections(collectionMapped);
    });

    return () => {
      unsubscribeSnapShot();
    };
  }, [setCollections]);
  return (
    <div className="shop-page">
      <Switch>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          exact
          path={`${match.url}/:collectionName`}
          component={CollectionPage}
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
