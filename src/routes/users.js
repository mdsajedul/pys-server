const router = require('express').Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const authenticate = require('../middlewares/authenticate');
const roleAuthorization = require('../middlewares/roleAuthorization');
// const { validate, validationSchema } = require('../middlewares/validate');

router.post('/:id/change-status', authenticate, roleAuthorization(['ADMIN']), userController.changeUserStatusController)
router.post('/:id/password-reset', authenticate, authController.passwordResetController)
router.get('/search',userController.searchUsersController)

module.exports = router