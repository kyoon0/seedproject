import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createChores } from '../features/chores/choresSlice';
import './ChoresForm.css';
import { v4 as uuidv4 } from 'uuid';

function ChoresForm({ tasks, setTasks }) {
	const dispatch = useDispatch();

	// const [text, setChore] = useState('');
	// const [amount, setAmount] = useState('');
	const [task, setTask] = useState({
		id: '',
		name: '',
		amount: '',
		status: 'todo',
	});

	// const onSubmit = (e) => {
	// 	e.preventDefault();
	// 	dispatch(createChores({ text, amount }));
	// 	setChore('');
	// 	setAmount('');
	// };

	// prev is referring to previous tasks but named with different variable
	const onSubmit = (e) => {
		e.preventDefault();
		setTasks((prev) => {
			const list = [...prev, task];
			localStorage.setItem('tasks', JSON.stringify(list));
			return list;
		});
		setTask({
			id: '',
			name: '',
			amount: '',
			status: 'todo',
		});
	};

	return (
		<>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<div className="input-field">
							<label className="text" htmlFor="text">
								Add a Chore:
							</label>
							<input type="text" id="text" name="text" placeholder="New Chore..." value={task.name} onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })} />
							<label className="quantity" htmlFor="quantity">
								Dollar Amount:
							</label>
							<input
								type="number"
								id="quantity"
								name="quantity"
								min="1"
								max="5"
								placeholder="Between $1 and $5..."
								value={task.amount}
								onChange={(e) => setTask({ ...task, amount: e.target.value })}
							/>
						</div>
						<div className="chore-add">
							{task.name && task.amount ? (
								<button className="addChore-red" type="submit">
									Add Chore
								</button>
							) : (
								<button className="addChore-none" type="submit">
									Add Chore
								</button>
							)}
						</div>
					</div>
				</form>
			</section>
		</>
	);
}

export default ChoresForm;

// Old code (Working)
// {/* <section className="form">
// <form onSubmit={onSubmit}>
// 	<div className="form-group">
// 		<label className="text" htmlFor="text">
// 			Add a Chore:
// 		</label>
// 		<input type="text" id="text" name="text" placeholder="New Chore..." value={text} onChange={(e) => setChore(e.target.value)} />
// 		<label className="quantity" htmlFor="quantity">
// 			Dollar Amount:
// 		</label>
// 		<input type="number" id="quantity" name="quantity" min="1" max="5" placeholder="Between $1 and $5..." value={amount} onChange={(e) => setAmount(e.target.value)} />

// 		{text && amount ? (
// 			<button className="addChore-red" type="submit">
// 				Add Chore
// 			</button>
// 		) : (
// 			<button className="addChore-none" type="submit">
// 				Add Chore
// 			</button>
// 		)}
// 	</div>
// </form>
// </section> */}
