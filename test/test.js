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

  describe('Get Specific Parcel', () => {
    it('should get a specific parcel', (done) => {
      const id = 1;
      chai.request(app)
        .get('/api/v1/parcels/${id}')
        .end((err, res) => {
          // res.should.have.status(200);
          res.body.should.be.a('object');
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
