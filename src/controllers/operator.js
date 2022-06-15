const games = require('../models/model.js');

exports.operator = async (req, res) => {
  try {
    res.send(await games.distinct('operator'));
  } catch (err) {
    res.status(500).send({
      status: 'SERVER ERROR',
      message: 'Error while fetching operators',
    });
  }
};

exports.operatorGameType = async (req, res) => {
  try {
    const { operator } = req.query;
    // List all unique game types -> List all operatorGameType based on operator
    if (operator) res.send(await games.distinct('operatorGameType', { operator }));
    else res.send(await games.distinct('operatorGameType'));
  } catch (err) {
    res.status(500).send({
      status: 'SERVER ERROR',
      message: 'Error while fetching operatorGameType',
    });
  }
};

exports.operatorName = async (req, res) => {
  // ?operator=Fanduel&operatorGameType=Single Game ->
  //  List all operatorNames based on operator and operatorGameType
  try {
    const { operator, operatorGameType } = req.query;
    if (!operator && !operatorGameType) {
      res.send(await games.distinct('operatorName'));
    } else if (operator && operatorGameType) {
      res.send(await games.distinct('operatorName', { operator, operatorGameType }));
    } else {
      res.send(await games.distinct('operatorName', { $or: [{ operator }, { operatorGameType }] }));
    }
  } catch (err) {
    res.status(500).send({
      status: 'SERVER ERROR',
      message: 'Error while fetching operatorName',
    });
  }
};
