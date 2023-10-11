import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  head: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  pickup: {
    type: String,
    required: true,
  },
  drop: {
    type: String,
    required: true,
  },
  pDate: {
    type: Date,
    required: true,
  },
  pTime: {
    type: String,
  },
  submittedDate: {
    type: Date,
    default: Date.now(),
  },
  distance: {
    type: String,
  },
  bookingId: {
    type: String,
    required: true,
  },
});

export const Booking =
  mongoose.models.bookings || mongoose.model("bookings", BookingSchema);
