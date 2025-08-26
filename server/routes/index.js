const express = require('express');
const router = express.Router();

//auth routes
const authRoutes = require('./auth');
const expenseRoutes = require('./expense');

router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);

module.exports = { router };