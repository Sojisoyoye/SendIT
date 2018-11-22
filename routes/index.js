import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
// import parcelController from '../parcelsControllers/parcels';
import Parcel from '../src/postgres/controllers/parcel';
import User from '../src/postgres/controllers/user';
import isValid from '../middleware/validations';
import Auth from '../src/postgres/middleware/Auth';
import authAdmin from '../src/postgres/middleware/authAdmin';


dotenv.config();

const router = express.Router();


router.get('/api/v1/parcels', Auth.verifyToken, Parcel.getAll);

router.post('/api/v1/parcels', Auth.verifyToken, isValid, Parcel.create);

router.get('/api/v1/parcels/:id', Auth.verifyToken, Parcel.getOne);

router.put('/api/v1/parcels/:id', Auth.verifyToken, authAdmin.verifyAdmin, Parcel.update);

router.put('/api/v1/parcels/:id/destination', Auth.verifyToken, Parcel.updateDestination);

router.put('/api/v1/parcels/:id/status', Auth.verifyToken, authAdmin.verifyAdmin, Parcel.updateStatus);

router.put('api/v1/parcels/:id/currentlocation', Auth.verifyToken, authAdmin.verifyAdmin, Parcel.updateCurrentLocation);

router.delete('/api/v1/parcels/:id', Auth.verifyToken, Parcel.delete);

router.post('/api/v1/users', User.create);

router.post('/api/v1/users/login', User.login);

// get all parcels by all users
// router.get('/api/v1/users', parcelController.getAllUsersParcels);

// get all parcel by a specific user
// router.get('/api/v1/users/:id', parcelController.getAllSpecificUserParcels);

export default router;
