
const { getAllEventTypes, getEventTypeById, createEventType, updateEventType, deleteEventType } = require('../services/eventType');

const getAllEventTypesController = async (req, res, next) => {
  try {
    const eventTypes = await getAllEventTypes();
    res.status(200).json({ eventTypes });
  } catch (error) {
    next(error);
  }
};

const getEventTypeByIdController = async (req, res, next) => {
  const id = req.params.id;

  try {
    const eventType = await getEventTypeById(id);
    res.status(200).json({ eventType });
  } catch (error) {
    next(error);
  }
};

const createEventTypeController = async (req, res, next) => {
  const eventTypeData = req.body;

  try {
    const eventType = await createEventType(eventTypeData);
    res.status(201).json({ message: 'Event type created successfully', eventType });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getAllEventTypesController,
    getEventTypeByIdController,
    createEventTypeController
}