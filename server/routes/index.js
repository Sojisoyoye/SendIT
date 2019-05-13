import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import ParcelController from '../controllers/parcel';
import UserController from '../controllers/user';
// import isValid from '../middleware/validations';
// import signUpValid from '../middleware/signupvalidator';
// import logInValid from '../middleware/loginvalidator';
// import Auth from '../src/postgres/middleware/Auth';
// import authAdmin from '../src/postgres/middleware/authAdmin';


dotenv.config();

const router = express.Router();


router.get('/', (req, res) => res.status(200).json({ message: 'Welcome to SendIT' }));

router.get('/api/v1', (req, res) => res.status(200).json({ message: 'Welcome to Version 1 of API' }));

router.get('/api/v1/parcels', ParcelController.getAll);

router.post('/api/v1/parcels', ParcelController.create);

// router.get('/api/v1/parcels/:id', Auth.verifyToken, Parcel.getOne);

// router.put('/api/v1/parcels/:id', Auth.verifyToken, authAdmin.verifyAdmin, Parcel.update);

// router.put('/api/v1/parcels/:id/destination', Auth.verifyToken, Parcel.updateDestination);

// eslint-disable-next-line max-len
// router.put('/api/v1/parcels/:id/status', Auth.verifyToken, authAdmin.verifyAdmin, Parcel.updateStatus);

// eslint-disable-next-line max-len
// router.put('api/v1/parcels/:id/presentlocation', Auth.verifyToken, authAdmin.verifyAdmin, Parcel.updateCurrentLocation);

// router.delete('/api/v1/parcels/:id', Auth.verifyToken, Parcel.delete);

router.post('/api/v1/auth/signup', UserController.create);

router.post('/api/v1/auth/login', UserController.login);


export default router;
