const mongooose = require('mongoose');

mongooose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
