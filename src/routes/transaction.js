const router = require('express').Router();
const transactionController = require('../controllers/transaction');
const authenticate = require('../middlewares/authenticate');
const roleAuthorization = require('../middlewares/roleAuthorization');
// const { validate, validationSchema } = require('../middlewares/validate');

router.post('/perform', authenticate, roleAuthorization(['ADMIN']), transactionController.performTransactionController)
router.get('/', authenticate, roleAuthorization(['ADMIN']), transactionController.getAllTransaction)

module.exports = router