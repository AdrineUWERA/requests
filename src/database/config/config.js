import dotenv from 'dotenv';

dotenv.config();
const { DATABASE_URL, SSL } = process.env;

const ssl = Boolean(SSL);

module.exports = {
  development: {
    url: DATABASE_URL,
    dialectOptions: {
      ssl,
    },
  },
  test: {
    url: DATABASE_URL,
  },
  production: {
    url: DATABASE_URL,
    dialectOptions: {
      ssl,
    },
  },
};
