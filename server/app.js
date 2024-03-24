const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const {
  paintsAvailability,
  LOW_AVAILABILITY_NUM,
  OUT_OF_STOCK_NUM,
} = require("./constants.js");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

function determineStatus(litresNum) {
  if (litresNum === OUT_OF_STOCK_NUM) {
    return "out of stock"
  } else if (litresNum > OUT_OF_STOCK_NUM && litresNum <= LOW_AVAILABILITY_NUM) {
    return "low in stock" 
  } else {
    return "available"
  }
}

app.get("/paints", (request, response) => {
  console.log("paintsAvailability =>", paintsAvailability);
  const result = paintsAvailability.map((paint) => {
  const litresNum = Number(paint.litres);

    return {
      ...paint,
      status: determineStatus(litresNum)
    };
  });

  response.status(200).json(result);
  return;
});

app.put("/paints/:colour", (request, response) => {
  const colour = request.params.colour;
  const paint = paintsAvailability.find((paint) => paint.colour === colour);
  console.log("paint #1 =>", paint);

  if (paint) {
    paint.litres = request.body.quantity;
  }

  console.log("paint #2 =>", paint);

  response.status(200).json({"Message": `Availability for the colour ${colour} has been updated to ${request.body.quantity}`});
  return;
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); 
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
// });

module.exports = app;
