const http = require('http');
const app = require('./app/app');
const { PORT, dbURI } = require('../config/config');
const connectDB = require('./db/db');

const server = http.createServer(app);


connectDB(dbURI).then(()=>{
    console.log('Database Connected');
    server.listen(PORT,()=>{
        console.log(`Server is running on PORT: ${PORT}`)
    })
}).catch((e)=>{
    console.log(e);
})