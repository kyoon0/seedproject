import React from 'react';
import './choreItem.css';
import { useDispatch } from 'react-redux';
import { deleteChores } from '../features/chores/choresSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ChoreItem({ id, choreItem, index }) {
	const dispatch = useDispatch();

	return (
		<>
			<Draggable key={id} draggableId={id} index={index}>
				{(provided) => (
					<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<div>{choreItem.text}</div>
						<div>${choreItem.amount}</div>

						<button onClick={() => dispatch(deleteChores(choreItem._id))} className="close">
							X
						</button>
					</li>
				)}
			</Draggable>
		</>
	);
}

export default ChoreItem;
