const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Expense = require('../modals/expense');

const HARDCODED_USER_ID = 'user-123';

const expenseSchema = Joi.object({
  description: Joi.string().min(1).required(),
  amount: Joi.number().positive().required(),
  category: Joi.string()
    .valid("Food", "Transport", "Shopping", "Utilities", "Entertainment", "Healthcare", "Other")
    .required(),
  date: Joi.date().required(), 
})


router.post('/', async (req, res) => {
  const { error } = expenseSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message.replace(/"/g, '') });
  }

  try {
    const newExpense = new Expense({
      ...req.body,
      userId: HARDCODED_USER_ID, 
    });

    const expense = await newExpense.save({ timeout: false });
    res.status(201).json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: HARDCODED_USER_ID }).sort({ date: -1 }).lean().exec();
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/:id', async (req, res) => {
  try {

    const expense = await Expense.findByIdAndDelete({ _id: req.params.id, userId: HARDCODED_USER_ID });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


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
    ]).allowDiskUse(true).exec();

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



router.put('/:id', async (req, res) => {
    const { error } = expenseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message.replace(/"/g, '') });
    }
  
    try {
      const updatedExpense = await Expense.findOneAndUpdate(
        { _id: req.params.id, userId: HARDCODED_USER_ID },
        req.body,
        { new: true }
      );
  
      if (!updatedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.json(updatedExpense);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
});

module.exports = router;