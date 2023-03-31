import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ChoresForm from '../ChoresForm';
import { getUpdatedChores, getChores, reset } from '../../features/chores/choresSlice';
import ChoreItem from '../choreItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import './Dashboard.css';

function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let state;
	const { user } = useSelector((state) => state.auth);
	const { chores } = useSelector((state) => state.chores);

	function handleOnDragEnd(result) {
		if (!result.destination) return;
		const items = Array.from(chores);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		// console.log(items);
		dispatch(getUpdatedChores(items));
	}

	useEffect(() => {
		if (chores) {
		}
		if (!user) {
			navigate('/sign-in');
		}
		dispatch(getChores());

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, dispatch]);

	return (
		<>
			<section className="heading">
				<h2>Hello {user.name}! Welcome back.</h2>
				<p>Here is your dashboard</p>
				<p>Your balance is: $0</p>
				<button className="request">Request Money</button>
			</section>
			<hr
				style={{
					color: 'lightgrey',
					height: '0.5px',
					width: '70%',
					margin: '10px 10px 10px 72.5px',
				}}
			/>
			<ChoresForm />
			<div className="kanban">
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<section className="one">
						<h3>Back Log</h3>
						<Droppable droppableId="backlog">
							{(provided) => (
								<ul className="backlog" {...provided.droppableProps} ref={provided.innerRef}>
									<div className="column-items">
										{chores.map((chore, index) => {
											return <ChoreItem id={chore._id} choreItem={chore} index={index} />;
										})}
									</div>
									{provided.placeholder}
								</ul>
							)}
						</Droppable>
					</section>

					<section className="two">
						<h3>In Progress</h3>
						<Droppable droppableId="inprogress">
							{(provided) => (
								<ul className="backlog" {...provided.droppableProps} ref={provided.innerRef}>
									<div className="column-items">
										{chores.map((chore, index) => {
											return <ChoreItem id={chore._id} choreItem={chore} index={index} />;
										})}
									</div>
									{provided.placeholder}
								</ul>
							)}
						</Droppable>
					</section>

					<section className="three">
						<h3>Completed</h3>
						<Droppable droppableId="completed">
							{(provided) => (
								<ul className="completed" {...provided.droppableProps} ref={provided.innerRef}>
									<div className="column-items">
										{chores.map((chore, index) => {
											return <ChoreItem id={chore._id} choreItem={chore} index={index} />;
										})}
									</div>
									{provided.placeholder}
								</ul>
							)}
						</Droppable>
					</section>
				</DragDropContext>
			</div>
		</>
	);
}

export default Dashboard;

/* <section className="content">{chores.length > 0 ? <div className="chores">{choreItem}</div> : <div>No chores</div>}</section> */

/* <div className="dashboard">
<DragDropContext onDragEnd={(e) => console.log(e)}>
	{_.map(state, (data, key) => {
		return (
			<div className={'column'}>
				<h3>{data.title}</h3>
				<Droppable droppableId={key}>
					{(provided, snapshot) => {
						return (
							<div className={'droppable-col'} ref={provided.innerRef} {...provided.droppableProps}>
								{data.items.map((el, index) => {
									return (
										<Draggable key={el.id} index={index} draggableId={el.id}>
											{(provided, snapshot) => {
												console.log(snapshot);
											}}
											return(
											<div className={`item ${snapshot.isDragging && 'dragging'}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
												{el.name}
											</div>
											)
										</Draggable>
									);
								})}
							</div>
						);
					}}
				</Droppable>
			</div>
		);
	})}
</DragDropContext> */

// isError, message,
// const choreItem function is created to be passed in return / render.
// chores is pulled from the database via useSelector
// choreItem in line 34 is the passed in argument in choreItem
// const choreItem = chores.map((chore) => {
// 	return <ChoreItem key={chore._id} choreItem={chore} />;
// });
