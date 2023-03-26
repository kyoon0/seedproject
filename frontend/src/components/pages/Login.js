import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../../features/auth/authSlice';

function Login() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess || user) {
			navigate('/dashboard');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(email);
		const userData = {
			email,
			password,
		};
		dispatch(login(userData));
	};

	return (
		<>
			<div className="auth-for-container">
				<form className="register-form" onSubmit={onSubmit}>
					<label htmlFor="email">Here's my email address:</label>
					<input type="email" id="email" name="email" value={email} placeholder="Your Email" onChange={onChange} />

					<label htmlFor="password">Here's my password:</label>
					<input type="password" id="password" name="password" value={password} placeholder="Your Password" onChange={onChange} />

					{email && password ? (
						<>
							<button className="complete" type="submit">
								Log in
							</button>
						</>
					) : (
						<>
							<button className="incomplete" type="submit">
								Log in
							</button>
						</>
					)}
					{/* <button type="submit">Log in</button> */}
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
