import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAllShop } from '../../redux/shop/shop.selectors';

const ShopPage = ({ shopCollections }) => (
  <div className="shop-page">
    <h1>COLLECTIONS</h1>
    {shopCollections.map(({ id, ...rest }) => (
      <CollectionPreview key={id} {...rest} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  shopCollections: selectAllShop
});

export default connect(mapStateToProps)(ShopPage);
