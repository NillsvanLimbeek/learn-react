import React, { Fragment } from 'react';
import './Spinner.css';
import spinner from './spinner.gif';

export const Spinner = () => {
    return (
        <Fragment>
            <img className="spinner" src={spinner} alt="Loading..." />
        </Fragment>
    );
};

export default Spinner;
