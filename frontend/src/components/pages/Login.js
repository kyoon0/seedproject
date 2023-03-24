import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './Login.css';

function Login() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(email);
	};
	return (
		<>
			<div className="auth-for-container">
				<form className="register-form" onSubmit={onSubmit}>
					<label htmlFor="email">Here's my email address:</label>
					<input type="email" id="email" name="email" value={email} placeholder="Your Email" onChange={onChange} />

					<label htmlFor="password">Here's my password:</label>
					<input type="password" id="password" name="password" value={password} placeholder="Your Password" onChange={onChange} />

					<button type="submit">Sign up</button>
				</form>
				<p>
					Don't have an account?
					<Link to="/sign-up"> Sign up!</Link>
				</p>
			</div>
		</>
	);
}

export default Login;
