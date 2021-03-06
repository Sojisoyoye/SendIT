import moment from 'moment';
import db from '../db';

const Parcel = {
  async create(req, res) {
    const text = `INSERT INTO
        parcels(userid, pickuplocation, destination, currentlocation, status, weight, senton, deliveredon)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        returning *`;
    const values = [
      req.user.id,
      req.body.pickuplocation,
      req.body.destination,
      req.body.currentlocation,
      req.body.status,
      req.body.weight,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },


  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM parcels WHERE userid = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getOne(req, res) {
    const text = 'SELECT * FROM parcels WHERE id = $1 AND userid = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(404).send(error);
    }
  },


  async update(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id= $1 AND userid = $2';
    const updateOneQuery = `UPDATE parcels 
        SET pickuplocation=$2,destination=$3,currentlocation=$4,status=$5,weight=$6,senton=$7,deliverdon=$8
        WHERE id=$5 AND userid = $6 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }
      const values = [
        req.body.pickuplocation || rows[0].pickuplocation,
        req.body.destination || rows[0].destination,
        req.body.currentlocation || rows[0].currentlocation,
        req.body.status || rows[0].status,
        req.body.weight || rows[0].weight,
        moment(new Date()),
        moment(new Date()),
        req.params.id,
        req.user.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async updateDestination(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id=$1';
    const updateOneQuery = 'UPDATE parcels SET destination=$1 WHERE id=$2 returning *';
    try {
      const { rows } = await db.query(findOneQuery, [parseInt(req.params.id, 0)]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }
      const value = [
        req.body.destination || rows[0].destination,
        rows[0].id
      ];
      const response = await db.query(updateOneQuery, value);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async updateStatus(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id=$1';
    const updateOneQuery = 'UPDATE parcels SET status=$1 WHERE id=$2 returning *';
    try {
      const { rows } = await db.query(findOneQuery, [parseInt(req.params.id, 0)]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }
      const value = [
        req.body.status || rows[0].status,
        rows[0].id
      ];
      const response = await db.query(updateOneQuery, value);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async updateCurrentLocation(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id=$1';
    const updateOneQuery = 'UPDATE parcels SET currentlocation=$1 WHERE id=$2 returning *';
    try {
      const { rows } = await db.query(findOneQuery, [parseInt(req.params.id, 0)]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }
      const value = [
        req.body.currentlocation || rows[0].currentlocation,
        rows[0].id
      ];
      const response = await db.query(updateOneQuery, value);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    const deleteQuery = 'DELETE FROM parcels WHERE id=$1 AND userid = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [parseInt(req.params.id, 0), req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }
      return res.status(204).send({ message: 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default Parcel;
