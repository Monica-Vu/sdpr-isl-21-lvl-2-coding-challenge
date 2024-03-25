const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { paintsAvailability } = require("./constants.js");
const determineStatus  = require("./utils/determineStatus.js")

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.get("/api/paints", (request, response) => {
  try {
    const result = paintsAvailability.map((paint) => {
      const litresNum = Number(paint.litres);

      return {
        ...paint,
        status: determineStatus(litresNum),
      };
    });

    response.status(200).json(result);
    return;
  } catch {
    response
      .status(500)
      .json({ Message: `Unable to make request to get colours` });
  }
});

app.put("/api/paints/:colour", (request, response) => {
  try {
    const colour = request.params.colour;

    if (!colour) {
      response.status(400).json({ Message: `Colour parameter not provided` });
      return;
    }

    if (isNaN(request.body.quantity) || request.body.quantity < 0) {
      response.status(400).json({ Message: `Empty request body` });
      return;
    }

    const paint = paintsAvailability.find((paint) => paint.colour === colour);

    if (!paint) {
      response
        .status(404)
        .json({ Message: `Paint with colour ${colour} not found` });
      return;
    }

    paint.litres = request.body.quantity;

    response.status(200).json({
      Message: `Availability for the colour ${colour} has been updated to ${request.body.quantity}`,
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      Error: "An unexpected error occurred",
    });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(3001, () => console.log("Server ready on port 3001"));

module.exports = app;
