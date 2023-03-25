//Register user
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './SignUp.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../features/auth/authSlice';

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

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

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
		const userData = {
			name,
			email,
			password,
		};

		dispatch(register(userData));
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

					{name && email && password ? (
						<>
							<button className="complete" type="submit">
								Sign up
							</button>
						</>
					) : (
						<>
							<button className="incomplete" type="submit">
								Sign up
							</button>
						</>
					)}
				</form>
				<p className="register">
					Have an account?
					<Link to="/sign-in"> Log in</Link>
				</p>
			</div>
		</>
	);
}

export default SignUp;
