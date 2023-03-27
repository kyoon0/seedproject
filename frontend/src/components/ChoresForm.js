import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChores } from '../features/chores/choresSlice';

function ChoresForm() {
	const dispatch = useDispatch();

	const [text, setChore] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createChores({ text }));
		setChore('');
	};

	const onChange = (e) => {
		setChore(e.target.value);
	};
	return (
		<>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="text">Chores</label>
						<input type="text" id="text" name="text" value={text} onChange={onChange} />
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
