const router = require('express').Router();
const eventTypeController = require('../controllers/eventType');
const eventController = require('../controllers/event');
const authenticate = require('../middlewares/authenticate');
const roleAuthorization = require('../middlewares/roleAuthorization');
const { validate, validationSchema } = require('../middlewares/validate');
// const { validate, validationSchema } = require('../middlewares/validate');

router.get('/types',eventTypeController.getAllEventTypesController)
router.get('/types/:id',eventTypeController.getEventTypeByIdController)
router.post('/types', authenticate, roleAuthorization(['ADMIN']), eventTypeController.createEventTypeController)
router.get('/',eventController.getAllEvent)
router.get('/:id',eventController.findEventById)
router.post('/',authenticate,  roleAuthorization(['ADMIN']),validate(validationSchema.createEvent,'body'), eventController.createNewEventController)

module.exports = router