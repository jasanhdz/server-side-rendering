const dotenv = require('dotenv');

dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  dev: process.env.NODE_ENV,
};

module.exports = { config };
