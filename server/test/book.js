const chai = require('chai');
const expect = chai.expect;
const app = require('../index'); // assuming your app is in a file called app.js
const Place = require('../schemas/place'); // assuming you have a Place model

describe('GET /book/booking/:id', () => {
    it('should return a place with the given ID', (done) => {
      // create a test place and save it to the database
      const id = '323242';        
      testPlace.save()
        .then(() => {
          // make a request to the endpoint with the test place ID
          chai.request(app)
            .get('/book/booking/' + testPlace.id)
            .end((err, res) => {
              // check that the response is what we expect
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              done();
            });
        });
    });
  
    it('should return a 400 error if the place is not found', (done) => {
      // make a request to the endpoint with an invalid place ID
      chai.request(app)
        .get('/book/booking')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.stat).to.equal('Not found');
          done();
        });
    });
  });
  