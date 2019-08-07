import React from 'react';
import './collection-item.styles.scss';
import PropTypes from 'prop-types';

const CollectionItem = ({ name, price, imageUrl }) => (
  <div className="collection-item">
    <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
    <footer className="collection-footer">
      <span className="name">{name}</span>
      <span className="price">${price}</span>
    </footer>
  </div>
);

CollectionItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired
};

export default CollectionItem;
