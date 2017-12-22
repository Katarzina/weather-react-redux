import React from 'react';
import {PropTypes} from 'prop-types';

const propTypes = {
    error: PropTypes.string.isRequired
};

// get error from props
const Error = ({error}) => {
	return (
		<div className="error"> Failed to get data: {error}</div>
	);
}

Error.propTypes = propTypes;

export default Error;