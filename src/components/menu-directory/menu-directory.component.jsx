import React from 'react';
import './menu-directory.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

const MenuDirectory = ({ sections }) => (
  <div className="menu-directory">
    {sections.map(({ id, ...rest }) => (
      <MenuItem key={id} {...rest} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectSections
});

export default connect(mapStateToProps)(MenuDirectory);
