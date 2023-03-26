// asyncHandler will prevnt you from having to write try-catch boilerplate for every async handler
// instead of async/try/catch, you can simply write asyncHandler/throw new Error
const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });
	res.status(200).json(goals);
});

// @desc Set Goals
// @route POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
	// console.log(req.body.text);
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}
	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	});
	res.status(200).json(goal);
});

// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error('Goal not found');
	}

	// We do not need to findById since it is passed through protect middleware
	// const user = await User.findById(req.user.id);

	// Chcek for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the goal user
	if (goal.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(200).json(updatedGoal);
});

// @desc Delete Goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error('Goal not found');
	}

	const user = await User.findById(req.user.id);

	// Chcek for user
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the goal user
	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await goal.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getGoals,
	setGoals,
	updateGoals,
	deleteGoals,
};
