import React from 'react';
import './collection-page.styles.scss';
// Components
import CollectionItem from '../../components/collection-item/collection-item.component';
// Moduled
import { connect } from 'react-redux';
import { createCollectionSelectorByRouteName } from '../../redux/shop/shop.selectors';
import { Link } from 'react-router-dom';

const CollectionPage = ({ collection: { items, title } }) => (
  <div className="collection-page">
    <h1>
      <Link to="/shop" className="go-back">
        Back
      </Link>
      COLLECTION
    </h1>
    <h2 className="title">{title.toUpperCase()}</h2>
    <div className="items">
      {items.map(item => (
        <CollectionItem item={item} key={item.id} />
      ))}
    </div>
  </div>
);

const mapStateToProps = (state, { match }) => ({
  collection: createCollectionSelectorByRouteName(match.params.collectionName)(
    state
  )
});

export default connect(mapStateToProps)(CollectionPage);
