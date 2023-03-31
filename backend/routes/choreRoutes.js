const express = require('express');
const router = express.Router();
const { getChores, setChores, updateChores, deleteChores, getUpdatedChores } = require('../controllers/choreController');
const { protect } = require('../middleware/authMiddleware');
router.get('/', protect, getChores);

router.post('/', protect, setChores);

router.put('/:id', protect, updateChores);

router.delete('/:id', protect, deleteChores);

router.patch('/', protect, getUpdatedChores);

module.exports = router;
