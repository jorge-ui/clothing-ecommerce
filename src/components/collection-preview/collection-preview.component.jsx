import React from 'react';
import './collection-preview.styles.scss';
import PropTypes from 'prop-types';
import CollectionItem from '../collection-item/collection-item.component';
import { withRouter } from 'react-router-dom';

const CollectionPreview = ({ title, items, routeName, history, match }) => (
  <div className="collection-preview">
    <h2
      className="title"
      onClick={() => history.push(`${match.url}/${routeName}`)}
    >
      {title.toUpperCase()}
      <span>&#10097;</span>
    </h2>
    <div className="preview">
      {items
        .filter((item, i) => i < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

CollectionPreview.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};
CollectionPreview.defaultProps = {
  title: '',
  items: []
};

export default withRouter(CollectionPreview);
