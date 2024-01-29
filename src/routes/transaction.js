const router = require('express').Router();
const transactionController = require('../controllers/transaction');
const authenticate = require('../middlewares/authenticate');
const roleAuthorization = require('../middlewares/roleAuthorization');
// const { validate, validationSchema } = require('../middlewares/validate');

router.post('/perform', authenticate, roleAuthorization(['ADMIN']), transactionController.performTransactionController)
router.get('/', authenticate, roleAuthorization(['ADMIN']), transactionController.getAllTransaction)
router.get('/:eventId/total', authenticate, roleAuthorization(['ADMIN']), transactionController.getTransactionTotalsByEventId)

module.exports = router