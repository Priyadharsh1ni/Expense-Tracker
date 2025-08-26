// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { router } = require('./routes/index');

const app = express();

connectDB();


app.use(cors());
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));