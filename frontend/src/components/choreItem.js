import React from 'react';
import './choreItem.css';
import { useDispatch } from 'react-redux';
import { deleteChores } from '../features/chores/choresSlice';

function ChoreItem({ choreItem }) {
	const dispatch = useDispatch();

	return (
		<div className="choreItem">
			<div>{choreItem.text}</div>
			<div>${choreItem.amount}</div>
			<button onClick={() => dispatch(deleteChores(choreItem._id))} className="close">
				X
			</button>
		</div>
	);
}

export default ChoreItem;
