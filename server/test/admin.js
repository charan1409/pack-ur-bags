var assert = require("assert");
const request = require("supertest");
const app = require("../index");
const expect = require("chai").expect;
const sinon = require("sinon");

describe("GET /", function () {
  it('should return "Hello World!"', function (done) {
    request(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, "Hello World!");
        done();
      });
  });
});

describe("Feedbacks should return in the form of JSON", function () {
  it("should return a JSON array of feedbacks", function (done) {
    request(app)
      .get("/admins/feedbacks")
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        assert(Array.isArray(res.body));
        done();
      });
  });
});

describe("GET /tours/:id", () => {
  it("should return an array of tours for the given username", (done) => {
    request(app)
      .get("/admins/tours/rahul")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.deepStrictEqual(res.body, [
          // expected tours array
        ]);
        done();
      });
  });

  it("should return a message indicating if tours are booked or not", (done) => {
    request(app)
      .get("/admins/tours/rahul")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.length > 0) {
          assert.deepStrictEqual(res.body, [
            // expected tours array
          ]);
          assert.strictEqual(res.text, "Tours are booked");
        } else {
          assert.deepStrictEqual(res.body, []);
          assert.strictEqual(res.text, "No tours booked");
        }
        done();
      });
  });
});

