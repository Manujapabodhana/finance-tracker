const express = require('express');
const Income = require('../models/Income');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   POST /api/incomes
// @desc    Add a new income
// @access  Private
router.post('/', auth, async (req, res) => {
  const { amount, description } = req.body;
  try {
    const newIncome = new Income({
      user: req.user, // from auth middleware
      amount,
      description
    });
    await newIncome.save();
    res.json(newIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/incomes
// @desc    Get all incomes of logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user }).sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/incomes/:id
// @desc    Update an income
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );
    res.json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/incomes/:id
// @desc    Delete an income
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Income.findOneAndDelete({ _id: req.params.id, user: req.user });
    res.json({ message: 'Income deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
