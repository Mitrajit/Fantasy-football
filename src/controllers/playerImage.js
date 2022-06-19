const axios = require('axios');
const PlayerImage = require('../models/playerImage');
async function getPlayerImage (req, res) {
  try {
    const { name } = req.query;
    const image = (await PlayerImage.find({ name }))[0];

    if (image) {
      // If response code is not OK then throw error
      try {
        const response = await axios.get(image.imageURL);
        if (response.ok) {
          return res.json({ imageURL: image.imageURL });
        }
      } catch (err) {
        console.log(err); // eslint-disable-line no-console
      }
    }
    const options = {
      method: 'GET',
      url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
      params: {
        q: name, pageNumber: '1', pageSize: '1', autoCorrect: 'true',
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
      },
    };
    axios.request(options).then((response) => {
      const { url } = response.data.value[0];
      const mdbimg = new PlayerImage({ name, imageURL: url });
      mdbimg.save();
      console.log('Saved to database');
      return res.json({ imageURL: url });
    }).catch((error) => {
      console.error(error);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 'SERVER ERROR',
      message: 'Error while fetching player image',
    });
  }
  return null;
}

module.exports = getPlayerImage;