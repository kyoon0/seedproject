import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChoresForm from '../ChoresForm';

function Dashboard() {
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	console.log(user);

	useEffect(() => {
		if (!user) {
			navigate('/sign-in');
		}
	}, [user, navigate]);
	return (
		<>
			<section className="heading">
				<h2>Hello {user.name}! Welcome back.</h2>
				<p>Here is your dashboard</p>
			</section>
			<ChoresForm />
		</>
	);
}

export default Dashboard;
