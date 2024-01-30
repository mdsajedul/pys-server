const Joi = require('joi')
const { default: mongoose } = require('mongoose')

const isValidObjectId = (value,helpers)=>{
    if(!mongoose.Types.ObjectId.isValid(value)){
        return helpers.error('any.invalid')
    }
    return value
}

const validationSchema = {
    login: Joi.object().keys({
        phoneNumber: Joi.string().min(11).max(11).required(),
        password: Joi.string().min(8).required(),
    }),
    register: Joi.object().keys({
        phoneNumber: Joi.string().min(11).max(11).required(),
        password: Joi.string().min(8).required(),
        fullName: Joi.string().min(4).required(),
        fatherName: Joi.string().min(4),
    }),
    eventType: Joi.object().keys({
        typeName: Joi.string().required(),
        description: Joi.string()
    }),
    createEvent: Joi.object().keys({
        eventName: Joi.string().required(),
        eventDetails: Joi.string(),
        eventPlace: Joi.string(),
        eventDate: Joi.date(),
        eventTypeId: Joi.string().custom(isValidObjectId,'Custom validation')
    })
}

const validate= (validationSchema, property)=>{
    return (req,res,next)=>{
        const {error, value} = validationSchema.validate(req[property], { abortEarly: false })
        const valid = error == null
        if(valid){
            next()
        }
        else{
            const {details} = error;
            const message = details.map(err=> err.message).join(',')
            res.status(403).json({message})
        }
    }
}

module.exports = {
    validationSchema, validate
}