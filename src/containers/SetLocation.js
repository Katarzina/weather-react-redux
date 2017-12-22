import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchApi} from '../AC';

class Search extends Component {

	static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    onClickHandler = (ev) => {
        ev.preventDefault()
        const { dispatch } = this.props;
        const input = this._inputEl.value
        if (!input.trim()) return
        // Update weather forecast with user input
        dispatch(fetchApi(`q=${input}`, 'weather'))
        dispatch(fetchApi(`q=${input}`, 'forecast'))
        this._inputEl.value = ''
    }

    render() {
        return (
			<form className="form-search" onSubmit={this.onClickHandler}>
				<input
					type="text"
					placeholder="Enter city"
					ref={(node) => {this._inputEl = node}}
				/>
			</form>
        )
    }
}

export default connect()(Search);