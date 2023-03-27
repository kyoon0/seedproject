// asyncHandler will prevnt you from having to write try-catch boilerplate for every async handler
// instead of async/try/catch, you can simply write asyncHandler/throw new Error
const asyncHandler = require('express-async-handler');
const Chore = require('../models/choreModel');
const User = require('../models/userModel');

// @desc Get Chores
// @route GET /api/chores
// @access Private
const getChores = asyncHandler(async (req, res) => {
	const chores = await Chore.find({ user: req.user.id });
	console.log(req.user).blue;
	console.log(chores);
	res.status(200).json(chores);
});

// @desc Set Chores
// @route POST /api/chores
// @access Private
const setChores = asyncHandler(async (req, res) => {
	// console.log(req.body.text);
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}
	const chore = await Chore.create({
		text: req.body.text,
		user: req.user.id,
	});
	res.status(200).json(chore);
});

// @desc Update Chores
// @route PUT /api/chores/:id
// @access Private
const updateChores = asyncHandler(async (req, res) => {
	const chore = await Chore.findById(req.params.id);
	if (!chore) {
		res.status(400);
		throw new Error('Chore not found');
	}

	// We do not need to findById since it is passed through protect middleware
	// const user = await User.findById(req.user.id);

	// Chcek for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the chore user
	if (chore.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedChore = await Chore.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(200).json(updatedChore);
});

// @desc Delete Chores
// @route DELETE /api/chores/:id
// @access Private
const deleteChores = asyncHandler(async (req, res) => {
	const chore = await Chore.findById(req.params.id);
	if (!chore) {
		res.status(400);
		throw new Error('Chore not found');
	}

	const user = await User.findById(req.user.id);

	// Chcek for user
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the chore user
	if (chore.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await chore.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getChores,
	setChores,
	updateChores,
	deleteChores,
};
