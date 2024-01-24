const router = require('express').Router()
const authRoute = require('./auth')
const userRoute = require('./users')
const eventRoute = require('./event')
const transactionRoute = require('./transaction')

router.use('/api/v1/auth',authRoute)
router.use('/api/v1/users',userRoute)
router.use('/api/v1/events',eventRoute)
router.use('/api/v1/transactions',transactionRoute)


module.exports = router;