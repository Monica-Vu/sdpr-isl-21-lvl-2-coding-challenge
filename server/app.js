const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const paintsAvailability = require("./SAMPLE_DATA.js");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.get("/paints", (request, response) => {
  console.log("paintsAvailability =>", paintsAvailability);
  response.status(200).json(paintsAvailability);
  return;
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
