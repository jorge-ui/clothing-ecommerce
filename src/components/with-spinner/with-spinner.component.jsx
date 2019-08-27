import React from 'react';
import './with-spinner.styles.scss';
import spinnerPng from '../../assets/black-spinner.png';

const WithSpinner = WrapedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <div id="LoadingState" className="with-spinner">
      <img src={spinnerPng} alt="Loading..." />
    </div>
  ) : (
    <WrapedComponent {...otherProps} />
  );
};

export default WithSpinner;
