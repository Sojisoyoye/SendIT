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
  });
});
