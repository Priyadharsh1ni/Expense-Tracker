// routes/expenses.js
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Expense = require('../modals/expense');

// Hardcoded userId as per requirements [cite: 6]
const HARDCODED_USER_ID = 'user-123';

// Validation schema for a new expense 
const expenseSchema = Joi.object({
  description: Joi.string().required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().valid('Food', 'Transport', 'Shopping', 'Utilities', 'Other').required(),
});

// @route   POST /api/expenses
// @desc    Create a new expense [cite: 11]
router.post('/', async (req, res) => {
  const { error } = expenseSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newExpense = new Expense({
      ...req.body,
      userId: HARDCODED_USER_ID, // Associate with the hardcoded user [cite: 6]
    });

    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/expenses
// @desc    Get all expenses for the user [cite: 12]
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: HARDCODED_USER_ID }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense [cite: 13]
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Ensure the expense belongs to the hardcoded user
    if (expense.userId !== HARDCODED_USER_ID) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await expense.remove();
    res.json({ message: 'Expense removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/expenses/summary
// @desc    Get total expenses and summary by category [cite: 14]
router.get('/summary', async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { userId: HARDCODED_USER_ID } },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const totalExpenses = summary.reduce((acc, item) => acc + item.totalAmount, 0);
    const byCategory = summary.reduce((acc, item) => {
      acc[item._id] = item.totalAmount;
      return acc;
    }, {});

    res.json({ total: totalExpenses, byCategory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;