import express from 'express';
import parcelController from '../parcelsControllers/parcels';

// import db from '../db/db';
// import db1 from '../db/db1';

const router = express.Router();

// get all to parcels
router.get('/api/v1/parcels', parcelController.getAllParcels);

// get all parcels by all users
router.get('/api/v1/users', parcelController.getAllUsersParcels);

// get all parcel by a specific user
router.get('/api/v1/users/:id', parcelController.getAllSpecificUserParcels);

// create parcel
router.post('/api/v1/parcels', parcelController.createParcel);

// get a specific parcel
router.get('/api/v1/parcels/:id', parcelController.getSpecificParcel);

// cancel a specific parcel
router.delete('/api/v1/parcels/:id', parcelController.cancelParcel);

export default router;
