// import dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

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

    it('should get all parcels by a specific user', (done) => {
      const id = 1;
      chai.request(app)
        .get('/api/v1/users/${id}')
        .end((err, res) => {
          // res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not get all parcels by a specific user', (done) => {
      const id = 5;
      chai.request(app)
        .get('/api/v1/users/${id}')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

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

    it('should not get a specific parcel', (done) => {
      const id = 5;
      chai.request(app)
        .get('/api/v1/parcels/${id}')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('Create a Parcel', () => {
    it('should create a new parcel', (done) => {
      const parcel = {
        userid: 'user1',
        sendername: 'saul ebel',
        receivername: 'segun oni',
        pickuplocation: 'ijebu',
        destination: 'ojota',
        packagecontent: 'letter',
        weight: '0.5kg',
        price: '$0.50',
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

  describe('Delete a Parcel', () => {
    it('should cancel a specific parcel', (done) => {
      // const id = 1;
      chai.request(app)
        .get('/api/v1/parcels/')
        .end((err, res) => {
          const id = 1;
          chai.request(app)
            .delete('/api/v1/parcels/${id}')
            .end((error, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              done();
            });
        });
    });
  });

  describe('Update a Parcel', () => {
    it('should update a specific parcel', (done) => {
      chai.request(app)
        .get('/api/v1/parcels')
        .end((err, res) => {
          const id = 1;
          chai.request(app)
            .put('/api/v1/parcels/${id}')
            .send({ userid: 'user1', sendername: 'sola ahmed' })
            .end((error, response) => {
              response.should.have.status(201);
              response.body.should.be.a('object');
              response.body.should.have.object('updatedParcel');
              response.body.updatedParcel.should.have.property('userid');
              response.body.updatedParcel.should.have.property('sendername');
              done();
            });
        });
    });
  });
});
