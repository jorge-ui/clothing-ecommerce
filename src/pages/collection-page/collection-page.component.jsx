import React from 'react';
import './collection-page.styles.scss';
// Components
import CollectionItem from '../../components/collection-item/collection-item.component';
import Footer from '../../components/footer/footer.component';
// Moduled
import { connect } from 'react-redux';
import { createCollectionSelectorByRouteName } from '../../redux/shop/shop.selectors';
import { Link } from 'react-router-dom';

const CollectionPage = ({ collection: { items, title } }) => (
  <div className="collection-page">
    <Link to="/shop" className="go-back">
      Back
    </Link>
    <h1>{title.toUpperCase()} COLLECTION</h1>
    <div className="items">
      {items.map(item => (
        <CollectionItem item={item} key={item.id} />
      ))}
    </div>
    <Footer />
  </div>
);

const mapStateToProps = (state, { match }) => ({
  collection: createCollectionSelectorByRouteName(match.params.collectionName)(
    state
  )
});

export default connect(mapStateToProps)(CollectionPage);
