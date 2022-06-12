const jsondata = require('../../data/data.json');

exports.operator = (req, res) => {
  try {
    const operators = new Set();
    jsondata.forEach((data) => {
      operators.add(data.operator);
    });
    res.send(Array.from(operators));
  } catch (err) {
    res.status(500).send({
      status: 'SERVER ERROR',
      message: 'Error while fetching operators',
    });
  }
};

exports.operatorGameType = (req, res) => {
  try {
    // List all unique game types -> List all operatorGameType based on operator
    const operatorGameTypes = new Set();
    jsondata.forEach((data) => {
      if (!req.query.operator) operatorGameTypes.add(data.operatorGameType);
      else
      if (req.query.operator === data.operator) operatorGameTypes.add(data.operatorGameType);
    });
    res.send(Array.from(operatorGameTypes));
  } catch (err) {
    res.status(500).send({
      status: 'SERVER ERROR',
      message: 'Error while fetching operatorGameType',
    });
  }
};

exports.operatorName = (req, res) => {
  // ?operator=Fanduel&operatorGameType=Single Game ->
  //  List all operatorNames based on operator and operatorGameType
  try {
    const operatorNames = new Set();
    jsondata.forEach((data) => {
      const { operator, operatorGameType } = req.query;
      if (!operator && !operatorGameType) {
        operatorNames.add(data.operatorName);
      } else if (operator && operatorGameType) {
        if (operator === data.operator
          && operatorGameType === data.operatorGameType) {
          operatorNames.add(data.operatorName);
        }
      } else if (operator === data.operator
        || operatorGameType === data.operatorGameType) {
        operatorNames.add(data.operatorName);
      }
    });
    res.send(Array.from(operatorNames));
  } catch (err) {
    res.status(500).send({
      status: 'SERVER ERROR',
      message: 'Error while fetching operatorName',
    });
  }
};
