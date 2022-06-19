const express = require('express');
require('dotenv').config();

const app = express();
const path = require('path');
const operatorRouter = require('./routes/operator');
const playersRouter = require('./routes/players');
const playerImageRouter = require('./routes/playerImage');
require('./services/mongoDB');

app.use('/', operatorRouter);
app.use('/players', playersRouter);
app.use('/playerImage', playerImageRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started\nURL: http://127.0.0.1:${process.env.PORT || 5000}/`); // eslint-disable-line no-console
});
