const games = require('../models/model.js');

exports.players = async (req, res) => {
  // ?operator=&operatorGameType=&operatorName=? ->
  // list all players based on operator, operator game type and operator name
  try {
    const { operator, operatorGameType, operatorName } = req.query;
    if (!operator || !operatorGameType || !operatorName) {
      res.status(404).send({
        status: 'INCOMPLETE QUERY',
        message: 'No players returned because proper query was not provided',
      });
    } else {
      const allplayers = await games.find(
        { $and: [{ operator }, { operatorGameType }, { operatorName }] },
        { dfsSlatePlayers: 1 },
      );
      const players = [];
      allplayers.forEach((data) => {
        players.push(...data.dfsSlatePlayers);
      });
      res.send(players);
    }
  } catch (err) {
    res.status(500).send({
      status: 'SERVER ERROR',
      message: 'Error while fetching players',
    });
  }
};

exports.best = async (req, res) => {
  // ?operator=&operatorGameType=&operatorName=? - Return the highest points player.
  try {
    const { operator, operatorGameType, operatorName } = req.query;
    if (!operator || !operatorGameType || !operatorName) {
      res.status(404).send({
        status: 'INCOMPLETE QUERY',
        message: 'No players returned because proper query was not provided',
      });
    } else {
      const player = (await games.aggregate([
        { $match: { $and: [{ operator }, { operatorGameType }, { operatorName }] } },
        { $unwind: '$dfsSlatePlayers' },
        { $group: { _id: '$dfsSlatePlayers.fantasyPoints', highest: { $push: '$dfsSlatePlayers' } } },
        { $sort: { _id: -1 } },
        { $limit: 1 },
      ]))[0].highest;
      res.send(player);
    }
  } catch (err) {
    res.status(500).send({
      status: 'SERVER ERROR',
      message: 'Error while fetching best player',
    });
  }
};
