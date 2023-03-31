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
					<li className="item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<div className="choreitem-container">
							<div className="choreitem">
								<div>{choreItem.text}</div>
								<div>${choreItem.amount}</div>
							</div>
							<button onClick={() => dispatch(deleteChores(choreItem._id))} className="close-button">
								X
							</button>
						</div>
					</li>
				)}
			</Draggable>
		</>
	);
}

export default ChoreItem;
