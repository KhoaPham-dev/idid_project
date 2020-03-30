import React from 'react';
import { app } from '../base';
import { RenderForget } from './RenderForget';
import { RenderisNotForget } from './RenderisNotForget';


export class Forget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		}
		this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
	}

	sendPasswordResetEmail(event) {
		event.preventDefault();

		const email = document.querySelector('input[name="email"]').value;
		try {
			app.auth().sendPasswordResetEmail(email)
				.then((result) => {
					console.log(result);
					this.setState({
						redirect: true
					})
				})
				.catch((error) => {
					alert(error.message);
				});
		} catch (error) {
			alert(error.message);
		}
	}
	render() {
		if (this.state.redirect === true) {
			return <RenderisNotForget />
		}
		return <RenderForget sendPasswordResetEmail={this.sendPasswordResetEmail} />;
	}
}