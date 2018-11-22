import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import Parcel from '../src/postgres/controllers/parcel';
import User from '../src/postgres/controllers/user';
import isValid from '../middleware/validations';
import Auth from '../src/postgres/middleware/Auth';
import authAdmin from '../src/postgres/middleware/authAdmin';


dotenv.config();

const router = express.Router();


router.get('/', (req, res, next) => {
  return res.status(200).json({ message: 'Welcome to SendIT' });
});

router.get('/api/v1', (req, res, next) => {
  return res.status(200).json({ message: 'Welcome to Version 1 of API' });
});

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


export default router;
