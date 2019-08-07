import React from 'react';
import './form-input.styles.scss';

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

export default FormInput;
