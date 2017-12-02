import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchApi } from '../AC'

class Search extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

   onClickHandler = (ev) => {
			ev.preventDefault()
			const input = this.refs.town
			if (!input.value.trim()) return
			// Update weather with user input
       const { dispatch } = this.props;
       dispatch(fetchApi(`q=${input.value}`, 'weather'))
			 dispatch(fetchApi(`q=${input.value}`, 'forecast'))
			 input.value = ''
	}


	render() {
		return (
			<form className="form-search" onSubmit={this.onClickHandler.bind(this)}>
				<input type="text" placeholder="Enter city" ref="town" />
			</form>
		)
	}
}

export default connect()(Search)