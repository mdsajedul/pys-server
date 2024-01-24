const router = require('express').Router()
const authRoute = require('./auth')
const userRoute = require('./users')
const eventRoute = require('./event')

router.use('/api/v1/auth',authRoute)
router.use('/api/v1/users',userRoute)
router.use('/api/v1/events',eventRoute)


module.exports = router;