const request = require('supertest');
const app = require('../index'); // assuming app.js or server.js is the file containing your express app
const Book = require('../schemas/payment'); // assuming book is the model for books
const { assert } = require('chai');

describe('GET /pay/:id', () => {
  it('should return a booking by bookid', (done) => {
    const book = { id: '123', placedetails: { date: '2023-04-23', amount: 100 } };
    Book.findOne(() => Promise.resolve(book));
    request(app)
      .get('/payment/pay')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        assert(Array.isArray(res.body));
        done();
      })
      .catch((err) => done(err));
  });

  it('should return an error if bookid is invalid', (done) => {
    Book.findOne.mockImplementationOnce(() => Promise.reject(new Error('Invalid bookid')));
    request(app)
      .get('/payment/pay')
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('error', 'Some error incurred.');
        done();
      })
      .catch((err) => done(err));
  });
});
