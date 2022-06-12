const jsondata = require('../../data/data.json');

exports.players = (req, res) => {
  // ?operator=&operatorGameType=&operatorName=? ->
  // list all players based on operator, operator game type and operator name
  try {
    const { operator, operatorGameType, operatorName } = req.query;
    if (!operator && !operatorGameType && !operatorName) {
      res.status(404).send({
        status: 'INCOMPLETE QUERY',
        message: 'No players returned because proper query was not provided',
      });
    }

    const players = [];
    jsondata.forEach((data) => {
      if (operator === data.operator
                    && operatorGameType === data.operatorGameType
                     && operatorName === data.operatorName) players.push(data.dfsSlatePlayers);
    });
    res.send(players);
  } catch (err) {
    res.status(500).send({
      status: 'SERVER ERROR',
      message: 'Error while fetching players',
    });
  }
};

exports.best = (req, res) => {
  // ?operator=&operatorGameType=&operatorName=? - Return the highest points player.
  try {
    const { operator, operatorGameType, operatorName } = req.query;
    if (!operator && !operatorGameType && !operatorName) {
      res.status(404).send({
        status: 'INCOMPLETE QUERY',
        message: 'No players returned because proper query was not provided',
      });
    } else {
      let players = [];
      let max = 0;
      jsondata.forEach((gameData) => {
        if (operator === gameData.operator
                    && operatorGameType === gameData.operatorGameType
                    && operatorName === gameData.operatorName) {
          gameData.dfsSlatePlayers.forEach((player) => {
            if (player.fantasyPoints > max) {
              max = player.fantasyPoints;
              players = [player];
            } else if (player.fantasyPoints === max) {
              players.push(player);
            }
          });
        }
      });
      res.send(players);
    }
  } catch (err) {
    res.status(500).send({
      status: 'SERVER ERROR',
      message: 'Error while fetching best player',
    });
  }
};
