const router = require('express').Router()


// router.use(require('../routes/index'))
router.get('/health',(_req,res)=>{
    res.status(200).json({message:'Success'})
})
router.get('/',(req,res)=>{
    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reservation</title>
        </head>
        <body>
            <div style="display: flex;justify-content: center;">
                <div>
                    <h3>PYS server!!!</h3>
                </div>
            </div>
        </body>
    </html>
    `)
})

module.exports = router