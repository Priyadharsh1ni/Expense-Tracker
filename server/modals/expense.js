// models/Expense.js
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Shopping', 'Utilities', 'Other'],
  },
  date: {
    type: Date,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Expense', ExpenseSchema);