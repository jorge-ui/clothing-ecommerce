import React from 'react';
import './collections-overview.styles.scss';
// Components
import CollectionPreview from '../collection-preview/collection-preview.component';
// Modules
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsArray } from '../../redux/shop/shop.selectors';

const CollectionsOverview = ({ shopCollections }) => (
  <div className="collections-overview">
    {shopCollections.map(({ id, ...rest }) => (
      <CollectionPreview key={id} {...rest} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  shopCollections: selectCollectionsArray
});

export default connect(mapStateToProps)(CollectionsOverview);
