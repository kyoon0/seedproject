import React from 'react';
import { useState, useEffect } from 'react';

import './choreItem.css';
import { useDispatch } from 'react-redux';
import { deleteChores } from '../features/chores/choresSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDrag, useDrop } from 'react-dnd';

//id, choreItem, index, to be passed in as arguments
function ChoreItem({ tasks, setTasks }) {
	// console.log(tasks[0].status);
	const dispatch = useDispatch();

	const [todos, setTodos] = useState([]);
	const [inProgress, setInProgress] = useState([]);
	const [closed, setClosed] = useState([]);

	useEffect(() => {
		const fTodos = tasks.filter((task) => task.status === 'todo');
		const fInProgress = tasks.filter((task) => task.status === 'inprogress');
		const fClosed = tasks.filter((task) => task.status === 'closed');

		setTodos(fTodos);
		setInProgress(fInProgress);
		setClosed(fClosed);
	}, [tasks]);

	const statuses = ['todo', 'inprogress', 'closed'];
	// console.log(tasks.name);

	return (
		<>
			<div className="choreItem">
				{statuses.map((status, index) => (
					<Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} closed={closed} />
				))}
			</div>
		</>
	);
}

export default ChoreItem;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'task',
		drop: (item) => addItemToSection(item.id),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	// console.log(status);

	let text = 'Backlog';
	let tasksToMap = todos;

	if (status === 'inprogress') {
		text = 'In Progress';
		tasksToMap = inProgress;
	}

	if (status === 'closed') {
		text = 'Completed';
		tasksToMap = closed;
	}

	const addItemToSection = (id) => {
		// console.log('dropped', id, status);
		// console.log(status);

		setTasks((prev) => {
			const mTasks = prev.map((t) => {
				if (t.id === id) {
					return { ...t, status: status };
				}
				return t;
			});
			localStorage.setItem('tasks', JSON.stringify(mTasks));
			return mTasks;
		});
	};

	return (
		<>
			<div className="columns" ref={drop}>
				<Header todos={todos} inProgress={inProgress} closed={closed} text={text} count={tasksToMap.length} />
				{tasksToMap.length > 0 && tasksToMap.map((task) => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
			</div>
		</>
	);
};

const Header = ({ text, count }) => {
	return (
		<>
			<div className="header">
				<h3>{text}</h3>
				<div>{count}</div>
			</div>
		</>
	);
};

const Task = ({ task, tasks, setTasks }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'task',
		item: { id: task.id },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	const handleRemove = (id) => {
		const fTasks = tasks.filter((t) => t.id !== id);
		localStorage.setItem('tasks', JSON.stringify(fTasks));
		setTasks(fTasks);
	};

	return (
		<>
			<div className="choreitem-container" ref={drag}>
				<div className="choreitem">
					{task.status === 'closed' ? (
						<>
							<p className="strikethru">{task.name}</p>
						</>
					) : (
						<>
							<p>{task.name}</p>
						</>
					)}
				</div>
				<div className="right-side">
					<p>${task.amount}</p>
					<button className=" close-button" onClick={() => handleRemove(task.id)}>
						x
					</button>
				</div>
			</div>
		</>
	);
};

//Old code (working)

// {/* <Draggable key={id} draggableId={id} index={index}>
// {(provided) => (
// 	<li className="item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
// 		<div className="choreitem-container">
// 			<div className="choreitem">
// 				<div>{choreItem.text}</div>
// 				<div>${choreItem.amount}</div>
// 			</div>
// 			<button onClick={() => dispatch(deleteChores(choreItem._id))} className="close-button">
// 				X
// 			</button>
// 		</div>
// 	</li>
// )}
// </Draggable> */}
