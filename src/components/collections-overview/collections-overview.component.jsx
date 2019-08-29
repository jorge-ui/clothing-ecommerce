import React from 'react';
import './collections-overview.styles.scss';
// Components
import CollectionPreview from '../collection-preview/collection-preview.component';
import Footer from '../footer/footer.component';
// Modules
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsArray } from '../../redux/shop/shop.selectors';

const CollectionsOverview = ({ shopCollections }) => (
  <div className="collections-overview">
    <h1>COLLECTIONS</h1>
    {shopCollections.map(({ id, ...rest }) => (
      <CollectionPreview key={id} {...rest} />
    ))}
    <Footer />
  </div>
);

const mapStateToProps = createStructuredSelector({
  shopCollections: selectCollectionsArray
});

export default connect(mapStateToProps)(CollectionsOverview);
