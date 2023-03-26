const Book = require('../schemas/book');
const Place = require('../schemas/place');

class BookRepository {
  async save(book) {
    const newBooking = new Book(book.id, book.username, book.dateRange, book.paymentStatus, book.numberOfPassengers, book.passengers, book.placeDetails);
    await newBooking.save();
    return newBooking.id;
  }

  async findPlace(placeId) {
    Place.findOne({ placeId: placeId }, (err, place) => {
        if (err) {
            return null;
        }
        return place;
        }
    );
  }

  async saveBooing(booking) {
    const newBooking = new Book(booking.id, booking.username, booking.dateRange, booking.paymentStatus, booking.numberOfPassengers, booking.passengers, booking.placeDetails);
    await newBooking.save();
    return newBooking.id;
    }

  // Define other CRUD functions as needed
}

module.exports = BookRepository;
