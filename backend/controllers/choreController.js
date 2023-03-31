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
		amount: req.body.amount,
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

const deleteChores = (req, res) => {
	Chore.deleteOne({ _id: req.params.id }).then((data) => {
		console.log(data);
	});
	res.status(200).json({ id: req.params.id });
};

// @desc Patch Updated Chores
// @route PATCH /api/chores
// @access Private
const getUpdatedChores = asyncHandler(async (req, res) => {
	// const chores = await Chore.find({ user: req.user.id });
	// Chore.remove({});
	// console.log(chores);

	const updatedChores = req.body;
	// // console.log(req.body[0]._id);
	// const promises = updatedChores.map(async (chore, index) => {
	// 	let orderkey = index + 1;
	// 	const promise = Chore.updateOne({ _id: chore._id }, { $set: { updatedChores: orderkey } });
	// 	console.log(promise);
	// 	return promise;
	// });

	// const results = await Promise.all(promises);
	// // console.log(results);
	// // console.log(updatedChores);
	// const chores = await Chore.find({ user: req.user.id });

	res.status(200).json(updatedChores);

	// const updatedChore = await Chore.collection.find().sort(); // 1 3 2
	// console.log(Chore.getCollection('chores').find());
	// console.log(Chore.getCollection('chores'));
	// let updatedChores;
	// // console.log(req.body[0]); // 1 2 3
	// const chores = await Chore.find({ user: req.user.id });
	// await Chores.sort((prev, next) => {
	// 	return req.body.indexOf(prev) - req.body.indexOf(next);
	// });
	// console.log(chores);
	// let updatedChores = await Chore.update(chores, req.body);

	// const chore = await Chore.create({
	// 	text: req.body.text,
	// 	user: req.user.id,
	// 	amount: req.body.amount,
	// });
	// res.status(200).json(chore);
});

// @desc Delete Chores
// @route DELETE /api/chores/:id
// @access Private
// const deleteChores = asyncHandler(async (req, res) => {
// 	await Chore.deleteOne({ _id: req.params.id });
// 	res.status(200).json({ _id: req.params.id });
// });
// const deleteChores = asyncHandler(async (req, res) => {
// 	const chore = await Chore.findById(req.params.id);
// 	if (!chore) {
// 		res.status(400);
// 		throw new Error('Chore not found');
// 	}

// 	const user = await User.findById(req.user.id);

// 	// Chcek for user
// 	if (!user) {
// 		res.status(401);
// 		throw new Error('User not found');
// 	}

// 	// Make sure the logged in user matches the chore user
// 	if (chore.user.toString() !== user.id) {
// 		res.status(401);
// 		throw new Error('User not authorized');
// 	}

// 	// const remove = await Chore.deleteOne({ id: req.params.id });
// 	// console.log('deleted confirmed');
// 	await chore.remove();

// 	res.status(200).json({ id: req.params.id });
// });

module.exports = {
	getChores,
	setChores,
	updateChores,
	deleteChores,
	getUpdatedChores,
};
