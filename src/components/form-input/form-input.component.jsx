import React from 'react';
import './form-input.styles.scss';
import PropTypes from 'prop-types';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  let shrinked = Boolean(otherProps.value);
  return (
    <div className="form-input">
      <input className="input" onChange={handleChange} {...otherProps} />
      {label ? (
        <label className="input-label" shrink={String(shrinked)}>
          {label}
        </label>
      ) : null}
    </div>
  );
};

FormInput.propTypes = {
  handleChange: PropTypes.func,
  label: PropTypes.string
};

export default FormInput;
