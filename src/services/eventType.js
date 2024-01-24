// eventTypeService.js

const EventType = require('../models/EventType');
const error = require('../utils/error');

const getAllEventTypes = async () => {
  return EventType.find();
};

const getEventTypeById = async (id) => {
  return EventType.findById(id);
};

const createEventType = async (eventTypeData) => {
  const eventType = new EventType(eventTypeData);
  return eventType.save();
};

const updateEventType = async (id, eventTypeData) => {
  const existingEventType = await EventType.findById(id);

  if (!existingEventType) {
    throw error('Event type not found', 404);
  }

  Object.assign(existingEventType, eventTypeData);
  return existingEventType.save();
};

const deleteEventType = async (id) => {
  const deletedEventType = await EventType.findByIdAndDelete(id);

  if (!deletedEventType) {
    throw error('Event type not found', 404);
  }

  return deletedEventType;
};

module.exports = {
  getAllEventTypes,
  getEventTypeById,
  createEventType,
  updateEventType,
  deleteEventType,
};
