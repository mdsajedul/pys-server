const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDetails: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventAvatar: {
    type: String, // URL or file path to the event avatar
  },
  eventPlace: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'], // Add more status values as needed
    default: 'pending',
  },
  approvers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  eventType: {
    type: String,
    // Add any specific constraints or validation for event types if needed
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
