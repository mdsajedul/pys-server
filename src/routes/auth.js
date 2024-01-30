const router = require('express').Router();
const authController = require('../controllers/auth');
const { validate, validationSchema } = require('../middlewares/validate');

router.post('/login', validate(validationSchema.login,'body'),  authController.loginController)
router.post('/register', validate(validationSchema.register, 'body'), authController.registerController)

module.exports = router