/* eslint-disable no-undef */
// import dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

// const Parcel = require('../db/db');

// configure chai
chai.should();
chai.use(chaiHttp);

describe('Parcels', () => {
  describe('Get parcels', () => {
    it('should get all parcels', (done) => {
      chai.request(app)
        .get('/api/v1/parcels')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should get all parcels by all users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('Get Specific User Parcel', () => {
    it('should get a specific user parcels', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/users/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a('object');
          done();
        });
    });

    it('should not get a specific user parcels', (done) => {
      const id = 5;
      chai.request(app)
        .get(`/api/v1/users/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('Get Specific Parcel', () => {
    it('should get a specific parcel', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/parcels/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not get a specific parcel', (done) => {
      const id = 5;
      chai.request(app)
        .get(`/api/v1/parcels/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('Create Parcel', () => {
    it('should create a new parcel', (done) => {
      const parcel = {
        userid: 'user1',
        sendername: 'sean paul',
        receivername: 'craig david',
        pickuplocation: 'yaba',
        destination: 'oyo',
        packagecontent: 'letter',
        weight: '0.5kg',
        price: '$4',
      };
      chai.request(app)
        .post('/api/v1/parcels')
        .send(parcel)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.parcel.should.have.property('userid');
          res.body.parcel.should.have.property('sendername');
          res.body.parcel.should.have.property('receivername');
          res.body.parcel.should.have.property('pickuplocation');
          res.body.parcel.should.have.property('destination');
          res.body.parcel.should.have.property('packagecontent');
          res.body.parcel.should.have.property('weight');
          res.body.parcel.should.have.property('price');
          done();
        });
    });
  });
});

describe('Delete a Parcel', () => {
  it('should cancel a parcel', (done) => {
    const parcel = {
      id: 1,
      userid: 'user1',
      sendername: 'Sola Benson',
      receivername: 'Joh Doe',
      pickuplocation: 'Yaba',
      destination: 'Lekki',
      packagecontent: 'Document',
      weight: '1.5kg',
      price: '$2.0',
    };
    chai.request(app)
      .delete(`/api/v1/parcels/${parcel.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
