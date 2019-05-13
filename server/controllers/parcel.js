import models from '../models';

const { Parcel } = models;

const ParcelController = {
    async create(req, res) {

        const values = {
            placedBy: req.body.placedBy,
            weight: req.body.weight,
            weightmetric: req.body.weightmetric,
            sentOn: req.body.sentOn,
            deliveredOn: req.body.deliveredOn,
            status: req.body.status,
            from: req.body.from,
            to: req.body.to,
        }

        try {
            const parcel = await Parcel.create(values);
            return res.status(200).json({
                status: 201,
                message: 'Parcel created successfully',
            })
        } catch(error) {
            console.log(error);
        }
    },

    async getAll(req, res) {
        try {
            const parcels = await Parcel.findAll();
            return res.status(200).json({
                status: 200,
                message: 'Parcels retreived successfully',
                parcels,
            });
        } catch(error) {
            console.log(error);
        }
    }
};

export default ParcelController;