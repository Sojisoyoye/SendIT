const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createParcelTable = () => {
  const parcelTable = `CREATE TABLE IF NOT EXISTS
     parcels(
        id SERIAL PRIMARY KEY,
        userid SERIAL,
        pickuplocation VARCHAR(128) NOT NULL,
        destination VARCHAR(128) NOT NULL,
        currentlocation VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        weight VARCHAR(128) NOT NULL,
        senton TIMESTAMP DEFAULT NOW(),
        deliveredon TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (userid) REFERENCES users (id) ON DELETE CASCADE
    )`;

  pool.query(parcelTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const createUserTable = () => {
  const userTable = `CREATE TABLE IF NOT EXISTS
    users(
        id SERIAL,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        phone VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        registered TIMESTAMP DEFAULT NOW(),
        isadmin BOOLEAN DEFAULT 'false',
        PRIMARY KEY (id)
    )`;

  pool.query(userTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const dropParcelTable = () => {
  const parcelTable = 'DROP TABLE IF EXISTS parcels returning *';
  pool.query(parcelTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUserTable = () => {
  const userTable = 'DROP TABLE IF EXISTS users returning *';
  pool.query(userTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const createAllTables = () => {
  createUserTable();
  createParcelTable();
};

const dropAllTables = () => {
  dropUserTable();
  dropParcelTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createParcelTable,
  createUserTable,
  createAllTables,
  dropUserTable,
  dropParcelTable,
  dropAllTables,
};

require('make-runnable');
