const error = require('../utils/error');
const Event = require('../models/Event');

const findEvent = () => {
    return Event.find()
        .populate('creator','fullName')
        .populate('approvers') 
        .populate('eventType')  
        .exec();
};


const findEventByProperties = (key, value) => {
    let query = Event.findOne({ [key]: value });

    if (key === '_id') {
        query = Event.findById(value);
    }else {
        query = Event.findOne({[key]: value}).exec()
    }
    return query.populate('creator','fullName')
                .populate('eventType')
                .populate('approvers')
                .exec();
};


const createNewEvent = ({eventName, eventDetails, creatorId, eventAvatar, eventPlace, eventDate, eventTypeId})=>{
    const event = new Event({
        eventName,
        eventDetails,
        creator: creatorId,
        eventAvatar,
        eventPlace,
        eventDate,
        eventType:eventTypeId
       
    })
    return event.save()
}

module.exports = {
    findEvent,
    findEventByProperties,
    createNewEvent
}