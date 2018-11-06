import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.js';

//import db from './db/db';
//import db1 from './db/db1';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//to use router 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});