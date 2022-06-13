const express = require('express');
require('dotenv').config();

const app = express();
const operatorRouter = require('./routes/operator');
const playersRouter = require('./routes/players');
require('./services/mongoDB');

app.use('/', operatorRouter);
app.use('/players', playersRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started\nURL: http://127.0.0.1:${process.env.PORT || 5000}/`); // eslint-disable-line no-console
});
