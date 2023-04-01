import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ChoresForm from '../ChoresForm';
import { getUpdatedChores, getChores, reset } from '../../features/chores/choresSlice';
import ChoreItem from '../choreItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Dashboard.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Dashboard() {
	// const navigate = useNavigate();
	// const dispatch = useDispatch();
	// let state;
	const { user } = useSelector((state) => state.auth);
	// const { chores } = useSelector((state) => state.chores);

	// function handleOnDragEnd(result) {
	// 	if (!result.destination) return;
	// 	const items = Array.from(tasks);
	// 	const [reorderedItem] = items.splice(result.source.index, 1);
	// 	items.splice(result.destination.index, 0, reorderedItem);
	// 	setTasks(items);
	// 	// console.log(items);
	// }
	// 	dispatch(getUpdatedChores(items));

	// useEffect(() => {
	// 	if (!user) {
	// 		navigate('/sign-in');
	// 	}
	// 	dispatch(getChores());

	// 	return () => {
	// 		dispatch(reset());
	// 	};
	// }, [user, navigate, dispatch]);

	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		setTasks(JSON.parse(localStorage.getItem('tasks')));
	}, []);

	// console.log(tasks[0].status);

	// const task = tasks.map((task,))
	// {statuses.map((status, index) => (
	// 	<Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} closed={closed} />
	// ))}
	const filterTasks = tasks.filter((task) => {
		return task.status === 'closed';
	});
	const totalAmount = filterTasks.map((task, index) => {
		const strArr = task.amount;
		// const num = strArr.map(Number);
		return strArr;
	});
	const test = () => {
		let sum = 0;
		for (let i = 0; i < totalAmount.length; i++) {
			sum = sum + Number(totalAmount[i]);
		}
		return sum;
	};

	const sorry = () => {
		alert(`Sorry, this feature is not enabled yet. :'(`);
	};

	return (
		<>
			<section className="heading">
				<h2>Hello {user.name}! Welcome back.</h2>
				<p>Here is your dashboard</p>
				<p>{`Your balance is: $${test()}.00`}</p>
				<button className="request" onClick={sorry}>
					Request Money
				</button>
			</section>
			<hr
				style={{
					color: '#dddddd',
					height: '0.5px',
					width: '70%',
					margin: '10px 10px 10px 72.5px',
					opacity: '50%',
				}}
			/>
			<DndProvider backend={HTML5Backend}>
				<ChoresForm tasks={tasks} setTasks={setTasks} />
				<div className="kanban">
					<ChoreItem tasks={tasks} setTasks={setTasks} />
				</div>
			</DndProvider>

			{/* <div className="kanban">
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<section className="one">
						<h3>Backlog</h3>
						<Droppable droppableId="backlog">
							{(provided) => (
								<ul className="backlog" {...provided.droppableProps} ref={provided.innerRef}>
									<div className="column-items">
										{chores.map((chore, index) => {
											return <ChoreItem id={chore._id} choreItem={chore} index={index} tasks={tasks} setTasks={setTasks} />;
										})}
									</div>
									{provided.placeholder}
								</ul>
							)}
						</Droppable>
					</section>

					<section className="two">
						<h3>In Progress</h3>
					</section>

					<section className="three">
						<h3>Completed</h3>
					</section>
				</DragDropContext>
			</div> */}
		</>
	);
}

export default Dashboard;

// Old code (Working)
// {/* <div className="kanban">
// 				<DragDropContext onDragEnd={handleOnDragEnd}>
// 					<section className="one">
// 						<h3>Backlog</h3>
// 						<Droppable droppableId="backlog">
// 							{(provided) => (
// 								<ul className="backlog" {...provided.droppableProps} ref={provided.innerRef}>
// 									<div className="column-items">
// 										{chores.map((chore, index) => {
// 											return <ChoreItem id={chore._id} choreItem={chore} index={index} tasks={tasks} setTasks={setTasks} />;
// 										})}
// 									</div>
// 									{provided.placeholder}
// 								</ul>
// 							)}
// 						</Droppable>
// 					</section>

// 					<section className="two">
// 						<h3>In Progress</h3>
// 						{/* <Droppable droppableId="inprogress">
// 							{(provided) => (
// 								<ul className="backlog" {...provided.droppableProps} ref={provided.innerRef}>
// 									<div className="column-items">
// 										{chores.map((chore, index) => {
// 											return <ChoreItem id={chore._id} choreItem={chore} index={index} />;
// 										})}
// 									</div>
// 									{provided.placeholder}
// 								</ul>
// 							)}
// 						</Droppable> */}
// 					</section>

// 					<section className="three">
// 						<h3>Completed</h3>
// 						{/* <Droppable droppableId="completed">
// 							{(provided) => (
// 								<ul className="completed" {...provided.droppableProps} ref={provided.innerRef}>
// 									<div className="column-items">
// 										{chores.map((chore, index) => {
// 											return <ChoreItem id={chore._id} choreItem={chore} index={index} />;
// 										})}
// 									</div>
// 									{provided.placeholder}
// 								</ul>
// 							)}
// 						</Droppable> */}
// 					</section>
// 				</DragDropContext>
// 			</div> */}
