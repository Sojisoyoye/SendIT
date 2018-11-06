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

// get a specific parcel
app.get('/api/v1/parcels/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((parcel) => {
      if (parcel.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'parcel retrieved successfully',
          parcel,
        });
    }
});
return res.status(404).send({
  success: 'false',
  message: 'parcel does not exist',
});
});

// cancel a specific parcel
app.delete('/api/v1/parcels/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((parcel, index) => {
      if (parcel.id === id) {
         db.splice(index, 1);
         return res.status(200).send({
           success: 'true',
           message: 'Parcel deleted successfuly',
         });
      }
    });
    return res.status(404).send({
        success: 'false',
        message: 'Parcel not found',
      });
  });

  // update a specific parcel
  app.put('/api/v1/parcels/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let parcelFound;
    let itemIndex;
    db.map((parcel, index) => {
      if (parcel.id === id) {
        parcelFound = parcel;
        itemIndex = index;
      }
    });
  
    if (!parcelFound) {
      return res.status(404).send({
        success: 'false',
        message: 'parcel not found',
      });
    }
    if (!req.body.userid) {
        return res.status(400).send({
          success: 'false',
          message: 'userid is required',
        });
      } else if (!req.body.sendername) {
        return res.status(400).send({
          success: 'false',
          message: 'sendername is required',
        });
      } else if (!req.body.receivername) {
        return res.status(400).send({
          success: 'false',
          message: 'receivername is required',
        });
      } else if (!req.body.pickuplocation) {
        return res.status(400).send({
          success: 'false',
          message: 'pickuplocation is required',
        });
      } else if (!req.body.destination) {
        return res.status(400).send({
          success: 'false',
          message: 'destination is required',
        });
      } else if (!req.body.packagecontent) {
        return res.status(400).send({
          success: 'false',
          message: 'packagecontent is required',
        });
      } else if (!req.body.weight) {
        return res.status(400).send({
          success: 'false',
          message: 'weight is required',
        });
      } else if (!req.body.price) {
        return res.status(400).send({
          success: 'false',
          message: 'price is required',
        });
      } 
    
      const updatedParcel = {
        id: parcelFound.id,
        userid: req.body.userid || parcelFound.userid,
        sendername: req.body.sendername || parcelFound.sendername,
        receivername: req.body.receivername || parcelFound.receivername,
        pickuplocation: req.body.pickuplocation || parcelFound.pickuplocation,
        destination: req.body.destination || parcelFound.destination,
        packagecontent: req.body.packagecontent || parcelFound.packagecontent,
        weight: req.body.weight || parcelFound.weight,
        price: req.body.price || parcelFound.price,
      };
    
      db.splice(itemIndex, 1, updatedParcel)
    
      return res.status(201).send({
        success: 'true',
        message: 'Parcel added successfully',
        updatedParcel,
    });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});