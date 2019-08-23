import React from 'react';
import './shop-page.styles.scss';
// Components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection-page/collection-page.component';
// Modules
import { Route, Switch } from 'react-router-dom';

const ShopPage = ({ match }) => (
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

export default ShopPage;
