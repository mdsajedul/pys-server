const eventService = require('../services/event');
const error = require('../utils/error');

const getAllEvent = async (req, res, next) => {
  try {
    const events = await eventService.findEvent();
    res.status(200).json({ events });
  } catch (err) {
    next(err);
  }
};

const findEventById = async (req, res, next) => {
  const id = req.params.id;
  
  try {
    const event = await eventService.findEventByProperties('_id', id);
    if (!event) {
      throw error('Event not found', 404);
    }
    res.status(200).json({ event });
  } catch (err) {
    next(err);
  }
};

const createNewEventController = async (req, res, next) => {
  const { eventName, eventDetails, eventAvatar, eventPlace, eventDate, eventTypeId } = req.body;
  
  try {
    const event = await eventService.createNewEvent({
      eventName,
      eventDetails,
      creatorId:req.user._id,
      eventAvatar,
      eventPlace,
      eventDate,
      eventTypeId,
    });
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEvent,
  findEventById,
  createNewEventController,
};
