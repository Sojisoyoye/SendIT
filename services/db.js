const pg = require('pg');

const config = {
  user: 'parcelRegister',
  database: 'Parcel_Register',
  password: 'Olusoji18',
  port: '5432',
  max: 10,
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

const createTables = () => {
  const parcelTable = `CREATE TABLE IF NOT EXISTS
    parcels(
        id SERIAL PRIMARY KEY,
        userid VARCHAR(128) NOT NULL,
        sendername VARCHAR(128) NOT NULL,
        receivername VARCHAR(128) NOT NULL,
        pickuplocation VARCHAR(128) NOT NULL,
        destination VARCHAR(128) NOT NULL,
        packagecontent VARCHAR(128) NOT NULL,
        weight VARCHAR(128) NOT NULL,
        price VARCHAR(128) NOT NULL
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
pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  pool,
};

require('make-runnable');
