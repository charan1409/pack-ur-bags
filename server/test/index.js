const request = require('supertest');
const app = require('../index'); // assuming app.js or server.js is the file containing your express app
const fdb = require('../schemas/feedback'); // assuming feedback is the model for feedbacks
const { assert } = require('chai');

describe('GET /index/fd', () => {
  it('should return all feedbacks', (done) => {
    request(app)
      .get('/index/fd')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        assert(Array.isArray(res.body));
        done();
      })
      .catch((err) => done(err));
  });
});
