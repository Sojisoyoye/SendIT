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
});
