require('dotenv').config();

module.exports = {
  development: {
    client: process.env.DATABASE_URL ? 'pg' : 'sqlite3',
    connection: process.env.DATABASE_URL || {
      filename: './db/dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    }
  }
};
