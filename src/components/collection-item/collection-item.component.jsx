import React, { useState } from 'react';
import './collection-item.styles.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';
import { useTransition, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const CollectionItem = ({ item, addItem }) => {
  // Component state
  const [pressed, setPressed] = useState(false);

  // Gestures
  const bind = useDrag(({ down }) => setPressed(down));

  // Transition group
  const transition = useTransition(pressed, null, transitionConfig);

  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item" pressed={String(pressed)}>
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <footer className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </footer>
      <div
        {...bind()}
        className="add-to-cart-button"
        onClick={() => addItem(item)}
      >
        <Icon icon="cart-plus" className="cart-plus" />
        <Icon icon="plus" className="plus" />
      </div>
      {transition.map(
        ({ item, key, props }) =>
          item && <animated.div className="overlay" key={key} style={props} />
      )}
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

const transitionConfig = {
  from: {
    transform: 'scale(0)',
    opacity: 0.5
  },
  enter: { transform: 'scale(10)' },
  leave: { opacity: 0 },
  config: {
    mass: 6,
    tension: 370,
    friction: 20,
    clamp: true
  },
  trail: 50
};
