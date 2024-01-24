const mongoose = require('mongoose');

const eventTypeSchema = new mongoose.Schema({
  typeName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const EventType = mongoose.model('EventType', eventTypeSchema);

module.exports = EventType;
