import React from 'react';
import './collection-page.styles.scss';
// Components
import CollectionItem from '../../components/collection-item/collection-item.component';
// Moduled
import { connect } from 'react-redux';
import { createCollectionSelectorByRouteName } from '../../redux/shop/shop.selectors';

const CollectionPage = ({ collection: { items, title } }) => (
  <div className="collection-page">
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
