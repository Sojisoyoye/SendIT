import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';
// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all to parcels
app.get('/api/v1/parcels', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'parcels retrieved successfully',
    parcels: db
  })
});

// create parcel
app.post('/api/v1/parcels', (req, res) => {
    if(!req.body.userid) {
        return res.status(400).send({
        success: 'false',
        message: 'userid is required'
      });
    } else if(!req.body.sendername) {
        return res.status(400).send({
        success: 'false',
        message: 'sendername is required'
      });
    } else if(!req.body.receivername) {
        return res.status(400).send({
        success: 'false',
        message: 'receivername is required'    
        });  
    } else if(!req.body.pickuplocation) {
      return res.status(400).send({
      success: 'false',
      message: 'pickuplocation is required'    
      });
    } else if(!req.body.destination) {
      return res.status(400).send({
      success: 'false',
      message: 'destination is required'    
      });  
    } else if(!req.body.packagecontent) {
      return res.status(400).send({
      success: 'false',
      message: 'packagecontent is required'    
      });
    } else if(!req.body.weight) {
      return res.status(400).send({
      success: 'false',
      message: 'weight is required'    
      });
    } else if(!req.body.price) {
      return res.status(400).send({
      success: 'false',
      message: 'price is required'
      });
    }

   const parcel = {
     id: db.length + 1,
     userid: req.body.userid,
     sendername: req.body.sendername,
     receivername: req.body.receivername,
     pickuplocation: req.body.pickuplocation,
     destination: req.body.destination,
     packagecontent: req.body.packagecontent,
     weight: req.body.weight,
     price: req.body.price
   }
   db.push(parcel);
 return res.status(201).send({
   success: 'true',
   message: 'parcel added successfully',
   parcel
 })
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});