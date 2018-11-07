import db from '../db/db';
import db1 from '../db/db1';

class ParcelsController {
  getAllParcels(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'Parcels retrieved successfully',
      parcels: db,
    });
  }

  getAllUsersParcels(req, res) {
    return res.status(200).send({
       success: 'true',
       message: 'users parcels retreived successfully',
       parcels: db1
    });
  }

  getAllSpecificUserParcels(req, res) {
    const id = parseInt(req.params.id, 10);
    db1.map((user) => {
      if (user.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'user parcels retrieved successfully',
          user,
        });
      }
   });
   return res.status(404).send({
       success: 'false',
       message: 'user does not exist',
   });
  }

  getSpecificParcel(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((parcel) => {
      if (parcel.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'Parcel retrieved successfully',
          parcel,
        });
      }
    });
    return res.status(404).send({
        success: 'false',
        message: 'Parcel does not exist',
      });
  }

  createParcel(req, res) {
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
   });
  }

 

  cancelParcel(req, res) {
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
  }

  updateParcel(req, res) {
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
  }
}

const parcelController = new ParcelsController();
export default parcelController;