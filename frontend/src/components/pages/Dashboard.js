import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ChoresForm from '../ChoresForm';
import { getChores, reset } from '../../features/chores/choresSlice';
import ChoreItem from '../choreItem';

function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { chores, isError, message } = useSelector((state) => state.chores);

	// console.log(user);
	console.log(chores);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!user) {
			navigate('/sign-in');
		}
		dispatch(getChores());

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, isError, message, dispatch]);

	const choreItem = chores.map((chore) => {
		return <ChoreItem key={chore._id} choreItem={chore} />;
	});

	return (
		<>
			<section className="heading">
				<h2>Hello {user.name}! Welcome back.</h2>
				<p>Here is your dashboard</p>
			</section>
			<ChoresForm />
			<section className="content">{chores.length > 0 ? <div className="chores">{choreItem}</div> : <div>No chores</div>}</section>
		</>
	);
}

export default Dashboard;
