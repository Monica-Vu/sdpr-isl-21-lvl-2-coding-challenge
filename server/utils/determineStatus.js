const { LOW_AVAILABILITY_NUM, OUT_OF_STOCK_NUM } = require("./../constants.js");

function determineStatus(litresNum) {
  if (litresNum === OUT_OF_STOCK_NUM) {
    return "out of stock";
  } else if (
    litresNum > OUT_OF_STOCK_NUM &&
    litresNum <= LOW_AVAILABILITY_NUM
  ) {
    return "low in stock";
  } else {
    return "available";
  }
}

module.exports = determineStatus