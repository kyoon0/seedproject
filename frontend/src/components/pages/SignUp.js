//Register user
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './SignUp.css';
//useEffect

function SignUp() {
	// const [email, setEmail] = useState('');
	// const [password, setPass] = useState('');
	// const [name, setName] = useState('');
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = formData;

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
					<label htmlFor="name">What's your name?</label>
					<input type="text" id="name" name="name" value={name} placeholder="Your Name" onChange={onChange} />

					<label htmlFor="email">Here's my email address:</label>
					<input type="email" id="email" name="email" value={email} placeholder="Your Email" onChange={onChange} />

					<label htmlFor="password">Here's my password:</label>
					<input type="password" id="password" name="password" value={password} placeholder="Your Password" onChange={onChange} />

					<button type="submit">Sign up</button>
				</form>
				<p>
					Have an account?
					<Link to="/sign-in"> Login</Link>
				</p>
			</div>
		</>
	);
}

export default SignUp;
