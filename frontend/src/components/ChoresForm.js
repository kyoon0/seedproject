import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChores } from '../features/chores/choresSlice';

function ChoresForm() {
	const dispatch = useDispatch();

	const [text, setChore] = useState('');
	const [amount, setAmount] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createChores({ text, amount }));
		setChore('');
		setAmount('');
	};

	return (
		<>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="text">Chores</label>
						<input type="text" id="text" name="text" value={text} onChange={(e) => setChore(e.target.value)} />
						<label htmlFor="quantity">Dollar Amount (between $1 and $5):</label>
						<input type="number" id="quantity" name="quantity" min="1" max="5" value={amount} onChange={(e) => setAmount(e.target.value)} />
					</div>
					<div className="form-group">
						<button className="btn btn-block" type="submit">
							Add Chore
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default ChoresForm;

// const choresData = {
// 	text,
// 	amount,
// };
// dispatch(createChores(choresData));
// setValues({
// 	text: '',
// 	amount: '',
// });
// setChore('');

// const onChange = (e) => {
// 	const { name, value } = e.target;
// 	setValues((prevState) => ({
// 		...prevState,
// 		[name]: value,
// 	}));
// setChore(e.target.value);
// };
