const path = require('path');
const express = require('express');
const { notFoundHandler, globalErrorHandler } = require('./errorHandlers');

const app = express();

app.use('/uploads',express.static(path.resolve(__dirname.slice(__dirname.length-1,3),'uploads')))
app.use(require('./middleware'))
app.use(require('./routes'))
app.use(notFoundHandler)
app.use(globalErrorHandler)

module.exports = app;