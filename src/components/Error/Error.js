import React, { Component} from 'react';

class Error extends Component {
	render() {
		return (
			<div className="error"> Failed to get data: {this.props.error}</div>
		);
	}
}

export default Error;