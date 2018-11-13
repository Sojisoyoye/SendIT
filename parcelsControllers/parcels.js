/* eslint-disable class-methods-use-this */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import parcels from '../db/db';
import users from '../db/db1';

class ParcelsController {
  getAllParcels(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'Parcels retrieved successfully',
      parcels,
    });
  }

  getAllUsersParcels(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'users parcels retreived successfully',
      parcels: users,
    });
  }

  getAllSpecificUserParcels(req, res) {
    const findUser = users.find(user => user.id === parseInt(req.params.id, 10));
    if (findUser) {
      return res.status(200).json({
        User: findUser,
        message: 'A single user parcels',
      });
    }
    return res.status(404).json({
      message: 'user record not found',
    });
  }

  getSpecificParcel(req, res) {
    const findParcel = parcels.find(parcel => parcel.id === parseInt(req.params.id, 10));
    if (findParcel) {
      return res.status(200).json({
        Parcel: findParcel,
        message: 'A single Parcel',
      });
    }
    return res.status(404).json({
      message: 'parcel record not found',
    });
  }

  createParcel(req, res) {
    if (!req.body.userid) {
      return res.status(400).send({
        success: 'false',
        message: 'userid is required',
      });
    } if (!req.body.sendername) {
      return res.status(400).send({
        success: 'false',
        message: 'sendername is required',
      });
    } if (!req.body.receivername) {
      return res.status(400).send({
        success: 'false',
        message: 'receivername is required',
      });
    } if (!req.body.pickuplocation) {
      return res.status(400).send({
        success: 'false',
        message: 'pickuplocation is required',
      });
    } if (!req.body.destination) {
      return res.status(400).send({
        success: 'false',
        message: 'destination is required',
      });
    } if (!req.body.packagecontent) {
      return res.status(400).send({
        success: 'false',
        message: 'packagecontent is required',
      });
    } if (!req.body.weight) {
      return res.status(400).send({
        success: 'false',
        message: 'weight is required',
      });
    } if (!req.body.price) {
      return res.status(400).send({
        success: 'false',
        message: 'price is required',
      });
    }

    const parcel = {
      id: parcels.length + 1,
      userid: req.body.userid,
      sendername: req.body.sendername,
      receivername: req.body.receivername,
      pickuplocation: req.body.pickuplocation,
      destination: req.body.destination,
      packagecontent: req.body.packagecontent,
      weight: req.body.weight,
      price: req.body.price,
    };
    parcels.push(parcel);
    return res.status(201).send({
      success: 'true',
      message: 'parcel added successfully',
      parcel,
    });
  }

  cancelParcel(req, res) {
    const findParcel = parcels.find(parcel => parcel.id === parseInt(req.params.id, 10));
    if (findParcel) {
      parcels.splice(findParcel, 1);
      return res.status(200).json({
        message: 'Parcel canceled successfully',
      });
    }
    return res.status(404).json({
      message: 'parcel record not found',
    });
  }
}

const parcelController = new ParcelsController();
export default parcelController;
