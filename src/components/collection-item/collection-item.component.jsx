import React, { useState } from 'react';
import './collection-item.styles.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({ item, addItem }) => {
  const [willAdd, setWillAdd] = useState(false);
  const [didAdd, setDidAdd] = useState(false);
  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <footer className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </footer>
      <div
        className="add-to-cart-button"
        onClick={() => addItem(item)}
        onMouseDown={() => setWillAdd(true)}
        onMouseUp={() => setDidAdd(true)}
      >
        <Icon icon="cart-plus" className="cart-plus" />
        <Icon icon="plus" className="plus" />
      </div>
      <div
        className="overlay"
        willadd={String(willAdd)}
        didadd={String(didAdd)}
      />
    </div>
  );
};

CollectionItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired
  })
};

const mapActionsToProps = {
  addItem
};

export default connect(
  null,
  mapActionsToProps
)(CollectionItem);
